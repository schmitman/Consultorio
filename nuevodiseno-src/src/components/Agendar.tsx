import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { AGENDA, EMAIL, mailto } from '../content';
import { track } from '../analytics';

// Página interna para reservar el Diagnóstico 1 a 1: 1) elegir horario en la agenda de Google, 2) transferir al alias, 3) mandar el comprobante.
// La cita se confirma a mano cuando llega la transferencia.
const sitio = import.meta.env.BASE_URL;

const comprobante = mailto(
  'Comprobante: Diagnóstico 1 a 1',
  'Hola Mara,\n\nTe mando el comprobante de la transferencia para el Diagnóstico 1 a 1.\n\nNombre y apellido:\nDía y horario que reservé:\n\n(Adjuntá el comprobante a este mail)\n',
);

const Paso: React.FC<{ n: string; titulo: string; children: React.ReactNode }> = ({ n, titulo, children }) => (
  <section className="pt-8 mt-8 border-t hairline">
    <p className="mono">Paso {n}</p>
    <h2 className="text-3xl sm:text-4xl leading-tight mt-2">{titulo}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

export const Agendar: React.FC = () => {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(AGENDA.alias); } catch { /* sin portapapeles: el alias queda visible igual */ }
    setCopiado(true);
    track('alias_copiado');
    setTimeout(() => setCopiado(false), 2500);
  };
  const embebible = AGENDA.calendario.includes('calendar.google.com');

  return (
    <div className="min-h-dvh watercolor-paper-bg">
      <header className="px-5 sm:px-10 h-14 flex items-center justify-between border-b hairline bg-paper/85">
        <a href={sitio} className="font-serif text-2xl text-ink leading-none" aria-label="Volver al sitio">MS<span className="dot">.</span></a>
        <a href={sitio} className="text-sm text-muted hover:text-ink">← Volver al sitio</a>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-10 py-12 lg:py-16">
        <p className="mono">Diagnóstico 1 a 1 · calibración y posicionamiento</p>
        <h1 className="text-5xl sm:text-6xl leading-[1.02] mt-3">Agendá tu <em>diagnóstico</em><span className="dot">.</span></h1>
        <p className="text-lg text-ink mt-4 max-w-xl">1 encuentro de 90 min + devolución escrita, por videollamada.</p>

        <Paso n="1" titulo="Elegí día y horario">
          {embebible ? (
            <iframe
              src={AGENDA.calendario}
              title="Agenda de Mara Schmitman"
              className="w-full h-[940px] sm:h-[640px] border hairline bg-white"
              loading="lazy"
            />
          ) : AGENDA.calendario ? (
            <a href={AGENDA.calendario} target="_blank" rel="noopener" className="btn btn-dark">Ver horarios disponibles ↗</a>
          ) : (
            <div className="card p-6 text-muted">La agenda se suma acá en cuanto esté lista.</div>
          )}
        </Paso>

        <Paso n="2" titulo={AGENDA.linkPago ? 'Pagá para confirmar' : 'Transferí para confirmar'}>
          <p className="text-ink max-w-xl">{AGENDA.linkPago ? 'La cita queda confirmada cuando recibo el pago.' : 'La cita queda confirmada cuando recibo la transferencia.'}</p>
          {AGENDA.monto && (
            <p className="mt-5"><span className="mono">Monto</span> <span className="ml-2 font-serif text-3xl text-ink">{AGENDA.monto}</span></p>
          )}
          {AGENDA.linkPago && (
            <div className="mt-5">
              <a href={AGENDA.linkPago} target="_blank" rel="noopener" onClick={() => track('pago_mercadopago')} className="btn btn-dark">Pagar con Mercado Pago ↗</a>
              <p className="text-sm text-muted mt-2">Tarjeta de crédito o débito, o dinero en cuenta.</p>
            </div>
          )}
          <div className="card mt-5 p-5 sm:p-6 bg-white/60">
            <p className="mono">{AGENDA.linkPago ? 'O transferí al alias' : 'Alias'}</p>
            <div className="mt-1 flex items-center gap-3 flex-wrap">
              <span className="font-serif text-2xl text-ink select-all">{AGENDA.alias}</span>
              <button type="button" onClick={copiar} className="inline-flex items-center gap-1.5 h-11 px-3 border hairline bg-white/70 hover:border-ink text-sm" aria-live="polite">
                {copiado ? <><Check className="w-4 h-4" aria-hidden="true" /> Copiado</> : <><Copy className="w-4 h-4" aria-hidden="true" /> Copiar</>}
              </button>
            </div>
          </div>
        </Paso>

        <Paso n="3" titulo="Mandame el comprobante">
          <p className="text-ink max-w-xl">Con el comprobante y el horario que elegiste, te confirmo la cita por mail.</p>
          <a href={comprobante} onClick={() => track('comprobante_mail')} className="btn btn-dark mt-5">Enviar comprobante a Mara →</a>
        </Paso>

        <p className="mt-14 pt-6 border-t hairline text-sm text-muted">
          ¿Dudas antes de reservar? Escribime a <a href={mailto('Consulta: diagnóstico 1 a 1')} className="text-ink underline underline-offset-4">{EMAIL}</a>.
        </p>
      </main>
    </div>
  );
};
