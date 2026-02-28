Param(
    [string]$DeploymentUrl
)

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI not found — installing globally..." -ForegroundColor Yellow
    npm i -g vercel
}

Write-Host "Make sure you're logged into Vercel. If not, the script will prompt you." -ForegroundColor Cyan
vercel login

if (-not $DeploymentUrl) {
    Write-Host "No deployment URL provided. Listing recent deployments (run the script again with the chosen deployment URL):" -ForegroundColor Yellow
    vercel ls --prod
    Write-Host "Usage: .\add-vercel-domain.ps1 <your-deployment-url>" -ForegroundColor Cyan
    exit 1
}

Write-Host "Adding domain topspeed.vercel.app to the project..." -ForegroundColor Cyan
vercel domains add topspeed.vercel.app || Write-Host "Domain add command returned non-zero — it may already exist or be unavailable." -ForegroundColor Yellow

Write-Host "Setting alias from deployment to topspeed.vercel.app..." -ForegroundColor Cyan
vercel alias set $DeploymentUrl topspeed.vercel.app

Write-Host "If the alias command succeeded, make sure the domain is set as Primary in the Vercel dashboard if needed." -ForegroundColor Green
Write-Host "If you hit 'domain unavailable', the `vercel.app` name may be taken or reserved. Consider using a custom domain and pointing its CNAME to vercel." -ForegroundColor Yellow
