'use strict';

const SIM=require('./simulator.js');
const args=process.argv.slice(2);
function value(flag,fallback){const index=args.indexOf(flag);return index>=0&&args[index+1]!==undefined?args[index+1]:fallback}
const matchups=args.includes('--matchups');
const common={seed:value('--seed','bartender-v0.5.9'),deckType:value('--deck',matchups?'heuristic':'random'),difficulty:value('--difficulty','hard')};
const report=matchups
  ?SIM.simulateAllBartenderMatchups({...common,gamesPerMatchup:Number(value('--games-per-matchup','100'))})
  :SIM.simulateBatch({...common,games:Number(value('--games','1000'))});
console.log(JSON.stringify(report,null,2));
