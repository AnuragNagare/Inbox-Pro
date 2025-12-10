# Launch All Inbox Pro Apps
# Run this script to start all apps on their respective ports

Write-Host "🚀 Inbox Pro - App Launcher" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$basePath = "D:\Inbox Pro\Codes\SAAS"

$apps = @(
    @{ Name = "API Email AI"; Path = "API Email AI email analysis and Send Email"; Port = 3001 },
    @{ Name = "Follow-up Analytics"; Path = "Follow up email and Analystics"; Port = 3005 },
    @{ Name = "Meeting Intent"; Path = "Meeting Intent"; Port = 3006 },
    @{ Name = "Priority Feedback"; Path = "Priority Feedback and Follow-up Automation"; Port = 3007 },
    @{ Name = "Smart Quick Reply"; Path = "Smart and Quick reply"; Port = 3008 },
    @{ Name = "Feedback Follow-up"; Path = "Feed back and Follow up"; Port = 3009 }
)

Write-Host "Available Apps:" -ForegroundColor Yellow
for ($i = 0; $i -lt $apps.Length; $i++) {
    Write-Host "  $($i + 1). $($apps[$i].Name) (Port $($apps[$i].Port))" -ForegroundColor White
}
Write-Host "  0. Launch All Apps" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Select app number to launch (or 0 for all)"

if ($choice -eq "0") {
    Write-Host "`n🚀 Launching all apps..." -ForegroundColor Green
    foreach ($app in $apps) {
        $fullPath = Join-Path $basePath $app.Path
        if (Test-Path $fullPath) {
            Write-Host "`n📱 Starting $($app.Name) on port $($app.Port)..." -ForegroundColor Cyan
            Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fullPath'; npm start"
            Start-Sleep -Seconds 2
        } else {
            Write-Host "⚠️  Path not found: $fullPath" -ForegroundColor Red
        }
    }
    Write-Host "`n✅ All apps are launching in separate windows!" -ForegroundColor Green
    Write-Host "💡 Wait for 'Compiled successfully!' message in each window" -ForegroundColor Yellow
} elseif ($choice -match '^\d+$' -and [int]$choice -ge 1 -and [int]$choice -le $apps.Length) {
    $app = $apps[[int]$choice - 1]
    $fullPath = Join-Path $basePath $app.Path
    if (Test-Path $fullPath) {
        Write-Host "`n📱 Starting $($app.Name) on port $($app.Port)..." -ForegroundColor Cyan
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fullPath'; npm start"
        Write-Host "✅ App is launching!" -ForegroundColor Green
    } else {
        Write-Host "❌ Path not found: $fullPath" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Invalid selection" -ForegroundColor Red
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

