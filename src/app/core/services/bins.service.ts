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
      name: 'Punto Limpio Plaza de Renca',
      address: 'Blanco Encalada 1335, Renca',
      lat: -33.407222,
      lng: -70.730278,
      acceptedMaterials: ['plastic', 'glass', 'paper'],
      capacity: 45,
      status: 'available'
    },
    {
      id: 'bin_2',
      name: 'Eco-Contenedor Municipalidad de Renca',
      address: 'Blanco Encalada 1330, Renca',
      lat: -33.406354,
      lng: -70.729241,
      acceptedMaterials: ['plastic', 'metal'],
      capacity: 85,
      status: 'available'
    },
    {
      id: 'bin_3',
      name: 'Contenedor Verde Parque Las Palmeras',
      address: 'Av. Apóstol Santiago, Renca',
      lat: -33.418231,
      lng: -70.707245,
      acceptedMaterials: ['plastic', 'glass', 'paper', 'metal'],
      capacity: 100,
      status: 'full'
    },
    {
      id: 'bin_4',
      name: 'Punto Ecológico Cerro Renca',
      address: 'Acceso Av. El Cerro, Renca',
      lat: -33.398511,
      lng: -70.724532,
      acceptedMaterials: ['plastic', 'paper'],
      capacity: 20,
      status: 'available'
    },
    {
      id: 'bin_5',
      name: 'Punto Limpio Av. Condell',
      address: 'Av. Condell 1520, Renca',
      lat: -33.414456,
      lng: -70.738321,
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
