import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Mail, ExternalLink, X, ShieldAlert, ArrowRight } from 'lucide-react';
import { ConsultationPlan, TrackType, ModalityType } from '../types';

interface ApplicationFormProps {
  initialTrack?: TrackType;
  initialPlan?: ConsultationPlan;
  initialSummary?: string;
  isModal?: boolean;
  onClose?: () => void;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  initialTrack = 'insercion',
  initialPlan,
  initialSummary = '',
  isModal = false,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    linkedin: '',
    track: initialTrack as string,
    modality: initialPlan ? (initialPlan.modality as string) : 'abierto',
    preferredPlanTitle: initialPlan ? initialPlan.title : '',
    situation: '',
    diagnosticSummary: initialSummary,
  });

  useEffect(() => {
    if (initialTrack) {
      setFormData((prev) => ({ ...prev, track: initialTrack }));
    }
    if (initialPlan) {
      setFormData((prev) => ({
        ...prev,
        modality: initialPlan.modality,
        preferredPlanTitle: initialPlan.title,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        modality: 'abierto',
      }));
    }
    if (initialSummary) {
      setFormData((prev) => ({ ...prev, diagnosticSummary: initialSummary }));
    }
  }, [initialTrack, initialPlan, initialSummary]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  // Pre-generate mailto link for direct fallback
  const mailSubject = encodeURIComponent(
    `[Consultoría Mara Schmitman] Contacto: ${formData.fullName || 'Nuevo Asesorado'}`
  );
  const mailBody = encodeURIComponent(
    `Hola Mara,\n\nQuisiera conversar sobre una consultoría de orientación de carrera.\n\nDatos:\n- Nombre: ${formData.fullName}\n- Email: ${formData.email}\n- LinkedIn: ${formData.linkedin}\n- Objetivo: ${formData.track}\n- Modalidad de interés: ${formData.modality}\n${formData.preferredPlanTitle ? `- Programa de interés: ${formData.preferredPlanTitle}\n` : ''}${formData.diagnosticSummary ? `- Diagnóstico previo: ${formData.diagnosticSummary}\n` : ''}\nDesafío actual:\n${formData.situation}\n\nQuedo a la espera de tus comentarios.\nSaludos cordiales.`
  );
  const mailtoUrl = `mailto:mara@schmitman.com?subject=${mailSubject}&body=${mailBody}`;

  const content = (
    <div className="max-w-4xl mx-auto">
      {!isModal && (
        <div className="text-center mb-16">
          <p className="mono-label mb-3">07 / Contacto Directo</p>
          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-slate-950 mb-4">
            Hablemos<span className="text-[#16a34a]">.</span>
          </h2>
          <p className="font-serif text-slate-500 font-light text-base max-w-lg mx-auto leading-relaxed">
            Escribime para evaluar tu caso puntual, ya sea para una sesión individual o para sumarte a una mesa de trabajo en grupo reducido.
          </p>
        </div>
      )}

      <div className="bg-white border border-slate-900/10 p-8 sm:p-12 shadow-sm">
        {isSubmitted ? (
          <div className="py-8 text-center space-y-6 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-50 text-[#16a34a] border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-sans text-3xl font-light text-slate-900 tracking-tight">
              Mensaje recibido
            </h3>

            <p className="font-serif text-slate-600 font-light max-w-md mx-auto leading-relaxed text-sm sm:text-base">
              Gracias, <strong>{formData.fullName}</strong>. Mara revisará personalmente tu información y perfil de LinkedIn
              para responderte por correo con la propuesta de agenda y próximos pasos.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs font-mono text-slate-600 space-y-1">
              <p><strong>Destinatario:</strong> mara@schmitman.com</p>
              <p><strong>Objetivo:</strong> {formData.track === 'insercion' ? 'Inserción Laboral' : 'Cambio de Rumbo'}</p>
              <p><strong>Modalidad:</strong> {formData.modality === 'individual' ? '1 a 1 Individual' : 'Grupal reducida'}</p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 text-white text-xs font-mono hover:bg-[#16a34a] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Abrir copia en tu cliente de correo
              </a>

              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-slate-300 text-slate-700 text-xs font-mono hover:bg-slate-100 transition-colors"
                >
                  Cerrar ventana
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header info in modal */}
            {isModal && (
              <div className="flex items-center justify-between pb-6 border-b border-slate-900/10">
                <div>
                  <p className="mono-label text-emerald-800 text-[10px]">Contacto Directo</p>
                  <h3 className="font-sans text-2xl font-light text-slate-900">
                    Hablemos de tu caso
                  </h3>
                </div>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {formData.diagnosticSummary && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 font-mono">
                <span className="font-bold">Diagnóstico previo adjuntado:</span> {formData.diagnosticSummary}
              </div>
            )}

            {/* Step 1: Track & Modality Selector */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="mono-label block mb-2 text-slate-800">1. Objetivo Principal</label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full p-3.5 border border-slate-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-slate-950 bg-white"
                  required
                >
                  <option value="insercion">Inserción en el Mercado Laboral (Primer empleo / Entrada)</option>
                  <option value="cambio_rumbo">Cambio de Rumbo &amp; Transición Profesional (Pivot)</option>
                  <option value="evaluacion_general">A evaluar con Mara en el primer contacto</option>
                </select>
              </div>

              <div>
                <label className="mono-label block mb-2 text-slate-800">2. Modalidad Preferida</label>
                <select
                  value={formData.modality}
                  onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
                  className="w-full p-3.5 border border-slate-300 text-xs sm:text-sm font-sans focus:outline-none focus:border-slate-950 bg-white"
                  required
                >
                  <option value="individual">Individual 1 a 1 (Personalizada)</option>
                  <option value="grupal">Grupal (Mesa de trabajo reducida de 4 a 6)</option>
                  <option value="abierto">Indiferente / Lo que recomiende Mara</option>
                </select>
              </div>
            </div>

            {/* Step 2: Contact Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="mono-label block mb-2 text-slate-800">Nombre completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Rossi"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3.5 border border-slate-300 text-sm focus:outline-none focus:border-slate-950 font-light"
                />
              </div>

              <div>
                <label className="mono-label block mb-2 text-slate-800">Correo electrónico *</label>
                <input
                  type="email"
                  required
                  placeholder="tu.email@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3.5 border border-slate-300 text-sm focus:outline-none focus:border-slate-950 font-light"
                />
              </div>
            </div>

            <div>
              <label className="mono-label block mb-2 text-slate-800">
                Perfil de LinkedIn / Enlace a CV o Portfolio *
              </label>
              <input
                type="url"
                required
                placeholder="https://linkedin.com/in/tu-perfil o enlace a Notion / Drive"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full p-3.5 border border-slate-300 text-sm focus:outline-none focus:border-slate-950 font-light"
              />
              <p className="text-[11px] text-slate-400 font-light mt-1.5">
                Necesario para que Mara pueda estudiar tu trayectoria real antes de confirmar la sesión.
              </p>
            </div>

            {/* Step 3: Specific challenge */}
            <div>
              <label className="mono-label block mb-2 text-slate-800">
                Describí brevemente tu situación actual y qué te traba hoy *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Ej: Llevo 7 años en finanzas tradicionales y quiero pivotar hacia operaciones o producto en tech, pero no sé cómo estructurar mi experiencia ni qué salario pedir sin empezar de junior..."
                value={formData.situation}
                onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
                className="w-full p-3.5 border border-slate-300 text-sm focus:outline-none focus:border-slate-950 font-light leading-relaxed resize-y"
              />
            </div>

            {/* Disclaimer & Submit */}
            <div className="pt-4 border-t border-slate-900/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-xs text-slate-500 font-light space-y-1">
                <p>• Respuestas directas por Mara Schmitman en un plazo de 24 a 48 hs hábiles.</p>
                <p>• Máxima confidencialidad profesional.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-950 text-white text-xs font-sans font-medium hover:bg-[#16a34a] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Enviando mensaje...'
                  ) : (
                    <>
                      <span>Enviar mensaje</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-2xl my-8">{content}</div>
      </div>
    );
  }

  return (
    <section id="contacto" className="border-b border-slate-900/5 py-24 px-6 md:px-16 lg:px-20 bg-slate-50/50">
      {content}
    </section>
  );
};
