'use strict';

const assert=require('assert');
const fs=require('fs');
const path=require('path');
const CONVERGENCE=require('../simulation/convergence.js');

const report=JSON.parse(fs.readFileSync(path.join(__dirname,'../reports/prompt13/final_report.json'),'utf8'));
const summary=report.summary,review=CONVERGENCE.targetReview(report);

assert.equal(summary.games,100000);
assert.equal(report.strata.random.games,50000);
assert.equal(report.strata.heuristic.games,50000);
assert.equal(summary.player1Wins+summary.player2Wins,100000);
assert.equal(report.matchups.length,98);
assert(report.matchups.every(row=>row.summary.games===1020||row.summary.games===1021));
assert(review.targets.every(row=>row.status==='PASS'),review.targets.filter(row=>row.status!=='PASS').map(row=>row.evidence).join('\n'));
assert(Object.values(summary.bartenderStats).every(stat=>stat.wins/stat.games>=.48&&stat.wins/stat.games<=.52));
assert(Math.abs(summary.firstPlayerWinRate-.5)<.02);
assert(CONVERGENCE.targetRoundShare(summary)>.5);
assert.equal(summary.totalTokensEarned,summary.totalSwitches+summary.totalTokensRemaining);

console.log('All Prompt 13 final-balance tests passed.');
