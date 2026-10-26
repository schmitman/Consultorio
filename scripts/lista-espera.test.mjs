// Prueba la Pages Function sin pegarle a Apps Script (eso le manda un mail a Mara).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SECRETO = 'le-7Qm4xR2vK9pT3wZ8';
const URL_APPS = 'https://script.google.com/macros/s/AKfycbzHawXsF1rPq7XTKzfxmvJOROZiw2wZScsY-TEz74E-0kVCW3faOPQISigu70oeadzN/exec';

const dir = await mkdtemp(path.join(tmpdir(), 'lista-espera-'));
await writeFile(path.join(dir, 'package.json'), '{"type":"module"}\n');
await writeFile(path.join(dir, 'lista-espera.js'), await readFile(path.join(raiz, 'functions/api/lista-espera.js')));
const { onRequest } = await import(pathToFileURL(path.join(dir, 'lista-espera.js')).href);

const fetchReal = globalThis.fetch;
let llamadas;

function mockFetch(handler) {
  llamadas = [];
  globalThis.fetch = async (url, init) => {
    const registro = { url: String(url), method: init?.method || 'GET', body: init?.body ? String(init.body) : '' };
    llamadas.push(registro);
    return handler(registro, llamadas.length);
  };
}

test.afterEach(() => {
  globalThis.fetch = fetchReal;
});

test.after(async () => {
  globalThis.fetch = fetchReal;
  await rm(dir, { recursive: true, force: true });
});

function post(body, headers = {}) {
  const crudo = typeof body === 'string' ? body : JSON.stringify(body);
  return new Request('https://maraschmitman.com/api/lista-espera', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...headers },
    body: crudo,
  });
}

const anotacion = {
  nombre: 'Ada Lovelace',
  email: 'ada@ejemplo.com',
  grupo: 'Laboratorio grupal: inserción al mercado',
  dias: ['Lunes', 'Miércoles'],
  franjas: ['Tarde'],
  desde: 'En 1 o 2 meses',
  mensaje: 'Mis respuestas del diagnóstico:\n- ¿En qué punto de tu trayectoria estás hoy? Busco mi primer trabajo formal',
  origen: 'https://maraschmitman.com/?utm_source=ig&utm_campaign=grupos#programas',
  website: '',
  secret: 'esto-no-tiene-que-viajar',
};

async function llamar(request, env = {}) {
  const res = await onRequest({ request, env });
  const texto = await res.text();
  let data = null;
  try { data = JSON.parse(texto); } catch { /* respuesta no json */ }
  return { status: res.status, texto, data, headers: res.headers };
}

test('solo acepta POST y responde JSON', async () => {
  mockFetch(() => new Response('no'));
  const res = await llamar(new Request('https://maraschmitman.com/api/lista-espera', { method: 'GET' }));
  assert.equal(res.status, 405);
  assert.equal(res.data.ok, false);
  assert.equal(res.headers.get('allow'), 'POST');
  assert.equal(res.headers.get('content-type').includes('application/json'), true);
  assert.equal(llamadas.length, 0);
});

test('rechaza un email inválido y no reenvía', async () => {
  mockFetch(() => new Response('no'));
  const res = await llamar(post({ ...anotacion, email: 'no-es-un-mail' }));
  assert.equal(res.status, 400);
  assert.equal(res.data.ok, false);
  assert.equal(llamadas.length, 0);
});

test('el honeypot corto-circuita sin reenviar', async () => {
  mockFetch(() => new Response('no'));
  const res = await llamar(post({ ...anotacion, website: 'https://spam.test' }));
  assert.equal(res.status, 200);
  assert.deepEqual(res.data, { ok: true });
  assert.equal(llamadas.length, 0);
  assert.equal(res.texto.includes(SECRETO), false);
});

test('un website vacío no es honeypot', async () => {
  mockFetch(() => Response.json({ ok: true }));
  const res = await llamar(post({ ...anotacion, website: '   ' }));
  assert.equal(res.status, 200);
  assert.equal(llamadas.length, 1);
});

