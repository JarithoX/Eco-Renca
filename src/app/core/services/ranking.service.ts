import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AreaRanking, CareerContribution } from '../models/ranking.model';
import { CAREERS } from '../data/career.data';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private rankingsSubject = new BehaviorSubject<AreaRanking[]>([]);

  constructor() {
    this.loadInitialRankings();
  }

  // Obtener ranking ordenado por puntos descendente
  getRankings(): Observable<AreaRanking[]> {
    return this.rankingsSubject.asObservable();
  }

  // Sumar puntos a un área académica basándose en el careerId
  addPointsToArea(careerId: string, points: number): void {
    const career = CAREERS.find(c => c.id === careerId);
    if (!career) return;

    const currentRankings = this.rankingsSubject.value;
    const updatedRankings = currentRankings.map(area => {
      if (area.areaName === career.area) {
        const updatedPoints = area.points + points;
        
        // Actualizar la contribución específica de la carrera
        let careerCont = area.careerContributions.find(cc => cc.careerId === careerId);
        let updatedContributions = [...area.careerContributions];
        
        if (careerCont) {
          updatedContributions = updatedContributions.map(cc => 
            cc.careerId === careerId ? { ...cc, points: cc.points + points } : cc
          );
        } else {
          updatedContributions.push({
            careerId: careerId,
            careerName: career.name,
            points: points
          });
        }

        // Recalcular nivel de árbol y CO2 evitado
        const { level, name } = this.calculateTreeLevel(updatedPoints);
        const co2Saved = Math.round(updatedPoints * 0.12 * 10) / 10; // 0.12 kg CO2 por punto

        return {
          ...area,
          points: updatedPoints,
          treeLevel: level,
          treeLevelName: name,
          co2Saved: co2Saved,
          careerContributions: updatedContributions
        };
      }
      return area;
    });

    this.saveRankings(updatedRankings);
  }

  // Guardar y notificar cambios
  private saveRankings(rankings: AreaRanking[]): void {
    // Ordenar de mayor a menor puntuación
    const sorted = [...rankings].sort((a, b) => b.points - a.points);
    localStorage.setItem('ecoRencaAreaRanking', JSON.stringify(sorted));
    this.rankingsSubject.next(sorted);
  }

  // Cargar estado inicial o guardar por primera vez con los nuevos 10 niveles y puntajes iniciales ajustados
  private loadInitialRankings(): void {
    const saved = localStorage.getItem('ecoRencaAreaRanking');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AreaRanking[];
        // Forzar actualización si la versión previa de localStorage tiene puntuaciones desactualizadas
        const mecanica = parsed.find(p => p.areaKey === 'mecanica');
        const informatica = parsed.find(p => p.areaKey === 'informatica');
        if (mecanica && mecanica.points === 8500 && informatica && informatica.points === 4200) {
          this.rankingsSubject.next(parsed);
          return;
        }
      } catch (e) {
        console.error('Error cargando ranking, reiniciando mock data', e);
      }
    }

    // Si no hay datos o están desactualizados, generar datos iniciales simulados
    const initialRankings: AreaRanking[] = [
      {
        areaName: 'Área Mecánica',
        areaKey: 'mecanica',
        points: 8500, // Nivel 10 (Comunitario)
        treeLevel: 10,
        treeLevelName: 'Comunitario',
        colorClass: 'theme-mecanica',
        icon: 'cog-outline',
        co2Saved: 1020,
        careerContributions: [
          { careerId: 'mec_maquinaria', careerName: 'Ingeniería / Técnico en Maquinaria Pesada', points: 3100 },
          { careerId: 'mec_automotriz', careerName: 'Ingeniería / Técnico en Mecánica y Electromovilidad Automotriz', points: 2850 },
          { careerId: 'mec_mantenimiento', careerName: 'Ingeniería / Técnico en Mantenimiento Industrial', points: 1550 },
          { careerId: 'mec_mecatronica', careerName: 'Ingeniería / Técnico en Mecánica', points: 1000 }
        ],
        materialContributions: [
          { material: 'metal', quantity: 65 },
          { material: 'plastic', quantity: 52 },
          { material: 'paper', quantity: 38 }
        ]
      },
      {
        areaName: 'Área Informática, Ciberseguridad y Automatización',
        areaKey: 'informatica',
        points: 4200, // Nivel 7 (Con Nido)
        treeLevel: 7,
        treeLevelName: 'Con Nido',
        colorClass: 'theme-electronica',
        icon: 'desktop-outline',
        co2Saved: 504,
        careerContributions: [
          { careerId: 'inf_informatica', careerName: 'Ingeniería / Técnico en Informática', points: 1800 },
          { careerId: 'inf_ciberseguridad', careerName: 'Ingeniería en Ciberseguridad', points: 1200 },
          { careerId: 'inf_automatizacion', careerName: 'Ingeniería en Automatización y Control Industrial', points: 800 },
          { careerId: 'inf_teleco', careerName: 'Ingeniería en Telecomunicaciones, Conectividad y Redes', points: 400 }
        ],
        materialContributions: [
          { material: 'metal', quantity: 12 },
          { material: 'plastic', quantity: 25 },
          { material: 'paper', quantity: 30 }
        ]
      },
      {
        areaName: 'Área Administración, Logística y Comercio Exterior',
        areaKey: 'administracion',
        points: 1750, // Nivel 4 (Joven)
        treeLevel: 4,
        treeLevelName: 'Joven',
        colorClass: 'theme-agronomia',
        icon: 'briefcase-outline',
        co2Saved: 210,
        careerContributions: [
          { careerId: 'adm_administracion', careerName: 'Ingeniería / Técnico en Administración de Empresas', points: 650 },
          { careerId: 'adm_logistica', careerName: 'Ingeniería / Técnico en Logística', points: 450 },
          { careerId: 'adm_comex', careerName: 'Ingeniería / Técnico en Comercio Exterior', points: 350 },
          { careerId: 'adm_contabilidad', careerName: 'Contabilidad General', points: 300 }
        ],
        materialContributions: [
          { material: 'paper', quantity: 45 },
          { material: 'plastic', quantity: 18 },
          { material: 'glass', quantity: 5 }
        ]
      },
      {
        areaName: 'Área Electricidad y Sostenibilidad',
        areaKey: 'electricidad',
        points: 1250, // Nivel 3 (Arbolito)
        treeLevel: 3,
        treeLevelName: 'Arbolito',
        colorClass: 'theme-electronica',
        icon: 'flash-outline',
        co2Saved: 150,
        careerContributions: [
          { careerId: 'ele_electricidad', careerName: 'Ingeniería / Técnico Eléctrico', points: 1250 }
        ],
        materialContributions: [
          { material: 'metal', quantity: 8 },
          { material: 'plastic', quantity: 10 },
          { material: 'paper', quantity: 12 }
        ]
      },
      {
        areaName: 'Área Química y Procesos',
        areaKey: 'quimica',
        points: 750, // Nivel 2 (Tallo y Hoja)
        treeLevel: 2,
        treeLevelName: 'Tallo y Hoja',
        colorClass: 'theme-quimica',
        icon: 'flask-outline',
        co2Saved: 90,
        careerContributions: [
          { careerId: 'qui_quimica', careerName: 'Técnico / Ingeniería en Química', points: 750 }
        ],
        materialContributions: [
          { material: 'plastic', quantity: 10 },
          { material: 'glass', quantity: 4 },
          { material: 'paper', quantity: 3 }
        ]
      },
      {
        areaName: 'Área Construcción y Obras Civiles',
        areaKey: 'construccion',
        points: 350, // Nivel 1 (Brote)
        treeLevel: 1,
        treeLevelName: 'Brote',
        colorClass: 'theme-construccion',
        icon: 'hammer-outline',
        co2Saved: 42,
        careerContributions: [
          { careerId: 'con_construccion', careerName: 'Ingeniería / Técnico en Construcción', points: 350 }
        ],
        materialContributions: [
          { material: 'paper', quantity: 6 },
          { material: 'metal', quantity: 2 },
          { material: 'plastic', quantity: 5 }
        ]
      }
    ];

    this.saveRankings(initialRankings);
  }

  // Lógica de cálculo de los nuevos 10 niveles
  private calculateTreeLevel(points: number): { level: number, name: string } {
    if (points >= 8000) {
      return { level: 10, name: 'Comunitario' };
    } else if (points >= 6500) {
      return { level: 9, name: 'De la Abundancia' };
    } else if (points >= 5000) {
      return { level: 8, name: 'Con Guardián' };
    } else if (points >= 4000) {
      return { level: 7, name: 'Con Nido' };
    } else if (points >= 3000) {
      return { level: 6, name: 'Florecido' };
    } else if (points >= 2000) {
      return { level: 5, name: 'Frondoso' };
    } else if (points >= 1500) {
      return { level: 4, name: 'Joven' };
    } else if (points >= 1000) {
      return { level: 3, name: 'Arbolito' };
    } else if (points >= 500) {
      return { level: 2, name: 'Tallo y Hoja' };
    } else {
      return { level: 1, name: 'Brote' };
    }
  }
}
