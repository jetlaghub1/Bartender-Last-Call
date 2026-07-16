Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'
$project = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$frameDir = Join-Path $project 'assets\art\frames'
$iconDir = Join-Path $project 'assets\art\icons'
[IO.Directory]::CreateDirectory($frameDir) | Out-Null
[IO.Directory]::CreateDirectory($iconDir) | Out-Null

function New-RoundedPath([System.Drawing.RectangleF]$rect, [float]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-Frame([string]$kind, [string]$output) {
  $master = [System.Drawing.Bitmap]::new(1800,2520,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($master)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $outer = New-RoundedPath ([System.Drawing.RectangleF]::new(42,42,1716,2436)) 92
  $inner = New-RoundedPath ([System.Drawing.RectangleF]::new(78,78,1644,2364)) 72
  $shadow = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(170,9,14,24),38)
  $brass = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(245,233,184,90),18)
  $light = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220,255,217,133),7)
  $g.DrawPath($shadow,$outer); $g.DrawPath($brass,$outer); $g.DrawPath($light,$inner)
  $cornerPen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(205,180,123,46),11)
  $cornerPen.StartCap = $cornerPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  foreach($flipX in @($false,$true)) { foreach($flipY in @($false,$true)) {
    $x = if($flipX){1570}else{230}; $y = if($flipY){2260}else{260}
    $sx = if($flipX){-1}else{1}; $sy = if($flipY){-1}else{1}
    $g.DrawLine($cornerPen,$x,$y,$x+($sx*112),$y)
    $g.DrawLine($cornerPen,$x,$y,$x,$y+($sy*112))
    $g.DrawLine($light,$x+($sx*26),$y+($sy*26),$x+($sx*92),$y+($sy*26))
  }}
  if($kind -eq 'drink') {
    $teal = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(210,85,214,161),12)
    $g.DrawArc($teal,650,100,500,240,0,180)
    $g.DrawLine($teal,650,220,650,330); $g.DrawLine($teal,1150,220,1150,330)
    $g.DrawLine($brass,260,1965,1540,1965)
    $g.DrawArc($light,760,2070,280,280,20,140)
    $teal.Dispose()
  } elseif($kind -eq 'bartender') {
    $burgundy = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(230,141,76,92),14)
    $g.DrawEllipse($brass,550,170,700,700); $g.DrawEllipse($light,585,205,630,630)
    for($i=0;$i -lt 12;$i++){ $a=$i*[Math]::PI/6; $x1=900+[Math]::Cos($a)*372; $y1=520+[Math]::Sin($a)*372; $x2=900+[Math]::Cos($a)*430; $y2=520+[Math]::Sin($a)*430; $g.DrawLine($burgundy,[float]$x1,[float]$y1,[float]$x2,[float]$y2) }
    $g.DrawLine($burgundy,260,1930,1540,1930); $g.DrawLine($light,360,1980,1440,1980)
    $burgundy.Dispose()
  } else {
    $blue = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(220,165,220,255),11)
    $g.DrawEllipse($brass,600,180,600,760); $g.DrawEllipse($light,635,215,530,690)
    $g.DrawLine($blue,300,1870,1500,1870)
    foreach($x in @(360,750,1140)){ $slot=New-RoundedPath ([System.Drawing.RectangleF]::new($x,1930,300,170)) 44; $g.DrawPath($blue,$slot); $slot.Dispose() }
    $blue.Dispose()
  }
  $runtime = [System.Drawing.Bitmap]::new(900,1260,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $rg=[System.Drawing.Graphics]::FromImage($runtime); $rg.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality; $rg.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic; $rg.PixelOffsetMode=[System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $rg.DrawImage($master,0,0,900,1260)
  $runtime.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
  $rg.Dispose(); $runtime.Dispose(); $cornerPen.Dispose(); $light.Dispose(); $brass.Dispose(); $shadow.Dispose(); $inner.Dispose(); $outer.Dispose(); $g.Dispose(); $master.Dispose()
}

function New-SwitchIcon([string]$output) {
  $master=[System.Drawing.Bitmap]::new(256,256,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g=[System.Drawing.Graphics]::FromImage($master); $g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::AntiAlias; $g.Clear([System.Drawing.Color]::Transparent)
  $darkBrush=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(250,9,14,24)); $g.FillEllipse($darkBrush,12,12,232,232)
  $ring=[System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255,233,184,90),12); $g.DrawEllipse($ring,18,18,220,220)
  $arrow=[System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255,255,217,133),17); $arrow.StartCap=[System.Drawing.Drawing2D.LineCap]::Round; $arrow.EndCap=[System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($arrow,48,48,160,160,205,105); $g.DrawArc($arrow,48,48,160,160,25,105)
  $gold=[System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255,233,184,90))
  $g.FillPolygon($gold,@([System.Drawing.PointF]::new(183,39),[System.Drawing.PointF]::new(213,77),[System.Drawing.PointF]::new(167,78)))
  $g.FillPolygon($gold,@([System.Drawing.PointF]::new(73,217),[System.Drawing.PointF]::new(43,179),[System.Drawing.PointF]::new(89,178)))
  $star=@(); for($i=0;$i -lt 12;$i++){ $a=(-[Math]::PI/2)+($i*[Math]::PI/6); $r=if($i%2 -eq 0){42}else{20}; $star += [System.Drawing.PointF]::new([float](128+[Math]::Cos($a)*$r),[float](128+[Math]::Sin($a)*$r)) }; $g.FillPolygon($gold,$star)
  $runtime=[System.Drawing.Bitmap]::new(64,64,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb); $rg=[System.Drawing.Graphics]::FromImage($runtime); $rg.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality; $rg.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic; $rg.DrawImage($master,0,0,64,64); $runtime.Save($output,[System.Drawing.Imaging.ImageFormat]::Png)
  $rg.Dispose();$runtime.Dispose();$gold.Dispose();$arrow.Dispose();$ring.Dispose();$darkBrush.Dispose();$g.Dispose();$master.Dispose()
}

New-Frame 'drink' (Join-Path $frameDir 'frame_drink-core.png')
New-Frame 'bartender' (Join-Path $frameDir 'frame_bartender-core.png')
New-Frame 'customer' (Join-Path $frameDir 'frame_customer-core.png')
New-SwitchIcon (Join-Path $iconDir 'icon_switch-token.png')
Write-Output 'Built three core frames and the switch-token icon.'
