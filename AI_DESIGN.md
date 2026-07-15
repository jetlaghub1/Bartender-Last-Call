const assert=require('assert');
const fs=require('fs');
const path=require('path');
const css=fs.readFileSync(path.join(__dirname,'../css/styles.css'),'utf8');
const app=fs.readFileSync(path.join(__dirname,'../js/app.js'),'utf8');

assert(css.includes('.player-two .card.selected'),'Player 2 needs a distinct selected-card style.');
assert(css.includes(':focus-visible'),'Keyboard focus must remain visible.');
assert(css.includes('prefers-reduced-motion'),'Reduced-motion preferences must be respected.');
assert(css.includes('min-height:44px'),'Controls need mobile-sized touch targets.');
assert(app.includes("'player-one':'player-two'"),'Player identity classes must be assigned during selection.');
assert(app.includes('Choose ${3-p.selected.length} More'),'Lock In must explain its disabled state.');
assert(app.includes('result-row ${i===winner'), 'Round results must highlight the winner.');
assert(css.includes('.price{position:static;margin-top:auto'), 'Card prices must remain below variable-length text.');
assert(app.includes('function instantiate(ids)'), 'Each physical drink copy must receive a unique identity.');
assert(app.includes('data-instance="${d.instanceId}"'), 'Rendered cards must expose their unique instance identity.');
assert(app.includes('if(p.tokens<=0){finishSwitch();return}'), 'Bartender selection must skip players without a switch token.');
assert(app.includes("state.mode==='pvp'&&state.players[1].tokens>0"), 'PvP pass screen must require a Player 2 switch token.');
console.log('All Prompt 4.1 UI contract tests passed.');
