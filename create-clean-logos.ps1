Add-Type -AssemblyName System.Drawing

function Process-MHS() {
    $srcPath = 'C:\Users\User\.gemini\antigravity\brain\1bcf8e43-dddd-426d-b761-9f2beed2d851\.user_uploaded\media_1791910983274.png'
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $src = New-Object System.Drawing.Bitmap($img)
    
    # Bounding box of logo: x ~ 15 to 110, y ~ 20 to 112
    # Output size: 240 x 240 (clean high-res transparent PNG)
    $w = 120; $h = 120
    $out = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Center the logo in the 120x120 box
    # Logo original center is around x=62, y=66
    $offsetX = [int]($w / 2 - 62)
    $offsetY = [int]($h / 2 - 66)
    
    for ($y = 0; $y -lt $src.Height; $y++) {
        for ($x = 0; $x -lt $src.Width; $x++) {
            $p = $src.GetPixel($x, $y)
            $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
            
            $destX = $x + $offsetX
            $destY = $y + $offsetY
            if ($destX -ge 0 -and $destX -lt $w -and $destY -ge 0 -and $destY -lt $h) {
                if ($lum -ge 225) {
                    # Pure background
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } elseif ($lum -le 130) {
                    # Solid dark navy stroke
                    # Rich clean brand navy: #0c3356 (RGB: 12, 51, 86)
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(255, 12, 51, 86))
                } else {
                    # Smooth anti-aliased edge
                    $alpha = [int](255 * (225 - $lum) / (225 - 130))
                    if ($alpha -gt 255) { $alpha = 255 }
                    if ($alpha -lt 0) { $alpha = 0 }
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb($alpha, 12, 51, 86))
                }
            }
        }
    }
    
    $outPath = 'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\mhs-logo-raw.png'
    $out.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "MHS transparent logo saved to $outPath"
    
    $out.Dispose()
    $src.Dispose()
    $img.Dispose()
}

function Point-In-Poly($px, $py, $poly) {
    $inside = $false
    $j = $poly.Length - 1
    for ($i = 0; $i -lt $poly.Length; $i++) {
        $xi = $poly[$i][0]; $yi = $poly[$i][1]
        $xj = $poly[$j][0]; $yj = $poly[$j][1]
        
        $intersect = (($yi -gt $py) -ne ($yj -gt $py)) -and ($px -lt ($xj - $xi) * ($py - $yi) / ($yj - $yi) + $xi)
        if ($intersect) { $inside = -not $inside }
        $j = $i
    }
    return $inside
}

function Process-DH() {
    $srcPath = 'C:\Users\User\.gemini\antigravity\brain\1bcf8e43-dddd-426d-b761-9f2beed2d851\.user_uploaded\media_1791910989663.png'
    $img = [System.Drawing.Image]::FromFile($srcPath)
    $src = New-Object System.Drawing.Bitmap($img)
    
    # Hexagon polygon points in source image
    # Top: (84, 23), Top-R: (113, 40), Bot-R: (113, 67), Bot: (84, 88), Bot-L: (55, 67), Top-L: (55, 40)
    $hexPoly = @(
        @(84, 22),
        @(113.5, 39.5),
        @(113.5, 67.5),
        @(84, 89),
        @(54.5, 67.5),
        @(54.5, 39.5)
    )
    
    $w = 120; $h = 120
    $out = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Center around x=84, y=65
    $offsetX = [int]($w / 2 - 84)
    $offsetY = [int]($h / 2 - 65)
    
    for ($y = 0; $y -lt $src.Height; $y++) {
        for ($x = 0; $x -lt $src.Width; $x++) {
            $p = $src.GetPixel($x, $y)
            $lum = 0.299 * $p.R + 0.587 * $p.G + 0.114 * $p.B
            
            $destX = $x + $offsetX
            $destY = $y + $offsetY
            if ($destX -lt 0 -or $destX -ge $w -or $destY -lt 0 -or $destY -ge $h) { continue }
            
            # Check if point is inside or immediately bordering hexagon
            $inHex = Point-In-Poly $x $y $hexPoly
            
            if ($inHex) {
                # Inside hexagon emblem:
                # Is it blue border/bottom?
                $isBlue = ($p.B -gt 90 -and ($p.B - $p.R) -gt 25)
                # Is it teal star?
                $isTeal = ($p.G -gt 150 -and $p.B -gt 150 -and $p.R -lt 160)
                # Is it white/cream book?
                if ($isTeal) {
                    # Vibrant crisp teal
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
                } elseif ($isBlue) {
                    # Solid deep blue
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
                } else {
                    # White open book inside the hexagon
                    # Make it pure clean white #FFFFFF!
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
                }
            } elseif ($y -ge 88 -and $x -ge 38 -and $x -le 130) {
                # Text area: "DARUL HABEEB" & "Making Values, Shaping Futures"
                if ($lum -ge 220) {
                    # Cream background
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } elseif ($lum -le 140) {
                    # Solid dark text
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(255, 15, 30, 45))
                } else {
                    # Anti-aliased text edge
                    $alpha = [int](255 * (220 - $lum) / (220 - 140))
                    if ($alpha -gt 255) { $alpha = 255 }
                    if ($alpha -lt 0) { $alpha = 0 }
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb($alpha, 15, 30, 45))
                }
            } else {
                # Check for anti-aliasing pixels around the hexagon perimeter (distance <= 1.5px from poly edge)
                $nearHex = $false
                for ($dy = -1; $dy -le 1; $dy++) {
                    for ($dx = -1; $dx -le 1; $dx++) {
                        if (Point-In-Poly ($x + $dx * 0.7) ($y + $dy * 0.7) $hexPoly) {
                            $nearHex = $true; break
                        }
                    }
                    if ($nearHex) { break }
                }
                
                if ($nearHex -and $lum -lt 210) {
                    $alpha = [int](255 * (220 - $lum) / (220 - 130))
                    if ($alpha -gt 255) { $alpha = 255 }
                    if ($alpha -lt 0) { $alpha = 0 }
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb($alpha, $p.R, $p.G, $p.B))
                } else {
                    # Pure transparent background
                    $out.SetPixel($destX, $destY, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                }
            }
        }
    }
    
    $outPath = 'C:\Users\User\.gemini\antigravity\scratch\mhs-daily-calendar\assets\darul-habeeb-logo-raw.png'
    $out.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Darul Habeeb transparent logo saved to $outPath"
    
    $out.Dispose()
    $src.Dispose()
    $img.Dispose()
}

Process-MHS
Process-DH
