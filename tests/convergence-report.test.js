'use strict';

const assert=require('assert');
const fs=require('fs');
const path=require('path');
const BASELINE=require('../simulation/baseline.js');
const CONVERGENCE=require('../simulation/convergence.js');

const before=JSON.parse(fs.readFileSync(path.join(__dirname,'../reports/prompt12/after_report.json'),'utf8'));
const final=BASELINE.runBaseline({games:98,randomGames:49,seed:'convergence-report-test',study:'Prompt 13 test'});
const artifacts=CONVERGENCE.buildArtifacts(before,final);
for(const name of ['CONVERGENCE_REPORT.md','prompt12_report.json','final_report.json','target_status.csv','system_before_after.csv','bartender_before_after.csv','card_target_review.csv','customer_target_review.csv','drink_price_change.csv','final_summary.csv'])assert(artifacts[name]&&artifacts[name].length>20,`Missing convergence artifact: ${name}`);
assert.equal(artifacts['drink_price_change.csv'].trim().split('\n').length,2);
assert.equal(CONVERGENCE.PATCH.changes.length,1);

console.log('All Prompt 13 convergence-report tests passed.');
