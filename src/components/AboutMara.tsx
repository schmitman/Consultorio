import React from 'react';
import { ExternalLink } from 'lucide-react';

export const AboutMara: React.FC = () => {
  return (
    <section id="sobre-mara" className="grid lg:grid-cols-2 border-b border-slate-900/5">
      {/* Left text column */}
      <div className="p-6 md:p-16 lg:p-20 border-b lg:border-b-0 lg:border-r border-slate-900/5 flex flex-col justify-between">
        <div>
          <p className="mono-label mb-8">05 / Sobre Mara Schmitman</p>
          <h2 className="font-sans text-4xl sm:text-6xl font-light tracking-tight mb-8 leading-none text-slate-950">
            Criterio forjado en{' '}
            <br />
            <span className="italic font-display font-light text-slate-400">el terreno</span>
            <span className="text-[#16a34a]">.</span>
          </h2>

          <div className="space-y-6 font-serif text-slate-600 font-light text-base sm:text-lg leading-relaxed max-w-lg">
            <p>
              Soy Licenciada en Psicología con posgrado en Gestión Estratégica de Tecnología y{' '}
              <strong className="text-slate-900 font-normal">especialista en diseño organizacional</strong>. Fundé{' '}
              <strong className="text-slate-900 font-normal">Schmitman HR</strong> en 2008, firma referente en
              armado de equipos, talento y estructura de trabajo.
            </p>
            <p>
              A lo largo de más de 18 años lideré el armado de equipos y diseño organizacional. Abro este espacio de consultoría
              personal y grupal para volcar ese criterio acumulado directamente a personas que necesitan destrabar su inserción laboral o ejecutar un cambio de rumbo con bases firmes.
            </p>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-900/5 mt-10">
          <p className="mono-label mb-4">Credenciales y Ubicación</p>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-700">
            <div>
              <p className="text-slate-400">Formación</p>
              <p className="font-medium text-slate-900">Lic. en Psicología</p>
            </div>
            <div>
              <p className="text-slate-400">Especialidad</p>
              <p className="font-medium text-slate-900">Diseño Organizacional</p>
            </div>
            <div>
              <p className="text-slate-400">Base</p>
              <p className="font-medium text-slate-900">Tigre, Buenos Aires, AR</p>
            </div>
            <div>
              <p className="text-slate-400">Perfil Profesional</p>
              <a
                href="https://www.linkedin.com/in/mara-schmitman2/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 transition-colors"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Botanical image with photo in circle next to Mara Schmitman signature */}
      <div className="relative min-h-[420px] lg:min-h-full bg-slate-100 flex flex-col justify-end p-8 sm:p-12 overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1200"
          alt="Mara Schmitman: Sistemas a escala humana"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-55 group-hover:opacity-75 transition-all duration-1000 scale-100 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

        <div className="relative z-10 text-white max-w-md">
          <p className="mono-label text-emerald-400 mb-3 opacity-100">Declaración de principios</p>
          <p className="font-serif italic text-xl sm:text-2xl font-light leading-snug mb-6">
            &ldquo;La tecnología escala; la cultura y las trayectorias sostienen. No hay atajos sin método ni talento sin evidencia.&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <img
              src="/mara.jpg"
              alt="Mara Schmitman"
              className="w-[90px] h-[90px] rounded-full border-2 border-white object-cover grayscale shrink-0 shadow-lg"
            />
            <p className="text-sm font-sans font-medium tracking-wide text-white">
              Mara Schmitman
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
