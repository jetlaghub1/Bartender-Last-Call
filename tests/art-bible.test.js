const assert=require('assert');
const fs=require('fs');
const path=require('path');
const data=require('../js/data.js');

const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../art/asset-manifest.json'),'utf8'));
const bible=fs.readFileSync(path.join(__dirname,'../docs/ART_BIBLE_v1.md'),'utf8');
const reference=fs.readFileSync(path.join(__dirname,'../art/reference-sheet.html'),'utf8');
const tokens=fs.readFileSync(path.join(__dirname,'../art/style-tokens.css'),'utf8');
const all=[...manifest.system,...manifest.bartenders,...manifest.customers,...manifest.drinks];

assert.equal(manifest.manifestVersion,'1.2.0');
assert.equal(manifest.batchSize,8,'Prompt 16 batches must stay capped at eight assets.');
assert.deepEqual(manifest.counts,{system:12,bartenders:7,customers:28,drinks:42,total:89});
assert.equal(all.length,manifest.counts.total,'Manifest total must match every listed production asset.');
assert.deepEqual(all.map(asset=>asset.order),Array.from({length:89},(_,index)=>index+1),'Production order must be continuous and deterministic.');
assert.equal(new Set(all.map(asset=>asset.id)).size,all.length,'Every production asset needs a unique ID.');
assert.equal(new Set(all.map(asset=>asset.file)).size,all.length,'Every production filename must be unique.');
for(const asset of all){
  assert(/^[a-z0-9/_-]+\.(?:png|webp|svg)$/.test(asset.file),`Runtime filename must be lowercase ASCII: ${asset.file}`);
  assert(!/\s/.test(asset.file),`Runtime filename cannot contain spaces: ${asset.file}`);
}

assert.deepEqual(manifest.drinks.map(asset=>asset.id),data.drinks.map(drink=>drink.id),'Drink art IDs must preserve game IDs.');
assert.deepEqual(manifest.drinks.map(asset=>asset.name),data.drinks.map(drink=>drink.name),'Every drink needs an exact named art target.');
assert.deepEqual(manifest.drinks.map(asset=>asset.spirit),data.drinks.map(drink=>drink.spirit),'Drink art direction must use the correct Spirit family.');
assert.deepEqual(manifest.customers.map(asset=>asset.name),data.customers.map(customer=>customer.name),'Every customer needs an exact named art target.');
assert.deepEqual(manifest.bartenders.map(asset=>asset.name),data.bartenders.map(bartender=>bartender.name),'Every bartender needs an exact named art target.');
assert.deepEqual(manifest.bartenders.map(asset=>asset.specialty),data.bartenders.map(bartender=>bartender.specialty),'Bartender portrait direction must match specialty.');

assert.deepEqual(manifest.specs.drink.master,[1536,1024]);
assert.deepEqual(manifest.specs.bartender.master,[1536,2048]);
assert.deepEqual(manifest.specs.customer.master,[1536,1536]);
assert.deepEqual(manifest.specs.frame.master,[1800,2520]);
assert.deepEqual(manifest.specs.icon.runtime,[64,64]);
assert.deepEqual(manifest.production,{completedThroughOrder:16,completedAssets:16,nextOrder:17,lastBatch:'prompt16-batch02'});

assert(bible.includes('North star: replayability first'),'The art bible must protect fun and replayability as its first principle.');
assert(/supports fast game decisions and repeated-play recognition/i.test(bible),'The review gate must connect visual approval to gameplay.');
assert(bible.includes('Do not generate multiple final assets as a single collage'),'Production assets must be delivered separately.');
assert(bible.includes('No text, logos, watermarks, signatures, or UI'),'Generation rules must prevent baked-in text and UI.');
assert(bible.includes('fictional adults aged 21 or older'),'Character art must portray fictional adults.');
assert(reference.includes('Approved direction for Prompt 16'));
assert(reference.includes('No text, logos, prices, borders, or UI baked'));
assert(reference.includes('href="style-tokens.css"'));
assert(!/https?:\/\//.test(reference),'The reference sheet must work without external dependencies.');
for(const token of ['--blc-beer','--blc-vodka','--blc-whiskey','--blc-rum','--blc-gin','--blc-tequila','--blc-wine'])assert(tokens.includes(token),`Missing Spirit color token ${token}`);

console.log('All Prompt 15 art-bible and asset-manifest tests passed.');
