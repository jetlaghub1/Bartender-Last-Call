const assert=require('assert');
const CONTENT=require('../js/content.js');
const DATA=require('../js/data.js');

const report=CONTENT.audit(DATA);
assert(report.ok,report.errors.join('\n'));
assert.equal(report.errors.length,0);
assert.equal(report.summary.schemaVersion,'0.5.7');
assert.equal(report.summary.drinks,42);
assert.equal(report.summary.customers,28);
assert.equal(report.summary.bartenders,7);
assert.equal(Object.keys(report.summary.drinkSpiritCounts).length,7);
assert(Object.values(report.summary.drinkSpiritCounts).every(count=>count===6));

for(const drink of DATA.drinks){
  assert(DATA.spirits.includes(drink.spirit));
  assert(drink.styles.length>=1&&drink.styles.length<=2);
  assert.equal(new Set(drink.styles).size,drink.styles.length);
  assert(!drink.styles.includes('Premium')||!drink.styles.includes('Cheap'));
  assert(Number.isFinite(drink.price)&&drink.price>0);
}
for(const customer of DATA.customers){
  assert.equal(new Set([customer.love,customer.like,customer.dislike]).size,3);
}
for(const bartender of DATA.bartenders){
  assert.equal(bartender.passive,`${bartender.specialty} drinks gain +1 Appeal.`);
}

const badDrink=JSON.parse(JSON.stringify(DATA));
badDrink.drinks[0].styles=['Premium','Cheap'];
assert(!CONTENT.audit(badDrink).ok,'Contradictory drink traits must fail.');
const badCustomer=JSON.parse(JSON.stringify(DATA));
badCustomer.customers[0].dislike=badCustomer.customers[0].love;
assert(!CONTENT.audit(badCustomer).ok,'Repeated customer preferences must fail.');
const badBartender=JSON.parse(JSON.stringify(DATA));
badBartender.bartenders[0].passive='Activated ability';
assert(!CONTENT.audit(badBartender).ok,'Nonstandard bartender passives must fail.');
console.log('All Prompt 8 content tests passed.');
