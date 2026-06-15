import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, IonProgressBar, IonList, IonIcon, 
  IonFab, IonFabButton, IonBadge, IonButton, IonModal
} from '@ionic/angular/standalone';
import { PointsService } from '../../core/services/points.service';
import { UserProfile, RecyclingActivity } from '../../core/models/user.model';
import { QrSimulatorComponent } from '../../shared/components/qr-simulator/qr-simulator.component';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  qrCodeOutline, trophyOutline, personCircleOutline, 
  timeOutline, leafOutline, chevronForwardOutline,
  wineOutline, receiptOutline, barChartOutline,
  schoolOutline, arrowForwardOutline, hammerOutline,
  flaskOutline, constructOutline, flashOutline,
  nutritionOutline, earthOutline, sparklesOutline,
  bulbOutline, cogOutline, trashOutline,
  closeCircleOutline, chevronDownOutline, chevronUpOutline,
  nuclearOutline, waterOutline, gitNetworkOutline,
  hardwareChipOutline, sunnyOutline, carSportOutline,
  settingsOutline, cubeOutline, bonfireOutline,
  desktopOutline, shieldCheckmarkOutline, wifiOutline,
  briefcaseOutline, airplaneOutline, calculatorOutline,
  buildOutline
} from 'ionicons/icons';
import { CAREERS } from '../../core/data/career.data';
import { Career } from '../../core/models/career.model';
import { CareerService } from '../../core/services/career.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonProgressBar, IonList, IonIcon, 
    IonFab, IonFabButton, IonBadge, IonButton, IonModal
  ],
  providers: [ModalController]
})
export class HomePage implements OnInit {
  profile?: UserProfile;
  recentActivities: RecyclingActivity[] = [];
  
  // Modal Secreto
  isSecretModalOpen = false;
  logoClickCount = 0;
  logoClickTimeout: any;

  // Lógica Eco-Carreras
  careers: Career[] = CAREERS;
  selectedCareer: Career | null = null;
  expandedWastes: Record<string, boolean> = {};

  constructor(
    private pointsService: PointsService,
    private modalCtrl: ModalController,
    private router: Router,
    private careerService: CareerService,
    private seoService: SeoService
  ) {
    addIcons({
      qrCodeOutline,
      trophyOutline,
      personCircleOutline,
      timeOutline,
      leafOutline,
      chevronForwardOutline,
      wineOutline,
      receiptOutline,
      barChartOutline,
      schoolOutline,
      arrowForwardOutline,
      hammerOutline,
      flaskOutline,
      constructOutline,
      flashOutline,
      nutritionOutline,
      earthOutline,
      sparklesOutline,
      bulbOutline,
      cogOutline,
      trashOutline,
      closeCircleOutline,
      chevronDownOutline,
      chevronUpOutline,
      nuclearOutline,
      waterOutline,
      gitNetworkOutline,
      hardwareChipOutline,
      sunnyOutline,
      carSportOutline,
      settingsOutline,
      cubeOutline,
      bonfireOutline,
      desktopOutline,
      shieldCheckmarkOutline,
      wifiOutline,
      briefcaseOutline,
      airplaneOutline,
      calculatorOutline,
      buildOutline
    });
  }

  ngOnInit() {
    this.seoService.generateTags({
      title: 'Inicio',
      description: 'Lleva un registro de tus reciclajes en EcoRenca, acumula eco-puntos y sube de rango.',
      url: '/home'
    });

    this.pointsService.getProfile().subscribe(prof => {
      this.profile = prof;
    });

    this.pointsService.getHistory().subscribe(history => {
      this.recentActivities = history.slice(0, 5);
    });

    // Suscribirse de manera reactiva a la carrera seleccionada
    this.careerService.getSelectedCareer().subscribe(career => {
      this.selectedCareer = career;
    });
  }

  async openScanner() {
    const modal = await this.modalCtrl.create({
      component: QrSimulatorComponent,
      cssClass: 'eco-scanner-modal'
    });
    return await modal.present();
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

  getMaterialIcon(material: string): string {
    switch (material) {
      case 'plastic': return 'leaf-outline';
      case 'glass': return 'wine-outline';
      case 'paper': return 'receipt-outline';
      case 'metal': return 'bar-chart-outline';
      default: return 'leaf-outline';
    }
  }

  translateMaterial(material: string): string {
    switch (material) {
      case 'plastic': return 'Plástico';
      case 'glass': return 'Vidrio';
      case 'paper': return 'Papel/Cartón';
      case 'metal': return 'Metal/Latas';
      default: return 'Otro';
    }
  }

  // Métodos de Eco-Carreras
  clearCareer() {
    this.careerService.clearCareer();
    this.router.navigateByUrl('/career-selection');
  }

  toggleWaste(wasteName: string) {
    this.expandedWastes[wasteName] = !this.expandedWastes[wasteName];
  }

  isWasteExpanded(wasteName: string): boolean {
    return !!this.expandedWastes[wasteName];
  }

  onLogoClick() {
    this.logoClickCount++;
    if (this.logoClickCount === 4) {
      this.logoClickCount = 0;
      this.isSecretModalOpen = true;
    }

    // Reiniciar conteo después de 1.5 segundos de inactividad
    clearTimeout(this.logoClickTimeout);
    this.logoClickTimeout = setTimeout(() => {
      this.logoClickCount = 0;
    }, 1500);
  }
}
