'use strict';

const assert=require('assert');
const DATA=require('../js/data.js');
const RULES=require('../js/rules.js');

const expected={d4:20,d8:20,d16:20,d29:16,d36:21,d37:12};
for(const [id,price] of Object.entries(expected)){
  const card=DATA.drinks.find(drink=>drink.id===id);
  assert(card,`Missing patched card ${id}.`);
  assert.equal(card.price,price,`${card.name} price must match the Prompt 12 patch.`);
}

assert.equal(DATA.schemaVersion,'0.5.12');
assert.equal(DATA.drinks.length,42);
assert.equal(DATA.customers.length,28);
assert.equal(DATA.bartenders.length,7);
assert(DATA.bartenders.every(bartender=>bartender.passive===`${bartender.specialty} drinks gain +1 Appeal.`));
assert.equal(RULES.appeal({spirit:'Whiskey',styles:['Premium','Sweet']},{love:'Whiskey',like:'Premium',dislike:'Sweet'},{specialty:'Whiskey'}),4);
assert.equal(RULES.WIN,50);
assert.deepEqual(RULES.THRESHOLDS,[15,30,45]);
assert.equal(RULES.payout(20,true),7);
assert.equal(RULES.payout(20,false),2);

console.log('All Prompt 12 balance-patch tests passed.');
