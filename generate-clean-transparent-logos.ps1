Add-Type -AssemblyName System.Drawing

function Build-MHS() {
    $srcPath = 'C:\Users\User\.gemini\antigravity\brain\1bcf8e43-dddd-426d-b761-9f2beed2d851\.user_uploaded\media_1791910983274.png'
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $src = New-Object System.Drawing.Bitmap($img)
    
    $cropX = 14; $cropY = 18; $cropW = 98; $cropH = 96
    $out = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $sx = $x + $cropX
            $sy = $y + $cropY
            if ($sx -ge 0 -and $sx -lt $src.Width -and $sy -ge 0 -and $sy -lt $src.Height) {
                $p = $src.GetPixel($sx, $sy)
                $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
                
                $navyR = 12; $navyG = 53; $navyB = 89
                
                # Any pixel with lum >= 200 is background -> 100% transparent!
                if ($lum -ge 200) {
                    $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } elseif ($lum -le 130) {
                    # Solid dark stroke
                    $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $navyR, $navyG, $navyB))
                } else {
                    # Smooth anti-aliased alpha edge
                    $alpha = [int](255 * (200 - $lum) / (200 - 130))
                    if ($alpha -gt 255) { $alpha = 255 }
                    if ($alpha -lt 0) { $alpha = 0 }
                    $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $navyR, $navyG, $navyB))
                }
            }
        }
    }
    
    # Save to both scratch assets and Downloads assets
    $paths = @(
        'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\mhs-logo-raw.png',
        'C:\Users\User\Downloads\mhs-daily-calendar\assets\mhs-logo-raw.png'
    )
    foreach ($p in $paths) {
        $out.Save($p, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "MHS saved to $p"
    }
    
    $out.Dispose()
    $src.Dispose()
    $img.Dispose()
}

function Build-DH() {
    $srcPath = 'C:\Users\User\.gemini\antigravity\brain\1bcf8e43-dddd-426d-b761-9f2beed2d851\.user_uploaded\media_1791910989663.png'
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $src = New-Object System.Drawing.Bitmap($img)
    $w = $src.Width
    $h = $src.Height
    
    $cropX = 38; $cropY = 18; $cropW = 94; $cropH = 92
    $out = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Define exact hexagon polygon vertices in source image
    # Top: (84, 23.5)
    # Top-Right: (113, 39.5)
    # Bottom-Right: (113, 67.5)
    # Bottom: (84, 88.5)
    # Bottom-Left: (55, 67.5)
    # Top-Left: (55, 39.5)
    $hexPoly = @(
        @(84.0, 23.0),
        @(113.0, 39.5),
        @(113.0, 67.5),
        @(84.0, 88.5),
        @(55.0, 67.5),
        @(55.0, 39.5)
    )
    
    function InHex($px, $py) {
        $inside = $false
        $j = $hexPoly.Length - 1
        for ($i = 0; $i -lt $hexPoly.Length; $i++) {
            $xi = $hexPoly[$i][0]; $yi = $hexPoly[$i][1]
            $xj = $hexPoly[$j][0]; $yj = $hexPoly[$j][1]
            if ((($yi -gt $py) -ne ($yj -gt $py)) -and ($px -lt ($xj - $xi) * ($py - $yi) / ($yj - $yi) + $xi)) {
                $inside = -not $inside
            }
            $j = $i
        }
        return $inside
    }
    
    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $sx = $x + $cropX
            $sy = $y + $cropY
            if ($sx -ge 0 -and $sx -lt $w -and $sy -ge 0 -and $sy -lt $h) {
                $p = $src.GetPixel($sx, $sy)
                $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
                
                $insideHex = InHex $sx $sy
                
                if ($insideHex) {
                    # Pixel is INSIDE the hexagon emblem!
                    $isTeal = ($p.G -gt 140 -and $p.B -gt 140 -and $p.R -lt 160)
                    $isBlue = ($p.B -gt 70 -and ($p.B - $p.R) -gt 15)
                    
                    if ($isTeal) {
                        # Vibrant teal star
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 50, 203, 182))
                    } elseif ($isBlue) {
                        # Solid rich blue hexagon border & chevron
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 10, 84, 140))
                    } else {
                        # Solid clean white book #FFFFFF inside hexagon!
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
                    }
                } elseif ($sy -ge 88 -and $sx -ge 40 -and $sx -le 128) {
                    # Text below emblem: "DARUL HABEEB" & "Making Values, Shaping Futures"
                    if ($lum -ge 215) {
                        # Background between/around text -> 100% transparent!
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    } elseif ($lum -le 135) {
                        # Solid dark text
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 14, 28, 44))
                    } else {
                        # Anti-aliased text edge
                        $alpha = [int](255 * (215 - $lum) / (215 - 135))
                        if ($alpha -gt 255) { $alpha = 255 }
                        if ($alpha -lt 0) { $alpha = 0 }
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 14, 28, 44))
                    }
                } else {
                    # Check if pixel is within 1.5 pixels of the hexagon border for anti-aliasing
                    $nearBorder = $false
                    for ($d = -1; $d -le 1; $d++) {
                        if (InHex ($sx + $d * 0.8) $sy -or InHex $sx ($sy + $d * 0.8)) {
                            $nearBorder = $true; break
                        }
                    }
                    
                    if ($nearBorder -and $p.B -gt 70 -and ($p.B - $p.R) -gt 10) {
                        # Anti-aliased outer edge of hexagon
                        $alpha = [int](255 * (220 - $lum) / (220 - 130))
                        if ($alpha -gt 255) { $alpha = 255 }
                        if ($alpha -lt 0) { $alpha = 0 }
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 10, 84, 140))
                    } else {
                        # Pure transparent background -> Alpha = 0!
                        $out.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    }
                }
            }
        }
    }
    
    $paths = @(
        'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\darul-habeeb-logo-raw.png',
        'C:\Users\User\Downloads\mhs-daily-calendar\assets\darul-habeeb-logo-raw.png'
    )
    foreach ($p in $paths) {
        $out.Save($p, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Host "DH saved to $p"
    }
    
    $out.Dispose()
    $src.Dispose()
    $img.Dispose()
}

Build-MHS
Build-DH
