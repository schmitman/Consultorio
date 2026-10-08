import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, Layers, Users, UserCheck } from 'lucide-react';
import { TRACKS_DATA } from '../data/careerData';
import { TrackType } from '../types';

interface TrackSelectorProps {
  onSelectTrack: (track: TrackType, modality?: 'individual' | 'grupal') => void;
}

export const TrackSelector: React.FC<TrackSelectorProps> = ({ onSelectTrack }) => {
  const [activeTrack, setActiveTrack] = useState<TrackType>('insercion');
  const track = TRACKS_DATA[activeTrack];

  return (
    <section id="caminos" className="border-b border-slate-900/5 py-20 px-6 md:px-16 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <p className="mono-label mb-3">01 / Dos caminos críticos</p>
            <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-slate-950">
              ¿Cuál es tu momento de{' '}
              <span className="italic font-display font-light text-slate-400">carrera</span>
              <span className="text-[#16a34a]">?</span>
            </h2>
          </div>
          <p className="font-serif text-slate-500 max-w-md font-light text-base leading-relaxed">
            Cada etapa laboral tiene dinámicas psicológicas y de mercado completamente distintas. No se puede aplicar
            la misma receta para conseguir el primer trabajo que para pivotar tras diez años de ejercicio profesional.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-900/10 mb-12">
          <button
            onClick={() => setActiveTrack('insercion')}
            className={`p-6 sm:p-8 text-left transition-all relative ${
              activeTrack === 'insercion'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`mono-label text-[10px] ${activeTrack === 'insercion' ? 'text-emerald-400 opacity-90' : 'text-slate-400'}`}>
                Camino A
              </span>
              <span className={`text-xs px-2.5 py-0.5 border ${
                activeTrack === 'insercion' ? 'border-white/20 text-white/80' : 'border-slate-200 text-slate-600'
              }`}>
                Primer Empleo &amp; Acceso
              </span>
            </div>
            <h3 className="font-sans text-2xl font-light tracking-tight mb-2">
              Inserción en el Mercado Laboral
            </h3>
            <p className={`text-xs font-light leading-relaxed ${activeTrack === 'insercion' ? 'text-slate-300' : 'text-slate-500'}`}>
              Para quienes terminaron estudios, bootcamps o carreras y necesitan destrabar el ingreso al mercado formal competitivo.
            </p>
          </button>

          <button
            onClick={() => setActiveTrack('cambio_rumbo')}
            className={`p-6 sm:p-8 text-left transition-all relative border-t md:border-t-0 md:border-l border-slate-900/10 ${
              activeTrack === 'cambio_rumbo'
                ? 'bg-slate-950 text-white'
                : 'bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`mono-label text-[10px] ${activeTrack === 'cambio_rumbo' ? 'text-emerald-400 opacity-90' : 'text-slate-400'}`}>
                Camino B
              </span>
              <span className={`text-xs px-2.5 py-0.5 border ${
                activeTrack === 'cambio_rumbo' ? 'border-white/20 text-white/80' : 'border-slate-200 text-slate-600'
              }`}>
                Pivot &amp; Reconversión
              </span>
            </div>
            <h3 className="font-sans text-2xl font-light tracking-tight mb-2">
              Cambio de Rumbo &amp; Transición
            </h3>
            <p className={`text-xs font-light leading-relaxed ${activeTrack === 'cambio_rumbo' ? 'text-slate-300' : 'text-slate-500'}`}>
              Para profesionales con trayectoria que buscan reinventar su rol, saltar de industria o resignificar su experiencia acumulada.
            </p>
          </button>
        </div>

        {/* Active Track Deep Dive */}
        <div className="bg-slate-50/70 border border-slate-900/10 p-8 sm:p-12">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
            <div>
              <div className="inline-block mono-label text-emerald-800 bg-emerald-50 px-2.5 py-1 mb-6 border border-emerald-200/60">
                {track.badge}
              </div>
              <h3 className="font-sans text-3xl sm:text-4xl font-light tracking-tight mb-4 text-slate-900">
                {track.title}
              </h3>
              <p className="text-slate-700 leading-relaxed font-light mb-8 text-base">
                {activeTrack === 'insercion'
                  ? 'Para quienes buscan ingresar al mercado laboral o tecnológico y necesitan convertir su formación en valor concreto.'
                  : 'Para profesionales con trayectoria que desean pivotar de industria o rol sin empezar desde cero.'}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-900/10">
                <button
                  onClick={() => onSelectTrack(activeTrack, 'individual')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950 text-white text-xs font-medium hover:bg-[#16a34a] transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Hablemos: 1 a 1
                </button>
                <button
                  onClick={() => onSelectTrack(activeTrack, 'grupal')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-900/20 text-slate-800 text-xs font-medium hover:bg-white transition-all"
                >
                  <Users className="w-3.5 h-3.5" />
                  Hablemos: Grupal (4-6)
                </button>
              </div>
            </div>

            {/* 3 Frequent Obstacles */}
            <div className="bg-white border border-slate-900/10 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <p className="mono-label text-amber-900 text-[10px]">Las 3 trampas más frecuentes</p>
              </div>
              <div className="space-y-3">
                {track.frequentObstacles.slice(0, 3).map((obs, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    <span className="text-amber-600/70 font-mono text-xs">✕</span>
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
