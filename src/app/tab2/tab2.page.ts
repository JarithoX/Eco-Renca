import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, 
  IonBadge, IonButton, 
  IonIcon, IonChip, IonProgressBar
} from '@ionic/angular/standalone';
import { BinsService } from '../core/services/bins.service';
import { RecyclingBin, MaterialType } from '../core/models/bin.model';
import { addIcons } from 'ionicons';
import { 
  mapOutline, locateOutline, leafOutline, 
  navigateOutline, refreshOutline, constructOutline, 
  alertCircleOutline, checkmarkCircleOutline, closeOutline,
  pinOutline, pinSharp
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonSegment, IonSegmentButton, IonLabel, 
    IonBadge, IonButton, 
    IonIcon, IonChip, IonProgressBar
  ]
})
export class Tab2Page implements OnInit {
  // State
  bins: RecyclingBin[] = [];
  filteredBins: RecyclingBin[] = [];
  selectedFilter: MaterialType | 'all' = 'all';
  selectedBin: RecyclingBin | null = null;

  constructor(private binsService: BinsService) {
    addIcons({
      mapOutline,
      locateOutline,
      leafOutline,
      navigateOutline,
      refreshOutline,
      constructOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      closeOutline,
      pinOutline,
      pinSharp
    });
  }

  ngOnInit() {
    this.loadBins();
  }

  private loadBins() {
    this.binsService.getBins().subscribe(allBins => {
      this.bins = allBins;
      this.applyFilter();
    });
  }

  // Filtrar contenedores
  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.applyFilter();
    
    // Si el contenedor seleccionado no cumple el filtro, deseleccionarlo
    if (this.selectedBin && this.selectedFilter !== 'all' && !this.selectedBin.acceptedMaterials.includes(this.selectedFilter)) {
      this.selectedBin = null;
    }
  }

  private applyFilter() {
    this.filteredBins = this.binsService.filterBinsByMaterial(this.selectedFilter);
  }

  // Evento clic en marcador del mapa vector
  onMarkerClick(bin: RecyclingBin) {
    this.selectedBin = bin;
  }

  // Cerrar tarjeta de detalle
  closeDetails() {
    this.selectedBin = null;
  }

  // Re-centrar / resetear selección
  recenter() {
    this.selectedBin = null;
  }

  // Convertir latitud/longitud a coordenadas de pantalla (porcentajes) para el mapa vector de Renca
  getBinPosition(bin: RecyclingBin) {
    // Límites aproximados del área urbana de Renca
    const latMin = -33.398511; // Norte (Cerro Renca)
    const latMax = -33.418231; // Sur (Parque Las Palmeras)
    const lngMin = -70.738321; // Oeste (Av. Condell)
    const lngMax = -70.707245; // Este (Parque Las Palmeras)

    const latSpan = Math.abs(latMax - latMin);
    const lngSpan = Math.abs(lngMax - lngMin);

    // Calculamos el porcentaje de desviación respecto al mínimo
    const topPercent = (Math.abs(bin.lat - latMin) / latSpan) * 100;
    const leftPercent = (Math.abs(bin.lng - lngMin) / lngSpan) * 100;

    // Limitamos los porcentajes entre 10% y 90% para evitar que queden en los bordes del mapa
    const topClamped = 15 + (topPercent / 100) * 70;
    const leftClamped = 15 + (leftPercent / 100) * 70;

    return {
      top: `${topClamped}%`,
      left: `${leftClamped}%`
    };
  }

  // Métodos de ayuda para la interfaz
  translateMaterial(material: string): string {
    switch (material) {
      case 'plastic': return 'Plástico';
      case 'glass': return 'Vidrio';
      case 'paper': return 'Papel/Cartón';
      case 'metal': return 'Metal/Lata';
      default: return material;
    }
  }

  getMaterialColor(material: string): string {
    switch (material) {
      case 'plastic': return 'success';
      case 'glass': return 'secondary';
      case 'paper': return 'warning';
      case 'metal': return 'danger';
      default: return 'medium';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'Disponible';
      case 'full': return 'Lleno';
      case 'maintenance': return 'Mantención';
      default: return status;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'available': return 'success';
      case 'full': return 'danger';
      case 'maintenance': return 'medium';
      default: return 'medium';
    }
  }
}
