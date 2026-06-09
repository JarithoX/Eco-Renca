import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, 
  IonBadge, IonButton, 
  IonIcon, IonChip, IonProgressBar
} from '@ionic/angular/standalone';
import { BinsService } from '../../core/services/bins.service';
import { RecyclingBin, MaterialType } from '../../core/models/bin.model';
import { addIcons } from 'ionicons';
import { 
  mapOutline, locateOutline, leafOutline, 
  navigateOutline, refreshOutline, constructOutline, 
  alertCircleOutline, checkmarkCircleOutline, closeOutline,
  pinOutline, pinSharp
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
    IonSegment, IonSegmentButton, IonLabel, 
    IonBadge, IonButton, 
    IonIcon, IonChip, IonProgressBar
  ]
})
export class MapPage implements OnInit {
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

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
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

  recenter() {
    this.selectedBin = null;
  }

  getBinPosition(bin: RecyclingBin) {
    const latMin = -33.398511;
    const latMax = -33.418231;
    const lngMin = -70.738321;
    const lngMax = -70.707245;

    const latSpan = Math.abs(latMax - latMin);
    const lngSpan = Math.abs(lngMax - lngMin);

    const topPercent = (Math.abs(bin.lat - latMin) / latSpan) * 100;
    const leftPercent = (Math.abs(bin.lng - lngMin) / lngSpan) * 100;

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
