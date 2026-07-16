const assert=require('assert'),R=require('../js/rules.js');
const d={id:'x',spirit:'Whiskey',styles:['Premium','Strong'],price:20},c={love:'Whiskey',like:'Premium',dislike:'Sweet'},b={specialty:'Whiskey'};
assert.equal(R.appeal(d,c,b),6);assert.equal(R.payout(20,true),7);assert.equal(R.payout(20,false),2);assert.equal(R.earned(14,31),2);
const first={drink:{price:20},appeal:5},second={drink:{price:18},appeal:5};assert.deepEqual(R.compareServed(first,second,()=>0.9),{winner:0,appealTie:true,priceTie:false});assert.deepEqual(R.roundGains([first,second],0),[7,2]);assert.equal(R.matchWinner([50,49],0),0);assert.equal(R.matchWinner([50,50],1),1);
const drinks=Array.from({length:10},(_,i)=>({id:String(i)})),deck=drinks.flatMap(x=>[x.id,x.id,x.id]);assert(R.validateDeck(deck,drinks).ok);assert(!R.validateDeck(deck.slice(1),drinks).ok);assert(!R.validateDeck(['0','0','0','0',...deck.slice(4)],drinks).ok);console.log('All rules tests passed.');
