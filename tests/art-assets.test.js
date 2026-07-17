const assert=require('assert');
const fs=require('fs');
const path=require('path');

const root=path.join(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'art/asset-manifest.json'),'utf8'));
const css=fs.readFileSync(path.join(root,'css/styles.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
const produced=[...manifest.system,...manifest.bartenders,...manifest.customers].filter(asset=>asset.order<=47);

assert.equal(manifest.manifestVersion,'1.6.0');
assert.deepEqual(manifest.production,{completedThroughOrder:47,completedAssets:47,nextOrder:48,lastBatch:'prompt16-batch06'});
assert.equal(produced.length,47);
assert(produced.every(asset=>asset.status==='approved'&&/^prompt16-batch0[1-6]$/.test(asset.batch)));

for(const asset of produced){
  const file=path.join(root,manifest.runtimeRoot,asset.file);
  assert(fs.existsSync(file),`Missing production asset: ${asset.file}`);
  assert(fs.statSync(file).size>1000,`Production asset is implausibly small: ${asset.file}`);
}

for(const asset of produced.filter(asset=>asset.file.endsWith('.png'))){
  const bytes=fs.readFileSync(path.join(root,manifest.runtimeRoot,asset.file));
  assert.equal(bytes.subarray(1,4).toString('ascii'),'PNG',`${asset.file} must be a real PNG`);
  assert.equal(bytes.readUInt32BE(16),asset.runtime[0],`${asset.file} width mismatch`);
  assert.equal(bytes.readUInt32BE(20),asset.runtime[1],`${asset.file} height mismatch`);
  assert.equal(bytes[25],6,`${asset.file} must retain RGBA transparency`);
}

for(const asset of produced.filter(asset=>asset.file.endsWith('.webp'))){
  const bytes=fs.readFileSync(path.join(root,manifest.runtimeRoot,asset.file));
  assert.equal(bytes.subarray(0,4).toString('ascii'),'RIFF',`${asset.file} must have a RIFF header`);
  assert.equal(bytes.subarray(8,12).toString('ascii'),'WEBP',`${asset.file} must be a real WebP`);
  assert(bytes.length<300000,`${asset.file} is too heavy for a replayable browser build`);
}

for(const asset of produced.filter(asset=>asset.file.endsWith('.svg'))){
  const source=fs.readFileSync(path.join(root,manifest.runtimeRoot,asset.file),'utf8');
  assert(source.includes('<title'),`${asset.file} needs an accessible SVG title`);
  assert(!/(?:href|src)=["']https?:\/\//i.test(source),`${asset.file} cannot depend on the network`);
  assert(!/<script/i.test(source),`${asset.file} cannot contain script`);
}

assert(css.includes('background_main-bar.webp'));
assert(css.includes('background_match-table.webp'));
assert(css.includes('frame_drink-core.png'));
assert(css.includes('frame_bartender-core.png'));
assert(html.includes('assets/art/brand/logo_mark.svg'));
assert(app.includes('assets/art/brand/logo_wordmark.svg'));
assert(app.includes('assets/art/icons/icon_switch-token.png'));
for(const icon of ['icon_appeal.png','icon_love.png','icon_like.png','icon_dislike.png'])assert(app.includes(`assets/art/icons/${icon}`),`Missing live icon integration: ${icon}`);
for(const bartender of ['bartender_ace_beer.webp','bartender_mara_vodka.webp','bartender_theo_whiskey.webp','bartender_june_rum.webp','bartender_nico_gin.webp','bartender_sol_tequila.webp','bartender_rae_wine.webp'])assert(app.includes(`assets/art/bartenders/${bartender}`),`Missing live bartender integration: ${bartender}`);
for(const customer of ['customer_c01_college-regular.webp','customer_c02_night-shift-nurse.webp','customer_c03_whiskey-collector.webp','customer_c04_garden-club-host.webp','customer_c05_beach-traveler.webp','customer_c06_agave-hunter.webp','customer_c07_wine-critic.webp','customer_c08_dessert-date.webp','customer_c09_punk-drummer.webp','customer_c10_marathoner.webp','customer_c11_spice-blogger.webp','customer_c12_citrus-fan.webp','customer_c13_executive.webp','customer_c14_budget-tourist.webp','customer_c15_hop-scholar.webp','customer_c16_cocktail-minimalist.webp','customer_c17_brunch-organizer.webp','customer_c18_steakhouse-chef.webp','customer_c19_dance-floor-dj.webp','customer_c20_island-local.webp','customer_c21_desert-racer.webp','customer_c22_bookshop-owner.webp','customer_c23_food-truck-cook.webp','customer_c24_pastry-chef.webp','customer_c25_rooftop-regular.webp','customer_c26_night-cab-driver.webp','customer_c27_festival-vendor.webp','customer_c28_quiet-celebrant.webp'])assert(app.includes(`assets/art/customers/${customer}`),`Missing live customer integration: ${customer}`);
const masterAnchor=path.join(root,'art/masters/prompt16-batch01/background_main-bar_source.png');
if(fs.existsSync(masterAnchor)){
  assert(fs.existsSync(path.join(root,'art/masters/prompt16-batch01/background_match-table_source.png')));
  for(const icon of ['appeal','love','like','dislike'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch02/icon_${icon}.svg`)),`Missing editable icon master: ${icon}`);
  for(const bartender of ['ace_beer','mara_vodka','theo_whiskey','june_rum'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch02/bartender_${bartender}_source.png`)),`Missing bartender source: ${bartender}`);
  for(const bartender of ['nico_gin','sol_tequila','rae_wine'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch03/bartender_${bartender}_source.png`)),`Missing Batch 03 bartender source: ${bartender}`);
  for(const customer of ['c01_college-regular','c02_night-shift-nurse','c03_whiskey-collector','c04_garden-club-host','c05_beach-traveler'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch03/customer_${customer}_source.png`)),`Missing Batch 03 customer source: ${customer}`);
  for(const customer of ['c06_agave-hunter','c07_wine-critic','c08_dessert-date','c09_punk-drummer','c10_marathoner','c11_spice-blogger','c12_citrus-fan','c13_executive'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch04/customer_${customer}_source.png`)),`Missing Batch 04 customer source: ${customer}`);
  for(const customer of ['c14_budget-tourist','c15_hop-scholar','c16_cocktail-minimalist','c17_brunch-organizer','c18_steakhouse-chef','c19_dance-floor-dj','c20_island-local','c21_desert-racer'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch05/customer_${customer}_source.png`)),`Missing Batch 05 customer source: ${customer}`);
  for(const customer of ['c22_bookshop-owner','c23_food-truck-cook','c24_pastry-chef','c25_rooftop-regular','c26_night-cab-driver','c27_festival-vendor','c28_quiet-celebrant'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch06/customer_${customer}_source.png`)),`Missing Batch 06 customer source: ${customer}`);
}else{
  for(let batch=1;batch<=6;batch++)assert(fs.existsSync(path.join(root,`art/production-records/prompt16-batch0${batch}.json`)),`Missing Batch ${batch} production record`);
}
assert(css.includes('.customer-avatar.has-art'),'Customer portraits must have a live circular-thumbnail treatment.');

console.log('All Prompt 16 production-art tests passed through batch 06.');
