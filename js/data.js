(function(root,factory){
  const validator=typeof module==='object'&&module.exports?require('./content.js'):root.BLC_CONTENT;
  const data=factory();
  const report=validator.audit(data);
  if(!report.ok)throw new Error(`Content validation failed: ${report.errors.join(' | ')}`);
  data.audit=report;
  if(typeof module==='object'&&module.exports)module.exports=data;
  root.BLC_DATA=data;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const spirits=['Beer','Vodka','Whiskey','Rum','Gin','Tequila','Wine'];
  const styles=['Premium','Cheap','Strong','Sweet','Bitter','Fruity','Fresh','Sour','Creamy','Clean','Savory','Spicy'];
  const drink=(id,name,spirit,styles,price)=>({id,name,spirit,styles,price});
  const drinks=[
    drink('d1','Golden Lager','Beer',['Cheap'],8),
    drink('d2','Citrus Shandy','Beer',['Cheap','Fruity'],10),
    drink('d3','Midnight Stout','Beer',['Bitter','Strong'],14),
    drink('d4','Spiced Saison','Beer',['Spicy','Fresh'],20),
    drink('d5','Velvet Porter','Beer',['Creamy','Bitter'],16),
    drink('d6','Cellar Reserve Ale','Beer',['Premium','Savory'],20),
    drink('d7','Clean Cut Martini','Vodka',['Clean'],16),
    drink('d8','Market Mule','Vodka',['Fresh','Spicy'],20),
    drink('d9','Neon Cosmo','Vodka',['Fruity','Sour'],14),
    drink('d10','Vanilla White Russian','Vodka',['Creamy','Sweet'],16),
    drink('d11','Pepper Lemon Drop','Vodka',['Cheap','Sour'],12),
    drink('d12','Diamond Vodka Tonic','Vodka',['Premium','Clean'],20),
    drink('d13','Old Fashioned','Whiskey',['Bitter','Strong'],18),
    drink('d14','Whiskey Sour','Whiskey',['Sour','Fresh'],16),
    drink('d15','Honey Highball','Whiskey',['Sweet','Clean'],14),
    drink('d16','Smoked Manhattan','Whiskey',['Premium','Bitter'],20),
    drink('d17','Straight Rye','Whiskey',['Strong'],18),
    drink('d18','Bourbon Flip','Whiskey',['Creamy','Sweet'],18),
    drink('d19','Midnight Mojito','Rum',['Fresh','Sweet'],14),
    drink('d20','Spiced Daiquiri','Rum',['Sour','Spicy'],14),
    drink('d21','Tropical Fizz','Rum',['Fruity'],12),
    drink('d22','Blackstrap Old Fashioned','Rum',['Bitter','Strong'],18),
    drink('d23','Coconut Cream Punch','Rum',['Creamy','Sweet'],16),
    drink('d24',"Admiral's Reserve",'Rum',['Premium','Savory'],22),
    drink('d25','Garden Gimlet','Gin',['Fresh','Sour'],14),
    drink('d26','Bitter Bloom','Gin',['Bitter','Fresh'],16),
    drink('d27','Bramble Night','Gin',['Fruity','Sweet'],16),
    drink('d28','Savory Gibson','Gin',['Savory'],18),
    drink('d29','Pepper Negroni','Gin',['Bitter','Spicy'],16),
    drink('d30','Crystal Gin Fizz','Gin',['Premium','Clean'],20),
    drink('d31','Sunset Paloma','Tequila',['Fruity','Sour'],14),
    drink('d32','Desert Margarita','Tequila',['Sour','Strong'],16),
    drink('d33','Spiced Ranch Water','Tequila',['Spicy','Clean'],14),
    drink('d34','Agave Cream Flip','Tequila',['Creamy','Sweet'],16),
    drink('d35','Bitter Cactus','Tequila',['Bitter','Fresh'],16),
    drink('d36','Platinum Añejo','Tequila',['Premium'],21),
    drink('d37','Velvet Merlot','Wine',['Fruity','Savory'],12),
    drink('d38','City Spritz','Wine',['Fresh','Clean'],14),
    drink('d39','Golden Sangria','Wine',['Cheap','Fruity'],14),
    drink('d40','Cellar Select','Wine',['Premium','Savory'],16),
    drink('d41','Cream Sherry Flip','Wine',['Creamy','Strong'],18),
    drink('d42','Spiced Mulled Wine','Wine',['Spicy'],16)
  ];
  const customer=(name,love,like,dislike)=>({name,love,like,dislike});
  const customers=[
    customer('College Regular','Beer','Cheap','Premium'),
    customer('Night Shift Nurse','Clean','Fresh','Strong'),
    customer('Whiskey Collector','Whiskey','Premium','Cheap'),
    customer('Garden Club Host','Gin','Fresh','Creamy'),
    customer('Beach Traveler','Rum','Fruity','Bitter'),
    customer('Agave Hunter','Tequila','Strong','Sweet'),
    customer('Wine Critic','Wine','Savory','Cheap'),
    customer('Dessert Date','Sweet','Creamy','Bitter'),
    customer('Punk Drummer','Strong','Beer','Clean'),
    customer('Marathoner','Fresh','Clean','Creamy'),
    customer('Spice Blogger','Spicy','Tequila','Sweet'),
    customer('Citrus Fan','Sour','Vodka','Creamy'),
    customer('Executive','Premium','Wine','Cheap'),
    customer('Budget Tourist','Cheap','Fruity','Premium'),
    customer('Hop Scholar','Bitter','Beer','Sweet'),
    customer('Cocktail Minimalist','Clean','Gin','Creamy'),
    customer('Brunch Organizer','Fruity','Wine','Strong'),
    customer('Steakhouse Chef','Savory','Whiskey','Sweet'),
    customer('Dance Floor DJ','Vodka','Strong','Bitter'),
    customer('Island Local','Rum','Sweet','Savory'),
    customer('Desert Racer','Tequila','Spicy','Creamy'),
    customer('Bookshop Owner','Wine','Bitter','Strong'),
    customer('Food Truck Cook','Spicy','Savory','Premium'),
    customer('Pastry Chef','Creamy','Sweet','Sour'),
    customer('Rooftop Regular','Gin','Premium','Cheap'),
    customer('Night Cab Driver','Bitter','Clean','Fruity'),
    customer('Festival Vendor','Beer','Fresh','Premium'),
    customer('Quiet Celebrant','Premium','Clean','Spicy')
  ];
  const bartenders=spirits.map((specialty,i)=>({
    name:['Ace','Mara','Theo','June','Nico','Sol','Rae'][i],
    specialty,
    passive:`${specialty} drinks gain +1 Appeal.`
  }));
  const starterIds=['d1','d3','d7','d11','d13','d19','d25','d33','d36','d41'];
  return{schemaVersion:'0.5.12',spirits,styles,drinks,customers,bartenders,starterIds};
});
