(function(g){
  const spirits=['Beer','Vodka','Whiskey','Rum','Gin','Tequila','Wine'];
  const styles=['Premium','Cheap','Strong','Sweet','Bitter','Fruity','Fresh','Sour','Creamy','Clean','Savory','Spicy'];
  const names=['Golden Lager','Citrus Collins','Old Fashioned','Midnight Mojito','Garden Gimlet','Sunset Paloma','Velvet Merlot','House Highball','Spiced Daiquiri','Neon Martini','Bitter Bloom','Cream Soda Flip','Smoked Sour','Market Mule','Clean Cut','Tropical Fizz','Pepper Punch','Cellar Select','Last Call Lager','Backbar Special','City Spritz'];
  const drinks=Array.from({length:42},(_,i)=>({id:'d'+(i+1),name:names[i%names.length]+(i>=names.length?' '+(Math.floor(i/names.length)+1):''),spirit:spirits[i%spirits.length],styles:[styles[i%styles.length],styles[(i+5)%styles.length]],price:8+(i%8)*2}));
  const customers=Array.from({length:28},(_,i)=>({name:['Night Owl','The Critic','Roadie','Regular','Foodie','Tourist','Musician'][i%7]+' '+(i+1),love:i%2?spirits[i%spirits.length]:styles[i%styles.length],like:i%2?styles[(i+3)%styles.length]:spirits[(i+2)%spirits.length],dislike:styles[(i+7)%styles.length]}));
  const bartenders=spirits.map((s,i)=>({name:['Ace','Mara','Theo','June','Nico','Sol','Rae'][i],specialty:s,passive:`${s} drinks gain +1 Appeal.`}));
  g.BLC_DATA={spirits,styles,drinks,customers,bartenders};
})(window);
