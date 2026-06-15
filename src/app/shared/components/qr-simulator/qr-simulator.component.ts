import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { BinsService } from '../../../core/services/bins.service';
import { PointsService } from '../../../core/services/points.service';
import { RecyclingBin, MaterialType } from '../../../core/models/bin.model';
import { addIcons } from 'ionicons';
import { cameraOutline, checkmarkCircleOutline, closeOutline, videocamOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-qr-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>Escanear QR</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close-outline" size="large"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="scanner-container" *ngIf="state === 'scanning'">
        <!-- Viewfinder -->
        <div class="viewfinder">
          <!-- Video element for camera stream -->
          <video #videoElement autoplay playsinline muted *ngIf="cameraStatus === 'active'"></video>
          
          <div class="laser-line" *ngIf="cameraStatus === 'active'"></div>
          <div class="corners">
            <div class="top-left"></div>
            <div class="top-right"></div>
            <div class="bottom-left"></div>
            <div class="bottom-right"></div>
          </div>
          
          <!-- Viewfinder overlay text when camera is active -->
          <div class="viewfinder-text" *ngIf="cameraStatus === 'active'">
            <ion-icon name="camera-outline" class="camera-icon"></ion-icon>
            <p>Apunta al código QR del contenedor</p>
          </div>

          <!-- Camera checking state -->
          <div class="camera-message" *ngIf="cameraStatus === 'checking'">
            <ion-spinner name="dots" color="light"></ion-spinner>
            <p>Iniciando cámara...</p>
          </div>

          <!-- Camera error state -->
          <div class="camera-message error" *ngIf="cameraStatus === 'denied' || cameraStatus === 'no-device' || cameraStatus === 'error'">
            <ion-icon name="videocam-off-outline" class="error-icon"></ion-icon>
            <p class="error-title">Cámara no disponible</p>
            <p class="error-desc" *ngIf="cameraStatus === 'no-device'">No se detectó ninguna cámara en este dispositivo.</p>
            <p class="error-desc" *ngIf="cameraStatus === 'denied'">Permiso para usar la cámara denegado. Actívalo en los ajustes.</p>
            <p class="error-desc" *ngIf="cameraStatus === 'error'">Error al acceder a la cámara del dispositivo.</p>
          </div>
        </div>

        <!-- Simulator Controls -->
        <div class="controls-card glass-card ion-padding">
          <h3 class="controls-title">Simulador de Reciclaje</h3>
          
          <ion-item lines="none" class="control-item">
            <ion-label position="stacked">Seleccionar Contenedor</ion-label>
            <ion-select label="" labelPlacement="stacked" [(ngModel)]="selectedBinId" interface="action-sheet" placeholder="Selecciona el contenedor">
              <ion-select-option *ngFor="let bin of availableBins" [value]="bin.id">
                {{ bin.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="control-item">
            <ion-label position="stacked">Tipo de Residuo</ion-label>
            <ion-select label="" labelPlacement="stacked" [(ngModel)]="selectedMaterial" interface="popover" placeholder="Selecciona el material">
              <ion-select-option value="plastic">Plástico (50 pts)</ion-select-option>
              <ion-select-option value="glass">Vidrio (80 pts)</ion-select-option>
              <ion-select-option value="paper">Papel/Cartón (30 pts)</ion-select-option>
              <ion-select-option value="metal">Metal/Lata (100 pts)</ion-select-option>
            </ion-select>
          </ion-item>

          <div class="quantity-container ion-margin-top">
            <div class="quantity-header">
              <span>Cantidad</span>
              <span class="quantity-badge">{{ quantity }} {{ selectedMaterial === 'paper' ? 'kg' : 'uds' }}</span>
            </div>
            <ion-range min="1" max="10" step="1" debounce="100" [(ngModel)]="quantity" color="primary">
              <ion-label slot="start">1</ion-label>
              <ion-label slot="end">10</ion-label>
            </ion-range>
          </div>

          <ion-button expand="block" class="eco-btn ripple-btn" (click)="startScanningProcess()" [disabled]="!selectedBinId || !selectedMaterial">
            Simular Escaneo QR
          </ion-button>
        </div>
      </div>

      <!-- Loading/Processing Overlay -->
      <div class="processing-container ion-padding ion-text-center" *ngIf="state === 'processing'">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
        <h2>Procesando Código QR...</h2>
        <p>Validando ubicación y contenedor</p>
      </div>

      <!-- Success Screen -->
      <div class="success-container ion-padding ion-text-center" *ngIf="state === 'success'">
        <div class="success-badge-wrapper pulse-element">
          <ion-icon name="checkmark-circle-outline" class="success-icon"></ion-icon>
        </div>
        <h1 class="success-title">¡Reciclaje Exitoso!</h1>
        <p class="success-desc">Has reciclado en <strong>{{ getBinName() }}</strong></p>
        
        <div class="points-card">
          <span class="plus-sign">+</span>
          <span class="points-number">{{ calculatedPoints }}</span>
          <span class="points-lbl">Puntos EcoRenca</span>
        </div>

        <p class="congrats-text">¡Gracias por ayudar a cuidar Renca!</p>

        <ion-button expand="block" color="primary" class="eco-btn" (click)="dismiss()">
          Volver al Inicio
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-toolbar {
      --background: transparent;
      --color: var(--ion-text-color);
    }
    
    ion-content {
      --background: var(--ion-background-color);
    }

    .scanner-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
    }

    .viewfinder {
      position: relative;
      width: 100%;
      height: 200px;
      background: #0f172a;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.6);
    }

    .viewfinder video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    .laser-line {
      position: absolute;
      width: 90%;
      height: 3px;
      background: #10b981;
      box-shadow: 0 0 12px 2px #10b981;
      top: 10%;
      z-index: 10;
      animation: scan 2.5s infinite linear;
    }

    @keyframes scan {
      0% { top: 10%; }
      50% { top: 90%; }
      100% { top: 10%; }
    }

    .corners {
      position: absolute;
      width: 80%;
      height: 70%;
      border: 1px dashed rgba(255, 255, 255, 0.2);
      pointer-events: none;
      z-index: 4;
    }

    .corners > div {
      position: absolute;
      width: 20px;
      height: 20px;
      border-color: #10b981;
      border-style: solid;
      border-width: 0px;
    }

    .top-left { top: -2px; left: -2px; border-top-width: 4px; border-left-width: 4px; border-top-left-radius: 8px; }
    .top-right { top: -2px; right: -2px; border-top-width: 4px; border-right-width: 4px; border-top-right-radius: 8px; }
    .bottom-left { bottom: -2px; left: -2px; border-bottom-width: 4px; border-left-width: 4px; border-bottom-left-radius: 8px; }
    .bottom-right { bottom: -2px; right: -2px; border-bottom-width: 4px; border-right-width: 4px; border-bottom-right-radius: 8px; }

    .viewfinder-text {
      text-align: center;
      color: rgba(255, 255, 255, 0.8);
      z-index: 5;
    }

    .camera-icon {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 8px;
    }

    .viewfinder-text p {
      margin: 0;
      font-size: 13px;
      font-weight: 500;
    }

    .camera-message {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0f172a;
      color: #fff;
      text-align: center;
      padding: 16px;
      z-index: 2;
    }

    .camera-message.error {
      background: #1e293b;
    }

    .error-icon {
      font-size: 48px;
      color: var(--ion-color-danger, #ef4444);
      margin-bottom: 8px;
    }

    .error-title {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 4px 0;
      color: #f1f5f9;
    }

    .error-desc {
      font-size: 12px;
      color: var(--ion-color-medium, #94a3b8);
      margin: 0;
      max-width: 80%;
    }

    .controls-card {
      margin: 0;
    }

    .controls-title {
      font-size: 18px;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 16px;
      color: var(--ion-color-primary);
    }

    .control-item {
      --background: rgba(var(--ion-text-color-rgb), 0.04);
      border-radius: 12px;
      margin-bottom: 12px;
      --padding-start: 12px;
      --inner-padding-end: 12px;
    }

    .control-item ion-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--ion-color-medium);
      margin-bottom: 4px;
    }

    .control-item ion-select {
      --padding-top: 8px;
      --padding-bottom: 8px;
      width: 100%;
      font-weight: 500;
    }

    .quantity-container {
      padding: 0 4px;
    }

    .quantity-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 600;
      color: var(--ion-color-medium);
    }

    .quantity-badge {
      background: var(--ion-color-primary);
      color: #fff;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 11px;
    }

    .eco-btn {
      --background: var(--eco-gradient-primary);
      --box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
      --border-radius: 14px;
      font-weight: 700;
      margin-top: 20px;
      height: 48px;
    }

    /* Processing Screen */
    .processing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 300px;
      gap: 16px;
    }

    .processing-container h2 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
    }

    .processing-container p {
      color: var(--ion-color-medium);
      margin: 0;
    }

    /* Success Screen */
    .success-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 40px;
      gap: 16px;
    }

    .success-badge-wrapper {
      background: rgba(16, 185, 129, 0.1);
      padding: 20px;
      border-radius: 50%;
    }

    .success-icon {
      font-size: 80px;
      color: var(--ion-color-primary);
    }

    .success-title {
      font-size: 26px;
      font-weight: 800;
      color: var(--ion-color-primary);
      margin: 0;
    }

    .success-desc {
      font-size: 15px;
      color: var(--ion-color-medium);
      margin: 0;
    }

    .points-card {
      background: var(--eco-gradient-gold);
      padding: 16px 32px;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(245, 158, 11, 0.25);
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 16px 0;
    }

    .plus-sign {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: -5px;
    }

    .points-number {
      font-size: 40px;
      font-weight: 800;
      line-height: 1;
    }

    .points-lbl {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .congrats-text {
      font-size: 14px;
      font-weight: 500;
      color: var(--ion-color-medium);
      margin-bottom: 16px;
    }
  `]
})
export class QrSimulatorComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  state: 'scanning' | 'processing' | 'success' = 'scanning';
  availableBins: RecyclingBin[] = [];
  
  // Modelos
  selectedBinId: string = '';
  selectedMaterial: MaterialType = 'plastic';
  quantity: number = 2;
  calculatedPoints: number = 0;

  // Estado de cámara
  cameraStatus: 'checking' | 'active' | 'denied' | 'no-device' | 'error' = 'checking';
  stream: MediaStream | null = null;

  constructor(
    private modalCtrl: ModalController,
    private binsService: BinsService,
    private pointsService: PointsService
  ) {
    addIcons({
      cameraOutline,
      checkmarkCircleOutline,
      closeOutline,
      videocamOffOutline
    });
  }

  ngOnInit() {
    // Cargar contenedores disponibles para el dropdown
    this.binsService.getBins().subscribe(bins => {
      this.availableBins = bins.filter(b => b.status !== 'maintenance');
      if (this.availableBins.length > 0) {
        this.selectedBinId = this.availableBins[0].id;
      }
    });

    // Inicializar la cámara
    this.initCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  initCamera() {
    this.cameraStatus = 'checking';
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.cameraStatus = 'no-device';
      return;
    }

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })
    .then(stream => {
      this.stream = stream;
      this.cameraStatus = 'active';
      setTimeout(() => {
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
      }, 50);
    })
    .catch(err => {
      console.error('Error al acceder a la cámara:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.cameraStatus = 'denied';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        this.cameraStatus = 'no-device';
      } else {
        this.cameraStatus = 'error';
      }
    });
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  getBinName(): string {
    const bin = this.availableBins.find(b => b.id === this.selectedBinId);
    return bin ? bin.name : '';
  }

  startScanningProcess() {
    this.stopCamera();
    this.state = 'processing';
    
    // Simular un retardo de procesamiento de 1.5 segundos
    setTimeout(() => {
      this.registerRecycling();
    }, 1500);
  }

  private registerRecycling() {
    const pointsPerMaterial: Record<MaterialType, number> = {
      plastic: 50,
      glass: 80,
      paper: 30,
      metal: 100,
      e_waste: 120,
      chemical: 150,
      construction: 40,
      wood: 40,
      battery: 90
    };

    this.calculatedPoints = pointsPerMaterial[this.selectedMaterial] * this.quantity;
    
    // Registrar reciclaje en el servicio de puntos
    const binName = this.getBinName();
    this.pointsService.recycle(binName, this.selectedMaterial, this.quantity);

    // Actualizar la capacidad en el servicio de contenedores
    // Simular que el contenedor se llena un 5% por cada unidad reciclada
    this.binsService.addCapacity(this.selectedBinId, this.quantity * 5);

    this.state = 'success';
  }

  dismiss() {
    this.stopCamera();
    this.modalCtrl.dismiss();
  }
}
