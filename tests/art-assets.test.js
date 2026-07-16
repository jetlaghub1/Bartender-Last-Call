const assert=require('assert');
const fs=require('fs');
const path=require('path');

const root=path.join(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'art/asset-manifest.json'),'utf8'));
const css=fs.readFileSync(path.join(root,'css/styles.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const app=fs.readFileSync(path.join(root,'js/app.js'),'utf8');
const produced=[...manifest.system,...manifest.bartenders,...manifest.customers].filter(asset=>asset.order<=24);

assert.equal(manifest.manifestVersion,'1.3.0');
assert.deepEqual(manifest.production,{completedThroughOrder:24,completedAssets:24,nextOrder:25,lastBatch:'prompt16-batch03'});
assert.equal(produced.length,24);
assert(produced.every(asset=>asset.status==='approved'&&/^prompt16-batch0[123]$/.test(asset.batch)));

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
for(const customer of ['customer_c01_college-regular.webp','customer_c02_night-shift-nurse.webp','customer_c03_whiskey-collector.webp','customer_c04_garden-club-host.webp','customer_c05_beach-traveler.webp'])assert(app.includes(`assets/art/customers/${customer}`),`Missing live customer integration: ${customer}`);
assert(fs.existsSync(path.join(root,'art/masters/prompt16-batch01/background_main-bar_source.png')));
assert(fs.existsSync(path.join(root,'art/masters/prompt16-batch01/background_match-table_source.png')));
for(const icon of ['appeal','love','like','dislike'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch02/icon_${icon}.svg`)),`Missing editable icon master: ${icon}`);
for(const bartender of ['ace_beer','mara_vodka','theo_whiskey','june_rum'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch02/bartender_${bartender}_source.png`)),`Missing bartender source: ${bartender}`);
for(const bartender of ['nico_gin','sol_tequila','rae_wine'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch03/bartender_${bartender}_source.png`)),`Missing Batch 03 bartender source: ${bartender}`);
for(const customer of ['c01_college-regular','c02_night-shift-nurse','c03_whiskey-collector','c04_garden-club-host','c05_beach-traveler'])assert(fs.existsSync(path.join(root,`art/masters/prompt16-batch03/customer_${customer}_source.png`)),`Missing Batch 03 customer source: ${customer}`);
assert(css.includes('.customer-avatar.has-art'),'Customer portraits must have a live circular-thumbnail treatment.');

console.log('All Prompt 16 production-art tests passed through batch 03.');
