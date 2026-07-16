(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.BLC_CONTENT=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function countBy(items,key){return items.reduce((out,item)=>{const value=typeof key==='function'?key(item):item[key];out[value]=(out[value]||0)+1;return out},{})}
  function duplicateValues(values){const counts=countBy(values,value=>value);return Object.keys(counts).filter(value=>counts[value]>1)}
  function audit(data){
    const errors=[],warnings=[];
    const spirits=new Set(data.spirits||[]),styles=new Set(data.styles||[]),traits=new Set([...spirits,...styles]);
    const drinks=Array.isArray(data.drinks)?data.drinks:[],customers=Array.isArray(data.customers)?data.customers:[],bartenders=Array.isArray(data.bartenders)?data.bartenders:[];
    if(duplicateValues(data.spirits||[]).length)errors.push('Spirit vocabulary contains duplicates.');
    if(duplicateValues(data.styles||[]).length)errors.push('Style vocabulary contains duplicates.');
    for(const [i,drink] of drinks.entries()){
      const label=`Drink ${i+1}${drink&&drink.name?` (${drink.name})`:''}`;
      if(!drink||typeof drink!=='object'){errors.push(`${label} is not an object.`);continue}
      if(typeof drink.id!=='string'||!drink.id)errors.push(`${label} needs one ID.`);
      if(typeof drink.name!=='string'||!drink.name.trim())errors.push(`${label} needs one name.`);
      if(typeof drink.spirit!=='string'||!spirits.has(drink.spirit))errors.push(`${label} needs exactly one allowed Spirit.`);
      if(!Array.isArray(drink.styles)||drink.styles.length<1||drink.styles.length>2)errors.push(`${label} needs one or two Style traits.`);
      else{
        if(new Set(drink.styles).size!==drink.styles.length)errors.push(`${label} repeats a Style trait.`);
        for(const style of drink.styles)if(!styles.has(style))errors.push(`${label} uses unknown Style ${style}.`);
        if(drink.styles.includes('Premium')&&drink.styles.includes('Cheap'))errors.push(`${label} has contradictory Premium and Cheap traits.`);
      }
      if(!Number.isFinite(drink.price)||drink.price<=0)errors.push(`${label} needs one positive numeric price.`);
    }
    for(const duplicate of duplicateValues(drinks.map(d=>d.id)))errors.push(`Duplicate drink ID: ${duplicate}.`);
    for(const duplicate of duplicateValues(drinks.map(d=>d.name)))errors.push(`Duplicate drink name: ${duplicate}.`);
    const profiles=drinks.map(d=>`${d.spirit}|${(d.styles||[]).slice().sort().join('+')}|${d.price}`);
    for(const duplicate of duplicateValues(profiles))errors.push(`Duplicate drink mechanical profile: ${duplicate}.`);
    for(const [i,customer] of customers.entries()){
      const label=`Customer ${i+1}${customer&&customer.name?` (${customer.name})`:''}`;
      if(!customer||typeof customer!=='object'){errors.push(`${label} is not an object.`);continue}
      if(typeof customer.name!=='string'||!customer.name.trim())errors.push(`${label} needs one name.`);
      for(const field of ['love','like','dislike'])if(typeof customer[field]!=='string'||!traits.has(customer[field]))errors.push(`${label} needs exactly one allowed ${field}.`);
      if(new Set([customer.love,customer.like,customer.dislike]).size!==3)errors.push(`${label} repeats or contradicts a preference.`);
    }
    for(const duplicate of duplicateValues(customers.map(c=>c.name)))errors.push(`Duplicate customer name: ${duplicate}.`);
    const customerProfiles=customers.map(c=>`${c.love}|${c.like}|${c.dislike}`);
    for(const duplicate of duplicateValues(customerProfiles))errors.push(`Duplicate customer preference profile: ${duplicate}.`);
    for(const [i,bartender] of bartenders.entries()){
      const label=`Bartender ${i+1}${bartender&&bartender.name?` (${bartender.name})`:''}`;
      if(!bartender||typeof bartender!=='object'){errors.push(`${label} is not an object.`);continue}
      if(typeof bartender.name!=='string'||!bartender.name.trim())errors.push(`${label} needs one name.`);
      if(typeof bartender.specialty!=='string'||!traits.has(bartender.specialty))errors.push(`${label} needs exactly one allowed specialty.`);
      if(bartender.passive!==`${bartender.specialty} drinks gain +1 Appeal.`)errors.push(`${label} passive must be the standard +1 Appeal ability.`);
    }
    for(const duplicate of duplicateValues(bartenders.map(b=>b.name)))errors.push(`Duplicate bartender name: ${duplicate}.`);
    for(const duplicate of duplicateValues(bartenders.map(b=>b.specialty)))errors.push(`Duplicate bartender specialty: ${duplicate}.`);
    if(Array.isArray(data.starterIds)){
      const drinkIds=new Set(drinks.map(d=>d.id));
      if(data.starterIds.length!==10||new Set(data.starterIds).size!==10)errors.push('Starter pool must contain 10 unique drink IDs.');
      for(const id of data.starterIds)if(!drinkIds.has(id))errors.push(`Starter pool uses unknown drink ID: ${id}.`);
    }
    const numberedDrinkNames=drinks.filter(d=>/\s\d+$/.test(d.name)).length;
    const numberedCustomerNames=customers.filter(c=>/\s\d+$/.test(c.name)).length;
    if(numberedDrinkNames)warnings.push(`${numberedDrinkNames} drink names use numbered variants; review in Prompt 9.`);
    if(numberedCustomerNames)warnings.push(`${numberedCustomerNames} customer names use numbered variants; review in Prompt 9.`);
    if(drinks.length&&drinks.every(d=>d.styles.length===2))warnings.push('Every drink has two Style traits; one-trait drinks are absent.');
    const bartenderSpecialties=new Set(bartenders.map(b=>b.specialty));
    const uncoveredStyles=[...styles].filter(style=>!bartenderSpecialties.has(style));
    if(uncoveredStyles.length)warnings.push(`No bartender specializes in Style traits: ${uncoveredStyles.join(', ')}.`);
    const preferenceCoverage=countBy(customers.flatMap(c=>[c.love,c.like,c.dislike]),value=>value);
    const uncoveredPreferences=[...traits].filter(trait=>!preferenceCoverage[trait]);
    if(uncoveredPreferences.length)warnings.push(`Customer preferences do not cover: ${uncoveredPreferences.join(', ')}.`);
    const summary={
      schemaVersion:data.schemaVersion||'unversioned',
      drinks:drinks.length,customers:customers.length,bartenders:bartenders.length,
      drinkSpiritCounts:countBy(drinks,'spirit'),
      drinkStyleCounts:countBy(drinks.flatMap(d=>d.styles),value=>value),
      priceCounts:countBy(drinks,'price'),
      customerLoveCounts:countBy(customers,'love'),customerLikeCounts:countBy(customers,'like'),customerDislikeCounts:countBy(customers,'dislike'),
      bartenderSpecialtyCounts:countBy(bartenders,'specialty'),
      numberedDrinkNames,numberedCustomerNames,
      oneStyleDrinks:drinks.filter(d=>d.styles.length===1).length,
      twoStyleDrinks:drinks.filter(d=>d.styles.length===2).length
    };
    return{ok:errors.length===0,errors,warnings,summary};
  }
  return{audit,countBy,duplicateValues};
});
