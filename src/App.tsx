/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TrackSelector } from './components/TrackSelector';
import { ServicesGrid } from './components/ServicesGrid';
import { DiagnosticTool } from './components/DiagnosticTool';
import { Manifesto } from './components/Manifesto';
import { AboutMara } from './components/AboutMara';
import { FaqSection } from './components/FaqSection';
import { ApplicationForm } from './components/ApplicationForm';
import { Footer } from './components/Footer';
import { ConsultationPlan, TrackType } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackType>('insercion');
  const [selectedPlan, setSelectedPlan] = useState<ConsultationPlan | undefined>(undefined);
  const [diagnosticSummary, setDiagnosticSummary] = useState<string>('');

  const handleOpenBooking = (track: TrackType = 'insercion', plan?: ConsultationPlan) => {
    setSelectedTrack(track);
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleOpenDiagnostic = () => {
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyWithDiagnostic = (data: {
    track: TrackType;
    plan: ConsultationPlan;
    answersSummary: string;
  }) => {
    setSelectedTrack(data.track);
    setSelectedPlan(data.plan);
    setDiagnosticSummary(data.answersSummary);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-[#16a34a] selection:text-white">
      {/* Side and Mobile Navigation */}
      <Navigation
        onOpenBooking={() => handleOpenBooking('insercion')}
        onOpenDiagnostic={handleOpenDiagnostic}
      />

      {/* Main Content (padded left on desktop for vertical sidebar) */}
      <main className="lg:pl-20">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking('insercion')}
          onOpenDiagnostic={handleOpenDiagnostic}
        />

        {/* Core Tracks: Inserción vs Cambio de Rumbo */}
        <TrackSelector
          onSelectTrack={(track, modality) => {
            handleOpenBooking(track);
          }}
        />

        {/* Consultation Formats & Programs */}
        <ServicesGrid
          onSelectPlan={(plan) => {
            const track = plan.track === 'Inserción' ? 'insercion' : 'cambio_rumbo';
            handleOpenBooking(track, plan);
          }}
        />

        {/* Diagnostic Tool ("Termómetro de carrera") */}
        <DiagnosticTool onApplyWithDiagnostic={handleApplyWithDiagnostic} />

        {/* Enfoque: Hechos, no adjetivos */}
        <Manifesto />

        {/* About Mara Schmitman */}
        <AboutMara />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Inline Application Section */}
        <ApplicationForm
          initialTrack={selectedTrack}
          initialPlan={selectedPlan}
          initialSummary={diagnosticSummary}
          isModal={false}
        />

        {/* Footer */}
        <Footer />
      </main>

      {/* Booking Modal when triggered from anywhere */}
      {isModalOpen && (
        <ApplicationForm
          initialTrack={selectedTrack}
          initialPlan={selectedPlan}
          initialSummary={diagnosticSummary}
          isModal={true}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
