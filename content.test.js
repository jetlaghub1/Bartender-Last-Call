'use strict';

const fs=require('fs');
const path=require('path');
const BASELINE=require('./baseline.js');
const REPORTING=require('./reporting.js');

const args=process.argv.slice(2);
function value(flag,fallback){const index=args.indexOf(flag);return index>=0&&args[index+1]!==undefined?args[index+1]:fallback}
const games=Number(value('--games','100000')),randomGames=Number(value('--random-games',String(Math.floor(games/2)))),seed=value('--seed','bartender-last-call-prompt11-v0.5.9'),output=path.resolve(value('--output',path.join(__dirname,'../reports/prompt11')));
const report=BASELINE.runBaseline({games,randomGames,seed,difficulty:'hard',onProgress:({completed})=>{if(completed%10000===0)console.error(`Completed ${completed}/${games} games`)}});
const artifacts=REPORTING.buildArtifacts(report);
fs.mkdirSync(output,{recursive:true});
for(const [name,content] of Object.entries(artifacts))fs.writeFileSync(path.join(output,name),content,'utf8');
console.log(`Wrote ${Object.keys(artifacts).length} Prompt 11 reports to ${output}`);
