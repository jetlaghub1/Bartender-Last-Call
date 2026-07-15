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
  function practiceScenario(){
    const customer={name:'The Night Owl',love:'Whiskey',like:'Premium',dislike:'Beer'};
    const bartender={name:'Theo',specialty:'Whiskey'};
    const drinks=[
      {id:'old',name:'Old Fashioned',spirit:'Whiskey',styles:['Premium'],price:20},
      {id:'sour',name:'Whiskey Sour',spirit:'Whiskey',styles:['Sour'],price:16},
      {id:'cellar',name:'Cellar Select',spirit:'Wine',styles:['Premium'],price:18},
      {id:'gimlet',name:'Garden Gimlet',spirit:'Gin',styles:['Fresh'],price:14},
      {id:'lager',name:'Golden Lager',spirit:'Beer',styles:['Cheap'],price:10}
    ].map(drink=>({...drink,appeal:R.appeal(drink,customer,bartender)}));
    return{customer,bartender,drinks};
  }
  function switchScenario(){
    return{
      current:{id:'theo',name:'Theo',specialty:'Whiskey'},
      options:[
        {id:'ace',name:'Ace',specialty:'Beer',passive:'Beer drinks gain +1 Appeal.'},
        {id:'june',name:'June',specialty:'Rum',passive:'Rum drinks gain +1 Appeal.'},
        {id:'sol',name:'Sol',specialty:'Tequila',passive:'Tequila drinks gain +1 Appeal.'}
      ]
    };
  }
  function exactThree(count){return count===R.CHOOSE}
  function legalDeckCount(count){return count===R.DECK}
  function canAddCopy(existingCopies,deckCount){return existingCopies<R.MAX&&deckCount<R.DECK}
  function winnerTip(price){return R.payout(price,true)}
  return{STEPS,scoringExample,practiceScenario,switchScenario,exactThree,legalDeckCount,canAddCopy,winnerTip,winTarget:R.WIN,maxCopies:R.MAX};
});
