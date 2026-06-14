import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, IonIcon, IonProgressBar, IonButton, 
  IonAccordionGroup, IonAccordion, IonItem
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  trophyOutline, leafOutline, chevronDownOutline, chevronUpOutline,
  sparklesOutline, earthOutline, schoolOutline, arrowForwardOutline,
  flaskOutline, hammerOutline, cogOutline, desktopOutline,
  briefcaseOutline, flashOutline, closeOutline
} from 'ionicons/icons';
import { RankingService } from '../../core/services/ranking.service';
import { CareerService } from '../../core/services/career.service';
import { AreaRanking } from '../../core/models/ranking.model';
import { Career } from '../../core/models/career.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonIcon, IonProgressBar, IonButton,
    IonAccordionGroup, IonAccordion, IonItem
  ]
})
export class RankingPage implements OnInit {
  rankings: AreaRanking[] = [];
  selectedCareer: Career | null = null;
  userAreaName: string = '';
  
  // Detalle del área seleccionada para el tarjetón modal animado
  selectedArea: AreaRanking | null = null;
  isModalOpen: boolean = false;

  // Resguardo para simulación de niveles (debug)
  realLevelBackup: number | null = null;
  realLevelNameBackup: string | null = null;
  
  constructor(
    private rankingService: RankingService,
    private careerService: CareerService,
    private router: Router
  ) {
    addIcons({
      trophyOutline, leafOutline, chevronDownOutline, chevronUpOutline,
      sparklesOutline, earthOutline, schoolOutline, arrowForwardOutline,
      flaskOutline, hammerOutline, cogOutline, desktopOutline,
      briefcaseOutline, flashOutline, closeOutline
    });
  }

  ngOnInit() {
    // Suscribirse a los puntajes de las áreas
    this.rankingService.getRankings().subscribe(ranks => {
      this.rankings = ranks;
      this.updateUserAreaName();
      
      // Si el modal está abierto y se actualizan los rankings, actualizar el objeto seleccionado
      if (this.isModalOpen && this.selectedArea) {
        const updated = ranks.find(r => r.areaKey === this.selectedArea?.areaKey);
        if (updated) {
          this.selectedArea = updated;
        }
      }
    });

    // Suscribirse a la carrera seleccionada
    this.careerService.getSelectedCareer().subscribe(career => {
      this.selectedCareer = career;
      this.updateUserAreaName();
    });
  }

  updateUserAreaName() {
    if (this.selectedCareer) {
      this.userAreaName = this.selectedCareer.area;
    } else {
      this.userAreaName = '';
    }
  }

  // Comprobar si un área es la del usuario
  isUserArea(areaName: string): boolean {
    return this.userAreaName === areaName;
  }

  // Obtener posición del área del usuario
  getUserAreaPosition(): number {
    if (!this.userAreaName) return 0;
    const index = this.rankings.findIndex(r => r.areaName === this.userAreaName);
    return index !== -1 ? index + 1 : 0;
  }

  // Obtener clase para el podio
  getPodiumClass(index: number): string {
    if (index === 0) return 'podium-gold';
    if (index === 1) return 'podium-silver';
    if (index === 2) return 'podium-bronze';
    return '';
  }

  // Obtener icono de puesto
  getRankIcon(index: number): string {
    if (index === 0) return 'trophy-outline';
    return '';
  }

  // Obtener los puntos necesarios para el siguiente nivel de árbol
  getStageMaxPoints(level: number): number {
    switch (level) {
      case 1: return 500;
      case 2: return 1000;
      case 3: return 1500;
      case 4: return 2000;
      case 5: return 3000;
      case 6: return 4000;
      case 7: return 5000;
      case 8: return 6500;
      case 9: return 8000;
      case 10: return 15000; // Máximo
      default: return 1000;
    }
  }

  // Calcular el progreso porcentual dentro del nivel actual del árbol
  getStageProgress(points: number, level: number): number {
    let min = 0;
    let max = 500;

    switch (level) {
      case 1:
        min = 0;
        max = 500;
        break;
      case 2:
        min = 500;
        max = 1000;
        break;
      case 3:
        min = 1000;
        max = 1500;
        break;
      case 4:
        min = 1500;
        max = 2000;
        break;
      case 5:
        min = 2000;
        max = 3000;
        break;
      case 6:
        min = 3000;
        max = 4000;
        break;
      case 7:
        min = 4000;
        max = 5000;
        break;
      case 8:
        min = 5000;
        max = 6500;
        break;
      case 9:
        min = 6500;
        max = 8000;
        break;
      case 10:
        min = 8000;
        max = 15000;
        break;
    }

    const clamped = Math.min(Math.max(points, min), max);
    const range = max - min;
    return range > 0 ? (clamped - min) / range : 1;
  }

  // Calcular puntos que faltan para subir de nivel el árbol
  getPointsToNextLevel(points: number, level: number): number {
    const max = this.getStageMaxPoints(level);
    if (level === 10) return 0;
    return max - points;
  }

  // Seleccionar área para ver detalles específicos en el modal animado
  selectAreaTree(areaKey: string) {
    const area = this.rankings.find(r => r.areaKey === areaKey);
    if (area) {
      this.selectedArea = area;
      this.isModalOpen = true;
    }
  }

  // Cerrar el modal animado con un delay de limpieza
  closeAreaModal() {
    this.isModalOpen = false;
    this.resetSimulation();
    setTimeout(() => {
      if (!this.isModalOpen) {
        this.selectedArea = null;
      }
    }, 300);
  }

  // Simular un nivel específico para pruebas (debug)
  simulateLevel(level: number) {
    if (this.selectedArea) {
      if (this.realLevelBackup === null) {
        this.realLevelBackup = this.selectedArea.treeLevel;
        this.realLevelNameBackup = this.selectedArea.treeLevelName;
      }
      this.selectedArea.treeLevel = level;
      this.selectedArea.treeLevelName = this.getTreeLevelName(level);
    }
  }

  // Restaurar nivel real
  resetSimulation() {
    if (this.selectedArea && this.realLevelBackup !== null) {
      this.selectedArea.treeLevel = this.realLevelBackup;
      this.selectedArea.treeLevelName = this.realLevelNameBackup || '';
    }
    this.realLevelBackup = null;
    this.realLevelNameBackup = null;
  }

  // Obtener nombre correspondiente a cada nivel
  getTreeLevelName(level: number): string {
    switch (level) {
      case 1: return 'Brote';
      case 2: return 'Tallo y Hoja';
      case 3: return 'Arbolito';
      case 4: return 'Joven';
      case 5: return 'Frondoso';
      case 6: return 'Florecido';
      case 7: return 'Con Nido';
      case 8: return 'Con Guardián';
      case 9: return 'De la Abundancia';
      case 10: return 'Comunitario';
      default: return 'Brote';
    }
  }

  // Navegar a la selección de carreras
  goToCareerSelection() {
    this.router.navigateByUrl('/career-selection');
  }

  // Obtener material en español
  translateMaterial(material: string): string {
    switch (material) {
      case 'plastic': return 'Plástico';
      case 'glass': return 'Vidrio';
      case 'paper': return 'Papel/Cartón';
      case 'metal': return 'Metal';
      default: return material;
    }
  }

  // Obtener unidad del material
  getMaterialUnit(material: string): string {
    switch (material) {
      case 'plastic': return 'unidades';
      case 'glass': return 'unidades';
      case 'paper': return 'kg';
      case 'metal': return 'latas';
      default: return 'unidades';
    }
  }
}
