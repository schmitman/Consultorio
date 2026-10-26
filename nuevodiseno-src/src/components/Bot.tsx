import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { QUESTIONS, PROGRAM_NAMES, EMAIL, mailto, type Score } from '../content';
import { track } from '../analytics';

// Mini bot de "Hablemos": hace las 4 preguntas del diagnóstico, recomienda un formato y, si la persona quiere,
// arma un mail para Mara con sus respuestas, nombre y email. Para los grupales, anota a la persona en la lista de espera
// con los días, franjas y desde cuándo puede empezar. Esa anotación se guarda sola; si falla, queda el mail como respaldo.

// Cualquier botón del sitio puede abrir el bot con abrirBot(); con el nombre de un grupo, abre directo la lista de espera
const EVENTO = 'abrir-bot';
export const abrirBot = (grupo?: string) => window.dispatchEvent(new CustomEvent(EVENTO, { detail: grupo }));

type Msg = { de: 'bot' | 'yo'; texto: string; nota?: string };
type Etapa = 'inicio' | 'pregunta' | 'resultado' | 'grupo' | 'dias' | 'franja' | 'desde' | 'nombre' | 'email' | 'caso' | 'enviando' | 'anotada' | 'listo';

const GRUPOS = [PROGRAM_NAMES.insercion_grupal, PROGRAM_NAMES.pivot_grupal];
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const FRANJAS = ['Mañana', 'Tarde', 'Noche'];
const DESDE = ['Lo antes posible', 'En 1 o 2 meses', 'Más adelante'];
const INTRO_LISTA = 'Los grupos son de 4 a 6 personas y arrancan cuando se completa el cupo. Anotarte no te compromete a pagar: cuando haya un grupo que coincida con tus horarios, Mara te escribe con la fecha y el link de pago.';

const recomendar = (score: Score) => {
  const s = (k: keyof Score) => score[k] ?? 0;
  const camino = s('pivot') > s('insercion') ? 'pivot' : 'insercion';
  const modo = s('grupal') > s('individual') ? 'grupal' : 'individual';
  let key = `${camino}_${modo}`;
  if (s('diag') > s('programa') && modo === 'individual') key = 'diag';
  return { name: PROGRAM_NAMES[key], camino: camino === 'pivot' ? 'cambio de rumbo' : 'inserción en el mercado', modo };
};

const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());

// La página en la que está la persona, más los utm que hayan llegado en el link.
const origenLista = () => {
  const actual = new URL(window.location.href);
  const pagina = new URL(actual.pathname || '/', actual.origin);
  pagina.hash = actual.hash;
  actual.searchParams.forEach((valor, clave) => {
    if (/^utm_/i.test(clave) && valor) pagina.searchParams.append(clave, valor);
  });
  return pagina.toString();
};

