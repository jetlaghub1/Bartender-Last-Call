'use strict';

module.exports={
  version:'0.5.11-prompt12',
  category:'Drink prices only',
  sourceStudy:'Prompt 11 — 100,000 seeded games',
  changes:[
    {id:'d4',name:'Spiced Saison',spirit:'Beer',before:14,after:20,reason:'Raise Ace from the weak Beer starting-bartender result using the most-selected Beer specialist card.'},
    {id:'d8',name:'Market Mule',spirit:'Vodka',before:14,after:20,reason:'Raise Mara from the weakest starting-bartender result using the most-selected Vodka specialist card.'},
    {id:'d16',name:'Smoked Manhattan',spirit:'Whiskey',before:22,after:20,reason:'Reduce Theo using the high-price Whiskey anchor without changing Whiskey traits or Appeal.'},
    {id:'d29',name:'Pepper Negroni',spirit:'Gin',before:18,after:16,reason:'Reduce Nico with a one-payout-step change to a frequently selected Gin card.'},
    {id:'d36',name:'Platinum Añejo',spirit:'Tequila',before:22,after:21,reason:'Reduce Sol by one winner-payout step while preserving this card as the premium Tequila tiebreaker.'},
    {id:'d37',name:'Velvet Merlot',spirit:'Wine',before:16,after:12,reason:'Reduce Rae using the high-selection, high-served-win Wine card identified by the baseline.'}
  ],
  unchanged:['Drink traits','Customer preferences','Bartender specialties and passives','Appeal values','Tip formula','Switch-token rules','Deck rules','Victory target']
};
