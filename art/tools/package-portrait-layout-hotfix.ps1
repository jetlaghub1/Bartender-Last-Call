Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$ErrorActionPreference='Stop'
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$outputs=[IO.Path]::GetFullPath((Join-Path $project '..\..\outputs'))
[IO.Directory]::CreateDirectory($outputs)|Out-Null
$sourceZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.1a_Portrait_Layout_Hotfix_GitHub_Source.zip'
$itchZip=Join-Path $outputs 'Bartender_Last_Call_v0.7.1a_Portrait_Layout_Hotfix_Itch_HTML.zip'

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

$required=@(
  'index.html',
  'css/styles.css',
  'js/app.js',
  'assets/art/bartenders/bartender_ace_beer.webp',
  'assets/art/bartenders/bartender_mara_vodka.webp',
  'assets/art/bartenders/bartender_theo_whiskey.webp',
  'assets/art/bartenders/bartender_june_rum.webp'
)

foreach($zipPath in @($sourceZip,$itchZip)){
  $archive=[IO.Compression.ZipFile]::OpenRead($zipPath)
  try{
    $names=@($archive.Entries | ForEach-Object FullName)
    foreach($file in $required){if($names -notcontains $file){throw "$file missing from $zipPath"}}
    if($names | Where-Object {$_ -match '\\'}){throw "Backslash ZIP entry found in $zipPath"}
    $cssEntry=$archive.GetEntry('css/styles.css')
    $reader=[IO.StreamReader]::new($cssEntry.Open())
    try{$css=$reader.ReadToEnd()}finally{$reader.Dispose()}
    if(-not $css.Contains('.bartender-card .portrait{width:100%;height:auto;aspect-ratio:3/4')){throw "Corrected 3:4 portrait rule missing from $zipPath"}
    if($css.Contains('.bartender-card .portrait.has-art{width:100%;height:106px')){throw "Old portrait crop leaked into $zipPath"}
  } finally {$archive.Dispose()}
}

$itch=[IO.Compression.ZipFile]::OpenRead($itchZip)
try{
  $names=@($itch.Entries | ForEach-Object FullName)
  if($names | Where-Object {$_ -match '^(?:tests|docs|reports|simulation|art)/'}){throw 'Development-only files leaked into the itch.io ZIP.'}
} finally {$itch.Dispose()}

Get-Item -LiteralPath $sourceZip,$itchZip | Select-Object FullName,Length
