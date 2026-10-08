import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS, CONSULTATION_PLANS } from '../data/careerData';
import { ConsultationPlan, TrackType, ModalityType } from '../types';
import { ArrowRight, RotateCcw, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface DiagnosticToolProps {
  onApplyWithDiagnostic: (data: {
    track: TrackType;
    plan: ConsultationPlan;
    answersSummary: string;
  }) => void;
}

export const DiagnosticTool: React.FC<DiagnosticToolProps> = ({ onApplyWithDiagnostic }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = DIAGNOSTIC_QUESTIONS[currentStep];

  const handleSelectOption = (optionIndex: number) => {
    const updated = { ...selectedAnswers, [currentStep]: optionIndex };
    setSelectedAnswers(updated);

    if (currentStep < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Compute recommendation
  const calculateResult = () => {
    const q1 = DIAGNOSTIC_QUESTIONS[0].options[selectedAnswers[0] || 0];
    const q2 = DIAGNOSTIC_QUESTIONS[1].options[selectedAnswers[1] || 0];
    const q3 = DIAGNOSTIC_QUESTIONS[2].options[selectedAnswers[2] || 0];

    const isTransition = q1.track === 'cambio_rumbo' || q2.track === 'cambio_rumbo';
    const trackResult: TrackType = isTransition ? 'cambio_rumbo' : 'insercion';

    let recommendedPlan: ConsultationPlan;

    if (q3.modalityPref === 'grupal' && !isTransition) {
      recommendedPlan = CONSULTATION_PLANS.find((p) => p.id === '03') || CONSULTATION_PLANS[0];
    } else if (q3.modalityPref === 'grupal' && isTransition) {
      recommendedPlan = CONSULTATION_PLANS.find((p) => p.id === '04') || CONSULTATION_PLANS[1];
    } else if (isTransition) {
      recommendedPlan = CONSULTATION_PLANS.find((p) => p.id === '02') || CONSULTATION_PLANS[0];
    } else {
      recommendedPlan = CONSULTATION_PLANS.find((p) => p.id === '01') || CONSULTATION_PLANS[0];
    }

    const answersSummary = `Etapa: ${q1.label} | Traba: ${q2.label} | Preferencia: ${q3.label}`;

    return {
      track: trackResult,
      plan: recommendedPlan,
      answersSummary,
      insights: [
        isTransition
          ? 'Tu foco crítico está en la traducción de lenguaje: tu experiencia previa tiene alto valor pero necesita ser decodificada para la nueva industria sin sonar genérica.'
          : 'Tu prioridad es el reemplazo de adjetivos por artefactos de prueba: no intentes disimular la falta de antigüedad, demostrá criterio y decisiones.',
        q3.modalityPref === 'grupal'
          ? 'El formato grupal te dará perspectiva de hiring manager al observar a tus compañeros y recibir retroalimentación sin la tensión individual.'
          : 'La consultoría 1 a 1 te permitirá auditar quirúrgicamente tus documentos, acuerdos de salida o calibraciones salariales con confidencialidad.',
        'La clave metodológica: basar cada afirmación de tu perfil en hechos verificables que resistan las preguntas de una entrevista técnica.'
      ]
    };
  };

  const result = isCompleted ? calculateResult() : null;

  return (
    <section id="diagnostico" className="border-b border-slate-900/5 py-24 px-6 md:px-16 lg:px-20 bg-slate-50/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="mono-label mb-3">03 / Evaluación Preliminar</p>
          <h2 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-slate-950 mb-4">
            Termómetro de{' '}
            <span className="italic font-display font-light text-slate-400">carrera</span>
            <span className="text-[#16a34a]">.</span>
          </h2>
          <p className="font-serif text-slate-500 font-light text-base leading-relaxed">
            Una herramienta breve de 4 preguntas para diagnosticar tu momento profesional y determinar con precisión qué
            formato (individual o grupal, inserción o cambio de rumbo) generará el mayor impacto.
          </p>
        </div>

        <div className="bg-white border border-slate-900/10 shadow-sm p-6 sm:p-12">
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-900/5">
                <span className="mono-label text-[10px]">
                  Pregunta {currentStep + 1} de {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <div className="flex gap-1.5">
                  {DIAGNOSTIC_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentStep
                          ? 'w-8 bg-[#16a34a]'
                          : i < currentStep
                          ? 'w-4 bg-slate-800'
                          : 'w-4 bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="font-sans text-2xl sm:text-3xl font-light text-slate-900 mb-2">
                  {currentQ.question}
                </h3>
                <p className="text-xs text-slate-500 font-serif italic">
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-5 border transition-all flex items-start justify-between group ${
                        isSelected
                          ? 'border-slate-900 bg-slate-950 text-white'
                          : 'border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="pr-4">
                        <p className={`text-sm sm:text-base font-light mb-1 ${isSelected ? 'text-white font-normal' : 'text-slate-900'}`}>
                          {option.label}
                        </p>
                        <p className={`text-xs font-light leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {option.description}
                        </p>
                      </div>
                      <span className={`text-xs font-mono shrink-0 mt-1 ${isSelected ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-900'}`}>
                        →
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-900/5">
                {currentStep > 0 ? (
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    ← Pregunta anterior
                  </button>
                ) : (
                  <span />
                )}
                <span className="mono-label text-[10px]">
                  Diagnóstico sin costo ni compromiso
                </span>
              </div>
            </div>
          ) : result ? (
            /* Results Presentation */
            <div className="animate-fadeIn">
              <div className="flex items-center justify-between pb-6 border-b border-slate-900/10 mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#16a34a]" />
                  <span className="mono-label text-emerald-800">Diagnóstico Completado</span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reiniciar
                </button>
              </div>

              {/* Recommendation Box */}
              <div className="bg-slate-950 text-white p-8 mb-8 border border-slate-900">
                <p className="mono-label text-emerald-400 mb-2">Formato Recomendado</p>
                <h3 className="font-sans text-3xl font-light tracking-tight mb-2">
                  {result.plan.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  Modalidad: {result.plan.format} • Duración: {result.plan.duration}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {result.plan.idealFor}
                </p>
              </div>

              {/* Strategic Insights */}
              <div className="mb-8">
                <h4 className="mono-label text-slate-900 mb-4">3 Claves para tu situación</h4>
                <div className="space-y-3">
                  {result.insights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Application CTA with Prefilled Data */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-900/10">
                <p className="text-xs text-slate-500 font-light">
                  Podés trasladar este diagnóstico directamente para conversar con Mara:
                </p>
                <button
                  onClick={() =>
                    onApplyWithDiagnostic({
                      track: result.track,
                      plan: result.plan,
                      answersSummary: result.answersSummary,
                    })
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#16a34a] hover:bg-emerald-700 text-white text-xs font-medium transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Hablemos con este diagnóstico
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
