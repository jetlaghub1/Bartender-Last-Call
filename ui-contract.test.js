const assert=require('assert');
const DATA=require('../js/data.js');
const RULES=require('../js/rules.js');
const CONTENT=require('../js/content.js');

const report=CONTENT.audit(DATA);
assert(report.ok,report.errors.join('\n'));
assert.equal(DATA.drinks.length,42);
assert.equal(DATA.customers.length,28);
assert.equal(DATA.bartenders.length,7);

assert.deepEqual(DATA.drinks.map(card=>card.id),Array.from({length:42},(_,i)=>`d${i+1}`),'Saved-deck IDs must remain stable.');
assert(DATA.drinks.every(card=>!/\s\d+$/.test(card.name)),'Drink names must not be numbered variants.');
assert(DATA.customers.every(customer=>!/\s\d+$/.test(customer.name)),'Customer names must not be numbered variants.');

const spiritCounts=CONTENT.countBy(DATA.drinks,'spirit');
assert(DATA.spirits.every(spirit=>spiritCounts[spirit]===6),'Each Spirit needs six drinks.');
const focused=DATA.drinks.filter(card=>card.styles.length===1);
assert.equal(focused.length,7,'The set needs seven focused one-Style cards.');
const focusedSpirits=CONTENT.countBy(focused,'spirit');
assert(DATA.spirits.every(spirit=>focusedSpirits[spirit]===1),'Each Spirit needs one focused card.');

const styleCounts=Object.values(report.summary.drinkStyleCounts);
assert(Math.min(...styleCounts)>=4,'Every Style needs at least four drinks.');
assert(Math.max(...styleCounts)<=8,'No Style should dominate more than eight drinks.');

const customerProfiles=DATA.customers.map(c=>`${c.love}|${c.like}|${c.dislike}`);
assert.equal(new Set(customerProfiles).size,DATA.customers.length,'Every customer needs a unique preference profile.');

assert.equal(DATA.starterIds.length,10);
assert.equal(new Set(DATA.starterIds).size,10);
const starterCards=DATA.starterIds.map(id=>DATA.drinks.find(card=>card.id===id));
assert(starterCards.every(Boolean),'Every starter ID must exist.');
assert.equal(new Set(starterCards.map(card=>card.spirit)).size,7,'Starter pool must cover every Spirit.');
assert(RULES.validateDeck(DATA.starterIds.flatMap(id=>[id,id,id]),DATA.drinks).ok,'Starter deck must be legal.');
console.log('All Prompt 9 content-quality tests passed.');
