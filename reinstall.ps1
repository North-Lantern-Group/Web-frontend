$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Set-Location "C:\Users\osaed\Desktop\NLG web project"
Write-Host "Installing dependencies..."
npm install --force
Write-Host "`nDependencies installed. Starting server..."
npm run dev
