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
      address: 'Hall de Acceso Principal (Bloque B), INACAP Sede Renca',
      lat: -33.405870,
      lng: -70.683400,
      acceptedMaterials: ['plastic', 'glass', 'paper'],
      capacity: 45,
      status: 'available'
    },
    {
      id: 'bin_2',
      name: 'Punto Ecológico Casino Central',
      address: 'Patio de Comidas y Casino (Bloque A), INACAP Sede Renca',
      lat: -33.406300,
      lng: -70.682940,
      acceptedMaterials: ['plastic', 'metal'],
      capacity: 85,
      status: 'available'
    },
    {
      id: 'bin_3',
      name: 'Eco-Punto Estacionamiento A',
      address: 'Zona de Estacionamiento Norte (Acceso Principal), INACAP Sede Renca',
      lat: -33.404900,
      lng: -70.682770,
      acceptedMaterials: ['plastic', 'glass', 'paper', 'metal'],
      capacity: 100,
      status: 'full'
    },
    {
      id: 'bin_4',
      name: 'Punto Reciclaje Bloque Laboratorios',
      address: 'Pasillo Central Bloque F (Segundo Piso), INACAP Sede Renca',
      lat: -33.404990,
      lng: -70.683160,
      acceptedMaterials: ['plastic', 'paper'],
      capacity: 20,
      status: 'available'
    },
    {
      id: 'bin_5',
      name: 'Contenedor Metal-Vidrio Talleres',
      address: 'Patio Central de Talleres (Bloque Z), INACAP Sede Renca',
      lat: -33.405980,
      lng: -70.681800,
      acceptedMaterials: ['glass', 'metal'],
      capacity: 0,
      status: 'maintenance'
    },
    {
      id: 'bin_6',
      name: 'Punto Papel/Cartón Bloque D',
      address: 'Pasillo del Bloque D (Electricidad y Electrónica), INACAP Sede Renca',
      lat: -33.405000,
      lng: -70.683450,
      acceptedMaterials: ['paper'],
      capacity: 60,
      status: 'available'
    },
    {
      id: 'bin_7',
      name: 'Contenedor Plásticos Bloque E',
      address: 'Pasillo del Bloque E (Aulas y Laboratorios), INACAP Sede Renca',
      lat: -33.405050,
      lng: -70.683250,
      acceptedMaterials: ['plastic'],
      capacity: 95,
      status: 'available'
    },
    {
      id: 'bin_8',
      name: 'Eco-Punto Bloque G (DAE)',
      address: 'Hall Bloque G (Dirección de Asuntos Estudiantiles), INACAP Sede Renca',
      lat: -33.405400,
      lng: -70.683100,
      acceptedMaterials: ['plastic', 'paper', 'metal'],
      capacity: 30,
      status: 'available'
    },
    {
      id: 'bin_9',
      name: 'Punto Verde Bloque C',
      address: 'Acceso Bloque C (Primeros Auxilios / Conector), INACAP Sede Renca',
      lat: -33.405300,
      lng: -70.683400,
      acceptedMaterials: ['glass', 'paper'],
      capacity: 10,
      status: 'available'
    },
    {
      id: 'bin_10',
      name: 'Punto Reciclaje Bloque B (Sur)',
      address: 'Bloque B Sur (Biblioteca y Administración), INACAP Sede Renca',
      lat: -33.406100,
      lng: -70.683380,
      acceptedMaterials: ['plastic', 'glass', 'metal'],
      capacity: 55,
      status: 'available'
    },
    {
      id: 'bin_11',
      name: 'Contenedor Metal-Plástico Bloque J',
      address: 'Talleres de Mecánica (Bloque J), INACAP Sede Renca',
      lat: -33.405450,
      lng: -70.682600,
      acceptedMaterials: ['metal', 'plastic'],
      capacity: 100,
      status: 'full'
    },
    {
      id: 'bin_12',
      name: 'Punto Limpio Bloque H',
      address: 'Área de Talleres de Mecánica (Bloque H), INACAP Sede Renca',
      lat: -33.404950,
      lng: -70.682550,
      acceptedMaterials: ['plastic', 'glass', 'paper'],
      capacity: 15,
      status: 'available'
    },
    {
      id: 'bin_13',
      name: 'Eco-Punto Bloque K',
      address: 'Bloque K (Minería y Metalurgia), INACAP Sede Renca',
      lat: -33.405150,
      lng: -70.682050,
      acceptedMaterials: ['glass', 'metal'],
      capacity: 40,
      status: 'available'
    },
    {
      id: 'bin_14',
      name: 'Punto Reciclaje Bloque L',
      address: 'Talleres de Mecánica (Bloque L), INACAP Sede Renca',
      lat: -33.405650,
      lng: -70.682150,
      acceptedMaterials: ['plastic', 'paper'],
      capacity: 0,
      status: 'maintenance'
    },
    {
      id: 'bin_15',
      name: 'Eco-Punto Estacionamiento B',
      address: 'Zona de Estacionamiento Este (Acceso Secundario), INACAP Sede Renca',
      lat: -33.405350,
      lng: -70.682250,
      acceptedMaterials: ['plastic', 'glass', 'paper', 'metal'],
      capacity: 70,
      status: 'available'
    },
    {
      id: 'bin_16',
      name: 'Punto Reciclaje Químico y Solventes',
      address: 'Laboratorios de Química (Bloque F - Primer Piso), INACAP Sede Renca',
      lat: -33.405800,
      lng: -70.683000,
      acceptedMaterials: ['chemical'],
      capacity: 20,
      status: 'available'
    },
    {
      id: 'bin_17',
      name: 'Punto de Acopio Aceites y Lubricantes',
      address: 'Talleres de Mecánica (Bloque Z - Patio Trasero), INACAP Sede Renca',
      lat: -33.405500,
      lng: -70.681900,
      acceptedMaterials: ['chemical', 'metal'],
      capacity: 40,
      status: 'available'
    },
    {
      id: 'bin_18',
      name: 'Contenedor de E-Waste y Componentes',
      address: 'Pasillo Central Bloque D (Acceso Informática), INACAP Sede Renca',
      lat: -33.405100,
      lng: -70.683300,
      acceptedMaterials: ['e_waste', 'battery'],
      capacity: 10,
      status: 'available'
    },
    {
      id: 'bin_19',
      name: 'Zona de Escombros y Maderas',
      address: 'Patio de Acopio de Materiales (Construcción - Bloque Z), INACAP Sede Renca',
      lat: -33.406100,
      lng: -70.682000,
      acceptedMaterials: ['construction', 'wood'],
      capacity: 15,
      status: 'available'
    },
    {
      id: 'bin_20',
      name: 'Depósito de Cables y Baterías',
      address: 'Laboratorios de Electrónica y Automatización (Bloque E), INACAP Sede Renca',
      lat: -33.405200,
      lng: -70.683500,
      acceptedMaterials: ['metal', 'battery', 'e_waste'],
      capacity: 5,
      status: 'available'
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
