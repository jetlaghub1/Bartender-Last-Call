$ErrorActionPreference='Stop'
$browser='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if(-not(Test-Path -LiteralPath $browser)){throw 'Microsoft Edge is required for the WebP export.'}
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$converter=([Uri]::new((Join-Path $PSScriptRoot 'convert-background.html'))).AbsoluteUri
$sourceDir=Join-Path $project 'art\masters\prompt16-batch02'
$outputDir=Join-Path $project 'assets\art\bartenders'
$jobs=@(
 @{Source='bartender_ace_beer_source.png';Output='bartender_ace_beer.webp'},
 @{Source='bartender_mara_vodka_source.png';Output='bartender_mara_vodka.webp'},
 @{Source='bartender_theo_whiskey_source.png';Output='bartender_theo_whiskey.webp'},
 @{Source='bartender_june_rum_source.png';Output='bartender_june_rum.webp'}
)
foreach($job in $jobs){
 $source=([Uri]::new((Join-Path $sourceDir $job.Source))).AbsoluteUri
 $url=$converter+'?w=768&h=1024&q=.86&src='+[Uri]::EscapeDataString($source)
 $profile=Join-Path $env:TEMP ('blc-bartender-'+[Guid]::NewGuid().ToString('N'))
 $psi=[Diagnostics.ProcessStartInfo]::new();$psi.FileName=$browser;$psi.Arguments='--headless=new --disable-gpu --disable-software-rasterizer --no-sandbox --no-first-run --allow-file-access-from-files --virtual-time-budget=5000 --user-data-dir="'+$profile+'" --dump-dom "'+$url+'"';$psi.UseShellExecute=$false;$psi.CreateNoWindow=$true;$psi.RedirectStandardOutput=$true;$psi.RedirectStandardError=$true
 $process=[Diagnostics.Process]::new();$process.StartInfo=$psi;$process.Start()|Out-Null;$dom=$process.StandardOutput.ReadToEnd();$browserErrors=$process.StandardError.ReadToEnd();$process.WaitForExit();if($process.ExitCode-ne 0){throw "Browser conversion failed: $browserErrors"}
 $match=[regex]::Match($dom,'data:image/webp;base64,([^<]+)');if(-not$match.Success){throw "WebP conversion failed for $($job.Source)"};$bytes=[Convert]::FromBase64String($match.Groups[1].Value.Trim());$target=Join-Path $outputDir $job.Output;[IO.File]::WriteAllBytes($target,$bytes);if([Text.Encoding]::ASCII.GetString($bytes,0,4)-ne'RIFF'-or[Text.Encoding]::ASCII.GetString($bytes,8,4)-ne'WEBP'){throw "Invalid WebP output: $target"};Write-Output "$($job.Output): $($bytes.Length) bytes"
}
