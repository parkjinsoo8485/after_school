param(
  [Parameter(Mandatory=$true)]
  [string]$ProjectId
)

$ErrorActionPreference = 'Stop'

function Exec-Step {
  param(
    [Parameter(Mandatory=$true)]
    [string]$Label,
    [Parameter(Mandatory=$true)]
    [string]$Command
  )

  Write-Host $Label
  Invoke-Expression $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Step failed: $Label"
  }
}

Exec-Step '[1/4] Install dependencies' 'npm install'
Exec-Step '[2/4] Build app' 'npm run build'
Exec-Step '[3/4] Deploy Firestore rules/indexes' "npx firebase-tools deploy --project $ProjectId --only firestore:rules,firestore:indexes"
Exec-Step '[4/4] Deploy Hosting' "npx firebase-tools deploy --project $ProjectId --only hosting"

Write-Host "Deployment complete for project: $ProjectId"