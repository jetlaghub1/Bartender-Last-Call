(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.BLC_RULES=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const WIN=50,DECK=30,MAX=3,HAND=7,CHOOSE=3,THRESHOLDS=[15,30,45];
  function traits(d){return[d.spirit].concat(d.styles||[])}
  function appeal(d,c,b){const t=traits(d);return(t.includes(c.love)?3:0)+(t.includes(c.like)?2:0)+(t.includes(c.dislike)?-2:0)+(t.includes(b.specialty)?1:0)}
  function best(served,c,b,rng=Math.random){return served.map(d=>({drink:d,appeal:appeal(d,c,b)})).sort((a,z)=>z.appeal-a.appeal||z.drink.price-a.drink.price||(rng()-.5))[0]}
  function payout(price,won){return won?Math.round(price*.25+2):Math.round(price*.10)}
  function earned(before,after){return THRESHOLDS.filter(x=>before<x&&after>=x).length}
  function validateDeck(ids,drinks){if(!Array.isArray(ids)||ids.length!==DECK)return{ok:false,message:`Deck must contain exactly ${DECK} cards.`};const valid=new Set(drinks.map(d=>d.id)),counts={};for(const id of ids){if(!valid.has(id))return{ok:false,message:'Deck contains an unknown card.'};counts[id]=(counts[id]||0)+1;if(counts[id]>MAX)return{ok:false,message:'No more than 3 copies of a drink are allowed.'}}return{ok:true,message:'Legal 30-card deck.'}}
  return{WIN,DECK,MAX,HAND,CHOOSE,THRESHOLDS,appeal,best,payout,earned,validateDeck};
});
