import React from 'react';
import { ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenDiagnostic }) => {
  return (
    <section className="min-h-[92vh] flex flex-col justify-center px-6 md:px-16 lg:px-20 border-b border-slate-900/5 relative overflow-hidden pt-20 lg:pt-0">
      {/* Subtle Botanical / Architectural Background Overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.045] pointer-events-none hidden lg:block select-none">
        <img
          src="https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=80&w=1200"
          alt="Textura botánica"
          className="w-full h-full object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-white via-white/80 to-transparent" />
      </div>

      <div className="max-w-5xl relative z-10 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          {/* Eyebrow tag */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-slate-900/20" />
            <p className="mono-label text-slate-800">
              Lic. en Psicología &amp; Especialista en Diseño Organizacional
            </p>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] font-light leading-[0.94] tracking-tight mb-10 text-balance text-slate-950">
            Estrategia de{' '}
            <br />
            <span className="italic font-display font-light text-slate-400">carrera</span>{' '}
            <br />
            real<span className="text-[#16a34a]">.</span>
          </h1>

          {/* Subtitle */}
          <div className="max-w-2xl mb-12">
            <p className="font-serif text-xl sm:text-2xl text-slate-600 leading-relaxed font-light">
              Consultorías personalizadas <span className="text-slate-900 font-normal">individuales (1 a 1)</span> y{' '}
              <span className="text-slate-900 font-normal">grupales</span> para quienes buscan{' '}
              <span className="underline decoration-slate-300 underline-offset-4">insertarse en el mercado laboral</span> o{' '}
              <span className="underline decoration-slate-300 underline-offset-4">cambiar de rumbo</span> con bases firmes.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-950 text-white text-sm font-sans font-medium hover:bg-[#16a34a] transition-all duration-300 group shadow-sm hover:shadow"
            >
              Hablemos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onOpenDiagnostic}
              className="inline-flex items-center gap-2.5 px-6 py-4 border border-slate-900/15 text-slate-800 text-sm font-sans font-medium hover:bg-slate-50 hover:border-slate-900/30 transition-all group"
            >
              <Compass className="w-4 h-4 text-[#16a34a]" />
              Diagnóstico preliminar interactivo (2 min)
            </button>
          </div>
        </motion.div>
      </div>

      {/* Proof ticker */}
      <div className="border-t border-slate-900/5 py-8 -mx-6 md:-mx-16 lg:-mx-20 px-6 md:px-16 lg:px-20 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <p className="font-sans text-2xl md:text-3xl font-light text-slate-900 tracking-tight">18+ años</p>
          <p className="text-sm text-slate-600 font-light">armando equipos y diseño organizacional</p>
        </div>
      </div>
    </section>
  );
};
