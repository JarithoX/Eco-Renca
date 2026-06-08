export interface UserProfile {
  name: string;
  email: string;
  points: number;
  level: number;
  levelName: string;
  nextLevelPoints: number;
  xpProgress: number; // Porcentaje de 0 a 100
}

export interface RecyclingActivity {
  id: string;
  date: Date;
  binName: string;
  material: 'plastic' | 'glass' | 'paper' | 'metal';
  pointsEarned: number;
  quantity: number; // Cantidad en unidades o Kg
}
