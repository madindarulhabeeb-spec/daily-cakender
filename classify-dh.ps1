Add-Type -AssemblyName System.Drawing

$p2 = 'C:\Users\User\.gemini\antigravity\brain\1bcf8e43-dddd-426d-b761-9f2beed2d851\.user_uploaded\media_1791910989663.png'
$img2 = [System.Drawing.Image]::FromFile($p2)
$bmp2 = New-Object System.Drawing.Bitmap($img2)

Write-Host "Analyzing all pixels in Darul Habeeb source..."

$bgCount = 0
$logoCount = 0
for ($y = 0; $y -lt $bmp2.Height; $y++) {
    for ($x = 0; $x -lt $bmp2.Width; $x++) {
        $p = $bmp2.GetPixel($x, $y)
        $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
        
        # Is it part of the emblem?
        # 1. Dark text (y >= 88): lum < 150
        $isText = ($y -ge 88 -and $lum -lt 150 -and $x -ge 38 -and $x -le 130)
        # 2. Blue parts of hexagon:
        $isBlue = ($y -lt 88 -and $p.B -gt 70 -and ($p.B - $p.R) -gt 15)
        # 3. Teal star:
        $isTeal = ($y -ge 35 -and $y -le 60 -and $x -ge 70 -and $x -le 100 -and $p.G -gt 140 -and $p.B -gt 140 -and $p.R -lt 160)
        # 4. White book inside hexagon:
        # Book is strictly between x=62 and x=106, y=32 and y=75
        $isBook = ($x -ge 62 -and $x -le 106 -and $y -ge 32 -and $y -le 75 -and $lum -gt 200 -and -not $isTeal -and -not $isBlue)
        
        if ($isText -or $isBlue -or $isTeal -or $isBook) {
            $logoCount++
        } else {
            $bgCount++
        }
    }
}

Write-Host "Classified: Logo pixels = $logoCount, Background pixels = $bgCount (Total = $($bmp2.Width * $bmp2.Height))"
$bmp2.Dispose()
$img2.Dispose()
