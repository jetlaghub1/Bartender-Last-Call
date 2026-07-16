'use strict';

const assert=require('assert');
const DATA=require('../js/data.js');
const PATCH=require('../balance/patch-v0.5.12.js');

assert.equal(PATCH.category,'Drink price only');
assert.equal(PATCH.changes.length,1);
const change=PATCH.changes[0],card=DATA.drinks.find(drink=>drink.id===change.id);
assert(card);
assert.equal(change.id,'d40');
assert.equal(change.before,20);
assert.equal(change.after,16);
assert.equal(card.price,16);
assert.equal(DATA.schemaVersion,'0.5.12');
assert.equal(DATA.drinks.length,42);
assert.equal(DATA.customers.length,28);
assert.equal(DATA.bartenders.length,7);

console.log('All Prompt 13 convergence-patch tests passed.');
