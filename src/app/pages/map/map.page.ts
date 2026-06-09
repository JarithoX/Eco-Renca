import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonBadge, IonButton, 
  IonIcon, IonChip, IonProgressBar, IonLabel
} from '@ionic/angular/standalone';
import { BinsService } from '../../core/services/bins.service';
import { RecyclingBin, MaterialType } from '../../core/models/bin.model';
import { addIcons } from 'ionicons';
import { 
  mapOutline, locateOutline, leafOutline, 
  navigateOutline, refreshOutline, constructOutline, 
  alertCircleOutline, checkmarkCircleOutline, closeOutline,
  pinOutline, pinSharp, carOutline, schoolOutline, cafeOutline,
  wineOutline, receiptOutline, barChartOutline,
  addOutline, removeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonBadge, IonButton, 
    IonIcon, IonChip, IonProgressBar, IonLabel
  ]
})
export class MapPage implements OnInit {
  bins: RecyclingBin[] = [];
  filteredBins: RecyclingBin[] = [];
  selectedFilter: MaterialType | 'all' = 'all';
  selectedBin: RecyclingBin | null = null;

  // Estado de interacción de Pan & Zoom
  scale = 1.0;
  translateX = 0;
  translateY = 0;
  
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  
  // Límites
  readonly minScale = 1.0;
  readonly maxScale = 3.5;

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
      pinSharp,
      carOutline,
      schoolOutline,
      cafeOutline,
      wineOutline,
      receiptOutline,
      barChartOutline,
      addOutline,
      removeOutline
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

  // Métodos interactivos de Zoom
  zoomIn() {
    this.scale = Math.min(this.scale + 0.3, this.maxScale);
    this.checkBounds();
  }

  zoomOut() {
    this.scale = Math.max(this.scale - 0.3, this.minScale);
    this.checkBounds();
  }

  // Gestores de eventos de Arrastre/Desplazamiento (Pointer events unifican ratón y táctil)
  onPointerDown(event: PointerEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
    
    const element = event.currentTarget as HTMLElement;
    element.setPointerCapture(event.pointerId);
  }

  onPointerMove(event: PointerEvent) {
    if (!this.isDragging) return;
    
    const newX = event.clientX - this.startX;
    const newY = event.clientY - this.startY;
    
    // El límite máximo de desplazamiento aumenta con el factor de escala
    const maxOffset = (this.scale - 1.0) * 180;
    this.translateX = Math.max(-maxOffset, Math.min(maxOffset, newX));
    this.translateY = Math.max(-maxOffset, Math.min(maxOffset, newY));
  }

  onPointerUp(event: PointerEvent) {
    this.isDragging = false;
    const element = event.currentTarget as HTMLElement;
    element.releasePointerCapture(event.pointerId);
  }

  onWheel(event: WheelEvent) {
    // Zoom mediante rueda del ratón
    event.preventDefault();
    const zoomFactor = event.deltaY < 0 ? 0.15 : -0.15;
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + zoomFactor));
    this.checkBounds();
  }

  private checkBounds() {
    if (this.scale === 1.0) {
      this.translateX = 0;
      this.translateY = 0;
    } else {
      const maxOffset = (this.scale - 1.0) * 180;
      this.translateX = Math.max(-maxOffset, Math.min(maxOffset, this.translateX));
      this.translateY = Math.max(-maxOffset, Math.min(maxOffset, this.translateY));
    }
  }

  recenter() {
    this.scale = 1.0;
    this.translateX = 0;
    this.translateY = 0;
    this.selectedBin = null;
  }

  setFilter(filter: MaterialType | 'all') {
    this.selectedFilter = filter;
    this.applyFilter();
    
    if (this.selectedBin && this.selectedFilter !== 'all' && !this.selectedBin.acceptedMaterials.includes(this.selectedFilter)) {
      this.selectedBin = null;
    }
  }

  private applyFilter() {
    this.filteredBins = this.binsService.filterBinsByMaterial(this.selectedFilter);
  }

  onMarkerClick(bin: RecyclingBin) {
    this.selectedBin = bin;
  }

  closeDetails() {
    this.selectedBin = null;
  }

  getBinPosition(bin: RecyclingBin) {
    // Límites aproximados del campus de INACAP Sede Renca
    const latMin = -33.404800; // Norte
    const latMax = -33.406300; // Sur
    const lngMin = -70.683500; // Oeste
    const lngMax = -70.681800; // Este

    const latSpan = Math.abs(latMax - latMin);
    const lngSpan = Math.abs(lngMax - lngMin);

    // Calculamos el porcentaje de desviación respecto al mínimo (Norte y Oeste)
    const topPercent = (Math.abs(bin.lat - latMin) / latSpan) * 100;
    const leftPercent = (Math.abs(bin.lng - lngMin) / lngSpan) * 100;

    // Ajustamos la distribución de pines dentro de los márgenes visuales del mapa vectorial (15% a 85%)
    const topClamped = 15 + (topPercent / 100) * 70;
    const leftClamped = 15 + (leftPercent / 100) * 70;

    return {
      top: `${topClamped}%`,
      left: `${leftClamped}%`
    };
  }

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
