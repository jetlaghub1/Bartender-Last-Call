'use strict';

const SIM=require('./simulator.js');

const ratio=(value,total)=>total?value/total:0;
const percent=value=>(value*100).toFixed(2);
const decimal=(value,digits=3)=>Number(value||0).toFixed(digits);
const csvValue=value=>{const text=value===undefined||value===null?'':String(value);return /[",\r\n]/.test(text)?`"${text.replace(/"/g,'""')}"`:text};
const csv=rows=>rows.map(row=>row.map(csvValue).join(',')).join('\n')+'\n';

function scopes(report){return[['overall',report.summary],['random',report.strata.random],['heuristic',report.strata.heuristic]]}
function inTargetRounds(summary){let count=0;for(let round=8;round<=12;round++)count+=summary.roundDistribution[round]||0;return ratio(count,summary.games)}
function bartenderRows(report){
  const rows=[];
  for(const [scope,summary] of scopes(report))for(const bartender of SIM.DATA.bartenders){
    const initial=summary.bartenderStats[bartender.name]||{games:0,wins:0},final=summary.finalBartenderStats[bartender.name]||{games:0,wins:0};
    rows.push({scope,name:bartender.name,specialty:bartender.specialty,initialGames:initial.games,initialWins:initial.wins,initialWinRate:ratio(initial.wins,initial.games),finalGames:final.games,finalWins:final.wins,finalWinRate:ratio(final.wins,final.games)});
  }
  return rows;
}
function cardRows(report){
  const rows=[];
  for(const [scope,summary] of scopes(report)){
    const playerDecks=summary.games*2,selectionSlots=summary.totalRounds*SIM.RULES.CHOOSE*2,serviceSlots=summary.totalRounds*2,averageShare=1/SIM.DATA.drinks.length;
    for(const card of SIM.DATA.drinks){
      const stat=summary.cardStats[card.id]||{deckCopies:0,deckGames:0,drawn:0,selected:0,selectionRoundWins:0,served:0,servedRoundWins:0};
      const selectionShare=ratio(stat.selected,selectionSlots),deckInclusionRate=ratio(stat.deckGames,playerDecks);
      const flags=[];if(stat.selected===0)flags.push('dead');else if(selectionShare<averageShare*.5)flags.push('underused');if(selectionShare>averageShare*2)flags.push('dominant-selection');if(deckInclusionRate>.7)flags.push('high-inclusion');
      rows.push({scope,id:card.id,name:card.name,spirit:card.spirit,styles:card.styles.join('|'),price:card.price,deckCopies:stat.deckCopies,deckGames:stat.deckGames,deckInclusionRate,averageCopiesWhenIncluded:ratio(stat.deckCopies,stat.deckGames),drawn:stat.drawn,selected:stat.selected,pickRateWhenDrawn:ratio(stat.selected,stat.drawn),selectionShare,selectedSideWinRate:ratio(stat.selectionRoundWins,stat.selected),served:stat.served,serviceShare:ratio(stat.served,serviceSlots),servedWinRate:ratio(stat.servedRoundWins,stat.served),flags:flags.join('|')});
    }
  }
  return rows;
}
function customerRows(report){
  const rows=[];
  for(const [scope,summary] of scopes(report))for(const customer of SIM.DATA.customers){
    const stat=summary.customerStats[customer.name]||{rounds:0,player1Wins:0,player2Wins:0,appealTies:0,priceTies:0,winnerBartenders:{}};
    const winners=Object.entries(stat.winnerBartenders).sort((a,b)=>b[1]-a[1]),top=winners[0]||['',0];
    rows.push({scope,name:customer.name,love:customer.love,like:customer.like,dislike:customer.dislike,rounds:stat.rounds,player1WinRate:ratio(stat.player1Wins,stat.rounds),appealTieRate:ratio(stat.appealTies,stat.rounds),priceTieRate:ratio(stat.priceTies,stat.rounds),topWinningBartender:top[0],topBartenderWinShare:ratio(top[1],stat.rounds),biasAboveEqualShare:ratio(top[1],stat.rounds)-1/SIM.DATA.bartenders.length,winnerBartenders:SIM.DATA.bartenders.map(b=>`${b.name}:${stat.winnerBartenders[b.name]||0}`).join('|')});
  }
  return rows;
}
function summaryRows(report){return scopes(report).map(([scope,s])=>({scope,games:s.games,firstPlayerWinRate:s.firstPlayerWinRate,firstPlayerAdvantagePoints:Math.abs(s.firstPlayerWinRate-.5)*100,averageRounds:s.averageRounds,medianRounds:s.medianRounds,p90Rounds:s.p90Rounds,gamesIn8To12Rounds:inTargetRounds(s),appealTieRate:s.appealTieRate,priceTieRate:s.priceTieRate,comebackRate:s.comebackRate,averageTipsPerRound:s.averageTipsPerRound,averageSwitchesPerGame:s.averageSwitchesPerGame,switchDecisionRate:s.switchDecisionRate,tokenSpendRate:s.tokenSpendRate,averageUnspentTokensPerGame:s.averageUnspentTokensPerGame}))}

function buildMarkdown(report){
  const summaries=summaryRows(report),overall=summaries[0],bartenders=bartenderRows(report).filter(row=>row.scope==='overall').sort((a,b)=>b.initialWinRate-a.initialWinRate),cards=cardRows(report).filter(row=>row.scope==='overall'),customers=customerRows(report).filter(row=>row.scope==='overall');
  const topCards=[...cards].sort((a,b)=>b.selectionShare-a.selectionShare).slice(0,10),bottomCards=[...cards].sort((a,b)=>a.selectionShare-b.selectionShare).slice(0,10),biased=[...customers].sort((a,b)=>b.biasAboveEqualShare-a.biasAboveEqualShare).slice(0,10);
  const bartenderSpread=(bartenders[0].initialWinRate-bartenders[bartenders.length-1].initialWinRate)*100,dead=cards.filter(card=>card.flags.includes('dead')).length,underused=cards.filter(card=>card.flags.includes('underused')).length,dominant=cards.filter(card=>card.flags.includes('dominant-selection')).length,highInclusion=cards.filter(card=>card.flags.includes('high-inclusion')).length;
  const lines=[
    '# Bartender: Last Call — Prompt 11 Baseline Balance Report','',
    '**Status: baseline only. No card, bartender, customer, payout, or rules values were changed.**','',
    '## Study design','',
    `- ${report.config.games.toLocaleString('en-US')} seeded Hard-AI games`,
    `- ${report.config.randomGames.toLocaleString('en-US')} random-legal-deck games and ${report.config.heuristicGames.toLocaleString('en-US')} heuristic-deck games`,
    `- All ${report.config.orderedMatchups} ordered bartender matchups scheduled almost equally within both deck groups`,
    `- Seed: \`${report.config.seed}\``,
    '- Exact v0.5 browser rules, AI, and content modules shared with the simulator','',
    '## Executive findings','',
    `- First-player win rate: **${percent(overall.firstPlayerWinRate)}%** (${decimal(overall.firstPlayerAdvantagePoints,2)} percentage points from even).`,
    `- Game length: **${decimal(overall.averageRounds,2)} rounds average**, median ${overall.medianRounds}, 90th percentile ${overall.p90Rounds}; ${percent(overall.gamesIn8To12Rounds)}% finished in the 8–12 round target.`,
    `- Starting-bartender spread: **${decimal(bartenderSpread,2)} percentage points** from highest to lowest.`,
    `- Card flags: ${dead} never selected, ${underused} underused, ${dominant} dominant by selection share, and ${highInclusion} above 70% overall deck inclusion.`,
    `- Switches: ${decimal(overall.averageSwitchesPerGame,2)} per game; ${percent(overall.switchDecisionRate)}% of token-holding round decisions resulted in a switch; ${percent(overall.tokenSpendRate)}% of earned tokens were spent.`,
    `- Average combined tips earned per round: **$${decimal(overall.averageTipsPerRound,2)}**.`,
    `- Appeal ties occurred in ${percent(overall.appealTieRate)}% of rounds; exact price ties occurred in ${percent(overall.priceTieRate)}%.`,
    `- Comebacks from at least $10 behind occurred in ${percent(overall.comebackRate)}% of games.`,'',
    '## Overall and deck-stratum comparison','',
    '| Scope | Games | P1 win | Avg rounds | 8–12 rounds | Appeal ties | Comebacks | Switches/game | Tips/round |','|---|---:|---:|---:|---:|---:|---:|---:|---:|',
    ...summaries.map(s=>`| ${s.scope} | ${s.games.toLocaleString('en-US')} | ${percent(s.firstPlayerWinRate)}% | ${decimal(s.averageRounds,2)} | ${percent(s.gamesIn8To12Rounds)}% | ${percent(s.appealTieRate)}% | ${percent(s.comebackRate)}% | ${decimal(s.averageSwitchesPerGame,2)} | $${decimal(s.averageTipsPerRound,2)} |`),'',
    '## Starting bartender results','',
    '| Bartender | Specialty | Games | Wins | Win rate |','|---|---|---:|---:|---:|',
    ...bartenders.map(row=>`| ${row.name} | ${row.specialty} | ${row.initialGames.toLocaleString('en-US')} | ${row.initialWins.toLocaleString('en-US')} | ${percent(row.initialWinRate)}% |`),'',
    'Because the AI can switch, “starting bartender” is the controlled matchup measurement. Final-bartender results are included in the CSV for context but are influenced by switching selection.','',
    '## Highest selection shares','',
    '| Drink | Spirit | Selection share | Picked when drawn | Served win rate | Deck inclusion | Flags |','|---|---|---:|---:|---:|---:|---|',
    ...topCards.map(row=>`| ${row.name} | ${row.spirit} | ${percent(row.selectionShare)}% | ${percent(row.pickRateWhenDrawn)}% | ${percent(row.servedWinRate)}% | ${percent(row.deckInclusionRate)}% | ${row.flags||'—'} |`),'',
    '## Lowest selection shares','',
    '| Drink | Spirit | Selection share | Picked when drawn | Served win rate | Deck inclusion | Flags |','|---|---|---:|---:|---:|---:|---|',
    ...bottomCards.map(row=>`| ${row.name} | ${row.spirit} | ${percent(row.selectionShare)}% | ${percent(row.pickRateWhenDrawn)}% | ${percent(row.servedWinRate)}% | ${percent(row.deckInclusionRate)}% | ${row.flags||'—'} |`),'',
    '“Selected-side win rate” and “served win rate” are correlations, not proof that a card caused the win. Prompt 12 should use these alongside deck inclusion, draw rate, and matchup context.','',
    '## Customers with the strongest bartender concentration','',
    '| Customer | Love / Like / Dislike | Rounds | Top winning bartender | Share | Above equal share | P1 win |','|---|---|---:|---|---:|---:|---:|',
    ...biased.map(row=>`| ${row.name} | ${row.love} / ${row.like} / ${row.dislike} | ${row.rounds.toLocaleString('en-US')} | ${row.topWinningBartender} | ${percent(row.topBartenderWinShare)}% | ${decimal(row.biasAboveEqualShare*100,2)} pp | ${percent(row.player1WinRate)}% |`),'',
    '## Interpretation limits','',
    '- Hard AI is deterministic and customer-aware, but it is not a perfect player or a substitute for human playtesting.',
    '- Random-deck results measure broad content exposure; heuristic-deck results measure the current deck evaluator, not a solved competitive metagame.',
    '- Statistical association does not prove causation. Prompt 12 should make the smallest changes and rerun the same seeds for comparison.','',
    '## Next step','',
    'Prompt 12 may use this report to propose the smallest evidence-based balance patch. No such patch is included here.',''
  ];
  return lines.join('\n');
}

function buildArtifacts(report){
  const summaries=summaryRows(report),bartenders=bartenderRows(report),cards=cardRows(report),customers=customerRows(report);
  return{
    'baseline_report.json':JSON.stringify(report,null,2)+'\n',
    'BASELINE_BALANCE_REPORT.md':buildMarkdown(report),
    'summary.csv':csv([['scope','games','first_player_win_rate','first_player_advantage_points','average_rounds','median_rounds','p90_rounds','games_in_8_to_12_rounds','appeal_tie_rate','price_tie_rate','comeback_rate','average_tips_per_round','average_switches_per_game','switch_decision_rate','token_spend_rate','average_unspent_tokens_per_game'],...summaries.map(r=>[r.scope,r.games,r.firstPlayerWinRate,r.firstPlayerAdvantagePoints,r.averageRounds,r.medianRounds,r.p90Rounds,r.gamesIn8To12Rounds,r.appealTieRate,r.priceTieRate,r.comebackRate,r.averageTipsPerRound,r.averageSwitchesPerGame,r.switchDecisionRate,r.tokenSpendRate,r.averageUnspentTokensPerGame])]),
    'bartender_win_rates.csv':csv([['scope','bartender','specialty','starting_games','starting_wins','starting_win_rate','final_games','final_wins','final_win_rate'],...bartenders.map(r=>[r.scope,r.name,r.specialty,r.initialGames,r.initialWins,r.initialWinRate,r.finalGames,r.finalWins,r.finalWinRate])]),
    'drink_performance.csv':csv([['scope','id','name','spirit','styles','price','deck_copies','deck_games','deck_inclusion_rate','average_copies_when_included','drawn','selected','pick_rate_when_drawn','selection_share','selected_side_win_rate','served','service_share','served_win_rate','flags'],...cards.map(r=>[r.scope,r.id,r.name,r.spirit,r.styles,r.price,r.deckCopies,r.deckGames,r.deckInclusionRate,r.averageCopiesWhenIncluded,r.drawn,r.selected,r.pickRateWhenDrawn,r.selectionShare,r.selectedSideWinRate,r.served,r.serviceShare,r.servedWinRate,r.flags])]),
    'customer_outcomes.csv':csv([['scope','customer','love','like','dislike','rounds','player1_win_rate','appeal_tie_rate','price_tie_rate','top_winning_bartender','top_bartender_win_share','bias_above_equal_share','winner_bartender_counts'],...customers.map(r=>[r.scope,r.name,r.love,r.like,r.dislike,r.rounds,r.player1WinRate,r.appealTieRate,r.priceTieRate,r.topWinningBartender,r.topBartenderWinShare,r.biasAboveEqualShare,r.winnerBartenders])]),
    'bartender_matchups.csv':csv([['deck_type','player1_bartender','player2_bartender','games','player1_wins','player2_wins','player1_win_rate','average_rounds','appeal_tie_rate','price_tie_rate','comeback_rate','average_switches_per_game'],...report.matchups.map(r=>[r.deckType,r.first,r.second,r.summary.games,r.summary.player1Wins,r.summary.player2Wins,r.summary.firstPlayerWinRate,r.summary.averageRounds,r.summary.appealTieRate,r.summary.priceTieRate,r.summary.comebackRate,r.summary.averageSwitchesPerGame])]),
    'game_length_distribution.csv':csv([['scope','rounds','games','share'],...scopes(report).flatMap(([scope,s])=>Object.keys(s.roundDistribution).map(Number).sort((a,b)=>a-b).map(round=>[scope,round,s.roundDistribution[round],ratio(s.roundDistribution[round],s.games)]))]),
    'switch_usage.csv':csv([['scope','games','switches','switch_opportunities','tokens_earned_including_starting_tokens','tokens_remaining','average_switches_per_game','switch_decision_rate','token_spend_rate','average_unspent_tokens_per_game'],...scopes(report).map(([scope,s])=>[scope,s.games,s.totalSwitches,s.totalSwitchOpportunities,s.totalTokensEarned,s.totalTokensRemaining,s.averageSwitchesPerGame,s.switchDecisionRate,s.tokenSpendRate,s.averageUnspentTokensPerGame])])
  };
}

module.exports={csv,summaryRows,bartenderRows,cardRows,customerRows,buildMarkdown,buildArtifacts};
