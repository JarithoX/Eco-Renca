import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonProgressBar, IonList, IonIcon, 
  IonFab, IonFabButton, IonBadge, IonText
} from '@ionic/angular/standalone';
import { PointsService } from '../core/services/points.service';
import { UserProfile, RecyclingActivity } from '../core/models/user.model';
import { QrSimulatorComponent } from '../shared/components/qr-simulator/qr-simulator.component';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  qrCodeOutline, trophyOutline, personCircleOutline, 
  timeOutline, leafOutline, chevronForwardOutline,
  wineOutline, receiptOutline, barChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonProgressBar, IonList, IonIcon, 
    IonFab, IonFabButton, IonBadge, IonText
  ],
  providers: [ModalController] // Proveer ModalController para poder levantar el modal
})
export class Tab1Page implements OnInit {
  profile!: UserProfile;
  recentActivities: RecyclingActivity[] = [];

  constructor(
    private pointsService: PointsService,
    private modalCtrl: ModalController
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
      barChartOutline
    });
  }

  ngOnInit() {
    // Suscribirse a los datos del perfil
    this.pointsService.getProfile().subscribe(prof => {
      this.profile = prof;
    });

    // Suscribirse a las actividades recientes (limitar a las últimas 5 en la vista)
    this.pointsService.getHistory().subscribe(history => {
      this.recentActivities = history.slice(0, 5);
    });
  }

  // Abrir modal simulador de QR
  async openScanner() {
    const modal = await this.modalCtrl.create({
      component: QrSimulatorComponent,
      cssClass: 'eco-scanner-modal'
    });
    return await modal.present();
  }

  // Retornar clase css para colores de materiales
  getMaterialColor(material: string): string {
    switch (material) {
      case 'plastic': return 'success'; // Verde
      case 'glass': return 'secondary'; // Mint
      case 'paper': return 'warning'; // Amber/Gold
      case 'metal': return 'danger'; // Rojo/Coral
      default: return 'medium';
    }
  }

  // Retornar icono según material
  getMaterialIcon(material: string): string {
    switch (material) {
      case 'plastic': return 'leaf-outline';
      case 'glass': return 'wine-outline';
      case 'paper': return 'receipt-outline';
      case 'metal': return 'bar-chart-outline';
      default: return 'leaf-outline';
    }
  }

  // Traducir nombre de material
  translateMaterial(material: string): string {
    switch (material) {
      case 'plastic': return 'Plástico';
      case 'glass': return 'Vidrio';
      case 'paper': return 'Papel/Cartón';
      case 'metal': return 'Metal/Latas';
      default: return material;
    }
  }
}
