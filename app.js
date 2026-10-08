const CONTACT_EMAIL = 'hola@maraschmitman.com';
const mailto = (resultado) => 'mailto:' + CONTACT_EMAIL +
  '?subject=' + encodeURIComponent('Consulta de carrera: ' + resultado) +
  '&body=' + encodeURIComponent('Hola Mara,\n\nHice el termómetro y me recomendó: ' + resultado + '.\n\nTe cuento mi situación:\n\n\nMi LinkedIn o CV:\n');

/* Caminos */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => { t.classList.toggle('active', t === tab); t.setAttribute('aria-selected', t === tab); });
    document.querySelectorAll('.track').forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.track; });
  });
});

/* Filtro de programas */
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(c => { c.hidden = f !== 'all' && c.dataset.mode !== f; });
  });
});

/* Termómetro */
const QUESTIONS = [
  { t: '¿En qué punto de tu trayectoria estás hoy?', o: [
    ['Busco mi primer trabajo formal', 'Tengo estudios o formación técnica reciente, pero no consigo la primera oportunidad.', { insercion: 2 }],
    ['Tengo trayectoria y quiero cambiar de rumbo', 'Vengo de otra industria o de otro rol y quiero pasar a algo distinto.', { pivot: 2 }],
    ['Postulo hace meses y no me llaman', 'Mando muchas aplicaciones y mi perfil no pasa los primeros filtros.', { insercion: 1, diag: 1 }],
    ['Siento que me estanqué', 'Sé lo que no quiero, pero me falta método para decidir el próximo paso.', { pivot: 1, diag: 1 }]
  ]},
  { t: '¿Cuántos años de experiencia laboral tenés?', o: [
    ['Menos de 2', '', { insercion: 2 }],
    ['Entre 2 y 8', '', { insercion: 1, pivot: 1 }],
    ['Más de 8', '', { pivot: 2 }]
  ]},
  { t: '¿Cómo te gusta trabajar?', o: [
    ['A solas, con foco en mi caso', 'Prefiero confidencialidad y trabajo a medida.', { individual: 2 }],
    ['Con otras personas en la misma situación', 'Me sirve ver cómo resuelven otros y practicar con pares.', { grupal: 2 }],
    ['No sé, que me recomienden', '', { individual: 1 }]
  ]},
  { t: '¿Qué necesitás primero?', o: [
    ['Un diagnóstico rápido y un plan', 'Una mirada externa y saber por dónde arrancar.', { diag: 2 }],
    ['Acompañamiento durante varias semanas', 'Alguien que me acompañe mientras ejecuto el cambio.', { programa: 2 }]
  ]}
];

const PROGRAMS = {
  diag: { name: 'Diagnóstico 1 a 1: calibración y posicionamiento', obj: 'evaluar', mod: 'individual' },
  pivot_individual: { name: 'Programa integral 1 a 1: transición estratégica', obj: 'pivot', mod: 'individual' },
  pivot_grupal: { name: 'Mesa redonda grupal: rediseño y pivot profesional', obj: 'pivot', mod: 'grupal' },
  insercion_grupal: { name: 'Laboratorio grupal: inserción al mercado', obj: 'insercion', mod: 'grupal' },
  insercion_individual: { name: 'Diagnóstico 1 a 1: calibración y posicionamiento', obj: 'insercion', mod: 'individual' }
};

let step = 0, score = {};
const qTitle = document.getElementById('q-title');
const qOpts = document.getElementById('q-options');
const qCount = document.getElementById('q-count');
const bars = document.querySelectorAll('#q-bars i');

function renderQ() {
  const q = QUESTIONS[step];
  qCount.textContent = `Pregunta ${step + 1} de ${QUESTIONS.length}`;
  bars.forEach((b, i) => b.classList.toggle('on', i <= step));
  qTitle.textContent = q.t;
  qOpts.innerHTML = '';
  q.o.forEach(([label, sub, pts]) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.innerHTML = `<strong>${label}</strong>${sub ? `<span>${sub}</span>` : ''}`;
    b.onclick = () => {
      for (const k in pts) score[k] = (score[k] || 0) + pts[k];
      step++;
      step < QUESTIONS.length ? renderQ() : renderResult();
    };
    qOpts.appendChild(b);
  });
}

function renderResult() {
  const s = k => score[k] || 0;
  const camino = s('pivot') > s('insercion') ? 'pivot' : 'insercion';
  const modo = s('grupal') > s('individual') ? 'grupal' : 'individual';
  let key = `${camino}_${modo}`;
  if (s('diag') > s('programa') && modo === 'individual') key = 'diag';
  const p = PROGRAMS[key];
  const caminoTxt = camino === 'pivot' ? 'cambio de rumbo' : 'inserción en el mercado';

  qCount.textContent = 'Resultado';
  bars.forEach(b => b.classList.add('on'));
  qTitle.textContent = p.name;
  qOpts.innerHTML = `<div class="result">
    <p>Por lo que respondiste, tu momento se parece más a un proceso de <strong>${caminoTxt}</strong>, y te conviene arrancar en formato <strong>${modo === 'grupal' ? 'grupal' : 'individual'}</strong>.</p>
    <p>Es una orientación inicial; lo confirmamos cuando leo tu caso.</p>
    <div class="actions"><a href="${mailto(p.name)}" class="btn btn-dark">Contarle mi caso a Mara →</a>
    <button class="btn btn-line" id="q-reset">Volver a empezar</button></div></div>`;
  document.getElementById('q-reset').onclick = () => { step = 0; score = {}; renderQ(); };
}
renderQ();

