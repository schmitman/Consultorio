import { CareerTrackInfo, ConsultationPlan, DiagnosticQuestion, FaqItem } from '../types';

export const TRACKS_DATA: Record<'insercion' | 'cambio_rumbo', CareerTrackInfo> = {
  insercion: {
    id: 'insercion',
    title: 'Inserción en el Mercado Laboral',
    tagline: 'De la formación a la evidencia concreta de valor.',
    badge: 'Primer empleo & Acceso al mercado',
    description:
      'Para quienes buscan insertarse en el mercado formal o en sectores competitivos. Destrabamos el dilema de la experiencia previa y estructuramos un perfil que comunique impacto comprobable en lugar de adjetivos genéricos.',
    targetAudience: [
      'Recién graduados de carreras universitarias o terciarias.',
      'Perfiles con formación técnica reciente que no superan el filtro inicial.',
      'Profesionales juniors que buscan acelerar sus primeras oportunidades.'
    ],
    frequentObstacles: [
      'Dilema de experiencia previa requerida para un rol de entrada.',
      'Perfiles cargados de adjetivos en lugar de evidencia y decisiones.',
      'Falta de claridad sobre los criterios con los que eligen los líderes de equipo.'
    ],
    strategicApproach: [
      'Auditoría de perfil: traducción de formación a valor económico.',
      'Artefactos de prueba: documentación de proyectos y criterio.',
      'Calibración de roles de entrada y canales efectivos de búsqueda.'
    ],
    deliverables: [
      'Diagnóstico de posicionamiento y brechas de perfil.',
      'Reescritura estratégica de CV y LinkedIn con foco en hechos.',
      'Guía de preparación para conversaciones de contratación.'
    ]
  },
  cambio_rumbo: {
    id: 'cambio_rumbo',
    title: 'Cambio de Rumbo & Transición Profesional',
    tagline: 'Reescribir tu trayectoria sin empezar desde cero.',
    badge: 'Pivot de industria & Giro de carrera',
    description:
      'Para profesionales consolidados que desean dar un giro hacia otra industria o rol. Mapeamos tus habilidades transferibles para construir una narrativa de transición sólida y proteger tu seniority.',
    targetAudience: [
      'Profesionales con trayectoria que buscan salir de industrias tradicionales.',
      'Especialistas funcionales que desean pasar a roles de gestión o producto.',
      'Perfiles consolidados que necesitan un plan metódico de transición.'
    ],
    frequentObstacles: [
      'Temor a perder seniority acumulado o nivel salarial.',
      'Dificultad para traducir experiencia previa al lenguaje del nuevo sector.',
      'Perfiles híbridos que confunden a quien contrata.'
    ],
    strategicApproach: [
      'Taxonomía de capacidades transferibles y de alto valor.',
      'Narrativa ejecutiva que articula tu pasado como ventaja diferencial.',
      'Estrategia de validación de nicho y acercamiento a tomadores de decisión.'
    ],
    deliverables: [
      'Matriz de habilidades transferibles y gaps a cubrir.',
      'Narrativa ejecutiva para LinkedIn y presentaciones.',
      'Plan de transición por fases y calibración de seniority.'
    ]
  }
};

