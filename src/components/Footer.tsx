import React from 'react';
import { Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="p-6 md:p-16 lg:p-20 bg-white relative overflow-hidden">
      {/* Background watermark */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none select-none">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1000"
          alt="Detalle Botánico"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-end relative z-10">
        <div>
          <a href="#" className="font-sans text-5xl md:text-8xl font-light tracking-tight mb-8 block leading-none">
            MS<span className="text-[#16a34a]">.</span>
          </a>
          <p className="mono-label mb-2 text-slate-800">
            © {new Date().getFullYear()} MARA SCHMITMAN. TIGRE, BUENOS AIRES, AR
          </p>
          <p className="text-xs text-slate-500 font-light max-w-sm leading-relaxed">
            Consultoría de carrera estratégica &amp; Diseño organizacional. Individual y grupal.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-8">
          <div className="flex flex-wrap gap-8 items-center">
            <a
              href="https://www.linkedin.com/in/mara-schmitman2/"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label hover:text-[#16a34a] hover:opacity-100 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/fenomena"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label hover:text-[#16a34a] hover:opacity-100 transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="mailto:mara@schmitman.com"
              className="mono-label hover:text-[#16a34a] hover:opacity-100 transition-colors"
            >
              mara@schmitman.com
            </a>
            <button
              onClick={scrollToTop}
              className="mono-label flex items-center gap-1 hover:text-[#16a34a] transition-colors"
              title="Volver al inicio"
            >
              <span>Subir</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <p className="mono-label opacity-40 italic">
              Hechos, no adjetivos. Built for human scale.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
