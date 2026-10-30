// Copy del sitio actual (maraschmitman.com), traído tal cual. Editar acá, no en los componentes.

export const EMAIL = 'mara@schmitman.com';
export const LINKEDIN = 'https://www.linkedin.com/in/mara-schmitman2/';
export const BONDY = 'https://wearebondy.com';

// Página interna "Agendar": solo el Diagnóstico 1 a 1 se reserva y paga directo.
// - calendario: link de la página de reservas de Google Calendar (Agenda de citas → Compartir → Link de la página de reservas).
// - monto: precio del diagnóstico, tal como se muestra. Vacío = no se muestra.
// - linkPago: link de pago de Mercado Pago (tarjeta, débito, dinero en cuenta). Vacío = solo se muestra el alias.
export const AGENDA = {
  calendario: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-ZPAwTHxOYCGpt0bAUB4ITPLIdFdWZQ72jVP3CQgUPcEYMD0uzvHBWgeCf1umIkperog2umXa?gv=true',
  monto: '$130.000',
  linkPago: 'https://mpago.la/1kFiKrv', // Mercado Pago: "Diagnóstico 1 a 1 · Mara Schmitman", $130.000
  alias: 'mara.s.santander',
};

const BODY = 'Hola Mara,\n\nTe cuento mi situación:\n\n\nMi LinkedIn o CV:\n';
export const mailto = (subject: string, body: string = BODY) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const NAV = [
  { href: '#caminos', label: 'Caminos' },
  { href: '#programas', label: 'Programas' },
  { href: '#termometro', label: 'Diagnóstico' },
  { href: '#enfoque', label: 'Enfoque' },
  { href: '#sobre', label: 'Sobre Mara' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Hablemos' },
];

export const CAMINOS = {
  a: {
    tab: 'Camino A',
    title: 'Inserción en el mercado laboral',
    tabSub: 'Para quienes terminaron estudios, bootcamps o carreras y necesitan destrabar el ingreso al mercado formal.',
    tag: 'Primer empleo y acceso al mercado',
    text: 'Para quienes buscan entrar al mercado laboral o tecnológico y necesitan convertir su formación en algo que quien contrata pueda evaluar.',
    cta1: mailto('Consulta: inserción laboral, 1 a 1'),
    cta2: mailto('Consulta: laboratorio grupal de inserción'),
    traps: [
      'Te piden experiencia previa para un puesto de entrada.',
      'El CV está lleno de adjetivos y le faltan evidencias y decisiones concretas.',
      'No sabés con qué criterios eligen los líderes de equipo.',
    ],
  },
  b: {
    tab: 'Camino B',
    title: 'Cambio de rumbo y transición',
    tabSub: 'Para profesionales con trayectoria que quieren reinventar su rol, saltar de industria o resignificar su experiencia.',
    tag: 'Pivot y reconversión',
    text: 'Para quienes ya tienen años de trabajo encima y quieren mover esa experiencia a otro rol o industria sin volver a empezar de cero.',
    cta1: mailto('Consulta: cambio de rumbo, 1 a 1'),
    cta2: mailto('Consulta: mesa grupal de cambio de rumbo'),
    traps: [
      'Contar la trayectoria en el idioma de la industria anterior.',
      'Aceptar un puesto junior por miedo a no tener la experiencia exacta.',
      'Postularse a todo sin haber definido primero hacia dónde ir.',
    ],
  },
};

export type Mode = 'individual' | 'grupal';
// precio: solo los formatos 1 a 1 (los grupales se cotizan cuando se arma el grupo)
export const PROGRAMAS: { num: string; mode: Mode; pill: string; title: string; meta: string; who: string; subject: string; precio?: string }[] = [
  { num: '01 / 1 a 1', mode: 'individual', pill: 'Ambos caminos', title: 'Diagnóstico 1 a 1: calibración y posicionamiento', meta: '1 encuentro de 90 min + devolución escrita', who: 'Personas que necesitan un diagnóstico honesto y un plan de acción rápido.', subject: 'Consulta: diagnóstico 1 a 1', precio: '$130.000' },
  { num: '02 / 1 a 1', mode: 'individual', pill: 'Cambio de rumbo', title: 'Programa integral 1 a 1: transición estratégica', meta: '4 encuentros individuales en 6 semanas + soporte', who: 'Profesionales en transición de industria o de rol que quieren acompañamiento continuo.', subject: 'Consulta: cambio de rumbo, 1 a 1', precio: '$480.000' },
  { num: '03 / Grupo de 4 a 6', mode: 'grupal', pill: 'Inserción', title: 'Laboratorio grupal: inserción al mercado', meta: '3 encuentros de 2 horas, cohorte intensiva', who: 'Jóvenes profesionales que aprenden mejor con pares y feedback del grupo.', subject: 'Consulta: laboratorio grupal de inserción' },
  { num: '04 / Grupo de 4 a 6', mode: 'grupal', pill: 'Cambio de rumbo', title: 'Mesa redonda grupal: rediseño y pivot profesional', meta: '4 encuentros quincenales de 2 horas', who: 'Líderes y especialistas con experiencia que quieren contrastar su transición con pares.', subject: 'Consulta: mesa grupal de cambio de rumbo' },
];

type Pts = Partial<Record<'insercion' | 'pivot' | 'diag' | 'individual' | 'grupal' | 'programa', number>>;
export const QUESTIONS: { t: string; o: [string, string, Pts][] }[] = [
  { t: '¿En qué punto de tu trayectoria estás hoy?', o: [
    ['Busco mi primer trabajo formal', 'Tengo estudios o formación técnica reciente, pero no consigo la primera oportunidad.', { insercion: 2 }],
    ['Tengo trayectoria y quiero cambiar de rumbo', 'Vengo de otra industria o de otro rol y quiero pasar a algo distinto.', { pivot: 2 }],
    ['Postulo hace meses y no me llaman', 'Mando muchas aplicaciones y mi perfil no pasa los primeros filtros.', { insercion: 1, diag: 1 }],
    ['Siento que me estanqué', 'Sé lo que no quiero, pero me falta método para decidir el próximo paso.', { pivot: 1, diag: 1 }],
  ]},
  { t: '¿Cuántos años de experiencia laboral tenés?', o: [
    ['Menos de 2', '', { insercion: 2 }],
    ['Entre 2 y 8', '', { insercion: 1, pivot: 1 }],
    ['Más de 8', '', { pivot: 2 }],
  ]},
  { t: '¿Cómo te gusta trabajar?', o: [
    ['A solas, con foco en mi caso', 'Prefiero confidencialidad y trabajo a medida.', { individual: 2 }],
    ['Con otras personas en la misma situación', 'Me sirve ver cómo resuelven otros y practicar con pares.', { grupal: 2 }],
    ['No sé, que me recomienden', '', { individual: 1 }],
  ]},
  { t: '¿Qué necesitás primero?', o: [
    ['Un diagnóstico rápido y un plan', 'Una mirada externa y saber por dónde arrancar.', { diag: 2 }],
    ['Acompañamiento durante varias semanas', 'Alguien que me acompañe mientras ejecuto el cambio.', { programa: 2 }],
  ]},
];
export type Score = Pts;

export const PROGRAM_NAMES: Record<string, string> = {
  diag: 'Diagnóstico 1 a 1: calibración y posicionamiento',
  pivot_individual: 'Programa integral 1 a 1: transición estratégica',
  pivot_grupal: 'Mesa redonda grupal: rediseño y pivot profesional',
  insercion_grupal: 'Laboratorio grupal: inserción al mercado',
  insercion_individual: 'Diagnóstico 1 a 1: calibración y posicionamiento',
};

export const FAQ = [
  { q: '¿Cómo elijo entre la modalidad individual (1 a 1) y la grupal?', a: 'El 1 a 1 conviene si tu caso necesita confidencialidad, si tiene particularidades de seniority o si querés trabajar a fondo sobre tu CV y tu búsqueda. El grupo de 4 a 6 personas sirve si aprendés viendo cómo otros resuelven lo mismo y querés practicar entrevistas con pares antes de hacerlas en serio. Si no sabés, lo definimos en el primer contacto.' },
  { q: '¿Puedo participar si no trabajo en tecnología ni busco un rol tech?', a: 'Sí. Buena parte de mi experiencia viene de equipos de tecnología, pero los criterios con los que se decide una contratación se parecen bastante entre industrias.' },
  { q: '¿Cómo coordinamos las sesiones y la agenda?', a: 'Después de leer tu mensaje y tu perfil te respondo por mail con una propuesta de días y horarios. Los grupos arrancan cuando se completa el cupo.' },
  { q: '¿Las sesiones son remotas o presenciales?', a: 'Remotas, por videollamada.' },
];

// Prensa y charlas. Las fechas futuras se muestran como "Próximas"; cuando pasan, se mueven solas a la lista.
// cta: texto del link en las próximas (por defecto "Entradas").
export type Aparicion = { fecha: string; tipo: 'Columna' | 'Charla' | 'Podcast' | 'Video' | 'Nota' | 'Radio'; medio: string; titulo: string; url?: string; detalle?: string; cta?: string };

export const COLUMNAS: Aparicion[] = [
  { fecha: '2026-08-29', tipo: 'Columna', medio: 'El Cronista', titulo: 'El riesgo “menos visible” de la IA: una generación que revisa sin haber aprendido a hacer', url: 'https://www.cronista.com/columnistas/el-riesgo-menos-visible-de-la-ia-una-generacion-que-revisa-sin-haber-aprendido-a-hacer/' },
  { fecha: '2026-08-01', tipo: 'Columna', medio: 'Ámbito', titulo: 'El espejismo de la eficiencia: ¿la inteligencia artificial mejoró la selección de personal?', url: 'https://www.ambito.com/opiniones/el-espejismo-la-eficiencia-la-inteligencia-artificial-mejoro-la-seleccion-personal-n6305904' },
  { fecha: '2020-12-06', tipo: 'Columna', medio: 'Ámbito', titulo: 'Cómo será el mundo laboral después de la pandemia', url: 'https://www.ambito.com/opiniones/trabajo/como-sera-el-mundo-laboral-despues-la-pandemia-n5153053' },
  { fecha: '2019-04-24', tipo: 'Columna', medio: 'Ámbito', titulo: 'Empresas horizontales: ¿qué son y qué traen de nuevo?', url: 'https://www.ambito.com/edicion-impresa/empresas/horizontales-que-son-y-que-traen-nuevo-n5027865' },
];

export const CHARLAS: Aparicion[] = [
  { fecha: '2026-10-21', tipo: 'Charla', medio: 'Universidad de San Andrés · Maestría en IA', titulo: 'Carreras profesionales en Data/AI: del especialista técnico al líder de impacto', url: 'https://eventos.udesa.edu.ar/159586/detail/carreras-profesionales-en-dataai-del-especialista-tecnico-al-lider-de-impacto.html', cta: 'Inscripción', detalle: '19 h · Auditorio Sede Riobamba (Riobamba 1276), CABA · Con Maika Basavilbaso y Mayra Sciarrillo, modera Patricio Rocca' },
  { fecha: '2026-10-20', tipo: 'Charla', medio: 'SAIAConf 2026', titulo: 'Panel «El futuro del trabajo: donde la IA nunca va a reemplazarnos»', url: 'https://saiaconf.ar/#entradas', detalle: '12:15 · Escenario Horizonte · Costa Salguero, CABA' },
  { fecha: '2026-10-04', tipo: 'Podcast', medio: 'Es Más Complejo, con Nico Lucca', titulo: '¿Sirve la IA para encontrar empleo?', url: 'https://www.youtube.com/watch?v=yNsbiTsJU9s' },
  { fecha: '2026-09-23', tipo: 'Podcast', medio: 'Radio Con Vos · Invento Argentino, con Claudio Martínez', titulo: 'Inteligencia artificial: ¿contra el amor y el trabajo?', url: 'https://www.youtube.com/watch?v=lPoQdj4Efl0' },
  { fecha: '2026-09-17', tipo: 'Podcast', medio: 'Builders OFF the Record #15', titulo: 'El mercado laboral tech, con Gabriel Benmergui', url: 'https://www.youtube.com/watch?v=f03ClvJUguQ&t=2261s' },
  { fecha: '2026-09-06', tipo: 'Radio', medio: 'AM 750 · El domingo no tiene la culpa', titulo: 'Los riesgos de la inteligencia artificial', url: 'https://radiocut.fm/audiocut/entrevista-con-mara-schmitman-en-domingo-no-tiene-culpa/' },
  { fecha: '2026-08-03', tipo: 'Video', medio: 'Funky Business', titulo: 'Entrevista: psicología y gestión estratégica de recursos humanos', url: 'https://www.youtube.com/watch?v=oJ5tCCuQ7fk' },
  { fecha: '2026-08-01', tipo: 'Video', medio: 'Eco Medios · Nada Personal, con Anabella Messina', titulo: 'Entrevista en Nada Personal', url: 'https://www.youtube.com/watch?v=aMrKrJJtd3g' },
  { fecha: '2024-07-16', tipo: 'Video', medio: 'Pelado Nerd', titulo: 'Las nuevas tecnologías en el mundo de IT', url: 'https://www.youtube.com/watch?v=QxEf9yJVE6Y' },
  { fecha: '2022-08-16', tipo: 'Nota', medio: 'La Nación', titulo: 'Entrevista laboral: los errores que nos dejan fuera de carrera', url: 'https://www.lanacion.com.ar/sociedad/entrevista-laboral-los-errores-que-nos-dejan-fuera-de-carrera-y-una-pregunta-clave-que-suele-nid16082022/' },
  { fecha: '2021-05-11', tipo: 'Video', medio: 'Pelado Nerd', titulo: 'Consejos para conseguir tu primer trabajo en IT', url: 'https://www.youtube.com/watch?v=BctKQ6HX1eI' },
  { fecha: '2020-02-24', tipo: 'Radio', medio: 'La Once Diez · Massaccesi que nunca', titulo: '¿Cómo pedir un aumento de sueldo?', url: 'https://radiocut.fm/audiocut/mara-schmitman-ceo-schmitman-hr-explica-como-pedir-un-aumento-en-tiempo-crisis/' },
];
