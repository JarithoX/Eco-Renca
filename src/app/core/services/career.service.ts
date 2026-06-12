import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Career } from '../models/career.model';
import { CAREERS } from '../data/career.data';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private careers: Career[] = CAREERS;
  private selectedCareerSubject = new BehaviorSubject<Career | null>(null);

  constructor() {
    this.loadInitialCareer();
  }

  // Obtener observable de la carrera seleccionada
  getSelectedCareer(): Observable<Career | null> {
    return this.selectedCareerSubject.asObservable();
  }

  // Obtener valor actual de la carrera seleccionada
  getSelectedCareerValue(): Career | null {
    return this.selectedCareerSubject.value;
  }

  // Guardar carrera seleccionada
  selectCareer(careerId: string): void {
    const found = this.careers.find(c => c.id === careerId);
    if (found) {
      localStorage.setItem('selectedEcoRencaCareer', careerId);
      this.selectedCareerSubject.next(found);
    }
  }

  // Limpiar carrera seleccionada
  clearCareer(): void {
    localStorage.removeItem('selectedEcoRencaCareer');
    this.selectedCareerSubject.next(null);
  }

  // Cargar carrera guardada al iniciar el servicio
  private loadInitialCareer(): void {
    const savedCareerId = localStorage.getItem('selectedEcoRencaCareer');
    if (savedCareerId) {
      const found = this.careers.find(c => c.id === savedCareerId);
      if (found) {
        this.selectedCareerSubject.next(found);
      }
    }
  }
}
