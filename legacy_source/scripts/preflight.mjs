import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function detectJavaBin() {
  if (process.env.JAVA_HOME) {
    const java = path.join(process.env.JAVA_HOME, 'bin', 'java.exe');
    if (fs.existsSync(java)) return path.join(process.env.JAVA_HOME, 'bin');
  }

  const base = 'C:\\Program Files\\Eclipse Adoptium';
  if (!fs.existsSync(base)) return null;

  const dirs = fs
    .readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith('jdk-'))
    .map((d) => d.name)
    .sort()
    .reverse();

  if (!dirs.length) return null;
  const bin = path.join(base, dirs[0], 'bin');
  return fs.existsSync(path.join(bin, 'java.exe')) ? bin : null;
}

function run(cmd, label, env = process.env) {
  try {
    const out = execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], env }).toString().trim();
    console.log(`OK  ${label}`);
    if (out) console.log(out.split('\n')[0]);
    return true;
  } catch (err) {
    console.log(`FAIL ${label}`);
    const stderr = err?.stderr?.toString()?.trim();
    const stdout = err?.stdout?.toString()?.trim();
    const msg = stderr || stdout || err.message;
    if (msg) console.log(msg.split('\n')[0]);
    return false;
  }
}

const javaBin = detectJavaBin();
const envWithJava = {
  ...process.env,
  PATH: javaBin ? `${javaBin};${process.env.PATH || ''}` : process.env.PATH,
  JAVA_HOME: javaBin ? path.dirname(javaBin) : process.env.JAVA_HOME,
};

console.log('Running local preflight checks...');
const checks = [
  run('node -v', 'Node.js installed'),
  run('npm -v', 'npm installed'),
  run('java -version', 'Java installed for Firestore emulator', envWithJava),
  run('npx firebase-tools --version', 'firebase-tools available', envWithJava),
  run('npx firebase-tools projects:list --json', 'firebase-tools authenticated', envWithJava),
];

const allGood = checks.every(Boolean);
if (!allGood) {
  console.log('\nPreflight failed. Fix failed items, then retry: npm run preflight');
  process.exit(1);
}

console.log('\nPreflight passed. You can run: npm run emulators:seed');