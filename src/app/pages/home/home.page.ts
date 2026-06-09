import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonContent, IonProgressBar, IonList, IonIcon, 
  IonFab, IonFabButton, IonBadge
} from '@ionic/angular/standalone';
import { PointsService } from '../../core/services/points.service';
import { UserProfile, RecyclingActivity } from '../../core/models/user.model';
import { QrSimulatorComponent } from '../../shared/components/qr-simulator/qr-simulator.component';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  qrCodeOutline, trophyOutline, personCircleOutline, 
  timeOutline, leafOutline, chevronForwardOutline,
  wineOutline, receiptOutline, barChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonContent, IonProgressBar, IonList, IonIcon, 
    IonFab, IonFabButton, IonBadge
  ],
  providers: [ModalController]
})
export class HomePage implements OnInit {
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
    this.pointsService.getProfile().subscribe(prof => {
      this.profile = prof;
    });

    this.pointsService.getHistory().subscribe(history => {
      this.recentActivities = history.slice(0, 5);
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
      default: return material;
    }
  }
}
