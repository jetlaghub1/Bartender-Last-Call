'use strict';

const assert=require('assert');
const BASELINE=require('../simulation/baseline.js');
const REPORTING=require('../simulation/reporting.js');

for(let index=0;index<49;index++)assert.deepEqual(BASELINE.matchupFor(index),[Math.floor(index/7),index%7]);
assert.deepEqual(BASELINE.matchupFor(49),[0,0]);

const first=BASELINE.runBaseline({games:98,randomGames:49,seed:'baseline-test'});
const second=BASELINE.runBaseline({games:98,randomGames:49,seed:'baseline-test'});
assert.deepEqual(first,second,'Baseline reports must replay exactly from the same seed.');
assert.equal(first.summary.games,98);
assert.equal(first.strata.random.games,49);
assert.equal(first.strata.heuristic.games,49);
assert.equal(first.matchups.length,98);
assert(first.matchups.every(row=>row.summary.games===1));

const artifacts=REPORTING.buildArtifacts(first);
for(const name of ['baseline_report.json','BASELINE_BALANCE_REPORT.md','summary.csv','bartender_win_rates.csv','drink_performance.csv','customer_outcomes.csv','bartender_matchups.csv','game_length_distribution.csv','switch_usage.csv'])assert(artifacts[name]&&artifacts[name].length>20,`Missing report artifact: ${name}`);
assert(artifacts['BASELINE_BALANCE_REPORT.md'].includes('No card, bartender, customer, payout, or rules values were changed.'));
assert.equal(artifacts['bartender_win_rates.csv'].trim().split('\n').length,1+7*3);
assert.equal(artifacts['drink_performance.csv'].trim().split('\n').length,1+42*3);
assert.equal(artifacts['customer_outcomes.csv'].trim().split('\n').length,1+28*3);

console.log('All Prompt 11 baseline tests passed.');
