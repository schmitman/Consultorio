import React, { useState } from 'react';
import { FAQ_LIST } from '../data/careerData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="border-b border-slate-900/5 py-20 px-6 md:px-16 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="mono-label mb-3">06 / Preguntas Frecuentes</p>
          <h2 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-slate-950">
            Dudas &amp;{' '}
            <span className="italic font-display font-light text-slate-400">clarificaciones</span>
            <span className="text-[#16a34a]">.</span>
          </h2>
        </div>

        <div className="border-t border-slate-900/10 divide-y divide-slate-900/10">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6 transition-colors">
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between text-left gap-6 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="mono-label text-[10px] text-slate-400 font-mono">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <h3 className="font-sans text-lg sm:text-xl font-light text-slate-900 group-hover:text-[#16a34a] transition-colors">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#16a34a]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-4 pl-8 sm:pl-10 pr-4 animate-fadeIn">
                    <p className="font-serif text-slate-600 font-light text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
