'use strict';

const SIM=require('./simulator.js');

function matchupFor(index){
  const count=SIM.DATA.bartenders.length,pair=index%(count*count);
  return[Math.floor(pair/count),pair%count];
}

function runBaseline(options={}){
  const games=options.games??100000;
  if(!Number.isInteger(games)||games<1)throw new Error('Baseline games must be a positive integer.');
  const randomGames=options.randomGames??Math.floor(games/2),heuristicGames=games-randomGames;
  if(randomGames<0||heuristicGames<0)throw new Error('Deck-stratum game counts cannot be negative.');
  const seed=String(options.seed??'bartender-last-call-prompt11-v0.5.9'),difficulty=options.difficulty??'hard';
  const overall=SIM.createAggregateState(),strata={random:SIM.createAggregateState(),heuristic:SIM.createAggregateState()},matchups=new Map();
  let completed=0;
  function runStratum(deckType,count){
    for(let index=0;index<count;index++){
      const pair=matchupFor(index),game=SIM.simulateGame({seed:`${seed}:${deckType}:${index}`,deckType,difficulty,bartenders:pair});
      SIM.addGameToAggregate(overall,game);SIM.addGameToAggregate(strata[deckType],game);
      const key=`${deckType}:${pair[0]}:${pair[1]}`;
      if(!matchups.has(key))matchups.set(key,{deckType,first:pair[0],second:pair[1],state:SIM.createAggregateState()});
      SIM.addGameToAggregate(matchups.get(key).state,game);
      completed++;if(typeof options.onProgress==='function'&&(completed%5000===0||completed===games))options.onProgress({completed,games,deckType});
    }
  }
  runStratum('random',randomGames);runStratum('heuristic',heuristicGames);
  return{
    config:{study:options.study??'Balance simulation',rulesVersion:'0.5',sourceVersion:options.sourceVersion??SIM.DATA.schemaVersion,games,randomGames,heuristicGames,seed,difficulty,bartenders:SIM.DATA.bartenders.length,orderedMatchups:SIM.DATA.bartenders.length**2,scheduling:'Round-robin ordered matchups within each deck stratum'},
    summary:SIM.finalizeAggregate(overall),
    strata:{random:SIM.finalizeAggregate(strata.random),heuristic:SIM.finalizeAggregate(strata.heuristic)},
    matchups:[...matchups.values()].map(entry=>({deckType:entry.deckType,first:SIM.DATA.bartenders[entry.first].name,second:SIM.DATA.bartenders[entry.second].name,summary:SIM.finalizeAggregate(entry.state)})).sort((a,b)=>a.deckType.localeCompare(b.deckType)||a.first.localeCompare(b.first)||a.second.localeCompare(b.second))
  };
}

module.exports={matchupFor,runBaseline};
