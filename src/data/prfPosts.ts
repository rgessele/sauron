import type { FixedPoint } from '../types/fixedPoint';
import { FixedPointType } from '../types/fixedPoint';

/**
 * PRF Posts in Paraná
 * Data source: https://www.gov.br/prf/pt-br/canais-de-atendimento/unidades-prf/parana
 * Coordinates obtained from official addresses using geocoding
 * Emergency number: 191
 */
export const prfPosts: FixedPoint[] = [
  {
    id: 'prf-superintendencia-pr',
    type: FixedPointType.PRF,
    name: 'Superintendência Regional da PRF no Paraná',
    address: 'BR 476 (Linha Verde), 10.150, Prado Velho, Curitiba-PR, CEP: 81690-150',
    phone: '(41) 3535-1910',
    email: 'atendimento.pr@prf.gov.br',
    latitude: -25.4631,
    longitude: -49.2333
  },
  {
    id: 'prf-del-colombo',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Metropolitana - Colombo',
    address: 'BR-116, Acesso Norte, km 12,5, nº 4925, Jardim dos Palmares, Colombo-PR, CEP: 83707-440',
    phone: '(41) 3535-2110',
    email: 'del01.pr@prf.gov.br',
    latitude: -25.2406,
    longitude: -49.2217
  },
  {
    id: 'prf-del-pato-branco',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Pato Branco',
    address: 'BR 158 km 518 (próximo à Comunidade São Roque do Chopim), Pato Branco-PR, CEP: 85503-300',
    phone: '(41) 3535-2120',
    email: 'del02.pr@prf.gov.br',
    latitude: -26.2289,
    longitude: -52.6719
  },
  {
    id: 'prf-del-ponta-grossa',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Ponta Grossa',
    address: 'Rua Dr. Penteado de Almeida, 780, Bairro São José, Ponta Grossa-PR, CEP: 84010-240',
    phone: '(41) 3535-2130',
    email: 'del03.pr@prf.gov.br',
    latitude: -25.0944,
    longitude: -50.1608
  },
  {
    id: 'prf-del-cascavel',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Cascavel',
    address: 'Rua Inspetor Everaldo Loures Xavier, 127, Turisparque, Cascavel-PR, CEP: 85819-012',
    phone: '(41) 3535-2140',
    email: 'del04.pr@prf.gov.br',
    latitude: -24.9558,
    longitude: -53.4553
  },
  {
    id: 'prf-del-foz',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Foz do Iguaçu',
    address: 'Rua da República, 98, Parque Presidente I, Foz do Iguaçu-PR, CEP: 85863-400',
    phone: '(41) 3535-2150',
    email: 'del05.pr@prf.gov.br',
    latitude: -25.5163,
    longitude: -54.5854
  },
  {
    id: 'prf-del-guaira',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Guaíra',
    address: 'Guaíra-PR',
    phone: '(41) 3535-2160',
    latitude: -24.0814,
    longitude: -54.2567
  },
  {
    id: 'prf-del-londrina',
    type: FixedPointType.PRF,
    name: 'Delegacia PRF Londrina',
    address: 'Londrina-PR',
    phone: '(41) 3535-2170',
    latitude: -23.3045,
    longitude: -51.1696
  },
  {
    id: 'prf-paranagua',
    type: FixedPointType.PRF,
    name: 'Posto PRF Paranaguá',
    address: 'Paranaguá-PR',
    phone: '191',
    latitude: -25.5204,
    longitude: -48.5089
  },
  {
    id: 'prf-maringa',
    type: FixedPointType.PRF,
    name: 'Posto PRF Maringá',
    address: 'Maringá-PR',
    phone: '191',
    latitude: -23.4205,
    longitude: -51.9331
  }
];
