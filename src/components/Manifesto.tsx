import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <section id="enfoque" className="border-b border-slate-900/5">
      <div className="grid lg:grid-cols-[0.4fr_0.6fr]">
        <div className="p-6 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-slate-900/5 bg-slate-50/40 flex flex-col justify-center">
          <p className="mono-label mb-8">04 / El Enfoque</p>
          <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-tight leading-none text-slate-950">
            Hechos,{' '}
            <br />
            <span className="italic font-display font-light text-slate-400">no adjetivos</span>
            <span className="text-[#16a34a]">.</span>
          </h2>
        </div>

        {/* Solo la cita solicitada */}
        <div className="p-6 md:p-16 lg:p-20 flex flex-col justify-center bg-white">
          <blockquote className="font-serif text-xl sm:text-2xl text-slate-800 font-light leading-relaxed max-w-xl">
            &ldquo;Un perfil profesional sólido no se construye decorando adjetivos, sino ordenando los problemas que resolviste y demostrando qué valor concreto aportás a una organización.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
};
