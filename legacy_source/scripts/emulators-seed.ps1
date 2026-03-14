$ErrorActionPreference = 'Stop'

$jdkRoot = Get-ChildItem 'C:\Program Files\Eclipse Adoptium' -Directory -ErrorAction SilentlyContinue |
  Sort-Object Name -Descending |
  Select-Object -First 1

if (-not $jdkRoot) {
  throw 'JDK not found in C:\Program Files\Eclipse Adoptium'
}

$jdkBin = Join-Path $jdkRoot.FullName 'bin'
$javaExe = Join-Path $jdkBin 'java.exe'

if (-not (Test-Path $javaExe)) {
  throw "java.exe not found at $javaExe"
}

$env:JAVA_HOME = $jdkRoot.FullName
$env:PATH = "$jdkBin;$env:PATH"

npx firebase-tools emulators:exec --only auth,firestore "node scripts/seed-emulator.mjs"