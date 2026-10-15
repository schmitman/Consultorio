import React, { useState } from 'react';
import { QUESTIONS, PROGRAM_NAMES, EMAIL, type Score } from '../content';

const resultMailto = (name: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent('Consulta de carrera: ' + name)}&body=${encodeURIComponent(
    `Hola Mara,\n\nHice el termómetro y me recomendó: ${name}.\n\nTe cuento mi situación:\n\n\nMi LinkedIn o CV:\n`,
  )}`;

export const Termometro: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<Score>({});
  const done = step >= QUESTIONS.length;

  const s = (k: keyof Score) => score[k] ?? 0;
  let result: { name: string; camino: string; modo: string } | null = null;
  if (done) {
    const camino = s('pivot') > s('insercion') ? 'pivot' : 'insercion';
    const modo = s('grupal') > s('individual') ? 'grupal' : 'individual';
    let key = `${camino}_${modo}`;
    if (s('diag') > s('programa') && modo === 'individual') key = 'diag';
    result = { name: PROGRAM_NAMES[key], camino: camino === 'pivot' ? 'cambio de rumbo' : 'inserción en el mercado', modo };
  }

  const reset = () => { setStep(0); setScore({}); };

  return (
    <div className="max-w-2xl">
      <p className="mono">03 / Evaluación preliminar</p>
      <h2 className="text-4xl sm:text-5xl leading-[1.05] mt-3">Termómetro de <em>carrera</em><span className="dot">.</span></h2>
      <p className="text-ink mt-3 max-w-xl">
        Cuatro preguntas para ver qué formato te conviene: individual o grupal, inserción o cambio de rumbo.
      </p>

      <div className="card mt-6 p-5 sm:p-6 bg-white/60" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <span className="mono">{done ? 'Resultado' : `Pregunta ${step + 1} de ${QUESTIONS.length}`}</span>
          <span className="flex gap-1" aria-hidden="true">
            {QUESTIONS.map((_, i) => (
              <i key={i} className={`block w-6 h-1 rounded-full ${i <= step ? 'bg-rose' : 'bg-ink/15'}`} />
            ))}
          </span>
        </div>

        {!done ? (
          <>
            <h3 className="text-2xl sm:text-3xl mt-3">{QUESTIONS[step].t}</h3>
            <div className="grid gap-2 mt-4">
              {QUESTIONS[step].o.map(([label, sub, pts]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setScore((prev) => {
                      const next = { ...prev };
                      for (const k in pts) next[k as keyof Score] = (next[k as keyof Score] ?? 0) + (pts[k as keyof Score] ?? 0);
                      return next;
                    });
                    setStep(step + 1);
                  }}
                  className="text-left px-4 py-3 border hairline rounded-xs bg-white/60 hover:bg-white hover:border-rose transition-colors min-h-[44px]"
                >
                  <strong className="block">{label}</strong>
                  {sub && <span className="block text-sm text-muted mt-0.5">{sub}</span>}
                </button>
              ))}
            </div>
          </>
        ) : result && (
          <div className="mt-4 space-y-4">
            <h3 className="text-2xl sm:text-3xl">{result.name}</h3>
            <p className="text-ink">
              Por lo que respondiste, tu momento se parece más a un proceso de <strong>{result.camino}</strong>, y te conviene arrancar en formato <strong>{result.modo}</strong>.
            </p>
            <p className="text-sm text-muted">Es una orientación inicial; lo confirmamos cuando leo tu caso.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={resultMailto(result.name)} className="btn btn-dark">Contarle mi caso a Mara →</a>
              <button type="button" onClick={reset} className="btn-link">Volver a empezar</button>
            </div>
          </div>
        )}
        <p className="mono mt-5">Sin costo ni compromiso</p>
      </div>
    </div>
  );
};
