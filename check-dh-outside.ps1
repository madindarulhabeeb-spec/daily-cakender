Add-Type -AssemblyName System.Drawing

$p2 = 'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\darul-habeeb-logo-raw.png'
$img2 = [System.Drawing.Image]::FromFile($p2)
$bmp2 = New-Object System.Drawing.Bitmap($img2)

$outsideWhite = 0
for ($y = 0; $y -lt $bmp2.Height; $y++) {
    for ($x = 0; $x -lt $bmp2.Width; $x++) {
        $c = $bmp2.GetPixel($x, $y)
        # Check pixels that are NOT the center book (say x < 15 or x > 80 or y < 5 or y > 85)
        if ($c.A -gt 0 -and ($x -lt 10 -or $x -gt 85 -or $y -lt 5)) {
            Write-Host "Non-transparent pixel outside logo bounds: ($x,$y) RGBA=$($c.R),$($c.G),$($c.B),$($c.A)"
            $outsideWhite++
        }
    }
}

Write-Host "Outside boundary non-transparent pixels: $outsideWhite"
$bmp2.Dispose()
$img2.Dispose()
