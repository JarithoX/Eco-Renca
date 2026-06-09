import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RecyclingBin, MaterialType } from '../models/bin.model';

@Injectable({
  providedIn: 'root'
})
export class BinsService {
  // Contenedores simulados en la comuna de Renca con coordenadas reales aproximadas
  private bins: RecyclingBin[] = [
    {
      id: 'bin_1',
      name: 'Punto Limpio Entrada Principal',
      address: 'Hall de Acceso Principal, INACAP Sede Renca',
      lat: -33.405550,
      lng: -70.682600,
      acceptedMaterials: ['plastic', 'glass', 'paper'],
      capacity: 45,
      status: 'available'
    },
    {
      id: 'bin_2',
      name: 'Punto Ecológico Casino Central',
      address: 'Patio de Comidas y Casino, INACAP Sede Renca',
      lat: -33.405800,
      lng: -70.682900,
      acceptedMaterials: ['plastic', 'metal'],
      capacity: 85,
      status: 'available'
    },
    {
      id: 'bin_3',
      name: 'Eco-Punto Estacionamiento A',
      address: 'Zona de Estacionamiento Norte, INACAP Sede Renca',
      lat: -33.405100,
      lng: -70.682500,
      acceptedMaterials: ['plastic', 'glass', 'paper', 'metal'],
      capacity: 100,
      status: 'full'
    },
    {
      id: 'bin_4',
      name: 'Punto Reciclaje Bloque Laboratorios',
      address: 'Pasillo Central Bloque B (Segundo Piso), INACAP Sede Renca',
      lat: -33.405300,
      lng: -70.683000,
      acceptedMaterials: ['plastic', 'paper'],
      capacity: 20,
      status: 'available'
    },
    {
      id: 'bin_5',
      name: 'Contenedor Metal-Vidrio Talleres',
      address: 'Patio Trasero Bloque de Talleres Industriales, INACAP Sede Renca',
      lat: -33.406000,
      lng: -70.682300,
      acceptedMaterials: ['glass', 'metal'],
      capacity: 0,
      status: 'maintenance'
    }
  ];

  private binsSubject = new BehaviorSubject<RecyclingBin[]>(this.bins);

  getBins(): Observable<RecyclingBin[]> {
    return this.binsSubject.asObservable();
  }

  // Obtener un contenedor por ID
  getBinById(id: string): RecyclingBin | undefined {
    return this.bins.find(b => b.id === id);
  }

  // Filtrar contenedores por tipo de material
  filterBinsByMaterial(material: MaterialType | 'all'): RecyclingBin[] {
    if (material === 'all') {
      return this.bins;
    }
    return this.bins.filter(b => b.acceptedMaterials.includes(material));
  }

  // Actualizar capacidad del contenedor después de un reciclaje simulado
  addCapacity(id: string, amount: number): void {
    const binIndex = this.bins.findIndex(b => b.id === id);
    if (binIndex !== -1) {
      const bin = this.bins[binIndex];
      const newCapacity = Math.min(bin.capacity + amount, 100);
      const newStatus = newCapacity >= 100 ? 'full' : bin.status;
      
      this.bins[binIndex] = {
        ...bin,
        capacity: newCapacity,
        status: newStatus
      };
      
      this.binsSubject.next([...this.bins]);
    }
  }
}
