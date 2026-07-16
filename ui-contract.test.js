'use strict';

const assert=require('assert');
const fs=require('fs');
const path=require('path');
const DATA=require('../js/data.js');
const BASELINE=require('../simulation/baseline.js');
const COMPARISON=require('../simulation/comparison.js');

for(const change of COMPARISON.PATCH.changes)assert.equal(DATA.drinks.find(card=>card.id===change.id).price,change.after);
assert.equal(COMPARISON.PATCH.category,'Drink prices only');
assert.equal(COMPARISON.PATCH.changes.length,6);

const before=JSON.parse(fs.readFileSync(path.join(__dirname,'../reports/prompt11/baseline_report.json'),'utf8'));
const after=BASELINE.runBaseline({games:98,randomGames:49,seed:'comparison-test',study:'Prompt 12 test'});
const artifacts=COMPARISON.buildArtifacts(before,after);
for(const name of ['BALANCE_PATCH_REPORT.md','before_report.json','after_report.json','before_after_summary.csv','bartender_before_after.csv','drink_price_changes.csv','after_drink_performance.csv'])assert(artifacts[name]&&artifacts[name].length>20,`Missing comparison artifact: ${name}`);
assert.equal(artifacts['drink_price_changes.csv'].trim().split('\n').length,7);
assert(artifacts['BALANCE_PATCH_REPORT.md'].includes('drink prices only'));

console.log('All Prompt 12 comparison tests passed.');
