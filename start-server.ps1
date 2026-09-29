# MHS Darul Habeeb Daily Calendar - Local Web Server
# Allows testing on PC and accessing from Mobile phone via local Wi-Fi network.

$port = 8080
$hostIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback' -and $_.IPAddress -notmatch '^169\.' } | Select-Object -First 1).IPAddress
if (-not $hostIP) { $hostIP = "localhost" }

$root = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")

try {
    $listener.Start()
} catch {
    # If wildcard binding requires admin, fall back to localhost
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  MHS Darul Habeeb Daily Calendar Server Running!         " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  PC Local URL:    http://localhost:$port/" -ForegroundColor Yellow
if ($hostIP -ne "localhost") {
    Write-Host "  Mobile (Wi-Fi):  http://${hostIP}:$port/" -ForegroundColor Magenta
}
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

# Open default browser automatically
Start-Process "http://localhost:$port/"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq "/") {
        $localPath = "index.html"
    }

    $filePath = Join-Path $root $localPath.Replace('/', '\')

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css; charset=utf-8" }
            ".js"   { "application/javascript; charset=utf-8" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".svg"  { "image/svg+xml" }
            ".json" { "application/json; charset=utf-8" }
            default { "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
}
