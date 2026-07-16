'use strict';

const SIM=require('./simulator.js');
const REPORTING=require('./reporting.js');
const PATCH=require('../balance/patch-v0.5.11.js');

const rate=stat=>stat&&stat.games?stat.wins/stat.games:0;
const pct=value=>(value*100).toFixed(2);
const number=(value,digits=2)=>Number(value||0).toFixed(digits);
function spread(summary){const rates=SIM.DATA.bartenders.map(b=>rate(summary.bartenderStats[b.name]));return(Math.max(...rates)-Math.min(...rates))*100}
function targetCount(summary){return SIM.DATA.bartenders.filter(b=>{const value=rate(summary.bartenderStats[b.name]);return value>=.48&&value<=.52}).length}
function summaryRows(before,after){
  const metrics=[
    ['first_player_win_rate',before.firstPlayerWinRate,after.firstPlayerWinRate,'rate'],
    ['average_rounds',before.averageRounds,after.averageRounds,'number'],
    ['median_rounds',before.medianRounds,after.medianRounds,'number'],
    ['p90_rounds',before.p90Rounds,after.p90Rounds,'number'],
    ['appeal_tie_rate',before.appealTieRate,after.appealTieRate,'rate'],
    ['price_tie_rate',before.priceTieRate,after.priceTieRate,'rate'],
    ['comeback_rate',before.comebackRate,after.comebackRate,'rate'],
    ['average_tips_per_round',before.averageTipsPerRound,after.averageTipsPerRound,'number'],
    ['average_switches_per_game',before.averageSwitchesPerGame,after.averageSwitchesPerGame,'number'],
    ['starting_bartender_spread_points',spread(before),spread(after),'points'],
    ['bartenders_in_48_to_52_target',targetCount(before),targetCount(after),'count']
  ];
  return metrics.map(([metric,beforeValue,afterValue,unit])=>({metric,before:beforeValue,after:afterValue,change:afterValue-beforeValue,unit}));
}
function bartenderRows(before,after){return SIM.DATA.bartenders.map(b=>{const beforeRate=rate(before.bartenderStats[b.name]),afterRate=rate(after.bartenderStats[b.name]);return{name:b.name,specialty:b.specialty,beforeGames:before.bartenderStats[b.name].games,beforeRate,afterGames:after.bartenderStats[b.name].games,afterRate,changePoints:(afterRate-beforeRate)*100,inTarget:afterRate>=.48&&afterRate<=.52}}).sort((a,b)=>b.afterRate-a.afterRate)}
function buildMarkdown(beforeReport,afterReport){
  const before=beforeReport.summary,after=afterReport.summary,bartenders=bartenderRows(before,after),outside=bartenders.filter(row=>!row.inTarget),summary=summaryRows(before,after),cards=REPORTING.cardRows(afterReport).filter(row=>row.scope==='overall'),dead=cards.filter(row=>row.flags.includes('dead')).length,underused=cards.filter(row=>row.flags.includes('underused')).length,dominant=cards.filter(row=>row.flags.includes('dominant-selection')).length;
  return[
    '# Bartender: Last Call — Prompt 12 Balance Patch Report','',
    '**Patch category: drink prices only.** No traits, customers, bartenders, rules, payouts, switch thresholds, deck rules, or victory values changed.','',
    '## Changes and evidence','',
    '| Drink | Spirit | Before | After | Reason |','|---|---|---:|---:|---|',
    ...PATCH.changes.map(change=>`| ${change.name} | ${change.spirit} | $${change.before} | $${change.after} | ${change.reason} |`),'',
    'Each changed price crosses only the payout or tiebreak steps needed by its target. June received no direct change because the Prompt 11 baseline placed June inside the target range.','',
    '## Same-seed before versus after','',
    `Both studies contain ${afterReport.config.games.toLocaleString('en-US')} games using the same seed, 50/50 deck split, Hard AI, and ordered-matchup schedule.`,'',
    '| Metric | Before | After | Change |','|---|---:|---:|---:|',
    ...summary.map(row=>{const rateUnit=row.unit==='rate';return`| ${row.metric.replace(/_/g,' ')} | ${rateUnit?pct(row.before)+'%':number(row.before)} | ${rateUnit?pct(row.after)+'%':number(row.after)} | ${rateUnit?number(row.change*100)+' pp':number(row.change)} |`}),'',
    '## Starting bartender win rates','',
    '| Bartender | Specialty | Before | After | Change | Target? |','|---|---|---:|---:|---:|---|',
    ...bartenders.map(row=>`| ${row.name} | ${row.specialty} | ${pct(row.beforeRate)}% | ${pct(row.afterRate)}% | ${number(row.changePoints)} pp | ${row.inTarget?'Yes':'No'} |`),'',
    `The starting-bartender spread moved from **${number(spread(before))}** to **${number(spread(after))} percentage points**. ${targetCount(after)} of 7 bartenders are now inside 48–52%.`,'',
    `Remaining outside target: ${outside.length?outside.map(row=>`${row.name} (${pct(row.afterRate)}%)`).join(', '):'none'}. ${outside.length===1?'This is the only Prompt 13 candidate':'These are Prompt 13 candidates'}, rather than a reason to add untested Prompt 12 changes.`,'',
    '## Card and system checks','',
    `- Card flags after the patch: ${dead} never selected, ${underused} underused, ${dominant} dominant by selection share.`,
    `- First-player win rate moved from ${pct(before.firstPlayerWinRate)}% to ${pct(after.firstPlayerWinRate)}%.`,
    `- Average length moved from ${number(before.averageRounds)} to ${number(after.averageRounds)} rounds.`,
    `- Average combined tips per round moved from $${number(before.averageTipsPerRound)} to $${number(after.averageTipsPerRound)}.`,'',
    '## Interpretation','',
    'This is the first evidence-based patch, not the final balance claim. The comparison uses the exact same seeds, but AI simulation still needs confirmation from real players. Prompt 13 should address only remaining target failures and preserve this report as the comparison baseline.',''
  ].join('\n');
}
function buildArtifacts(beforeReport,afterReport){
  const summary=summaryRows(beforeReport.summary,afterReport.summary),bartenders=bartenderRows(beforeReport.summary,afterReport.summary),afterArtifacts=REPORTING.buildArtifacts(afterReport),artifacts={
    'BALANCE_PATCH_REPORT.md':buildMarkdown(beforeReport,afterReport),
    'before_report.json':JSON.stringify(beforeReport,null,2)+'\n',
    'after_report.json':JSON.stringify(afterReport,null,2)+'\n',
    'before_after_summary.csv':REPORTING.csv([['metric','unit','before','after','change'],...summary.map(row=>[row.metric,row.unit,row.before,row.after,row.change])]),
    'bartender_before_after.csv':REPORTING.csv([['bartender','specialty','before_games','before_win_rate','after_games','after_win_rate','change_percentage_points','inside_48_to_52'],...bartenders.map(row=>[row.name,row.specialty,row.beforeGames,row.beforeRate,row.afterGames,row.afterRate,row.changePoints,row.inTarget])]),
    'drink_price_changes.csv':REPORTING.csv([['id','drink','spirit','before_price','after_price','reason'],...PATCH.changes.map(row=>[row.id,row.name,row.spirit,row.before,row.after,row.reason])])
  };
  for(const [name,content] of Object.entries(afterArtifacts))if(name.endsWith('.csv'))artifacts[`after_${name}`]=content;
  return artifacts;
}

module.exports={PATCH,spread,targetCount,summaryRows,bartenderRows,buildMarkdown,buildArtifacts};