export const Bot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [log, setLog] = useState<Msg[]>([]);
  const [etapa, setEtapa] = useState<Etapa>('inicio');
  const [q, setQ] = useState(0);
  const [score, setScore] = useState<Score>({});
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [caso, setCaso] = useState('');
  const [campo, setCampo] = useState('');
  const [modo, setModo] = useState<'diagnostico' | 'lista'>('diagnostico');
  const [grupo, setGrupo] = useState('');
  const [marcados, setMarcados] = useState<string[]>([]);
  const [dias, setDias] = useState<string[]>([]);
  const [franjas, setFranjas] = useState<string[]>([]);
  const [desde, setDesde] = useState('');
  const [error, setError] = useState('');
  const lista = useRef<HTMLDivElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const tanda = useRef(0);

  const bot = (...textos: (string | Msg)[]) => setLog((l) => [...l, ...textos.map((t) => (typeof t === 'string' ? { de: 'bot' as const, texto: t } : t))]);
  const yo = (texto: string) => setLog((l) => [...l, { de: 'yo', texto }]);

  const empezar = () => {
    tanda.current += 1;
    setLog([]); setScore({}); setRespuestas([]); setQ(0); setCampo(''); setError(''); setModo('diagnostico');
    bot('Hola. Te hago 4 preguntas cortas sobre tu carrera y tu momento actual, y te digo qué formato te conviene.', QUESTIONS[0].t);
    setEtapa('pregunta');
  };

  // Lista de espera de los grupales. Desde el resultado del diagnóstico sigue la misma conversación; desde Programas arranca de cero.
  const empezarLista = (g?: string, seguir = false) => {
    tanda.current += 1;
    if (!seguir) { setLog([]); setScore({}); setRespuestas([]); }
    setModo('lista'); setDias([]); setFranjas([]); setDesde(''); setMarcados([]); setCampo(''); setError('');
    track('lista_espera_inicio', { grupo: g ?? '' });
    if (g) {
      setGrupo(g);
      bot(INTRO_LISTA, `Te anoto para: ${g}.`, '¿Qué días te quedan bien? Podés marcar varios.');
      setEtapa('dias');
    } else {
      bot(INTRO_LISTA, '¿Para qué grupo?');
      setEtapa('grupo');
    }
  };

  const abrir = (g?: string) => {
    setOpen(true);
    track('bot_abierto');
    if (g) empezarLista(g);
    else if (log.length === 0) empezar();
  };

  // Abrir desde otros botones (ej. "Diagnóstico de 2 minutos") o con el link viejo #termometro
  const abrirRef = useRef(abrir);
  abrirRef.current = abrir;
  useEffect(() => {
    const on = (e: Event) => abrirRef.current((e as CustomEvent<string | undefined>).detail);
    window.addEventListener(EVENTO, on);
    if (window.location.hash === '#termometro') abrirRef.current();
    return () => window.removeEventListener(EVENTO, on);
  }, []);

  // El botón flotante aparece al dejar la portada y se esconde al llegar a Hablemos, que ya tiene su propio botón
  useEffect(() => {
    const onScroll = () => {
      const contacto = document.getElementById('contacto');
      const llegoAlFinal = contacto ? contacto.getBoundingClientRect().top < window.innerHeight * 0.7 : false;
      setShowFab(window.scrollY > window.innerHeight * 0.5 && !llegoAlFinal);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  // Cerrar con Escape; bajar al último mensaje
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  // Dejar el último mensaje del bot arriba, con las opciones debajo
  useEffect(() => {
    const box = lista.current;
    if (!box) return;
    const ultimos = box.querySelectorAll<HTMLElement>('[data-bot]');
    const ultimo = ultimos[ultimos.length - 1];
    box.scrollTop = ultimo ? ultimo.offsetTop - 16 : box.scrollHeight;
  }, [log, etapa, open]);
  useEffect(() => { if (open) panel.current?.querySelector<HTMLElement>('button[data-opcion], input, textarea')?.focus({ preventScroll: true }); }, [open, etapa, q]);

  const elegirGrupo = (g: string) => {
    yo(g); setGrupo(g);
    bot('¿Qué días te quedan bien? Podés marcar varios.');
    setEtapa('dias');
  };
  const confirmarMarcados = () => {
    if (marcados.length === 0) return;
    yo(marcados.join(', '));
    if (etapa === 'dias') {
      setDias(marcados);
      bot('¿En qué franja horaria? Podés marcar varias.');
      setEtapa('franja');
    } else {
      setFranjas(marcados);
      bot('¿Desde cuándo podrías empezar?');
      setEtapa('desde');
    }
    setMarcados([]);
  };
  const elegirDesde = (d: string) => {
    yo(d); setDesde(d);
    bot('¿Cómo te llamás? Nombre y apellido.');
    setEtapa('nombre');
  };


  const responder = (label: string, pts: Score) => {
    yo(label);
    const nuevo = { ...score };
    for (const k in pts) nuevo[k as keyof Score] = (nuevo[k as keyof Score] ?? 0) + (pts[k as keyof Score] ?? 0);
    setScore(nuevo);
    setRespuestas((r) => [...r, label]);
    if (q + 1 < QUESTIONS.length) {
      setQ(q + 1);
      bot(QUESTIONS[q + 1].t);
    } else {
      const r = recomendar(nuevo);
      track('diagnostico_completo', { programa: r.name });
      bot(
        `Por lo que respondiste, tu momento se parece más a un proceso de ${r.camino}, y te conviene arrancar en formato ${r.modo}.`,
        { de: 'bot', texto: `Te recomiendo: ${r.name}.`, nota: 'Es una orientación inicial; lo confirmamos cuando leo tu caso.' },
        r.name === PROGRAM_NAMES.diag ? '¿Querés agendarlo directo o contarle tu caso a Mara primero?'
          : r.modo === 'grupal' ? '¿Querés sumarte a la lista de espera del próximo grupo o contarle tu caso a Mara primero?'
          : '¿Querés contarle tu caso a Mara?',
      );
      setEtapa('resultado');
    }
  };

  const enviarCampo = (e: React.FormEvent) => {
    e.preventDefault();
    const v = campo.trim();
    if (etapa === 'nombre') {
      if (v.split(/\s+/).length < 2) { setError('Poné nombre y apellido.'); return; }
      setNombre(v); yo(v); setCampo(''); setError('');
      bot('¿A qué email te escribe Mara?');
      setEtapa('email');
    } else if (etapa === 'email') {
      if (!emailValido(v)) { setError('Revisá el email: parece que falta algo.'); return; }
      setEmail(v); yo(v); setCampo(''); setError('');
      if (modo === 'lista') {
        void anotarEnLista(v);
      } else {
        bot('Si querés, contame en dos o tres líneas tu situación. Podés saltear este paso.');
        setEtapa('caso');
      }
    } else if (etapa === 'caso') {
      terminarCaso(v);
    }
  };

  const anotarEnLista = async (emailLista: string) => {
    const esta = ++tanda.current;
    setEtapa('enviando');
    bot('Te anoto en la lista.');
    const mensaje = respuestas.length === QUESTIONS.length
      ? ['Mis respuestas del diagnóstico:', ...QUESTIONS.map((x, i) => `- ${x.t} ${respuestas[i] ?? ''}`)].join('\n')
      : '';
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch('/api/lista-espera', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          nombre,
          email: emailLista,
          grupo,
          dias,
          franjas,
          desde,
          mensaje,
          origen: origenLista(),
          website: '',
        }),
      });
      const data = await res.json().catch(() => null);
      if (tanda.current !== esta) return;
      if (!res.ok || !data?.ok) throw new Error('lista');
      track('lista_espera_ok', { grupo });
      bot('Listo, quedaste anotada/o. Mara te escribe pronto.');
      setEtapa('anotada');
    } catch {
      if (tanda.current !== esta) return;
      bot('No pude anotarte desde acá. Al tocar el botón se abre tu correo con tus horarios para Mara: solo tenés que enviarlo. Cuando haya un grupo que coincida, te escribe con la fecha y el link de pago.');
      setEtapa('listo');
    } finally {
      window.clearTimeout(timer);
    }
  };

  const terminarCaso = (v: string) => {
    setCaso(v);
    if (v) yo(v);
    setCampo(''); setError('');
    bot('Listo. Al tocar el botón se abre tu correo con todo armado para Mara: solo tenés que enviarlo. Te responde personalmente en 24 a 48 hs hábiles.');
    setEtapa('listo');
  };

  const r = recomendar(score);
  const cuerpo = [
    'Hola Mara,',
    '',
    `Hice el diagnóstico en tu web y me recomendó: ${r.name}.`,
    '',
    'Mis respuestas:',
    ...QUESTIONS.map((x, i) => `- ${x.t} ${respuestas[i] ?? ''}`),
    '',
    'Mi situación:',
    caso || '',
    '',
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    'Mi LinkedIn o CV:',
    '',
  ].join('\n');
  const cuerpoLista = [
    'Hola Mara,',
    '',
    `Quiero sumarme a la lista de espera de: ${grupo}.`,
    '',
    `Días que me quedan bien: ${dias.join(', ')}`,
    `Franja horaria: ${franjas.join(', ')}`,
    `Podría empezar: ${desde}`,
    ...(respuestas.length === QUESTIONS.length ? ['', 'Mis respuestas del diagnóstico:', ...QUESTIONS.map((x, i) => `- ${x.t} ${respuestas[i]}`)] : []),
    '',
    `Nombre: ${nombre}`,
    `Email: ${email}`,
    'Mi LinkedIn o CV:',
    '',
  ].join('\n');
  const mailFinal = modo === 'lista'
    ? mailto(`Lista de espera: ${grupo}`, cuerpoLista)
    : mailto(`Consulta de carrera: ${r.name}`, cuerpo);

  const Opcion: React.FC<{ onClick: () => void; children: React.ReactNode; sub?: string; principal?: boolean }> = ({ onClick, children, sub, principal }) => (
    <button
      type="button"
      data-opcion
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 min-h-[44px] border transition-colors ${principal ? 'bg-ink text-paper border-ink hover:bg-rose-deep' : 'hairline bg-white/70 hover:bg-white hover:border-ink'}`}
    >
      <span className="block font-medium">{children}</span>
      {sub && <span className="block text-sm text-muted mt-0.5">{sub}</span>}
    </button>
  );

  return (
    <>
      {/* Botón flotante */}
      <button
        type="button"
        onClick={() => abrir()}
        aria-hidden={!showFab || open}
        tabIndex={showFab && !open ? 0 : -1}
        className={`fixed z-40 right-4 bottom-4 lg:right-8 lg:bottom-8 btn btn-dark shadow-[0_6px_24px_rgba(35,35,35,0.22)] transition-all duration-300 ${showFab && !open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" /> Hablemos
      </button>

      {/* Panel del bot */}
      {open && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Hablemos con Mara"
          className="bot-in fixed z-50 inset-x-0 bottom-0 h-[88svh] sm:h-auto sm:inset-x-auto sm:right-6 sm:bottom-6 lg:right-8 lg:bottom-8 sm:w-[400px] sm:max-h-[min(680px,85vh)] flex flex-col bg-paper border hairline shadow-[0_12px_48px_rgba(35,35,35,0.25)]"
        >
          <div className="flex items-center justify-between px-5 h-14 border-b hairline shrink-0">
            <p className="font-serif text-xl text-ink">Hablemos<span className="dot">.</span></p>
            <button type="button" onClick={() => setOpen(false)} className="p-2 -mr-2" aria-label="Cerrar"><X className="w-5 h-5" aria-hidden="true" /></button>
          </div>

          <div ref={lista} className="relative flex-1 overflow-y-auto px-5 py-4 space-y-3" aria-live="polite">
            {log.map((m, i) => (
              <div key={i} data-bot={m.de === 'bot' && (i === 0 || log[i - 1].de === 'yo') ? '' : undefined} className={m.de === 'yo' ? 'flex justify-end' : ''}>
                <div className={`max-w-[88%] px-3.5 py-2.5 text-[0.9375rem] leading-snug ${m.de === 'yo' ? 'bg-ink text-paper' : 'bg-white/80 border hairline text-ink'}`}>
                  {m.texto}
                  {m.nota && <span className="block text-sm text-muted mt-1">{m.nota}</span>}
                </div>
              </div>
            ))}

          {/* Opciones y campos, debajo del último mensaje: todo scrollea junto */}
          <div className="pt-2 space-y-2">
            {etapa === 'pregunta' && QUESTIONS[q].o.map(([label, sub, pts]) => (
              <Opcion key={label} sub={sub} onClick={() => responder(label, pts)}>{label}</Opcion>
            ))}

            {etapa === 'resultado' && (
              <>
                {r.name === PROGRAM_NAMES.diag && (
                  <a href={`${import.meta.env.BASE_URL}agendar/`} onClick={() => track('bot_agendar')} className="block w-full text-left px-4 py-2.5 min-h-[44px] border bg-ink text-paper border-ink hover:bg-rose-deep font-medium">Agendar el diagnóstico →</a>
                )}
                {r.modo === 'grupal' && (
                  <Opcion principal onClick={() => { yo('Quiero sumarme a la lista de espera'); empezarLista(r.name, true); }}>Sumarme a la lista de espera →</Opcion>
                )}
                <Opcion principal={r.name !== PROGRAM_NAMES.diag && r.modo !== 'grupal'} onClick={() => { yo('Sí, quiero contarle'); bot('¿Cómo te llamás? Nombre y apellido.'); setEtapa('nombre'); }}>Contarle mi caso a Mara →</Opcion>
                <Opcion onClick={empezar}>Volver a empezar</Opcion>
              </>
            )}

            {etapa === 'grupo' && GRUPOS.map((g) => <Opcion key={g} onClick={() => elegirGrupo(g)}>{g}</Opcion>)}

            {(etapa === 'dias' || etapa === 'franja') && (
              <>
                <div className="flex flex-wrap gap-2" role="group" aria-label={etapa === 'dias' ? 'Días' : 'Franjas horarias'}>
                  {(etapa === 'dias' ? DIAS : FRANJAS).map((x) => {
                    const on = marcados.includes(x);
                    return (
                      <button
                        key={x}
                        type="button"
                        data-opcion
                        aria-pressed={on}
                        onClick={() => setMarcados((m) => (on ? m.filter((y) => y !== x) : [...m, x]))}
                        className={`h-11 px-4 border transition-colors ${on ? 'bg-ink text-paper border-ink' : 'hairline bg-white/70 hover:border-ink'}`}
                      >
                        {on ? '✓ ' : ''}{x}
                      </button>
                    );
                  })}
                </div>
                <button type="button" onClick={confirmarMarcados} disabled={marcados.length === 0} className="btn btn-dark disabled:opacity-40">Seguir →</button>
              </>
            )}

            {etapa === 'desde' && DESDE.map((d) => <Opcion key={d} onClick={() => elegirDesde(d)}>{d}</Opcion>)}

            {(etapa === 'nombre' || etapa === 'email' || etapa === 'caso') && (
              <form onSubmit={enviarCampo} className="space-y-2" noValidate>
                {etapa === 'caso' ? (
                  <textarea
                    value={campo}
                    onChange={(e) => setCampo(e.target.value)}
                    rows={3}
                    aria-label="Tu situación"
                    className="w-full px-3.5 py-2.5 border hairline bg-white text-base focus:outline-none focus:border-ink resize-none"
                  />
                ) : (
                  <input
                    value={campo}
                    onChange={(e) => { setCampo(e.target.value); setError(''); }}
                    type={etapa === 'email' ? 'email' : 'text'}
                    autoComplete={etapa === 'email' ? 'email' : 'name'}
                    inputMode={etapa === 'email' ? 'email' : 'text'}
                    placeholder={etapa === 'email' ? 'tu@email.com' : 'Nombre y apellido'}
                    aria-label={etapa === 'email' ? 'Email' : 'Nombre y apellido'}
                    aria-invalid={!!error}
                    className="w-full h-11 px-3.5 border hairline bg-white text-base focus:outline-none focus:border-ink"
                  />
                )}
                {error && <p className="text-sm text-[#9B2C2C]" role="alert">{error}</p>}
                <div className="flex items-center gap-3">
                  <button type="submit" className="btn btn-dark">Seguir →</button>
                  {etapa === 'caso' && <button type="button" onClick={() => terminarCaso('')} className="btn-link">Saltear</button>}
                </div>
              </form>
            )}

            {etapa === 'listo' && (
              <>
                <a href={mailFinal} onClick={() => track(modo === 'lista' ? 'lista_espera_mail' : 'bot_mail', { programa: modo === 'lista' ? grupo : r.name })} className="btn btn-dark w-full">Abrir el mail para Mara →</a>
                <p className="text-sm text-muted">Si no se abre tu correo, escribí a <a href={mailFinal} className="text-ink underline underline-offset-4">{EMAIL}</a>.</p>
              </>
            )}

            {etapa === 'pregunta' && q === 0 && (
              <p className="text-sm text-muted pt-1">¿Preferís escribir directo? <a href={mailto('Consulta de carrera')} className="text-ink underline underline-offset-4">Mandale un mail a Mara</a>.</p>
            )}
          </div>
          </div>
        </div>
      )}
    </>
  );
};
