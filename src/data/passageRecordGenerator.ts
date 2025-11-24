import type { RegistroPassagem } from '../types/registroPassagem';
import type { Vehicle } from '../types/vehicle';
import { MDFeModalType } from '../types/vehicle';
import { paranaHighwayRoutes, getAllRoutePoints } from './paranaHighwayRoutes';

// Constants for data generation
const PLATE_NUMBER_MULTIPLIER = 123; // Used to generate pseudo-random plate numbers
const PLATE_NUMBER_MAX = 9000; // Maximum number range for plates (1000-9999)
const VEHICLE_OFFSET_MULTIPLIER = 7; // Spread vehicles along routes
const BASE_TIME_OFFSET_HOURS = 2; // Start simulation 2 hours ago
const MIN_RECORDS_PER_VEHICLE = 15; // Maximum records to generate per vehicle
const TIME_INCREMENT_BASE = 5; // Base minutes between records
const TIME_INCREMENT_VARIANCE = 5; // Additional variable minutes (based on vehicle ID)

// Generate vehicle plate (Brazilian format: ABC-1234)
function generatePlate(id: number): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters[Math.floor(id / 676) % 26];
  const letter2 = letters[Math.floor(id / 26) % 26];
  const letter3 = letters[id % 26];
  const numbers = String(1000 + (id * PLATE_NUMBER_MULTIPLIER) % PLATE_NUMBER_MAX).padStart(4, '0');
  return `${letter1}${letter2}${letter3}-${numbers}`;
}

// Generate simulated passage records for 50 vehicles
export function generatePassageRecords(): RegistroPassagem[] {
  const records: RegistroPassagem[] = [];
  let recordId = 1;
  
  const baseTime = new Date();
  baseTime.setHours(baseTime.getHours() - BASE_TIME_OFFSET_HOURS);
  
  // Generate data for 50 vehicles
  for (let vehicleId = 1; vehicleId <= 50; vehicleId++) {
    // Assign each vehicle to a route (cycle through available routes)
    const routeIndex = (vehicleId - 1) % paranaHighwayRoutes.length;
    const baseRoute = paranaHighwayRoutes[routeIndex];
    
    // Get interpolated points for smoother movement (3 segments per leg)
    const routePoints = getAllRoutePoints(baseRoute, 3);
    
    // Each vehicle starts at a different position along its route
    const startPosition = (vehicleId * VEHICLE_OFFSET_MULTIPLIER) % routePoints.length;
    const pointsToGenerate = Math.min(MIN_RECORDS_PER_VEHICLE, routePoints.length);
    
    // Generate passage records with timestamps
    for (let i = 0; i < pointsToGenerate; i++) {
      const pointIndex = (startPosition + i) % routePoints.length;
      const point = routePoints[pointIndex];
      
      // Each record is 5-10 minutes apart (varies by vehicle)
      const minutesOffset = (vehicleId - 1) * 2 + i * (TIME_INCREMENT_BASE + (vehicleId % TIME_INCREMENT_VARIANCE));
      const timestamp = new Date(baseTime.getTime() + minutesOffset * 60000);
      
      records.push({
        id: recordId++,
        veiculo_id: vehicleId,
        latitude: point.latitude,
        longitude: point.longitude,
        timestamp,
      });
    }
  }
  
  // Sort by timestamp to simulate real-time data arrival
  records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  return records;
}

// In-memory database simulation
class PassageRecordDatabase {
  private records: RegistroPassagem[] = [];
  private lastQueryTime: Date = new Date(0); // Epoch time (1970-01-01) - start from beginning
  
  constructor() {
    // Initialize with generated records
    this.records = generatePassageRecords();
  }
  
  // Simulate database query: get new records since last query
  queryNewRecords(): RegistroPassagem[] {
    const now = new Date();
    const newRecords = this.records.filter(
      record => record.timestamp > this.lastQueryTime && record.timestamp <= now
    );
    this.lastQueryTime = now;
    return newRecords;
  }
  
  // Get latest position for each vehicle
  getLatestPositions(): Map<number, RegistroPassagem> {
    const now = new Date();
    const latestPositions = new Map<number, RegistroPassagem>();
    
    // Get all records up to now
    const availableRecords = this.records.filter(record => record.timestamp <= now);
    
    // Find latest record for each vehicle
    availableRecords.forEach(record => {
      const current = latestPositions.get(record.veiculo_id);
      if (!current || record.timestamp > current.timestamp) {
        latestPositions.set(record.veiculo_id, record);
      }
    });
    
    return latestPositions;
  }
  
