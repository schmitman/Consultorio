import React, { useEffect, useRef } from 'react';
const pradoLupinos = `${import.meta.env.BASE_URL}img/prado-lupinos.jpg`;

// Prado de lupinos fijo al pie de la ventana, detrás del contenido. Se desplaza unos píxeles con el mouse; nada más.
export const Meadow: React.FC = () => {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 10;
      const dy = (e.clientY / window.innerHeight - 0.5) * 6;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.03)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden h-[32vh] lg:h-[40vh] lg:left-60" aria-hidden="true">
      <img
        ref={ref}
        src={pradoLupinos}
        alt=""
        className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-bottom mix-blend-multiply opacity-60 will-change-transform transition-transform duration-700 ease-out"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 75%)',
          filter: 'saturate(0.6) contrast(0.92) brightness(1.03)',
        }}
      />
    </div>
  );
};
