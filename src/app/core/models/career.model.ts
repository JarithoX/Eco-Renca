import { MaterialType } from './bin.model';

export interface CareerWaste {
  name: string;
  material: MaterialType;
  description: string;
  standardRecycling: string;
  innovativeRecycling: string;
}

export interface Career {
  id: string;
  name: string;
  area: string;
  description: string;
  icon: string;
  gradientClass: string;
  bgDecorIcons: string[];
  wastes: CareerWaste[];
}
