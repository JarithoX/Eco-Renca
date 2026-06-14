export interface CareerContribution {
  careerId: string;
  careerName: string;
  points: number;
}

export interface MaterialContribution {
  material: 'plastic' | 'glass' | 'paper' | 'metal';
  quantity: number;
}

export interface AreaRanking {
  areaName: string;
  areaKey: string; // 'quimica' | 'construccion' | 'mecanica' | 'informatica' | 'administracion' | 'electricidad'
  points: number;
  treeLevel: number; // 1 a 5
  treeLevelName: string; // 'Brote' | 'Arbolito' | 'Joven' | 'Frondoso' | 'Milenario'
  colorClass: string;
  icon: string;
  careerContributions: CareerContribution[];
  materialContributions: MaterialContribution[];
  co2Saved: number; // en Kg
}
