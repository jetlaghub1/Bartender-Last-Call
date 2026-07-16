const assert=require('assert');
const fs=require('fs');
const path=require('path');
const R=require('../js/rules.js');
const AI=require('../js/ai.js');

const customer={love:'Whiskey',like:'Premium',dislike:'Beer'};
const whiskeyBartender={name:'Theo',specialty:'Whiskey'};
const hand=[
  {id:'best',instanceId:'best-1',spirit:'Whiskey',styles:['Premium'],price:20},
  {id:'good',instanceId:'good-1',spirit:'Whiskey',styles:['Sweet'],price:12},
  {id:'tie',instanceId:'tie-1',spirit:'Gin',styles:['Premium'],price:18},
  {id:'bad',instanceId:'bad-1',spirit:'Beer',styles:['Cheap'],price:24},
  {id:'plain',instanceId:'plain-1',spirit:'Rum',styles:['Fresh'],price:10}
];

const normal=AI.chooseDrinks(hand,customer,whiskeyBartender,'normal',()=>0.5);
const hard=AI.chooseDrinks(hand,customer,whiskeyBartender,'hard',()=>0.5);
assert.equal(normal.length,3);
assert.equal(hard.length,3);
assert.equal(R.best(normal,customer,whiskeyBartender,()=>0.5).drink.id,'best');
assert.equal(R.best(hard,customer,whiskeyBartender,()=>0.5).drink.id,'best');

const easy=AI.chooseDrinks(hand,customer,whiskeyBartender,'easy',()=>0.4);
assert.equal(easy.length,3);
assert.equal(new Set(easy.map(card=>card.instanceId)).size,3);

const beerBartender={name:'Ace',specialty:'Beer'};
const bartenders=[beerBartender,whiskeyBartender];
const whiskeyDeck=Array.from({length:8},(_,i)=>({spirit:'Whiskey',styles:['Strong'],price:12+i}));
assert.equal(AI.chooseBartender({current:beerBartender,bartenders,deck:whiskeyDeck,tokens:1,tips:0,difficulty:'normal',rng:()=>0.5}),whiskeyBartender);
assert.equal(AI.chooseBartender({current:beerBartender,bartenders,deck:whiskeyDeck,tokens:0,tips:0,difficulty:'hard',rng:()=>0.5}),beerBartender);
const marginalDeck=[
  {spirit:'Beer',styles:['Clean'],price:0},
  {spirit:'Whiskey',styles:['Strong'],price:15},
  {spirit:'Whiskey',styles:['Sweet'],price:15}
];
assert.equal(AI.chooseBartender({current:beerBartender,bartenders,deck:marginalDeck,tokens:1,tips:0,difficulty:'hard',rng:()=>0.5}),beerBartender);
assert.equal(AI.chooseBartender({current:beerBartender,bartenders,deck:marginalDeck,tokens:1,tips:14,difficulty:'hard',rng:()=>0.5}),whiskeyBartender);
assert.equal(AI.distanceToNextToken(14),1);
assert.equal(AI.distanceToNextToken(30),15);

const source=fs.readFileSync(path.join(__dirname,'../js/ai.js'),'utf8');
assert(!source.includes('opponent'),'AI engine must not accept or inspect opponent state.');
assert(!source.includes('state.players'),'AI engine must not inspect match player state.');
console.log('All Prompt 5 AI tests passed.');
