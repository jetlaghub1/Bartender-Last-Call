const assert=require('assert');
const fs=require('fs');
const css=fs.readFileSync('css/styles.css','utf8');
const app=fs.readFileSync('js/app.js','utf8');

assert(css.includes('.player-two .card.selected'),'Player 2 needs a distinct selected-card style.');
assert(css.includes(':focus-visible'),'Keyboard focus must remain visible.');
assert(css.includes('prefers-reduced-motion'),'Reduced-motion preferences must be respected.');
assert(css.includes('min-height:44px'),'Controls need mobile-sized touch targets.');
assert(app.includes("'player-one':'player-two'"),'Player identity classes must be assigned during selection.');
assert(app.includes('Choose ${3-p.selected.length} More'),'Lock In must explain its disabled state.');
assert(app.includes('result-row ${i===winner'), 'Round results must highlight the winner.');
console.log('All Prompt 4.1 UI contract tests passed.');
