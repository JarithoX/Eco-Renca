export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'transport' | 'local_shop' | 'eco_product';
  logo: string; // Icono de Ionicons a mostrar
  value: string; // Detalle del beneficio
}

export interface RedeemedCoupon {
  id: string;
  rewardId: string;
  title: string;
  code: string; // Código QR / de barra simulado
  redeemedDate: Date;
  status: 'active' | 'used' | 'expired';
}
