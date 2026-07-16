Add-Type -AssemblyName System.Drawing
$ErrorActionPreference='Stop'
$project=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$outputDir=Join-Path $project 'assets\art\icons'
[IO.Directory]::CreateDirectory($outputDir)|Out-Null

function Save-Icon([scriptblock]$draw,[string]$name){
  $master=[Drawing.Bitmap]::new(256,256,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g=[Drawing.Graphics]::FromImage($master);$g.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::AntiAlias;$g.Clear([Drawing.Color]::Transparent)
  & $draw $g
  $runtime=[Drawing.Bitmap]::new(64,64,[Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $rg=[Drawing.Graphics]::FromImage($runtime);$rg.SmoothingMode=[Drawing.Drawing2D.SmoothingMode]::HighQuality;$rg.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic;$rg.PixelOffsetMode=[Drawing.Drawing2D.PixelOffsetMode]::HighQuality;$rg.DrawImage($master,0,0,64,64)
  $runtime.Save((Join-Path $outputDir $name),[Drawing.Imaging.ImageFormat]::Png)
  $rg.Dispose();$runtime.Dispose();$g.Dispose();$master.Dispose()
}

Save-Icon {
  param($g)
  $gold=[Drawing.Color]::FromArgb(255,233,184,90);$pen=[Drawing.Pen]::new($gold,18);$pen.StartCap=$pen.EndCap=[Drawing.Drawing2D.LineCap]::Round;$g.DrawLine($pen,48,103,208,103);$g.DrawArc($pen,48,26,160,176,0,180)
  $ray=[Drawing.Pen]::new($gold,13);$ray.StartCap=$ray.EndCap=[Drawing.Drawing2D.LineCap]::Round;$g.DrawLine($ray,128,40,128,76);$g.DrawLine($ray,78,59,104,86);$g.DrawLine($ray,178,59,152,86)
  $brush=[Drawing.SolidBrush]::new($gold);$pts=@();for($i=0;$i -lt 10;$i++){$a=(-[Math]::PI/2)+$i*[Math]::PI/5;$r=if($i%2 -eq 0){37}else{17};$pts+=[Drawing.PointF]::new([float](128+[Math]::Cos($a)*$r),[float](126+[Math]::Sin($a)*$r))};$g.FillPolygon($brush,$pts);$brush.Dispose();$ray.Dispose();$pen.Dispose()
} 'icon_appeal.png'

Save-Icon {
  param($g)
  $path=[Drawing.Drawing2D.GraphicsPath]::new();$path.AddBezier(128,218,96,191,43,153,43,98);$path.AddBezier(43,61,67,36,101,36,122,36);$path.AddBezier(122,36,128,51,128,65,128,65);$path.AddBezier(128,65,134,36,155,36,155,36);$path.AddBezier(189,36,213,61,213,98,213,153);$path.AddBezier(213,153,160,191,128,218,128,218);$path.CloseFigure();$brush=[Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(255,255,159,190));$g.FillPath($brush,$path);$brush.Dispose();$path.Dispose()
} 'icon_love.png'

$thumbPoints=@([Drawing.PointF]::new(44,112),[Drawing.PointF]::new(86,112),[Drawing.PointF]::new(124,49),[Drawing.PointF]::new(154,36),[Drawing.PointF]::new(168,67),[Drawing.PointF]::new(156,104),[Drawing.PointF]::new(202,104),[Drawing.PointF]::new(228,128),[Drawing.PointF]::new(215,192),[Drawing.PointF]::new(189,212),[Drawing.PointF]::new(96,212),[Drawing.PointF]::new(86,204),[Drawing.PointF]::new(44,204))
Save-Icon {param($g)$brush=[Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(255,85,214,161));$g.FillPolygon($brush,$thumbPoints);$brush.Dispose()} 'icon_like.png'
Save-Icon {param($g)$down=@($thumbPoints|ForEach-Object{[Drawing.PointF]::new($_.X,256-$_.Y)});$brush=[Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(255,255,125,134));$g.FillPolygon($brush,$down);$brush.Dispose()} 'icon_dislike.png'
Write-Output 'Built Appeal, Love, Like, and Dislike icons.'
