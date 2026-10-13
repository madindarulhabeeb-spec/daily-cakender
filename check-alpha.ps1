Add-Type -AssemblyName System.Drawing

$p1 = 'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\mhs-logo-raw.png'
$p2 = 'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\darul-habeeb-logo-raw.png'

$img1 = [System.Drawing.Image]::FromFile($p1)
$bmp1 = New-Object System.Drawing.Bitmap($img1)

$img2 = [System.Drawing.Image]::FromFile($p2)
$bmp2 = New-Object System.Drawing.Bitmap($img2)

Write-Host "MHS ($($bmp1.Width)x$($bmp1.Height)) PixelFormat: $($bmp1.PixelFormat)"
$nonZeroAlpha1 = 0
$semiAlpha1 = 0
$pureWhite1 = 0
for ($y = 0; $y -lt $bmp1.Height; $y++) {
    for ($x = 0; $x -lt $bmp1.Width; $x++) {
        $c = $bmp1.GetPixel($x, $y)
        if ($c.A -gt 0) { $nonZeroAlpha1++ }
        if ($c.A -gt 0 -and $c.A -lt 255) { $semiAlpha1++ }
        if ($c.A -gt 0 -and $c.R -gt 230 -and $c.G -gt 230 -and $c.B -gt 230) { $pureWhite1++ }
    }
}
Write-Host "MHS Non-zero Alpha: $nonZeroAlpha1, Semi-Alpha: $semiAlpha1, Bright/White Pixels with Alpha>0: $pureWhite1"

Write-Host "DH ($($bmp2.Width)x$($bmp2.Height)) PixelFormat: $($bmp2.PixelFormat)"
$nonZeroAlpha2 = 0
$semiAlpha2 = 0
$creamAlpha2 = 0
for ($y = 0; $y -lt $bmp2.Height; $y++) {
    for ($x = 0; $x -lt $bmp2.Width; $x++) {
        $c = $bmp2.GetPixel($x, $y)
        if ($c.A -gt 0) { $nonZeroAlpha2++ }
        if ($c.A -gt 0 -and $c.A -lt 255) { $semiAlpha2++ }
        if ($c.A -gt 0 -and $c.R -gt 220 -and $c.G -gt 215 -and $c.B -gt 205) { $creamAlpha2++ }
    }
}
Write-Host "DH Non-zero Alpha: $nonZeroAlpha2, Semi-Alpha: $semiAlpha2, Cream Pixels with Alpha>0: $creamAlpha2"

$bmp1.Dispose()
$img1.Dispose()
$bmp2.Dispose()
$img2.Dispose()
