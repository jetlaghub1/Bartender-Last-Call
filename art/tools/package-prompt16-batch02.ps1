Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$ErrorActionPreference='Stop'
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$outputs=[IO.Path]::GetFullPath((Join-Path $project '..\..\outputs'))
[IO.Directory]::CreateDirectory($outputs)|Out-Null
$sourceZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.1_Prompt16_Batch02_GitHub_Source.zip'
$itchZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.1_Prompt16_Batch02_Itch_HTML.zip'

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
  'assets/art/icons/icon_appeal.png',
  'assets/art/icons/icon_love.png',
  'assets/art/icons/icon_like.png',
  'assets/art/icons/icon_dislike.png',
  'assets/art/bartenders/bartender_ace_beer.webp',
  'assets/art/bartenders/bartender_mara_vodka.webp',
  'assets/art/bartenders/bartender_theo_whiskey.webp',
  'assets/art/bartenders/bartender_june_rum.webp'
)

foreach($zip in @($sourceZip,$itchZip)){
  $archive=[IO.Compression.ZipFile]::OpenRead($zip)
  try{
    $names=@($archive.Entries | ForEach-Object FullName)
    if($names -notcontains 'index.html'){throw "index.html is not at the root of $zip"}
    if($names | Where-Object {$_ -match '\\'}){throw "Backslash ZIP entry found in $zip"}
    foreach($required in $requiredRuntime){if($names -notcontains $required){throw "$required missing from $zip"}}
  } finally {$archive.Dispose()}
}

$source=[IO.Compression.ZipFile]::OpenRead($sourceZip)
try{
  $names=@($source.Entries | ForEach-Object FullName)
  if($names -notcontains 'art/production-records/prompt16-batch02.json'){throw 'Batch 02 production record missing from source ZIP.'}
  if($names -notcontains 'art/masters/prompt16-batch02/bartender_ace_beer_source.png'){throw 'Batch 02 source artwork missing from source ZIP.'}
} finally {$source.Dispose()}

$itch=[IO.Compression.ZipFile]::OpenRead($itchZip)
try{
  $names=@($itch.Entries | ForEach-Object FullName)
  if($names | Where-Object {$_ -match '^(?:tests|docs|reports|simulation|art)/'}){throw 'Development-only files leaked into the itch.io ZIP.'}
} finally {$itch.Dispose()}

Get-Item -LiteralPath $sourceZip,$itchZip | Select-Object FullName,Length
