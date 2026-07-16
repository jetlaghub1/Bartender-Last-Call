const assert=require('assert');
const STORAGE=require('../js/storage.js');

const legal=Array.from({length:10},(_,index)=>[`d${index+1}`,`d${index+1}`,`d${index+1}`]).flat();
const alternate=[...legal];alternate.splice(0,1);alternate.push('d11');
const validate=ids=>Array.isArray(ids)&&ids.length===30&&Math.max(...Object.values(ids.reduce((counts,id)=>{counts[id]=(counts[id]||0)+1;return counts},{})))<=3;
const fallback=()=>[...legal];
function fakeStorage(){
  const values=new Map();
  return{getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,String(value))};
}

const persistent=fakeStorage();
const first=STORAGE.create({storage:persistent,validate,fallback});
const saved=first.save(alternate);
assert(saved.ok&&saved.persistent,'A legal deck must be saved and verified.');
assert(saved.message.includes('Deck saved'),'Successful saves need explicit feedback.');
const second=STORAGE.create({storage:persistent,validate,fallback});
assert.deepEqual(second.load().ids,alternate,'A saved deck must survive a fresh store instance.');
assert.equal(second.load().source,'persistent');

const blocked={getItem:()=>null,setItem:()=>{throw new Error('blocked')}};
const session=STORAGE.create({storage:blocked,validate,fallback});
const sessionResult=session.save(alternate);
assert(sessionResult.ok&&!sessionResult.persistent,'Blocked storage must keep a legal session deck without claiming persistence.');
assert(sessionResult.message.includes('this session'),'Blocked storage needs honest visible feedback.');
assert.deepEqual(session.load().ids,alternate,'The session fallback must retain the deck.');
assert.equal(session.load().source,'session');

const invalid=first.save(legal.slice(1));
assert(!invalid.ok&&!invalid.persistent,'An illegal deck must never be saved.');
assert(invalid.message.includes('not saved'),'Illegal saves need an actionable explanation.');

const corrupt={getItem:()=>'{bad json',setItem:()=>{}};
const recovery=STORAGE.create({storage:corrupt,validate,fallback});
assert.deepEqual(recovery.load().ids,legal,'Corrupt saved data must recover to the legal starter deck.');
const defensive=recovery.load().ids;defensive.pop();
assert.equal(recovery.load().ids.length,30,'Loaded decks must be defensive copies.');

console.log('All deck-storage persistence and failure-feedback tests passed.');