  // Get all records for a specific vehicle
  getVehicleHistory(vehicleId: number): RegistroPassagem[] {
    return this.records.filter(record => record.veiculo_id === vehicleId);
  }
  
  // Reset query time (useful for testing)
  resetQueryTime(): void {
    this.lastQueryTime = new Date(0);
  }
}

// Singleton instance
export const passageRecordDB = new PassageRecordDatabase();

// Sample NCM data for vehicles
const sampleNCMs = [
  { code: '10019900', description: 'Trigo e centeio' },
  { code: '10059000', description: 'Milho' },
  { code: '04022100', description: 'Leite em pó' },
  { code: '19059000', description: 'Produtos de padaria' },
  { code: '85176200', description: 'Aparelhos telefônicos' },
  { code: '85171200', description: 'Telefones celulares' },
  { code: '27101900', description: 'Óleos combustíveis' },
  { code: '87032390', description: 'Automóveis de passageiros' },
  { code: '84713000', description: 'Máquinas automáticas para processamento de dados portáteis' },
  { code: '22030000', description: 'Cerveja de malte' },
];

// Carrier names for vehicles
const carriers = [
  'Transportadora Rápida Ltda',
  'Logística Paraná Express',
  'Transporte Total S.A.',
  'Cargas Brasil Ltda',
  'Expresso Curitiba',
  'Rodonaves Logística',
  'Transcargo Paraná',
  'Via Sul Transportes',
  'Norte-Sul Logística',
  'TransParaná Express',
];

// Generate complete vehicle data with MDFe information
export function generateVehiclesFromPassageRecords(): Vehicle[] {
  const latestPositions = passageRecordDB.getLatestPositions();
  const vehicles: Vehicle[] = [];
  
  latestPositions.forEach((record, vehicleId) => {
    const hasManifest = vehicleId % 7 !== 0; // About 85% have MDFe
    const routeIndex = (vehicleId - 1) % paranaHighwayRoutes.length;
    const route = paranaHighwayRoutes[routeIndex];
    
    const vehicle: Vehicle = {
      id: String(vehicleId),
      plate: generatePlate(vehicleId),
      carrier: carriers[(vehicleId - 1) % carriers.length],
      state: 'PR',
      vehicleType: vehicleId % 3 === 0 ? 'Carreta' : vehicleId % 3 === 1 ? 'Truck' : 'Van',
      status: vehicleId % 5 === 0 ? 'Parado' : vehicleId % 7 === 0 ? 'Atrasado' : 'Em trânsito',
      latitude: record.latitude,
      longitude: record.longitude,
      lastUpdate: record.timestamp,
    };
    
    if (hasManifest) {
      // Determine modal type
      const modalType = vehicleId % 10 === 0 ? MDFeModalType.AEREO :
                       vehicleId % 13 === 0 ? MDFeModalType.AQUAVIARIO :
                       vehicleId % 17 === 0 ? MDFeModalType.FERROVIARIO :
                       MDFeModalType.RODOVIARIO;
      
      // Select random NCMs
      const ncmCount = 1 + (vehicleId % 3);
      const selectedNCMs = [];
      for (let i = 0; i < ncmCount; i++) {
        selectedNCMs.push(sampleNCMs[(vehicleId + i) % sampleNCMs.length]);
      }
      
      // Generate cargo description
      const cargoDesc = selectedNCMs.map(ncm => ncm.description).join(', ');
      
      vehicle.mdfe = {
        id: `MDFE${String(vehicleId).padStart(3, '0')}`,
        modalType,
        cargoDescription: cargoDesc,
        cargoWeight: 5000 + (vehicleId * 1000) % 50000,
        origin: route[0].name + ' - PR',
        destination: route[route.length - 1].name + ' - PR',
        route: route.map(p => p.name + '/PR'),
        value: 50000 + (vehicleId * 10000) % 500000,
        invoices: [
          {
            id: `NFE${String(vehicleId).padStart(3, '0')}`,
            items: selectedNCMs.map((ncm, idx) => ({
              id: `ITEM${vehicleId}_${idx}`,
              ncm,
              quantity: 1000 + (vehicleId * 100) % 10000,
              value: 10000 + (vehicleId * 5000) % 100000,
            })),
          },
        ],
      };
    }
    
    vehicles.push(vehicle);
  });
  
  return vehicles;
}
