export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string; // Lucide icon name
  priceEstimate: string;
  benefits: string[];
}

export interface PoolDimensions {
  type: 'rectangular' | 'round' | 'oval';
  length: number;
  width: number;
  depth: number;
  diameter?: number;
}

export interface GalleryItem {
  id: string;
  category: 'green' | 'fiber' | 'masonry' | 'post-party';
  title: string;
  description: string;
  beforeUrl: string;
  afterUrl: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface BookingRequest {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  poolType: string;
  poolSize: string; // e.g. "Pequena (< 15 mil L)"
  preferredDate: string;
  preferredPeriod: 'manha' | 'tarde';
  additionalNotes?: string;
  status: 'pending' | 'confirmed';
}

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  poolRegistered?: {
    type: string;
    volumeLiters: number;
    lastTreatmentDate: string;
    waterStatus: 'cristalina' | 'tratando' | 'atenção';
  };
}

export interface VisitHistory {
  id: string;
  date: string;
  parameters: {
    ph: number;
    alcalinidade: number;
    cloro: number;
  };
  technician: string;
  status: 'Concluído' | 'Agendado';
  notes: string;
}
