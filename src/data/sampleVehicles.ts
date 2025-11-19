import type { Vehicle } from '../types/vehicle';
import { MDFeModalType } from '../types/vehicle';

// Sample vehicles data for Paraná state, Brazil
// Coordinates are centered around Curitiba and other major cities
export const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    latitude: -25.4284,
    longitude: -49.2733,
    mdfe: {
      id: 'MDFE001',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Grãos e cereais',
      cargoWeight: 25000,
      origin: 'Curitiba - PR',
      destination: 'São Paulo - SP',
      value: 150000
    },
    lastUpdate: new Date()
  },
  {
    id: '2',
    plate: 'DEF-5678',
    latitude: -25.5,
    longitude: -49.3,
    mdfe: {
      id: 'MDFE002',
      modalType: MDFeModalType.AEREO,
      cargoDescription: 'Equipamentos eletrônicos',
      cargoWeight: 500,
      origin: 'Curitiba - PR',
      destination: 'Manaus - AM',
      value: 500000
    },
    lastUpdate: new Date()
  },
  {
    id: '3',
    plate: 'GHI-9012',
    latitude: -25.4,
    longitude: -49.2,
    mdfe: {
      id: 'MDFE003',
      modalType: MDFeModalType.AQUAVIARIO,
      cargoDescription: 'Produtos químicos',
      cargoWeight: 50000,
      origin: 'Paranaguá - PR',
      destination: 'Santos - SP',
      value: 300000
    },
    lastUpdate: new Date()
  },
  {
    id: '4',
    plate: 'JKL-3456',
    latitude: -25.45,
    longitude: -49.35,
    mdfe: {
      id: 'MDFE004',
      modalType: MDFeModalType.FERROVIARIO,
      cargoDescription: 'Minério de ferro',
      cargoWeight: 100000,
      origin: 'Ponta Grossa - PR',
      destination: 'Rio de Janeiro - RJ',
      value: 800000
    },
    lastUpdate: new Date()
  },
  {
    id: '5',
    plate: 'MNO-7890',
    latitude: -25.42,
    longitude: -49.25,
    mdfe: {
      id: 'MDFE005',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Produtos alimentícios',
      cargoWeight: 15000,
      origin: 'Londrina - PR',
      destination: 'Curitiba - PR',
      value: 80000
    },
    lastUpdate: new Date()
  },
  {
    id: '6',
    plate: 'PQR-1122',
    latitude: -25.38,
    longitude: -49.29,
    lastUpdate: new Date()
    // This vehicle has no MDFe
  }
];
