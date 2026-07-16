(function(root,factory){
  const rules=typeof module==='object'&&module.exports?require('./rules.js'):root.BLC_RULES;
  const api=factory(rules);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.BLC_AI=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(R){
  const DIFFICULTIES={
    easy:{name:'Easy',description:'Relaxed play with occasional mistakes.'},
    normal:{name:'Normal',description:'Reads customers and uses price tiebreakers.'},
    hard:{name:'Hard',description:'Optimizes every legal choice and plans switch tokens.'}
  };

  function normalizedDifficulty(value){return DIFFICULTIES[value]?value:'normal'}
  function randomIndex(length,rng){return Math.max(0,Math.min(length-1,Math.floor(rng()*length)))}
  function shuffled(items,rng){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=randomIndex(i+1,rng);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
  function drinkValue(drink,customer,bartender){return R.appeal(drink,customer,bartender)*100+drink.price}

  function chooseDrinks(hand,customer,bartender,difficulty='normal',rng=Math.random){
    const level=normalizedDifficulty(difficulty);
    if(!Array.isArray(hand)||hand.length<R.CHOOSE)throw new Error('AI requires at least three cards.');
    if(level==='easy')return shuffled(hand,rng).slice(0,R.CHOOSE);
    const ranked=[...hand].sort((a,b)=>drinkValue(b,customer,bartender)-drinkValue(a,customer,bartender));
    if(level==='normal'&&hand.length>R.CHOOSE&&rng()<0.18){
      const mistake=R.CHOOSE-1;
      [ranked[mistake],ranked[R.CHOOSE]]=[ranked[R.CHOOSE],ranked[mistake]];
    }
    return ranked.slice(0,R.CHOOSE);
  }

  function specialtySupport(deck,specialty){
    if(!Array.isArray(deck)||!deck.length)return 0;
    return deck.reduce((sum,drink)=>sum+([drink.spirit].concat(drink.styles||[]).includes(specialty)?1+drink.price/100:0),0);
  }
  function distanceToNextToken(tips){const next=R.THRESHOLDS.find(value=>value>tips);return next===undefined?Infinity:next-tips}

  function chooseBartender({current,bartenders,deck,tokens,tips,difficulty='normal',rng=Math.random}){
    const level=normalizedDifficulty(difficulty);
    if(!current||!Array.isArray(bartenders)||!bartenders.length||tokens<=0)return current;
    if(level==='easy'){
      if(rng()>=0.14)return current;
      const alternatives=bartenders.filter(b=>b!==current);
      return alternatives[randomIndex(alternatives.length,rng)]||current;
    }
    const ranked=bartenders.map(b=>({bartender:b,support:specialtySupport(deck,b.specialty)})).sort((a,b)=>b.support-a.support);
    const best=ranked[0],currentSupport=specialtySupport(deck,current.specialty),gain=best.support-currentSupport;
    if(!best||best.bartender===current)return current;
    if(level==='normal')return gain>=1.5?best.bartender:current;
    const nearToken=distanceToNextToken(tips)<=5;
    const requiredGain=tokens>1?0.7:(nearToken?1.2:2.2);
    return gain>=requiredGain?best.bartender:current;
  }

  return{DIFFICULTIES,chooseDrinks,chooseBartender,drinkValue,specialtySupport,distanceToNextToken};
});
