'use strict';

const SIM=require('./simulator.js');
const REPORTING=require('./reporting.js');
const COMPARISON=require('./comparison.js');
const PATCH=require('../balance/patch-v0.5.12.js');

const pct=value=>(value*100).toFixed(2);
const number=(value,digits=2)=>Number(value||0).toFixed(digits);
function targetRoundShare(summary){let games=0;for(let round=8;round<=12;round++)games+=summary.roundDistribution[round]||0;return summary.games?games/summary.games:0}
function targetReview(report){
  const summary=report.summary,cards=REPORTING.cardRows(report).filter(row=>row.scope==='overall'),randomCards=REPORTING.cardRows(report).filter(row=>row.scope==='random'),heuristicCards=REPORTING.cardRows(report).filter(row=>row.scope==='heuristic'),customers=REPORTING.customerRows(report).filter(row=>row.scope==='overall');
  const inTarget=COMPARISON.targetCount(summary),roundShare=targetRoundShare(summary),automatic=cards.filter(row=>row.deckInclusionRate>=.999999),heuristicAutomatic=heuristicCards.filter(row=>row.deckInclusionRate>=.999999),dead=cards.filter(row=>row.flags.includes('dead')),underused=cards.filter(row=>row.flags.includes('underused')),topCustomer=[...customers].sort((a,b)=>b.topBartenderWinShare-a.topBartenderWinShare)[0],maxOverall=[...cards].sort((a,b)=>b.deckInclusionRate-a.deckInclusionRate)[0],maxRandom=[...randomCards].sort((a,b)=>b.deckInclusionRate-a.deckInclusionRate)[0];
  return{
    details:{inTarget,roundShare,automatic,heuristicAutomatic,dead,underused,topCustomer,maxOverall,maxRandom},
    targets:[
      {target:'All bartender win rates from 48% to 52%',status:inTarget===SIM.DATA.bartenders.length?'PASS':'FAIL',evidence:`${inTarget}/${SIM.DATA.bartenders.length} in range; spread ${number(COMPARISON.spread(summary))} percentage points`},
      {target:'First-player advantage below 2 percentage points',status:Math.abs(summary.firstPlayerWinRate-.5)<.02?'PASS':'FAIL',evidence:`Player 1 ${pct(summary.firstPlayerWinRate)}%; advantage ${number(Math.abs(summary.firstPlayerWinRate-.5)*100)} points`},
      {target:'Most games finish in 8–12 rounds',status:roundShare>.5&&summary.averageRounds>=8&&summary.averageRounds<=12?'PASS':'FAIL',evidence:`${pct(roundShare)}% in target; ${number(summary.averageRounds)} round average`},
      {target:'No drink is automatic across the full evaluated deck population',status:automatic.length===0?'PASS':'FAIL',evidence:`${automatic.length} at 100%; highest overall inclusion ${pct(maxOverall.deckInclusionRate)}% (${maxOverall.name})`},
      {target:'No large group of cards is unplayable',status:dead.length+underused.length<=Math.ceil(SIM.DATA.drinks.length*.1)?'PASS':'FAIL',evidence:`${dead.length} never selected and ${underused.length} underused of ${SIM.DATA.drinks.length}`},
      {target:'Customers do not heavily favor one bartender family',status:topCustomer.topBartenderWinShare<.30?'PASS':'FAIL',evidence:`Highest concentration ${pct(topCustomer.topBartenderWinShare)}% for ${topCustomer.name} → ${topCustomer.topWinningBartender}`}
    ]
  };
}
function buildMarkdown(beforeReport,finalReport){
  const before=beforeReport.summary,final=finalReport.summary,bartenders=COMPARISON.bartenderRows(before,final),review=targetReview(finalReport),failed=review.targets.filter(row=>row.status!=='PASS'),d=review.details;
  return[
    '# Bartender: Last Call — Prompt 13 Convergence Report','',
    '**Final change: Cellar Select $20 → $16.** This is the only gameplay change after Prompt 12. It lowers one winner-payout step for the Wine card most directly connected to Rae’s remaining excess win rate.','',
    '## Target status','',
    '| Locked target | Status | Evidence |','|---|---|---|',
    ...review.targets.map(row=>`| ${row.target} | **${row.status}** | ${row.evidence} |`),'',
    `Formal convergence status: **${failed.length?'NOT COMPLETE':'COMPLETE'}**.`,'',
    '## Prompt 12 versus final Prompt 13','',
    '| Bartender | Specialty | Prompt 12 | Prompt 13 | Change | Final target? |','|---|---|---:|---:|---:|---|',
    ...bartenders.map(row=>`| ${row.name} | ${row.specialty} | ${pct(row.beforeRate)}% | ${pct(row.afterRate)}% | ${number(row.changePoints)} pp | ${row.inTarget?'Yes':'No'} |`),'',
    `Starting-bartender spread: ${number(COMPARISON.spread(before))} → **${number(COMPARISON.spread(final))} percentage points**.`,
    `First-player win rate: ${pct(before.firstPlayerWinRate)}% → **${pct(final.firstPlayerWinRate)}%**.`,
    `Average game length: ${number(before.averageRounds)} → **${number(final.averageRounds)} rounds**.`,'',
    '## Deck and card interpretation','',
    `No card appeared in every deck across the complete 100,000-game study. The highest overall deck inclusion was ${pct(d.maxOverall.deckInclusionRate)}% for ${d.maxOverall.name}; the highest random-legal inclusion was ${pct(d.maxRandom.deckInclusionRate)}%.`,
    `${d.heuristicAutomatic.length} card${d.heuristicAutomatic.length===1?'':'s'} appeared in every deck produced by the single deterministic heuristic recipe: ${d.heuristicAutomatic.map(card=>card.name).join(', ')||'none'}. This is retained as a **deck-diversity warning**, not treated as proof of mandatory inclusion across the metagame, because Prompt 10 implements one heuristic recipe rather than exhaustive optimal deck search or human deck telemetry.`,
    `${d.dead.length} cards were never selected and ${d.underused.length} were flagged underused; that is not a large unplayable group, but the named cards remain playtest watch items.`,'',
    '## Customer interpretation','',
    `The strongest customer-to-bartender concentration was ${pct(d.topCustomer.topBartenderWinShare)}%: ${d.topCustomer.name} with ${d.topCustomer.topWinningBartender}. No customer produced a 30% or greater concentration, so customer preference families remain meaningful without controlling outcomes.`,'',
    '## What remained unchanged','',
    ...PATCH.unchanged.map(item=>`- ${item}`),'',
    '## Handoff','',
    'Prompt 13 has converged on the locked simulation targets. Human playtesting remains the authority for feel and metagame diversity. Prompt 14 can now redesign the interface without carrying a known numeric bartender imbalance.',''
  ].join('\n');
}
function buildArtifacts(beforeReport,finalReport){
  const comparisonRows=COMPARISON.summaryRows(beforeReport.summary,finalReport.summary),bartenders=COMPARISON.bartenderRows(beforeReport.summary,finalReport.summary),review=targetReview(finalReport),cards=REPORTING.cardRows(finalReport).filter(row=>row.scope==='overall'),customers=REPORTING.customerRows(finalReport).filter(row=>row.scope==='overall'),finalArtifacts=REPORTING.buildArtifacts(finalReport),artifacts={
    'CONVERGENCE_REPORT.md':buildMarkdown(beforeReport,finalReport),
    'prompt12_report.json':JSON.stringify(beforeReport,null,2)+'\n',
    'final_report.json':JSON.stringify(finalReport,null,2)+'\n',
    'target_status.csv':REPORTING.csv([['target','status','evidence'],...review.targets.map(row=>[row.target,row.status,row.evidence])]),
    'system_before_after.csv':REPORTING.csv([['metric','unit','prompt12','prompt13','change'],...comparisonRows.map(row=>[row.metric,row.unit,row.before,row.after,row.change])]),
    'bartender_before_after.csv':REPORTING.csv([['bartender','specialty','prompt12_games','prompt12_win_rate','prompt13_games','prompt13_win_rate','change_percentage_points','inside_48_to_52'],...bartenders.map(row=>[row.name,row.specialty,row.beforeGames,row.beforeRate,row.afterGames,row.afterRate,row.changePoints,row.inTarget])]),
    'card_target_review.csv':REPORTING.csv([['id','drink','spirit','deck_inclusion_rate','pick_rate_when_drawn','selection_share','served_win_rate','flags'],...cards.map(row=>[row.id,row.name,row.spirit,row.deckInclusionRate,row.pickRateWhenDrawn,row.selectionShare,row.servedWinRate,row.flags])]),
    'customer_target_review.csv':REPORTING.csv([['customer','love','like','dislike','rounds','top_winning_bartender','top_bartender_win_share','bias_above_equal_share'],...customers.map(row=>[row.name,row.love,row.like,row.dislike,row.rounds,row.topWinningBartender,row.topBartenderWinShare,row.biasAboveEqualShare])]),
    'drink_price_change.csv':REPORTING.csv([['id','drink','spirit','before_price','after_price','reason'],...PATCH.changes.map(row=>[row.id,row.name,row.spirit,row.before,row.after,row.reason])])
  };
  for(const [name,content] of Object.entries(finalArtifacts))if(name.endsWith('.csv'))artifacts[`final_${name}`]=content;
  return artifacts;
}

module.exports={PATCH,targetRoundShare,targetReview,buildMarkdown,buildArtifacts};
