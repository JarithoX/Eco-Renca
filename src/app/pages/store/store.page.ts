import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, 
  IonBadge, IonButton, 
  IonIcon, IonGrid, IonRow, IonCol, IonModal, IonChip, IonButtons
} from '@ionic/angular/standalone';
import { PointsService } from '../../core/services/points.service';
import { UserProfile } from '../../core/models/user.model';
import { Reward, RedeemedCoupon } from '../../core/models/reward.model';
import { addIcons } from 'ionicons';
import { 
  giftOutline, walletOutline, busOutline, 
  storefrontOutline, leafOutline, ticketOutline, 
  checkmarkCircleOutline, qrCodeOutline, closeOutline, 
  alertCircleOutline, calendarOutline, barcodeOutline
} from 'ionicons/icons';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-store',
  templateUrl: 'store.page.html',
  styleUrls: ['store.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonSegment, IonSegmentButton, IonLabel, 
    IonBadge, IonButton, 
    IonIcon, IonGrid, IonRow, IonCol, IonModal, IonChip, IonButtons
  ],
  providers: [AlertController]
})
export class StorePage implements OnInit {
  profile!: UserProfile;
  activeSegment: 'rewards' | 'coupons' = 'rewards';
  selectedCategory: 'all' | 'transport' | 'local_shop' | 'eco_product' = 'all';
  
  rewards: Reward[] = [
    {
      id: 'rew_1',
      title: 'Recarga Tarjeta Bip! $2.000',
      description: 'Carga de saldo directo para el transporte público de Santiago.',
      pointsCost: 800,
      category: 'transport',
      logo: 'bus-outline',
      value: 'Recarga de $2.000'
    },
    {
      id: 'rew_2',
      title: 'Recarga Tarjeta Bip! $5.000',
      description: 'Mayor saldo para moverte de forma sostenible por la capital.',
      pointsCost: 1800,
      category: 'transport',
      logo: 'bus-outline',
      value: 'Recarga de $5.000'
    },
    {
      id: 'rew_3',
      title: '20% Dscto. Panadería El Sol Renca',
      description: 'Válido para compras de pan de molde y bollería artesanal.',
      pointsCost: 500,
      category: 'local_shop',
      logo: 'storefront-outline',
      value: '20% de descuento'
    },
    {
      id: 'rew_4',
      title: '15% Dscto. Verdulería Renca Verde',
      description: 'Ahorra en tus frutas y verduras frescas de temporada.',
      pointsCost: 400,
      category: 'local_shop',
      logo: 'storefront-outline',
      value: '15% de descuento'
    },
    {
      id: 'rew_5',
      title: 'Café de Especialidad Gratis - EcoCafé Renca',
      description: 'Disfruta de un exquisito café orgánico gratis en vaso reutilizable.',
      pointsCost: 600,
      category: 'local_shop',
      logo: 'storefront-outline',
      value: 'Café gratis'
    },
    {
      id: 'rew_6',
      title: 'Bolsa de Tela EcoRenca',
      description: 'Bolsa reutilizable de algodón orgánico para tus compras.',
      pointsCost: 300,
      category: 'eco_product',
      logo: 'leaf-outline',
      value: 'Bolsa Reutilizable'
    },
    {
      id: 'rew_7',
      title: 'Semillas para Huerto Orgánico',
      description: 'Pack de 3 variedades de semillas con compost para sembrar en casa.',
      pointsCost: 250,
      category: 'eco_product',
      logo: 'leaf-outline',
      value: 'Pack de Semillas'
    },
    {
      id: 'rew_8',
      title: 'Cepillo de Dientes de Bambú',
      description: 'Cepillo dental biodegradable de bambú con cerdas de carbón activado.',
      pointsCost: 350,
      category: 'eco_product',
      logo: 'leaf-outline',
      value: 'Cepillo de Bambú'
    }
  ];

  filteredRewards: Reward[] = [];
  myCoupons: RedeemedCoupon[] = [];
  
  isCouponModalOpen = false;
  latestCoupon: RedeemedCoupon | null = null;

  constructor(
    private pointsService: PointsService,
    private alertCtrl: AlertController
  ) {
    addIcons({
      giftOutline,
      walletOutline,
      busOutline,
      storefrontOutline,
      leafOutline,
      ticketOutline,
      checkmarkCircleOutline,
      qrCodeOutline,
      closeOutline,
      alertCircleOutline,
      calendarOutline,
      barcodeOutline
    });
  }

  ngOnInit() {
    this.pointsService.getProfile().subscribe(prof => {
      this.profile = prof;
    });

    this.pointsService.getCoupons().subscribe(coupons => {
      this.myCoupons = coupons;
    });

    this.applyFilters();
  }

  onSegmentChange(event: any) {
    this.activeSegment = event.detail.value;
  }

  onCategoryChange(category: 'all' | 'transport' | 'local_shop' | 'eco_product') {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategory === 'all') {
      this.filteredRewards = this.rewards;
    } else {
      this.filteredRewards = this.rewards.filter(r => r.category === this.selectedCategory);
    }
  }

  async redeem(reward: Reward) {
    if (this.profile.points < reward.pointsCost) {
      const alert = await this.alertCtrl.create({
        header: 'Puntos Insuficientes',
        message: `Te faltan ${reward.pointsCost - this.profile.points} puntos para canjear este premio. ¡Sigue reciclando para acumular más!`,
        buttons: ['Entendido'],
        cssClass: 'eco-alert'
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertCtrl.create({
      header: 'Confirmar Canje',
      message: `¿Estás seguro que deseas canjear "${reward.title}" por ${reward.pointsCost} puntos?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Canjear',
          handler: () => {
            const coupon = this.pointsService.redeemReward(reward);
            if (coupon) {
              this.latestCoupon = coupon;
              this.isCouponModalOpen = true;
            }
          }
        }
      ]
    });
    await confirmAlert.present();
  }

  closeCouponModal() {
    this.isCouponModalOpen = false;
    this.latestCoupon = null;
  }

  getCategoryName(category: string): string {
    switch (category) {
      case 'transport': return 'Transporte';
      case 'local_shop': return 'Comercio Local';
      case 'eco_product': return 'Eco Producto';
      default: return category;
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'transport': return 'secondary';
      case 'local_shop': return 'warning';
      case 'eco_product': return 'success';
      default: return 'medium';
    }
  }
}
