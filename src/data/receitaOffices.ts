import type { FixedPoint } from '../types/fixedPoint';
import { FixedPointType } from '../types/fixedPoint';

/**
 * Receita Estadual do Paraná - Regional Delegations
 * Data source: http://pdp.fazenda.pr.gov.br/pdp/delegacias
 * Coordinates obtained from official addresses using geocoding
 */
export const receitaOffices: FixedPoint[] = [
  {
    id: 'receita-curitiba',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Curitiba',
    address: 'Rua Lourenço Pinto, 50, Centro, Curitiba-PR',
    phone: '(41) 3304-9300',
    latitude: -25.4297,
    longitude: -49.2719
  },
  {
    id: 'receita-ponta-grossa',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Ponta Grossa',
    address: 'Rua Theodoro Rosas, 945, Centro, Ponta Grossa-PR',
    phone: '(42) 3219-3600',
    latitude: -25.0944,
    longitude: -50.1619
  },
  {
    id: 'receita-guarapuava',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Guarapuava',
    address: 'Rua Andrade Neves, 925, Trianon, Guarapuava-PR',
    phone: '(42) 3621-5800',
    latitude: -25.3914,
    longitude: -51.4619
  },
  {
    id: 'receita-jacarezinho',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Jacarezinho',
    address: 'Rua Paraná, 698, Centro, Jacarezinho-PR',
    phone: '(43) 3511-4001',
    latitude: -23.1575,
    longitude: -49.9694
  },
  {
    id: 'receita-londrina',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Londrina',
    address: 'Rua Brasil, 1100, Centro, Londrina-PR',
    phone: '(43) 3372-2100',
    latitude: -23.3103,
    longitude: -51.1628
  },
  {
    id: 'receita-maringa',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Maringá',
    address: 'Av. Prudente de Morais, 211, Zona 07, Maringá-PR',
    phone: '(44) 3221-3800',
    latitude: -23.4247,
    longitude: -51.9386
  },
  {
    id: 'receita-umuarama',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Umuarama',
    address: 'Av. Paraná, 3787, Centro, Umuarama-PR',
    phone: '(44) 3621-6200',
    latitude: -23.7664,
    longitude: -53.3250
  },
  {
    id: 'receita-cascavel',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Cascavel',
    address: 'Rua Padre Champagnat, 130, Centro, Cascavel-PR',
    phone: '(45) 3219-8900',
    latitude: -24.9555,
    longitude: -53.4552
  },
  {
    id: 'receita-pato-branco',
    type: FixedPointType.RECEITA,
    name: 'Delegacia Regional da Receita Estadual - Pato Branco',
    address: 'Rua Araribóia, 463, Centro, Pato Branco-PR',
    phone: '(46) 3220-5700',
    latitude: -26.2289,
    longitude: -52.6703
  },
  {
    id: 'receita-dcoe-curitiba',
    type: FixedPointType.RECEITA,
    name: 'DCOE - Delegacia de Controle e Orientação de Empresas - Curitiba',
    address: 'Rua Vicente Machado, 445, Centro, Curitiba-PR',
    phone: '(41) 3304-9509',
    latitude: -25.4281,
    longitude: -49.2696
  }
];
