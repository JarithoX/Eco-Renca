export type MaterialType = 'plastic' | 'glass' | 'paper' | 'metal';

export interface RecyclingBin {
  id: string;
  name: string;
  lat: number;
  lng: number;
  acceptedMaterials: MaterialType[];
  capacity: number; // Porcentaje de llenado (0 a 100)
  address: string;
  status: 'available' | 'full' | 'maintenance';
}
