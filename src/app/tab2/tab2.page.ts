import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, 
  IonBadge, IonButton, 
  IonIcon, IonChip, IonProgressBar, IonSpinner
} from '@ionic/angular/standalone';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { BinsService } from '../core/services/bins.service';
import { RecyclingBin, MaterialType } from '../core/models/bin.model';
import { environment } from '../../environments/environment';
import { addIcons } from 'ionicons';
import { 
  mapOutline, locateOutline, leafOutline, 
  navigateOutline, refreshOutline, constructOutline, 
  alertCircleOutline, checkmarkCircleOutline, closeOutline
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
    IonIcon, IonChip, IonProgressBar, IonSpinner,
    GoogleMap, 
    MapMarker
  ]
})
export class Tab2Page implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  isMapLoaded = false;
  apiKeyLoaded = false;
  
  // Google Map configs
  center: google.maps.LatLngLiteral = { lat: -33.407222, lng: -70.730278 }; // Centro Renca
  zoom = 14;
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }
    ]
  };

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
      closeOutline
    });
  }

  ngOnInit() {
    this.loadBins();

    // Cargar Google Maps SDK de forma dinámica
    this.loadGoogleMapsScript().then(() => {
      this.isMapLoaded = true;
    });
  }

  private loadBins() {
    this.binsService.getBins().subscribe(allBins => {
      this.bins = allBins;
      this.applyFilter();
    });
  }

  // Cargar SDK dinámicamente
  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      const key = environment.googleMapsApiKey;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        resolve();
      };
      
      script.onerror = () => {
        console.warn('Google Maps Script failed to load. Will check if offline/placeholder keys.');
        resolve();
      };

      document.head.appendChild(script);
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

  // Evento clic en marcador
  onMarkerClick(bin: RecyclingBin) {
    this.selectedBin = bin;
    this.center = { lat: bin.lat, lng: bin.lng };
  }

  // Cerrar tarjeta de detalle
  closeDetails() {
    this.selectedBin = null;
  }

  // Re-centrar mapa en Renca
  recenter() {
    this.center = { lat: -33.407222, lng: -70.730278 };
    this.zoom = 14;
    this.selectedBin = null;
  }

  // Métodos de ayuda para la interfaz
  getMarkerPosition(bin: RecyclingBin): google.maps.LatLngLiteral {
    return { lat: bin.lat, lng: bin.lng };
  }

  // Personalizar los pines del mapa
  getMarkerOptions(bin: RecyclingBin): google.maps.MarkerOptions {
    let pinColor = '#10b981'; // Verde por defecto
    if (bin.status === 'full') pinColor = '#ef4444'; // Rojo
    if (bin.status === 'maintenance') pinColor = '#94a3b8'; // Gris

    return {
      title: bin.name,
      label: {
        text: bin.name.substring(0, 1),
        color: '#ffffff',
        fontWeight: 'bold'
      },
      icon: {
        path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
        fillColor: pinColor,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 1.8,
        anchor: new google.maps.Point(12, 24)
      }
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
