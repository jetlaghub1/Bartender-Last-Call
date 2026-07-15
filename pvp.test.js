'use strict';

const RULES=require('../js/rules.js');
const AI=require('../js/ai.js');
const DATA=require('../js/data.js');

function hashSeed(seed){
  const text=String(seed);let hash=2166136261;
  for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)}
  return hash>>>0;
}
function createRng(seed='bartender-last-call'){
  let value=hashSeed(seed);
  return function(){value+=0x6D2B79F5;let t=value;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296};
}
function shuffle(items,rng){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
function resolveBartender(value,rng){
  if(value&&typeof value==='object')return value;
  if(typeof value==='number')return DATA.bartenders[value]||DATA.bartenders[0];
  if(typeof value==='string')return DATA.bartenders.find(b=>b.name===value||b.specialty===value)||DATA.bartenders[0];
  return DATA.bartenders[Math.floor(rng()*DATA.bartenders.length)];
}
function starterDeck(){return DATA.starterIds.flatMap(id=>[id,id,id])}
function randomLegalDeck(rng){return shuffle(DATA.drinks.flatMap(card=>[card.id,card.id,card.id]),rng).slice(0,RULES.DECK)}
function expectedCardValue(card,bartender){
  const appeal=DATA.customers.reduce((sum,customer)=>sum+RULES.appeal(card,customer,bartender),0)/DATA.customers.length;
  return appeal*100+card.price;
}
function heuristicDeck(bartender,rng){
  const ranked=DATA.drinks.map(card=>({card,score:expectedCardValue(card,bartender),tie:rng()})).sort((a,b)=>b.score-a.score||b.tie-a.tie);
  return ranked.slice(0,10).flatMap(entry=>[entry.card.id,entry.card.id,entry.card.id]);
}
function buildDeck(type,bartender,rng){
  if(Array.isArray(type)){const check=RULES.validateDeck(type,DATA.drinks);if(!check.ok)throw new Error(check.message);return[...type]}
  if(type==='starter')return starterDeck();
  if(type==='heuristic')return heuristicDeck(bartender,rng);
  if(type==='random'||type===undefined)return randomLegalDeck(rng);
  throw new Error(`Unknown deck type: ${type}`);
}
function instantiateDeck(ids,cycle){return ids.map((id,index)=>({...DATA.drinks.find(card=>card.id===id),instanceId:`${cycle}-${index}-${id}`}))}
function makePlayer(index,bartender,deckIds,rng){
  return{index,initialBartender:bartender,bartender,tips:0,tokens:1,deckIds:[...deckIds],cycle:0,drawPile:shuffle(instantiateDeck(deckIds,0),rng),switches:0};
}
function drawHand(player,rng){
  if(player.drawPile.length<RULES.HAND){player.cycle++;player.drawPile=shuffle(instantiateDeck(player.deckIds,player.cycle),rng)}
  return player.drawPile.splice(0,RULES.HAND);
}
function normalizePair(value,fallback){return Array.isArray(value)?[value[0]??fallback,value[1]??fallback]:[value??fallback,value??fallback]}

function simulateGame(options={}){
  const seed=options.seed??'game-0',rng=createRng(seed),difficulty=normalizePair(options.difficulty,'hard'),deckTypes=normalizePair(options.deckType,'random');
  const bartenderValues=normalizePair(options.bartenders,null);
  const initialBartenders=[resolveBartender(bartenderValues[0],rng),resolveBartender(bartenderValues[1],rng)];
  const decks=[buildDeck(deckTypes[0],initialBartenders[0],rng),buildDeck(deckTypes[1],initialBartenders[1],rng)];
  for(const deck of decks){const check=RULES.validateDeck(deck,DATA.drinks);if(!check.ok)throw new Error(check.message)}
  const players=[makePlayer(0,initialBartenders[0],decks[0],rng),makePlayer(1,initialBartenders[1],decks[1],rng)];
  const metrics={appealTies:0,priceTies:0,cardEvents:[],customerEvents:[],scoreHistory:[[0,0]],roundTips:[0,0]};
  let round=0,winner=null,lastRoundWinner=null;
  const maxRounds=options.maxRounds??200;
  while(winner===null&&round<maxRounds){
    round++;
    for(const player of players){
      if(player.tokens<=0)continue;
      const choice=AI.chooseBartender({current:player.bartender,bartenders:DATA.bartenders,deck:player.drawPile,tokens:player.tokens,tips:player.tips,difficulty:difficulty[player.index],rng});
      if(choice!==player.bartender){player.bartender=choice;player.tokens--;player.switches++}
    }
    const customer=DATA.customers[Math.floor(rng()*DATA.customers.length)];
    const hands=players.map(player=>drawHand(player,rng));
    const selected=players.map((player,index)=>AI.chooseDrinks(hands[index],customer,player.bartender,difficulty[index],rng));
    const served=players.map((player,index)=>RULES.best(selected[index],customer,player.bartender,rng));
    const comparison=RULES.compareServed(served[0],served[1],rng);lastRoundWinner=comparison.winner;
    if(comparison.appealTie)metrics.appealTies++;if(comparison.priceTie)metrics.priceTies++;
    const gains=RULES.roundGains(served,lastRoundWinner);
    players.forEach((player,index)=>{
      const before=player.tips;player.tips+=gains[index];player.tokens+=RULES.earned(before,player.tips);metrics.roundTips[index]+=gains[index];
      for(const card of selected[index])metrics.cardEvents.push({cardId:card.id,player:index,round,selected:true,served:card.instanceId===served[index].drink.instanceId,roundWon:index===lastRoundWinner});
    });
    metrics.customerEvents.push({customer:customer.name,winner:lastRoundWinner,winnerBartender:players[lastRoundWinner].bartender.name,appealTie:comparison.appealTie,priceTie:comparison.priceTie});
    metrics.scoreHistory.push([players[0].tips,players[1].tips]);
    winner=RULES.matchWinner([players[0].tips,players[1].tips],lastRoundWinner);
  }
  if(winner===null)throw new Error(`Simulation exceeded ${maxRounds} rounds.`);
  const comeback=metrics.scoreHistory.some(score=>winner===0?score[1]-score[0]>=10:score[0]-score[1]>=10);
  const maxDeficit=Math.max(0,...metrics.scoreHistory.map(score=>winner===0?score[1]-score[0]:score[0]-score[1]));
  return{
    seed:String(seed),winner,rounds:round,firstPlayerWon:winner===0,comeback,maxDeficit,
    initialBartenders:players.map(player=>player.initialBartender.name),finalBartenders:players.map(player=>player.bartender.name),
    tips:players.map(player=>player.tips),switches:players.map(player=>player.switches),deckTypes,decks,
    appealTies:metrics.appealTies,priceTies:metrics.priceTies,cardEvents:metrics.cardEvents,customerEvents:metrics.customerEvents,scoreHistory:metrics.scoreHistory
  };
}

function percentile(values,fraction){if(!values.length)return 0;const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.floor((sorted.length-1)*fraction))]}
function addStat(map,key,defaults){if(!map[key])map[key]={...defaults};return map[key]}
function aggregateGames(games){
  const summary={games:games.length,player1Wins:0,player2Wins:0,totalRounds:0,totalTips:0,appealTies:0,priceTies:0,comebacks:0,totalSwitches:0,roundDistribution:{},bartenderStats:{},cardStats:{},customerStats:{}};
  const lengths=[];
  for(const game of games){
    game.winner===0?summary.player1Wins++:summary.player2Wins++;summary.totalRounds+=game.rounds;summary.totalTips+=game.tips[0]+game.tips[1];lengths.push(game.rounds);summary.appealTies+=game.appealTies;summary.priceTies+=game.priceTies;if(game.comeback)summary.comebacks++;summary.totalSwitches+=game.switches[0]+game.switches[1];summary.roundDistribution[game.rounds]=(summary.roundDistribution[game.rounds]||0)+1;
    game.initialBartenders.forEach((name,index)=>{const stat=addStat(summary.bartenderStats,name,{games:0,wins:0});stat.games++;if(index===game.winner)stat.wins++});
    for(const event of game.cardEvents){const stat=addStat(summary.cardStats,event.cardId,{selected:0,selectionRoundWins:0,served:0,servedRoundWins:0});stat.selected++;if(event.roundWon)stat.selectionRoundWins++;if(event.served){stat.served++;if(event.roundWon)stat.servedRoundWins++}}
    for(const event of game.customerEvents){const stat=addStat(summary.customerStats,event.customer,{rounds:0,player1Wins:0,player2Wins:0,appealTies:0,priceTies:0,winnerBartenders:{}});stat.rounds++;event.winner===0?stat.player1Wins++:stat.player2Wins++;if(event.appealTie)stat.appealTies++;if(event.priceTie)stat.priceTies++;stat.winnerBartenders[event.winnerBartender]=(stat.winnerBartenders[event.winnerBartender]||0)+1}
  }
  const rounds=summary.totalRounds||1;
  return{
    ...summary,
    firstPlayerWinRate:games.length?summary.player1Wins/games.length:0,
    averageRounds:games.length?summary.totalRounds/games.length:0,
    medianRounds:percentile(lengths,.5),p90Rounds:percentile(lengths,.9),
    appealTieRate:summary.appealTies/rounds,priceTieRate:summary.priceTies/rounds,
    comebackRate:games.length?summary.comebacks/games.length:0,
    averageSwitchesPerGame:games.length?summary.totalSwitches/games.length:0,
    averageTipsPerRound:summary.totalTips/rounds
  };
}
function simulateBatch(options={}){
  const count=options.games??1000,scheduleRng=createRng(`${options.seed??'batch'}:schedule`),games=[];
  for(let i=0;i<count;i++){
    const bartenders=options.bartenders??[Math.floor(scheduleRng()*DATA.bartenders.length),Math.floor(scheduleRng()*DATA.bartenders.length)];
    games.push(simulateGame({...options,bartenders,seed:`${options.seed??'batch'}:${i}`}));
  }
  return{config:{games:count,seed:String(options.seed??'batch'),deckType:options.deckType??'random',difficulty:options.difficulty??'hard'},summary:aggregateGames(games)};
}
function simulateAllBartenderMatchups(options={}){
  const gamesPerMatchup=options.gamesPerMatchup??100,deckType=options.deckType??'heuristic',difficulty=options.difficulty??'hard',allGames=[],matchups=[];
  for(let first=0;first<DATA.bartenders.length;first++)for(let second=0;second<DATA.bartenders.length;second++){
    const games=[];
    for(let game=0;game<gamesPerMatchup;game++)games.push(simulateGame({...options,deckType,difficulty,bartenders:[first,second],seed:`${options.seed??'matchups'}:${first}:${second}:${game}`}));
    allGames.push(...games);matchups.push({first:DATA.bartenders[first].name,second:DATA.bartenders[second].name,summary:aggregateGames(games)});
  }
  return{config:{gamesPerMatchup,matchups:matchups.length,seed:String(options.seed??'matchups'),deckType,difficulty},summary:aggregateGames(allGames),matchups};
}

module.exports={RULES,DATA,createRng,shuffle,starterDeck,randomLegalDeck,heuristicDeck,buildDeck,expectedCardValue,simulateGame,simulateBatch,simulateAllBartenderMatchups,aggregateGames};
