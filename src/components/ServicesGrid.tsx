import React, { useState } from 'react';
import { ArrowUpRight, Check, Clock, Users, User, Calendar } from 'lucide-react';
import { CONSULTATION_PLANS } from '../data/careerData';
import { ConsultationPlan, ModalityType } from '../types';

interface ServicesGridProps {
  onSelectPlan: (plan: ConsultationPlan) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectPlan }) => {
  const [filter, setFilter] = useState<ModalityType>('todas');

  const filteredPlans = CONSULTATION_PLANS.filter((plan) => {
    if (filter === 'todas') return true;
    return plan.modality === filter;
  });

  return (
    <section id="modalidades" className="border-b border-slate-900/5">
      {/* Header and Filter */}
      <div className="p-6 md:p-16 lg:p-20 border-b border-slate-900/5 flex flex-col md:flex-row justify-between md:items-end gap-10">
        <div>
          <p className="mono-label mb-4">02 / Modalidades de Consultoría</p>
          <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-none text-slate-950">
            Formatos &amp;{' '}
            <br />
            Programas<span className="text-[#16a34a]">.</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex border border-slate-900/10 p-1 bg-slate-50">
            <button
              onClick={() => setFilter('todas')}
              className={`px-4 py-2 text-xs font-mono transition-all ${
                filter === 'todas'
                  ? 'bg-white text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Todas (4)
            </button>
            <button
              onClick={() => setFilter('individual')}
              className={`px-4 py-2 text-xs font-mono transition-all flex items-center gap-1.5 ${
                filter === 'individual'
                  ? 'bg-white text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-3 h-3 text-[#16a34a]" />
              Individual 1 a 1
            </button>
            <button
              onClick={() => setFilter('grupal')}
              className={`px-4 py-2 text-xs font-mono transition-all flex items-center gap-1.5 ${
                filter === 'grupal'
                  ? 'bg-white text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Users className="w-3 h-3 text-[#16a34a]" />
              Grupal (4-6)
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-900/10">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-950 hover:text-white transition-all duration-500 group relative bg-white"
          >
            <div>
              {/* Top Meta */}
              <div className="flex items-center justify-between mb-8">
                <span className="mono-label text-xs font-mono group-hover:text-emerald-400 group-hover:opacity-100 transition-colors">
                  {plan.id} / {plan.format}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 border border-slate-200 group-hover:border-white/20 group-hover:text-white/80 transition-colors">
                  {plan.track}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xl font-light mb-3 leading-snug group-hover:text-white transition-colors">
                {plan.title}
              </h3>

              {/* Duration / Encuentros */}
              <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-300 mb-6 transition-colors font-mono">
                <Clock className="w-3.5 h-3.5 text-[#16a34a]" />
                <span>{plan.duration}</span>
              </div>

              {/* Para quién (una línea) */}
              <div className="mb-6">
                <p className="mono-label mb-1 text-[10px] group-hover:text-emerald-400 group-hover:opacity-100">
                  Para quién
                </p>
                <p className="text-xs text-slate-600 group-hover:text-slate-300 font-light leading-relaxed">
                  {plan.idealFor}
                </p>
              </div>

              {/* Precio: a definir */}
              <div className="p-3 border border-dashed border-slate-200 group-hover:border-white/20 bg-slate-50/60 group-hover:bg-white/5 text-xs font-mono text-slate-500 group-hover:text-slate-300 mb-8 transition-colors">
                Precio: a definir
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-900/10 group-hover:border-white/10">
              <button
                onClick={() => onSelectPlan(plan)}
                className="w-full py-3 px-4 text-xs font-sans font-medium flex items-center justify-between border border-slate-900/15 group-hover:border-white/30 group-hover:bg-white group-hover:text-slate-950 transition-all"
              >
                <span>Hablemos de este formato</span>
                <ArrowUpRight className="w-4 h-4 text-[#16a34a] group-hover:text-slate-950 transition-colors" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
