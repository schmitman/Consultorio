import React from 'react';
import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  onOpenBooking: () => void;
  onOpenDiagnostic: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenBooking, onOpenDiagnostic }) => {
  const navItems = [
    { name: 'Enfoque', href: '#enfoque' },
    { name: 'Caminos', href: '#caminos' },
    { name: 'Modalidades', href: '#modalidades' },
    { name: 'Diagnóstico', href: '#diagnostico', onClick: onOpenDiagnostic },
    { name: 'Sobre Mara', href: '#sobre-mara' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Hablemos', href: '#contacto' },
  ];

  return (
    <>
      {/* Desktop Vertical Left Navigation */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-slate-900/5 hidden lg:flex flex-col items-center py-10 justify-between z-50 bg-white/85 backdrop-blur-md">
        {/* Brand Monogram */}
        <a
          href="#"
          className="font-display italic text-3xl tracking-tighter hover:text-emerald-700 transition-colors group flex items-baseline"
          title="Mara Schmitman"
        >
          MS
          <span className="text-[#16a34a] font-sans not-italic text-2xl font-bold leading-none">.</span>
        </a>

        {/* Vertical Navigation Links */}
        <div className="flex flex-col gap-10 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={item.onClick}
              className="mono-label vertical-text hover:text-[#16a34a] hover:opacity-100 transition-all cursor-pointer py-1"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Bottom Social / Direct Actions */}
        <div className="flex flex-col gap-5 items-center">
          <a
            href="https://www.linkedin.com/in/mara-schmitman2/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Mara Schmitman"
            className="text-slate-400 hover:text-[#16a34a] transition-colors p-2"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:mara@schmitman.com"
            aria-label="Email directo a Mara Schmitman"
            className="text-slate-400 hover:text-[#16a34a] transition-colors p-2"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden fixed top-0 w-full h-16 border-b border-slate-900/5 bg-white/90 backdrop-blur-md z-50 px-6 flex items-center justify-between">
        <a href="#" className="font-display italic text-2xl tracking-tighter flex items-baseline">
          MS
          <span className="text-[#16a34a] font-sans not-italic text-xl font-bold leading-none">.</span>
        </a>

        <div className="flex items-center gap-4">
          <a
            href="#diagnostico"
            onClick={onOpenDiagnostic}
            className="mono-label text-slate-600 hover:text-[#16a34a] text-[10px]"
          >
            Diagnóstico
          </a>
          <button
            onClick={onOpenBooking}
            className="mono-label text-[#16a34a] font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            Hablemos <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </nav>
    </>
  );
};
