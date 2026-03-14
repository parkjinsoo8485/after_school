import { spawn } from 'node:child_process';
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

function quoteArg(arg) {
  if (!arg.includes(' ') && !arg.includes('"')) return arg;
  return `"${arg.replace(/"/g, '\\"')}"`;
}

const javaBin = detectJavaBin();
const env = {
  ...process.env,
  PATH: javaBin ? `${javaBin};${process.env.PATH || ''}` : process.env.PATH,
  JAVA_HOME: javaBin ? path.dirname(javaBin) : process.env.JAVA_HOME,
};

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node scripts/run-firebase-with-java.mjs <firebase-tools args...>');
  process.exit(1);
}

const command = `npx firebase-tools ${args.map(quoteArg).join(' ')}`;
const child = spawn('cmd.exe', ['/d', '/s', '/c', command], {
  stdio: 'inherit',
  shell: false,
  env,
});

child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

child.on('exit', (code) => process.exit(code ?? 1));