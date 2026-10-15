// Genera la imagen para compartir (img/og-mara-schmitman.png) y el ícono de iPhone (img/apple-touch-icon.png)
// sacándole foto con Chrome a og.html e icon.html. Corre antes de cada build (ver "build" en package.json).
// Si no hay Chrome disponible, avisa y sigue: el build no se rompe.
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
try {
  let pw;
  try { pw = await import('playwright-core'); } catch {
    execSync('npm i --no-save --legacy-peer-deps --no-audit --no-fund playwright-core', { cwd: path.join(dir, '..'), stdio: 'inherit' });
    pw = await import('playwright-core');
  }
  const browser = await pw.chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : { channel: 'chrome' });
  const shot = async (file, width, height, out) => {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('file://' + path.join(dir, file), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(dir, '..', 'public', 'img', out) });
    console.log('og: generado', out);
  };
  await shot('og.html', 1200, 630, 'og-mara-schmitman.png');
  await shot('icon.html', 180, 180, 'apple-touch-icon.png');
  await browser.close();
} catch (e) {
  console.warn('og: no se pudo generar la imagen para compartir (sigue el build):', e.message);
}
