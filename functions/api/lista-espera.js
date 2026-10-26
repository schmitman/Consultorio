// Lista de espera del chat. El navegador pega a /api/lista-espera y esto reenvía a Apps Script,
// que agrega una fila y le escribe a Mara. El secreto no viaja en el JavaScript del sitio.
// LISTA_ESPERA_SECRET y LISTA_ESPERA_URL (variables del proyecto Pages) pisan el respaldo.

const URL_RESPALDO = 'https://script.google.com/macros/s/AKfycbzHawXsF1rPq7XTKzfxmvJOROZiw2wZScsY-TEz74E-0kVCW3faOPQISigu70oeadzN/exec';
const SECRETO_RESPALDO = 'le-7Qm4xR2vK9pT3wZ8';
const MAX_BYTES = 16 * 1024;
const HOSTS_REDIRECT = new Set(['script.google.com', 'script.googleusercontent.com']);

const emailValido = (e) => typeof e === 'string' && e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });
}

function texto(valor, max) {
  if (typeof valor !== 'string') return '';
  return valor.replace(/\u0000/g, '').trim().slice(0, max);
}

// Una celda de la hoja: si llega un array ("Lunes", "Martes") se aplana a texto.
function lista(valor) {
  const items = Array.isArray(valor) ? valor : typeof valor === 'string' ? valor.split(',') : [];
  return items
    .filter((x) => typeof x === 'string')
    .map((x) => x.replace(/\u0000/g, '').trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((x) => x.slice(0, 40))
    .join(', ');
}

function honeypotLleno(website) {
  if (website == null) return false;
  if (typeof website === 'string') return website.trim() !== '';
  if (Array.isArray(website)) return website.some((x) => String(x ?? '').trim() !== '');
  return true;
}

function urlDestino(env) {
  const candidato = texto(env?.LISTA_ESPERA_URL, 500);
  try {
    const u = new URL(candidato);
    if (u.protocol === 'https:') return u.toString();
  } catch { /* sigue el respaldo */ }
  return URL_RESPALDO;
}

function secreto(env) {
  return texto(env?.LISTA_ESPERA_SECRET, 200) || SECRETO_RESPALDO;
}

async function leerCuerpo(request) {
  const anunciado = request.headers.get('content-length');
  if (anunciado !== null) {
    const n = Number(anunciado);
    if (!Number.isFinite(n) || n < 0) return { error: 400 };
    if (n > MAX_BYTES) return { error: 413 };
  }
  if (!request.body) return { error: 400 };
  const reader = request.body.getReader();
  const partes = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        return { error: 413 };
      }
      partes.push(value);
    }
  } catch {
    return { error: 400 };
  }
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const parte of partes) {
    buf.set(parte, offset);
    offset += parte.byteLength;
  }
  return { texto: new TextDecoder().decode(buf) };
}

// Apps Script responde 302 y el JSON queda en el destino. El POST ya se entregó: el redirect se sigue con GET.
async function postear(url, payload) {
  let actual = url;
  let res = await fetch(actual, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'manual',
  });
  for (let i = 0; i < 4 && res.status >= 300 && res.status < 400; i++) {
    const loc = res.headers.get('location');
    if (!loc) break;
    const siguiente = new URL(loc, actual);
    if (siguiente.protocol !== 'https:' || !HOSTS_REDIRECT.has(siguiente.hostname)) break;
    actual = siguiente.toString();
    res = await fetch(actual, { method: 'GET', redirect: 'manual' });
  }
  return res;
}

async function leerOk(res) {
  const crudo = await res.text();
  if (crudo.length > 64 * 1024) return null;
  try {
    return JSON.parse(crudo.replace(/^\)\]\}',?\n/, ''));
  } catch {
    return null;
  }
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Método no permitido' }, 405, { allow: 'POST' });
  }

  const cuerpo = await leerCuerpo(request);
  if (cuerpo.error) {
    const error = cuerpo.error === 413 ? 'Demasiado grande' : 'No se pudo leer';
    return json({ ok: false, error }, cuerpo.error);
  }

  let body;
  try {
    body = JSON.parse(cuerpo.texto);
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400);
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ ok: false, error: 'JSON inválido' }, 400);
  }

  // Honeypot: si viene con algo, no reenviamos (así no le llega un mail a Mara) y respondemos ok.
  if (honeypotLleno(body.website)) return json({ ok: true });

  const email = texto(body.email, 254);
  if (!emailValido(email)) return json({ ok: false, error: 'Email inválido' }, 400);

  const payload = {
    secret: secreto(env),
    nombre: texto(body.nombre, 120),
    email,
    grupo: texto(body.grupo, 200),
    dias: lista(body.dias),
    franjas: lista(body.franjas),
    desde: texto(body.desde, 80),
    mensaje: texto(body.mensaje, 4000),
    origen: texto(body.origen, 800),
    website: '',
  };

  try {
    const res = await postear(urlDestino(env), payload);
    const data = await leerOk(res);
    if (!res.ok || !data || data.ok !== true) {
      console.error(JSON.stringify({ event: 'lista_espera_upstream', status: res.status }));
      return json({ ok: false, error: 'No se pudo anotar' }, 502);
    }
    return json({ ok: true });
  } catch {
    console.error(JSON.stringify({ event: 'lista_espera_upstream', status: 0 }));
    return json({ ok: false, error: 'No se pudo anotar' }, 502);
  }
}
