'use strict';

const assert=require('assert');
const fs=require('fs');
const path=require('path');
const SIM=require('../simulation/simulator.js');
const R=require('../js/rules.js');

const sequence=seed=>{const rng=SIM.createRng(seed);return Array.from({length:8},()=>rng())};
assert.deepEqual(sequence('same-seed'),sequence('same-seed'),'Equal seeds must produce equal random sequences.');
assert.notDeepEqual(sequence('same-seed'),sequence('different-seed'),'Different seeds should produce different sequences.');

for(const deck of [SIM.starterDeck(),SIM.randomLegalDeck(SIM.createRng('random-deck')),SIM.heuristicDeck(SIM.DATA.bartenders[0],SIM.createRng('heuristic-deck'))]){
  assert.equal(deck.length,R.DECK);
  assert(R.validateDeck(deck,SIM.DATA.drinks).ok);
}

const options={seed:'deterministic-game',deckType:['starter','heuristic'],difficulty:['normal','hard'],bartenders:['Ace','Mara']};
const first=SIM.simulateGame(options),second=SIM.simulateGame(options);
assert.deepEqual(first,second,'A complete game must replay exactly from the same seed and configuration.');
assert(first.rounds>0&&first.rounds<200);
assert.equal(first.customerEvents.length,first.rounds);
assert.equal(first.scoreHistory.length,first.rounds+1);
assert.equal(first.cardEvents.length,first.rounds*R.CHOOSE*2);
assert.equal(first.cardDrawEvents.length,first.rounds*R.HAND*2);
assert.equal(first.tokensEarned.length,2);
assert.equal(first.tokensRemaining.length,2);
assert.equal(first.switchOpportunities.length,2);
assert([0,1].includes(first.winner));

const batch=SIM.simulateBatch({games:12,seed:'batch-test',deckType:'random',difficulty:'hard'});
assert.equal(batch.summary.games,12);
assert.equal(batch.summary.player1Wins+batch.summary.player2Wins,12);
assert(batch.summary.averageRounds>0);
assert(batch.summary.averageTipsPerRound>0);
assert(batch.summary.switchDecisionRate>=0&&batch.summary.switchDecisionRate<=1);
assert(batch.summary.tokenSpendRate>=0&&batch.summary.tokenSpendRate<=1);
assert(Object.keys(batch.summary.cardStats).length>0);
assert(Object.keys(batch.summary.customerStats).length>0);

const matchups=SIM.simulateAllBartenderMatchups({gamesPerMatchup:1,seed:'matchup-test'});
const expected=SIM.DATA.bartenders.length*SIM.DATA.bartenders.length;
assert.equal(matchups.matchups.length,expected);
assert.equal(matchups.summary.games,expected);
assert.equal(matchups.config.deckType,'heuristic');

const appSource=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');
const simulatorSource=fs.readFileSync(path.join(__dirname,'../simulation/simulator.js'),'utf8');
for(const sharedCall of ['compareServed','roundGains','matchWinner']){
  assert(appSource.includes(`R.${sharedCall}`),`Browser game must use shared ${sharedCall}.`);
  assert(simulatorSource.includes(`RULES.${sharedCall}`),`Simulator must use shared ${sharedCall}.`);
}
assert(appSource.includes('p.deck=shuffle(instantiate(p.deckIds))'),'Browser refills must preserve each player\'s own deck, matching the simulator.');
assert.strictEqual(SIM.RULES,R,'Simulator and tests must import the same rules module.');

console.log('All deterministic simulation tests passed.');
