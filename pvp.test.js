(function(root,factory){
  const rules=typeof module==='object'&&module.exports?require('./rules.js'):root.BLC_RULES;
  const api=factory(rules);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.BLC_TUTORIAL=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(R){
  const STEPS=[
    {id:'customer',title:'Read the Customer'},
    {id:'appeal',title:'Calculate Appeal'},
    {id:'selection',title:'Choose Three Drinks'},
    {id:'service',title:'Serve the Best Match'},
    {id:'tips',title:'Earn Tips'},
    {id:'switch',title:'Switch Bartenders'},
    {id:'deck',title:'Build a Legal Deck'},
    {id:'victory',title:'Reach Last Call'}
  ];
  function scoringExample(){
    const drink={spirit:'Whiskey',styles:['Premium','Strong'],price:20};
    const customer={love:'Whiskey',like:'Premium',dislike:'Sweet'};
    const bartender={specialty:'Whiskey'};
    return{drink,customer,bartender,appeal:R.appeal(drink,customer,bartender)};
  }
  function exactThree(count){return count===R.CHOOSE}
  function legalDeckCount(count){return count===R.DECK}
  function winnerTip(price){return R.payout(price,true)}
  return{STEPS,scoringExample,exactThree,legalDeckCount,winnerTip,winTarget:R.WIN,maxCopies:R.MAX};
});
