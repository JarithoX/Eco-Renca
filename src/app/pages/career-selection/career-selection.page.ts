import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  IonContent, IonIcon, IonSearchbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  schoolOutline, searchOutline, arrowForwardOutline,
  flaskOutline, hammerOutline, cogOutline, constructOutline,
  settingsOutline, buildOutline, desktopOutline, shieldCheckmarkOutline,
  gitNetworkOutline, wifiOutline, briefcaseOutline, cubeOutline,
  airplaneOutline, calculatorOutline, flashOutline, leafOutline, checkmarkCircleOutline
} from 'ionicons/icons';
import { CAREERS } from '../../core/data/career.data';
import { Career } from '../../core/models/career.model';
import { CareerService } from '../../core/services/career.service';

@Component({
  selector: 'app-career-selection',
  templateUrl: './career-selection.page.html',
  styleUrls: ['./career-selection.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonIcon, IonSearchbar
  ]
})
export class CareerSelectionPage implements OnInit {
  careers: Career[] = CAREERS;
  filteredCareers: Career[] = CAREERS;
  groupedCareers: { area: string; careers: Career[] }[] = [];
  
  searchTerm: string = '';
  selectedCareerId: string | null = null;

  constructor(private router: Router, private careerService: CareerService) {
    addIcons({
      schoolOutline, searchOutline, arrowForwardOutline,
      flaskOutline, hammerOutline, cogOutline, constructOutline,
      settingsOutline, buildOutline, desktopOutline, shieldCheckmarkOutline,
      gitNetworkOutline, wifiOutline, briefcaseOutline, cubeOutline,
      airplaneOutline, calculatorOutline, flashOutline, leafOutline, checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.groupCareers();
    
    // Si ya está seleccionada en localStorage, pre-seleccionar
    const saved = localStorage.getItem('selectedEcoRencaCareer');
    if (saved) {
      this.selectedCareerId = saved;
    }
  }

  groupCareers() {
    const groups: Record<string, Career[]> = {};
    this.filteredCareers.forEach(c => {
      if (!groups[c.area]) {
        groups[c.area] = [];
      }
      groups[c.area].push(c);
    });

    this.groupedCareers = Object.keys(groups).map(area => ({
      area,
      careers: groups[area]
    }));
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value ? event.target.value.toLowerCase() : '';
    if (!this.searchTerm.trim()) {
      this.filteredCareers = this.careers;
    } else {
      this.filteredCareers = this.careers.filter(c => 
        c.name.toLowerCase().includes(this.searchTerm) || 
        c.area.toLowerCase().includes(this.searchTerm) ||
        c.description.toLowerCase().includes(this.searchTerm)
      );
    }
    this.groupCareers();
  }

  selectCareer(id: string) {
    this.selectedCareerId = id;
  }

  confirmSelection() {
    if (this.selectedCareerId) {
      this.careerService.selectCareer(this.selectedCareerId);
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    }
  }
}
