import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile, RecyclingActivity } from '../models/user.model';
import { Reward, RedeemedCoupon } from '../models/reward.model';
import { MaterialType } from '../models/bin.model';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  // Estado inicial simulado del usuario
  private userProfileSubject = new BehaviorSubject<UserProfile>({
    name: 'Maura Renca',
    email: 'maura.renca@ecorenca.cl',
    points: 350,
    level: 2,
    levelName: 'Eco Guardián',
    nextLevelPoints: 600,
    xpProgress: 60 // (350 - 200) / (600 - 200) = 150 / 400 = 37.5%
  });

  private historySubject = new BehaviorSubject<RecyclingActivity[]>([
    {
      id: 'act_1',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Hace 2 días
      binName: 'Contenedor Municipalidad de Renca',
      material: 'plastic',
      pointsEarned: 150,
      quantity: 3
    },
    {
      id: 'act_2',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Hace 5 días
      binName: 'Punto Limpio Plaza de Renca',
      material: 'glass',
      pointsEarned: 200,
      quantity: 2
    }
  ]);

  private couponsSubject = new BehaviorSubject<RedeemedCoupon[]>([]);

  constructor() {
    this.recalculateLevel(this.userProfileSubject.value.points);
  }

  // Getters observables
  getProfile(): Observable<UserProfile> {
    return this.userProfileSubject.asObservable();
  }

  getHistory(): Observable<RecyclingActivity[]> {
    return this.historySubject.asObservable();
  }

  getCoupons(): Observable<RedeemedCoupon[]> {
    return this.couponsSubject.asObservable();
  }

  // Registrar una actividad de reciclaje y sumar puntos
  recycle(binName: string, material: MaterialType, quantity: number): void {
    const pointsPerMaterial: Record<MaterialType, number> = {
      plastic: 50,
      glass: 80,
      paper: 30,
      metal: 100
    };

    const pointsEarned = pointsPerMaterial[material] * quantity;
    const currentProfile = this.userProfileSubject.value;
    const newPoints = currentProfile.points + pointsEarned;

    // Crear nueva actividad
    const newActivity: RecyclingActivity = {
      id: `act_${Date.now()}`,
      date: new Date(),
      binName: binName,
      material: material,
      pointsEarned: pointsEarned,
      quantity: quantity
    };

    // Actualizar historial
    const updatedHistory = [newActivity, ...this.historySubject.value];
    this.historySubject.next(updatedHistory);

    // Actualizar perfil
    this.recalculateLevel(newPoints);
  }

  // Canjear una recompensa
  redeemReward(reward: Reward): RedeemedCoupon | null {
    const currentProfile = this.userProfileSubject.value;

    if (currentProfile.points < reward.pointsCost) {
      return null; // Puntos insuficientes
    }

    const newPoints = currentProfile.points - reward.pointsCost;

    // Generar cupón canjeado
    const randomCode = 'ECO-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newCoupon: RedeemedCoupon = {
      id: `coupon_${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: randomCode,
      redeemedDate: new Date(),
      status: 'active'
    };

    // Actualizar cupones
    const updatedCoupons = [newCoupon, ...this.couponsSubject.value];
    this.couponsSubject.next(updatedCoupons);

    // Actualizar perfil
    this.recalculateLevel(newPoints);

    return newCoupon;
  }

  // Calcular rango y progreso según los puntos acumulados
  private recalculateLevel(points: number): void {
    let level = 1;
    let levelName = 'Reciclador Novato';
    let minPoints = 0;
    let maxPoints = 200;

    if (points > 1200) {
      level = 4;
      levelName = 'Eco Héroe';
      minPoints = 1200;
      maxPoints = 3000; // Nivel máximo ficticio para la barra
    } else if (points > 600) {
      level = 3;
      levelName = 'Defensor Verde';
      minPoints = 600;
      maxPoints = 1200;
    } else if (points > 200) {
      level = 2;
      levelName = 'Eco Guardián';
      minPoints = 200;
      maxPoints = 600;
    }

    // Calcular progreso del nivel actual (XP)
    const clampedPoints = Math.min(Math.max(points, minPoints), maxPoints);
    const range = maxPoints - minPoints;
    const progress = range > 0 ? ((clampedPoints - minPoints) / range) * 100 : 100;

    const currentProfile = this.userProfileSubject.value;
    this.userProfileSubject.next({
      ...currentProfile,
      points: points,
      level: level,
      levelName: levelName,
      nextLevelPoints: maxPoints,
      xpProgress: Math.round(progress)
    });
  }
}