test('limita el tamaño y no reenvía', async () => {
  mockFetch(() => new Response('no'));
  const res = await llamar(post({ ...anotacion, mensaje: 'a'.repeat(17 * 1024) }));
  assert.equal(res.status, 413);
  assert.equal(llamadas.length, 0);
});

test('rechaza JSON inválido', async () => {
  mockFetch(() => new Response('no'));
  const res = await llamar(post('{'));
  assert.equal(res.status, 400);
  assert.equal(llamadas.length, 0);
});

test('sigue el redirect de Apps Script y no filtra el secreto', async () => {
  mockFetch((registro, n) => {
    if (n === 1) {
      return new Response('', {
        status: 302,
        headers: { location: 'https://script.googleusercontent.com/macros/echo?user_content_key=abc' },
      });
    }
    return Response.json({ ok: true, echo: 'secreto-no' });
  });
  const res = await llamar(post(anotacion), {
    LISTA_ESPERA_SECRET: 'secreto-de-env',
    LISTA_ESPERA_URL: 'https://script.google.com/macros/s/custom/exec',
  });
  assert.equal(res.status, 200);
  assert.deepEqual(res.data, { ok: true });
  assert.equal(res.texto.includes('secreto-de-env'), false);
  assert.equal(res.texto.includes(SECRETO), false);
  assert.equal(llamadas.length, 2);
  assert.equal(llamadas[0].url, 'https://script.google.com/macros/s/custom/exec');
  assert.equal(llamadas[0].method, 'POST');
  assert.equal(llamadas[1].method, 'GET');
  assert.equal(llamadas[1].url, 'https://script.googleusercontent.com/macros/echo?user_content_key=abc');
  const enviado = JSON.parse(llamadas[0].body);
  assert.equal(enviado.secret, 'secreto-de-env');
  assert.equal(enviado.email, 'ada@ejemplo.com');
  assert.equal(enviado.nombre, 'Ada Lovelace');
  assert.equal(enviado.dias, 'Lunes, Miércoles');
  assert.equal(enviado.franjas, 'Tarde');
  assert.equal(enviado.desde, 'En 1 o 2 meses');
  assert.equal(enviado.website, '');
  assert.match(enviado.mensaje, /primer trabajo formal/);
  assert.match(enviado.origen, /utm_source=ig/);
});

test('sin variables de entorno usa el respaldo', async () => {
  mockFetch(() => Response.json({ ok: true }));
  const res = await llamar(post(anotacion), {});
  assert.equal(res.status, 200);
  assert.equal(llamadas[0].url, URL_APPS);
  const enviado = JSON.parse(llamadas[0].body);
  assert.equal(enviado.secret, SECRETO);
  assert.equal(res.texto.includes(SECRETO), false);
});

test('una URL http o un secreto vacío caen al respaldo', async () => {
  mockFetch(() => Response.json({ ok: true }));
  await llamar(post(anotacion), { LISTA_ESPERA_SECRET: '   ', LISTA_ESPERA_URL: 'http://inseguro.example/exec' });
  assert.equal(llamadas[0].url, URL_APPS);
  assert.equal(JSON.parse(llamadas[0].body).secret, SECRETO);
});

test('no sigue un redirect fuera de Apps Script', async () => {
  mockFetch(() => new Response('', { status: 302, headers: { location: 'https://evil.example/robo' } }));
  const res = await llamar(post(anotacion));
  assert.equal(res.status, 502);
  assert.equal(res.data.ok, false);
  assert.equal(llamadas.length, 1);
});

test('si Apps Script no confirma, responde error', async () => {
  mockFetch(() => Response.json({ ok: false }, { status: 200 }));
  const res = await llamar(post(anotacion));
  assert.equal(res.status, 502);
  assert.equal(res.data.ok, false);
});

test('si el reenvío falla, responde error', async () => {
  mockFetch(() => { throw new Error('red caída'); });
  const res = await llamar(post(anotacion));
  assert.equal(res.status, 502);
  assert.equal(res.data.ok, false);
  assert.equal(res.texto.includes(SECRETO), false);
});
