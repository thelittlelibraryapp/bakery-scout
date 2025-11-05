export interface Bakery {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  notes: string | null;
  quality_score: number | null;
  pricing_score: number | null;
  variety_score: number | null;
  location_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface BakeryInput {
  name: string;
  address?: string;
  phone?: string;
  website?: string;
  notes?: string;
  quality_score?: number;
  pricing_score?: number;
  variety_score?: number;
  location_score?: number;
}

export interface BakeryWithAverage extends Bakery {
  average_score: number;
}
