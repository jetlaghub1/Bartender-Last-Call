const assert=require('assert');
const fs=require('fs');
const app=fs.readFileSync('js/app.js','utf8');

function between(start,end){
  const from=app.indexOf(start);
  const to=app.indexOf(end,from+start.length);
  assert(from>=0&&to>from,`Missing flow section: ${start}`);
  return app.slice(from,to);
}

const setup=between('function beginSelection()','function chooseScreen()');
const selection=between('function renderChoose(p)','function card(');
const pass=between('function passToSelection(','function confirmReveal()');
const confirmation=between('function confirmReveal()','function resolve()');

assert(setup.includes("state.mode==='pvp')return passToSelection(0)"),'Player 1 must receive a privacy handoff after setup.');
assert(selection.includes('return passToSelection(1)'),'Player 1 lock-in must go to Player 2 handoff.');
assert(!selection.includes('passToSelection(1);switchScreen'),'Drink handoff must not repeat bartender selection.');
assert(pass.includes("$('#ready').onclick=chooseScreen"),'Ready must open only the intended player hand.');
assert(confirmation.includes('Both players are locked in'),'Both lock-ins must be confirmed.');
assert(confirmation.includes('Reveal Drinks'),'Resolution must require an explicit shared reveal.');
assert(confirmation.includes("$('#reveal').onclick=resolve"),'Only the reveal action may resolve local PvP.');
assert(!confirmation.includes('.hand'),'Confirmation screen must not render either hand.');
assert(!confirmation.includes('served.drink'),'Confirmation screen must not render either selected drink.');
console.log('All Prompt 6 local PvP tests passed.');
