Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$ErrorActionPreference='Stop'
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$outputs=[IO.Path]::GetFullPath((Join-Path $project '..\..\outputs'))
[IO.Directory]::CreateDirectory($outputs)|Out-Null
$sourceZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.2_Prompt16_Batch03_GitHub_Source.zip'
$itchZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.2_Prompt16_Batch03_Itch_HTML.zip'

function New-ProjectZip([string]$target,[scriptblock]$include){
  if(Test-Path -LiteralPath $target){[IO.File]::Delete($target)}
  $stream=[IO.File]::Open($target,[IO.FileMode]::CreateNew)
  $archive=[IO.Compression.ZipArchive]::new($stream,[IO.Compression.ZipArchiveMode]::Create)
  try{
    Get-ChildItem -LiteralPath $project -File -Recurse | ForEach-Object {
      $relative=$_.FullName.Substring($project.Length).TrimStart('\','/').Replace('\','/')
      if(& $include $relative){[IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive,$_.FullName,$relative,[IO.Compression.CompressionLevel]::Optimal)|Out-Null}
    }
  } finally {$archive.Dispose();$stream.Dispose()}
}

New-ProjectZip $sourceZip { param($relative) -not ($relative.StartsWith('.git/')) }
New-ProjectZip $itchZip { param($relative) $relative -eq 'index.html' -or $relative.StartsWith('css/') -or $relative.StartsWith('js/') -or $relative.StartsWith('assets/art/') }

$requiredRuntime=@(
  'assets/art/bartenders/bartender_nico_gin.webp',
  'assets/art/bartenders/bartender_sol_tequila.webp',
  'assets/art/bartenders/bartender_rae_wine.webp',
  'assets/art/customers/customer_c01_college-regular.webp',
  'assets/art/customers/customer_c02_night-shift-nurse.webp',
  'assets/art/customers/customer_c03_whiskey-collector.webp',
  'assets/art/customers/customer_c04_garden-club-host.webp',
  'assets/art/customers/customer_c05_beach-traveler.webp'
)

foreach($zipPath in @($sourceZip,$itchZip)){
  $archive=[IO.Compression.ZipFile]::OpenRead($zipPath)
  try{
    $names=@($archive.Entries | ForEach-Object FullName)
    if($names -notcontains 'index.html'){throw "index.html is not at the root of $zipPath"}
    if($names | Where-Object {$_ -match '\\'}){throw "Backslash ZIP entry found in $zipPath"}
    foreach($required in $requiredRuntime){if($names -notcontains $required){throw "$required missing from $zipPath"}}
  } finally {$archive.Dispose()}
}

$source=[IO.Compression.ZipFile]::OpenRead($sourceZip)
try{
  $names=@($source.Entries | ForEach-Object FullName)
  if($names -notcontains 'art/production-records/prompt16-batch03.json'){throw 'Batch 03 production record missing from source ZIP.'}
  if($names -notcontains 'docs/PROMPT16_BATCH03.md'){throw 'Batch 03 documentation missing from source ZIP.'}
  if($names -notcontains 'art/masters/prompt16-batch03/bartender_nico_gin_source.png'){throw 'Batch 03 bartender sources missing from source ZIP.'}
  if($names -notcontains 'art/masters/prompt16-batch03/customer_c05_beach-traveler_source.png'){throw 'Batch 03 customer sources missing from source ZIP.'}
} finally {$source.Dispose()}

$itch=[IO.Compression.ZipFile]::OpenRead($itchZip)
try{
  $names=@($itch.Entries | ForEach-Object FullName)
  if($names | Where-Object {$_ -match '^(?:tests|docs|reports|simulation|art)/'}){throw 'Development-only files leaked into the itch.io ZIP.'}
} finally {$itch.Dispose()}

Get-Item -LiteralPath $sourceZip,$itchZip | Select-Object FullName,Length