export const CONSULTATION_PLANS: ConsultationPlan[] = [
  {
    id: '01',
    title: 'Diagnóstico 1 a 1: Calibración y Posicionamiento',
    format: '1 a 1',
    track: 'Ambos',
    modality: 'individual',
    duration: '1 encuentro de 90 min + devolución escrita',
    headline: 'Intervención focalizada para destrabar tu posicionamiento con datos y criterio.',
    description:
      'Sesión individual intensiva para auditar tu perfil, narrativa y presencia de mercado. Identificamos con precisión qué ajustes realizar para que tu trayectoria sea comprendida y valorada.',
    includes: [
      'Análisis previo exhaustivo de tu CV, LinkedIn y antecedentes.',
      '90 minutos de trabajo individual por videollamada directa con Mara.',
      'Auditoría en vivo de fortalezas reales y sesgos de percepción.',
      'Informe ejecutivo con diagnóstico de mercado y plan de acción de 30 días.'
    ],
    outcome: 'Claridad sobre tu valor de mercado y corrección inmediata de errores que te invisibilizaban.',
    spots: 'Modalidad individual personalizada',
    idealFor: 'Personas que necesitan un diagnóstico honesto y un plan de acción rápido.'
  },
  {
    id: '02',
    title: 'Programa Integral 1 a 1: Transición Estratégica',
    format: '1 a 1',
    track: 'Cambio de rumbo',
    modality: 'individual',
    duration: '4 encuentros individuales (6 semanas) + soporte',
    headline: 'Acompañamiento profundo para estructurar y ejecutar tu giro profesional.',
    description:
      'Proceso estructurado para profesionales en transición: desde el desmontaje analítico de tu historia previa hasta la traducción de habilidades, simulación de conversaciones críticas y negociación.',
    includes: [
      'Auditoría de trayectoria y taxonomía de habilidades transferibles.',
      'Reconstrucción de narrativa ejecutiva y perfil de alto impacto.',
      'Mapeo de mercado, estrategia de acercamiento y calibración salarial.',
      'Simulaciones de entrevistas críticas y soporte directo entre sesiones.'
    ],
    outcome: 'Transición metódica con narrativa sólida y posicionamiento calibrado.',
    spots: 'Acompañamiento individual con seguimiento',
    idealFor: 'Profesionales en transición de industria o rol que buscan acompañamiento continuo.'
  },
  {
    id: '03',
    title: 'Laboratorio Grupal: Inserción al Mercado',
    format: 'Grupos reducidos (4-6)',
    track: 'Inserción',
    modality: 'grupal',
    duration: '3 encuentros de 2 horas (Cohorte intensiva)',
    headline: 'Mesa de trabajo reducida para construir perfiles que superen los filtros reales.',
    description:
      'Entorno colaborativo en grupos de hasta 6 participantes. Ver cómo se evalúa a un par y recibir feedback cruzado acelera el aprendizaje y brinda perspectiva directa de selección.',
    includes: [
      'Grupos reducidos seleccionados por afinidad de etapa.',
      'Revisión colectiva de CVs y perfiles desde la mirada de quien contrata.',
      'Simulaciones en vivo de entrevistas iniciales y encaje cultural.',
      'Plantillas de posicionamiento basadas en hechos comprobables.'
    ],
    outcome: 'Perfiles competitivos y comprensión clara de cómo piensan las organizaciones.',
    spots: 'Mesa de trabajo reducida (4 a 6 personas)',
    idealFor: 'Jóvenes profesionales que valoran el aprendizaje entre pares y el feedback colectivo.'
  },
  {
    id: '04',
    title: 'Mesa Redonda Grupal: Rediseño & Pivot Profesional',
    format: 'Grupos reducidos (4-6)',
    track: 'Cambio de rumbo',
    modality: 'grupal',
    duration: '4 encuentros quincenales de 2 horas',
    headline: 'Espacio confidencial de debate y estrategia para profesionales experimentados.',
    description:
      'Espacio confidencial entre 4 y 6 profesionales senior en proceso de redefinición. Mara modera y diagnostica mientras el grupo contrasta hipótesis, mitiga riesgos y comparte aprendizajes.',
    includes: [
      'Grupo confidencial de profesionales senior en proceso de cambio.',
      'Análisis de casos individuales con devolución estratégica de Mara.',
      'Mapeo de oportunidades y sectores emergentes.',
      'Calibración de expectativas salariales y de seniority.'
    ],
    outcome: 'Decisiones claras, reducción del riesgo del cambio y plan de transición validado.',
    spots: 'Mesa de trabajo para perfiles senior',
    idealFor: 'Líderes y especialistas experimentados que buscan contrastar su transición con pares.'
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    question: '¿En qué punto de tu trayectoria te encontrás hoy?',
    subtitle: 'Identificá la frase que mejor describe tu situación actual:',
    options: [
      {
        label: 'Buscando mi primer rol profesional o entrada al mercado',
        description: 'Tengo estudios o formación técnica reciente pero no logro que me den la primera oportunidad formal.',
        track: 'insercion',
        modalityPref: 'todas',
        scoreKey: 'ins_primer'
      },
      {
        label: 'Tengo trayectoria, pero quiero cambiar radicalmente de rumbo',
        description: 'Vengo de una industria tradicional o rol diferente y quiero pivotar hacia tecnología u otro sector.',
        track: 'cambio_rumbo',
        modalityPref: 'individual',
        scoreKey: 'cr_pivot'
      },
      {
        label: 'Llevo meses postulando sin recibir respuestas ni entrevistas',
        description: 'Envío decenas de aplicaciones por semana pero mi perfil no pasa los primeros filtros de recruiters.',
        track: 'insercion',
        modalityPref: 'todas',
        scoreKey: 'ins_rebote'
      },
      {
        label: 'Siento estancamiento o agotamiento y necesito rediseñar mi carrera',
        description: 'Sé lo que no quiero, pero necesito método y criterio de mercado para definir mi próximo movimiento.',
        track: 'cambio_rumbo',
        modalityPref: 'todas',
        scoreKey: 'cr_estancamiento'
      }
    ]
  },
  {
    id: 2,
    question: '¿Cuál es tu principal traba u obstáculo ahora mismo?',
    subtitle: 'El nudo crítico que te impide avanzar:',
    options: [
      {
        label: 'No sé cómo presentar mi valor sin tener "años de experiencia formal"',
        description: 'Siento que el requisito de experiencia previa me bloquea cualquier posibilidad.',
        track: 'insercion',
        modalityPref: 'todas',
        scoreKey: 'traba_exp'
      },
      {
        label: 'No sé cómo traducir lo que hice antes al lenguaje del nuevo mercado',
        description: 'Tengo años de experiencia pero quien lee mi CV no entiende cómo aplica a este nuevo rol.',
        track: 'cambio_rumbo',
        modalityPref: 'individual',
        scoreKey: 'traba_traduccion'
      },
      {
        label: 'Me cuesta superar las instancias de entrevistas técnicas o de encaje',
        description: 'Llego a la entrevista pero siento que me bloqueo o no transmito solvencia.',
        track: 'insercion',
        modalityPref: 'grupal',
        scoreKey: 'traba_entrevistas'
      },
      {
        label: 'Miedo a perder nivel salarial o equivocarme en la decisión de cambio',
        description: 'Tengo responsabilidades y no puedo dar un salto a ciegas sin garantías y análisis de riesgo.',
        track: 'cambio_rumbo',
        modalityPref: 'individual',
        scoreKey: 'traba_salario'
      }
    ]
  },
  {
    id: 3,
    question: '¿Qué tipo de dinámica de trabajo te resulta más provechosa?',
    subtitle: 'Tu preferencia para abordar este proceso:',
    options: [
      {
        label: '1 a 1: Máxima personalización, privacidad y foco 100% en mi caso',
        description: 'Quiero trabajar directamente sobre mis documentos, mis dilemas y mi estrategia individual.',
        track: 'cambio_rumbo',
        modalityPref: 'individual',
        scoreKey: 'mod_1a1'
      },
      {
        label: 'Grupal reducida: Mesa de trabajo para ver casos de pares y aprender cruzado',
        description: 'Me interesa la dinámica colectiva, ver cómo otros resuelven y simular entrevistas entre pares.',
        track: 'insercion',
        modalityPref: 'grupal',
        scoreKey: 'mod_grupal'
      },
      {
        label: 'Quiero lo que Mara considere más efectivo para mi diagnóstico',
        description: 'Priorizo el resultado y la recomendación técnica por sobre el formato.',
        track: 'cambio_rumbo',
        modalityPref: 'todas',
        scoreKey: 'mod_abierta'
      }
    ]
  },
  {
    id: 4,
    question: '¿En qué plazo deseás materializar este movimiento?',
    subtitle: 'Tu horizonte temporal y sentido de urgencia:',
    options: [
      {
        label: 'Urgente (próximos 30 a 60 días)',
        description: 'Necesito destrabar mi situación de inmediato porque estoy en búsqueda activa sin resultados.',
        track: 'insercion',
        modalityPref: 'individual',
        scoreKey: 'tiempo_urgente'
      },
      {
        label: 'Mediano plazo planificado (3 a 6 meses)',
        description: 'Estoy trabajando actualmente pero quiero construir una transición ordenada sin apuros.',
        track: 'cambio_rumbo',
        modalityPref: 'todas',
        scoreKey: 'tiempo_medio'
      },
      {
        label: 'Exploratorio y de posicionamiento estratégico',
        description: 'Quiero clarificar mi mapa mental y anticiparme a movimientos futuros.',
        track: 'cambio_rumbo',
        modalityPref: 'todas',
        scoreKey: 'tiempo_largo'
      }
    ]
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    category: 'Modalidades',
    question: '¿Cómo elijo entre la modalidad Individual (1 a 1) y la Grupal?',
    answer:
      'La modalidad 1 a 1 es ideal si tu situación requiere confidencialidad estricta, si tu caso tiene muchas particularidades de seniority o si preferís un trabajo quirúrgico sobre tus documentos y agenda. La modalidad grupal (4 a 6 personas) es extraordinaria para quienes se enriquecen con el aprendizaje entre pares, quieren ver cómo otros resuelven y buscan simular entrevistas en un entorno seguro pero realista.'
  },
  {
    category: 'Modalidades',
    question: '¿Puedo participar si no trabajo en tecnología ni busco un rol tech?',
    answer:
      'Sí. Aunque mi trayectoria más reconocida es en el ecosistema de tecnología y startups de alta escala, los principios de diseño organizacional, lectura de mercado, persuasión basada en evidencia y encaje de perfil aplican a cualquier industria profesional competitiva.'
  },
  {
    category: 'Logística',
    question: '¿Cómo coordinamos las sesiones y agenda?',
    answer:
      'Dado que no delego las sesiones y trabajo directamente con cada persona o grupo, mantengo una cantidad acotada de procesos activos en simultáneo. Podés escribirme completando el formulario en esta página con tu perfil de LinkedIn y tu desafío. Reviso cada mensaje personalmente para asegurarme de que realmente puedo aportar valor a tu caso antes de coordinar el primer encuentro.'
  },
  {
    category: 'Logística',
    question: '¿Las sesiones son remotas o presenciales?',
    answer:
      'Todas las consultorías se realizan de forma remota por videollamada en alta definición, permitiendo trabajar con profesionales y grupos de toda América Latina, Estados Unidos y Europa. Las devoluciones e informes se entregan en formato digital estructurado.'
  }
];
