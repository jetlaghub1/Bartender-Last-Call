$ErrorActionPreference='Stop'
$browser='C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
if(-not(Test-Path -LiteralPath $browser)){throw 'Microsoft Edge is required for the WebP export.'}
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$converter=([Uri]::new((Join-Path $PSScriptRoot 'convert-background.html'))).AbsoluteUri
$sourceDir=Join-Path $project 'art\masters\prompt16-batch03'
$jobs=@(
 @{Source='bartender_nico_gin_source.png';Output='assets\art\bartenders\bartender_nico_gin.webp';Width=768;Height=1024},
 @{Source='bartender_sol_tequila_source.png';Output='assets\art\bartenders\bartender_sol_tequila.webp';Width=768;Height=1024},
 @{Source='bartender_rae_wine_source.png';Output='assets\art\bartenders\bartender_rae_wine.webp';Width=768;Height=1024},
 @{Source='customer_c01_college-regular_source.png';Output='assets\art\customers\customer_c01_college-regular.webp';Width=768;Height=768},
 @{Source='customer_c02_night-shift-nurse_source.png';Output='assets\art\customers\customer_c02_night-shift-nurse.webp';Width=768;Height=768},
 @{Source='customer_c03_whiskey-collector_source.png';Output='assets\art\customers\customer_c03_whiskey-collector.webp';Width=768;Height=768},
 @{Source='customer_c04_garden-club-host_source.png';Output='assets\art\customers\customer_c04_garden-club-host.webp';Width=768;Height=768},
 @{Source='customer_c05_beach-traveler_source.png';Output='assets\art\customers\customer_c05_beach-traveler.webp';Width=768;Height=768}
)
foreach($job in $jobs){
 $source=([Uri]::new((Join-Path $sourceDir $job.Source))).AbsoluteUri
 $url=$converter+"?w=$($job.Width)&h=$($job.Height)&q=.86&src="+[Uri]::EscapeDataString($source)
 $profile=Join-Path $env:TEMP ('blc-portrait-'+[Guid]::NewGuid().ToString('N'))
 $psi=[Diagnostics.ProcessStartInfo]::new();$psi.FileName=$browser;$psi.Arguments='--headless=new --disable-gpu --disable-software-rasterizer --no-sandbox --no-first-run --allow-file-access-from-files --virtual-time-budget=5000 --user-data-dir="'+$profile+'" --dump-dom "'+$url+'"';$psi.UseShellExecute=$false;$psi.CreateNoWindow=$true;$psi.RedirectStandardOutput=$true;$psi.RedirectStandardError=$true
 $process=[Diagnostics.Process]::new();$process.StartInfo=$psi;$process.Start()|Out-Null;$dom=$process.StandardOutput.ReadToEnd();$browserErrors=$process.StandardError.ReadToEnd();$process.WaitForExit();if($process.ExitCode-ne 0){throw "Browser conversion failed: $browserErrors"}
 $match=[regex]::Match($dom,'data:image/webp;base64,([^<]+)');if(-not$match.Success){throw "WebP conversion failed for $($job.Source)"};$bytes=[Convert]::FromBase64String($match.Groups[1].Value.Trim());$target=Join-Path $project $job.Output;[IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($target))|Out-Null;[IO.File]::WriteAllBytes($target,$bytes);if([Text.Encoding]::ASCII.GetString($bytes,0,4)-ne'RIFF'-or[Text.Encoding]::ASCII.GetString($bytes,8,4)-ne'WEBP'){throw "Invalid WebP output: $target"};Write-Output "$($job.Output): $($bytes.Length) bytes"
}
