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
      value: 150000,
      invoices: [
        {
          id: 'NFE001',
          items: [
            {
              id: 'ITEM001',
              ncm: { code: '10019900', description: 'Trigo e centeio' },
              quantity: 15000,
              value: 90000
            },
            {
              id: 'ITEM002',
              ncm: { code: '10059000', description: 'Milho' },
              quantity: 10000,
              value: 60000
            }
          ]
        }
      ]
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
      value: 500000,
      invoices: [
        {
          id: 'NFE002',
          items: [
            {
              id: 'ITEM003',
              ncm: { code: '85176200', description: 'Aparelhos telefônicos' },
              quantity: 200,
              value: 300000
            },
            {
              id: 'ITEM004',
              ncm: { code: '85171200', description: 'Telefones celulares' },
              quantity: 150,
              value: 200000
            }
          ]
        }
      ]
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
      value: 300000,
      invoices: [
        {
          id: 'NFE003',
          items: [
            {
              id: 'ITEM005',
              ncm: { code: '29021100', description: 'Ciclohexano' },
              quantity: 30000,
              value: 180000
            },
            {
              id: 'ITEM006',
              ncm: { code: '29022000', description: 'Benzeno' },
              quantity: 20000,
              value: 120000
            }
          ]
        }
      ]
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
      value: 800000,
      invoices: [
        {
          id: 'NFE004',
          items: [
            {
              id: 'ITEM007',
              ncm: { code: '26011100', description: 'Minérios de ferro e seus concentrados' },
              quantity: 100000,
              value: 800000
            }
          ]
        }
      ]
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
      value: 80000,
      invoices: [
        {
          id: 'NFE005',
          items: [
            {
              id: 'ITEM008',
              ncm: { code: '04022100', description: 'Leite em pó' },
              quantity: 5000,
              value: 30000
            },
            {
              id: 'ITEM009',
              ncm: { code: '19059000', description: 'Produtos de padaria' },
              quantity: 10000,
              value: 50000
            }
          ]
        }
      ]
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
