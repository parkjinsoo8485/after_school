import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = resolve(__dirname, 'src');
const srcFiles = fs.existsSync(srcDir) ? fs.readdirSync(srcDir).filter(f => f.endsWith('.html')) : [];

const screensDir = resolve(__dirname, 'screens');
const screensFiles = fs.existsSync(screensDir) ? fs.readdirSync(screensDir).filter(f => f.endsWith('.html')) : [];

const input = {
  main: resolve(__dirname, 'index.html'),
};

srcFiles.forEach(file => {
  const name = 'src_' + file.replace('.html', '');
  input[name] = resolve(srcDir, file);
});

screensFiles.forEach(file => {
  const name = 'screens_' + file.replace('.html', '');
  input[name] = resolve(screensDir, file);
});

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input,
    },
  },
});
