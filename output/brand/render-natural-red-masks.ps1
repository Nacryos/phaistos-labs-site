param(
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory,

  [Parameter(Mandatory = $true)]
  [string]$BackgroundSource
)

Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

function Write-Mask {
  param(
    [string]$Name,
    [string[]]$Coordinates
  )

  $bitmap = [System.Drawing.Bitmap]::new(400, 400)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::Black)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $points = foreach ($coordinate in $Coordinates) {
    $xy = $coordinate.Split(',')
    [System.Drawing.PointF]::new([float]$xy[0], [float]$xy[1])
  }
  $graphics.FillPolygon([System.Drawing.Brushes]::White, $points)
  $graphics.Dispose()
  $path = Join-Path $OutputDirectory "$Name.png"
  $bitmap.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bitmap.Dispose()
}

$outer = @(
  '42,46','55,42','68,46','81,41','96,44','109,40','123,44','137,41','152,45','168,40','182,44','197,41','212,45','227,40','243,44','258,42','273,46','287,41','301,45','317,42','331,48','348,45',
  '354,59','351,74','356,89','352,104','355,119','351,135','356,150','352,164','355,180','351,195','356,210','352,225','355,241','350,255','354,270','350,285','354,300','349,316','353,331','346,351',
  '331,354','315,350','300,355','284,351','269,354','254,350','239,355','223,351','208,354','193,350','178,355','162,351','147,354','132,350','117,355','101,351','86,354','70,350','55,354','46,343',
  '49,328','44,313','48,298','43,283','47,268','43,252','48,237','44,222','48,207','43,192','47,177','43,162','48,147','44,132','48,117','43,102','47,87','43,72'
)

$inner = @(
  '49,52','63,48','76,52','91,47','105,51','119,47','134,51','149,48','164,52','179,47','194,51','209,48','224,52','239,47','254,51','269,48','284,52','299,48','314,52','329,48','346,53',
  '350,68','346,83','351,98','347,113','350,128','346,143','351,158','347,173','350,188','346,203','351,218','347,233','350,248','346,263','350,278','346,293','350,308','346,323','349,339','339,347',
  '324,343','309,348','294,344','279,347','264,343','249,348','234,344','219,347','204,343','189,348','174,344','159,347','144,343','129,348','114,344','99,347','84,343','69,348','52,342',
  '55,327','50,312','54,297','50,282','54,267','49,252','53,237','50,222','54,207','49,192','53,177','50,162','54,147','49,132','53,117','50,102','54,87','49,72'
)

Write-Mask -Name 'outer' -Coordinates $outer
Write-Mask -Name 'inner' -Coordinates $inner

$source = [System.Drawing.Bitmap]::new($BackgroundSource)
$sample = $source.Clone([System.Drawing.Rectangle]::new(0, 0, 64, 64), $source.PixelFormat)
$background = [System.Drawing.Bitmap]::new(400, 400)
$backgroundGraphics = [System.Drawing.Graphics]::FromImage($background)
$texture = [System.Drawing.TextureBrush]::new($sample, [System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
$backgroundGraphics.FillRectangle($texture, 0, 0, 400, 400)
$backgroundGraphics.Dispose()
$texture.Dispose()
$sample.Dispose()
$source.Dispose()
$background.Save((Join-Path $OutputDirectory 'background.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$background.Dispose()
