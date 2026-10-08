export type TrackType = 'insercion' | 'cambio_rumbo';
export type ModalityType = 'individual' | 'grupal' | 'todas';

export interface CareerTrackInfo {
  id: TrackType;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  targetAudience: string[];
  frequentObstacles: string[];
  strategicApproach: string[];
  deliverables: string[];
}

export interface ConsultationPlan {
  id: string;
  title: string;
  format: '1 a 1' | 'Grupos reducidos (4-6)' | 'Intensivo';
  track: 'Ambos' | 'Inserción' | 'Cambio de rumbo';
  modality: 'individual' | 'grupal';
  duration: string;
  headline: string;
  description: string;
  includes: string[];
  outcome: string;
  spots: string;
  idealFor: string;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    track: TrackType;
    modalityPref: ModalityType;
    scoreKey: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Metodología' | 'Modalidades' | 'Logística';
}
