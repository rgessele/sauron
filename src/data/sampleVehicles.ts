import type { Vehicle } from '../types/vehicle';
import { MDFeModalType } from '../types/vehicle';

// Sample vehicles data for Paraná state, Brazil
// Coordinates are centered around Curitiba and other major cities
// Each vehicle includes malhasFiscais to demonstrate the fiscal mesh filter functionality
export const sampleVehicles: Vehicle[] = [
  {
    id: '1',
    plate: 'ABC-1234',
    carrier: 'Transportadora Rápida Ltda',
    state: 'PR',
    vehicleType: 'Carreta',
    status: 'Em trânsito',
    latitude: -25.4284,
    longitude: -49.2733,
    mdfe: {
      id: 'MDFE001',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Grãos e cereais',
      cargoWeight: 25000,
      origin: 'Curitiba - PR',
      destination: 'São Paulo - SP',
      route: ['Curitiba/PR', 'Ponta Grossa/PR', 'Itapetininga/SP', 'São Paulo/SP'],
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
    malhasFiscais: [
      { code: 'DF04B', description: 'VALOR ICMS NA EFD É MENOR QUE O INFORMADO NA DF-E (SAÍDA)' },
      { code: 'DF06A', description: 'DESTINATÁRIO DO DF-E DIFERENTE DO INFORMADO NA EFD' },
      { code: 'DF03A', description: 'DOCUMENTO FISCAL ELETRÔNICO CANCELADO INFORMADO COMO AUTORIZADO' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '2',
    plate: 'DEF-5678',
    carrier: 'Aéreo Express S.A.',
    state: 'PR',
    vehicleType: 'Aeronave de carga',
    status: 'Em trânsito',
    latitude: -25.5,
    longitude: -49.3,
    mdfe: {
      id: 'MDFE002',
      modalType: MDFeModalType.AEREO,
      cargoDescription: 'Equipamentos eletrônicos',
      cargoWeight: 500,
      origin: 'Curitiba - PR',
      destination: 'Manaus - AM',
      route: ['Curitiba/PR', 'Brasília/DF', 'Manaus/AM'],
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
    malhasFiscais: [
      { code: 'DF01', description: 'CHAVE DE ACESSO DO DOCUMENTO FISCAL INFORMADO NÃO ENCONTRADA NO BANCO DE DADOS DA REPR' },
      { code: 'DF03B', description: 'DOCUMENTO FISCAL ELETRÔNICO AUTORIZADO INFORMADO COMO CANCELADO' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '3',
    plate: 'GHI-9012',
    carrier: 'Marítima Sul Navegação',
    state: 'PR',
    vehicleType: 'Navio cargueiro',
    status: 'Parado',
    latitude: -25.4,
    longitude: -49.2,
    mdfe: {
      id: 'MDFE003',
      modalType: MDFeModalType.AQUAVIARIO,
      cargoDescription: 'Produtos químicos',
      cargoWeight: 50000,
      origin: 'Paranaguá - PR',
      destination: 'Santos - SP',
      route: ['Paranaguá/PR', 'Santos/SP'],
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
    malhasFiscais: [
      { code: 'DF04B', description: 'VALOR ICMS NA EFD É MENOR QUE O INFORMADO NA DF-E (SAÍDA)' },
      { code: 'AJDF01', description: 'UTILIZAÇÃO DE AJUSTE SEM INFORMAR OS DOCUMENTOS FISCAIS RELACIONADOS (E113/E224/E313)' },
      { code: 'DF06B', description: 'TOMADOR DO CT-E DIFERENTE DO INFORMADO NA EFD' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '4',
    plate: 'JKL-3456',
    carrier: 'Ferrovias do Brasil S.A.',
    state: 'PR',
    vehicleType: 'Composição ferroviária',
    status: 'Em trânsito',
    latitude: -25.45,
    longitude: -49.35,
    mdfe: {
      id: 'MDFE004',
      modalType: MDFeModalType.FERROVIARIO,
      cargoDescription: 'Minério de ferro',
      cargoWeight: 100000,
      origin: 'Ponta Grossa - PR',
      destination: 'Rio de Janeiro - RJ',
      route: ['Ponta Grossa/PR', 'Curitiba/PR', 'São Paulo/SP', 'Rio de Janeiro/RJ'],
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
    malhasFiscais: [
      { code: 'DF07A', description: 'DOCUMENTO FISCAL ELETRÔNICO EMITIDO (SAIDA) NÃO INFORMADO NA EFD' },
      { code: 'DF04A', description: 'VALOR ICMS NA EFD É MAIOR QUE O INFORMADO NA DF-E (ENTRADA)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '5',
    plate: 'MNO-7890',
    carrier: 'Logística Paraná Express',
    state: 'PR',
    vehicleType: 'Truck refrigerado',
    status: 'Atrasado',
    latitude: -25.42,
    longitude: -49.25,
    mdfe: {
      id: 'MDFE005',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Produtos alimentícios',
      cargoWeight: 15000,
      origin: 'Londrina - PR',
      destination: 'Curitiba - PR',
      route: ['Londrina/PR', 'Maringá/PR', 'Ponta Grossa/PR', 'Curitiba/PR'],
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
    malhasFiscais: [
      { code: 'APUR01', description: 'SALDO CREDOR RECEBIDO NO PERÍODO CORRENTE É MAIOR DO QUE O TRANSFERIDO NO PERÍODO ANTERIOR' },
      { code: 'AJCP01', description: 'AJUSTE PR020021 INFORMADO, CONTUDO NÃO FOI ESCRITURADA A INFORMAÇÃO DO CIAP (BLOCO G)' },
      { code: 'AJCP02', description: 'VALORES DIVERGENTES DO VALOR DO AJUSTE PR020021 COM O INFORMADO NO CIAP' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '6',
    plate: 'PQR-1122',
    carrier: 'Transporte Local Ltda',
    state: 'PR',
    vehicleType: 'Van',
    status: 'Parado',
    latitude: -25.38,
    longitude: -49.29,
    malhasFiscais: [
      { code: 'DF02A', description: 'DOCUMENTO FISCAL MODELO EM PAPEL (EMISSÃO PRÓPRIA) NÃO PERMITIDO PELA LEGISLAÇÃO' },
      { code: 'DF02B', description: 'DOCUMENTO FISCAL EM PAPEL ESCRITURADO (ENTRADA) (C100,D100) (PARANÁ)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '7',
    plate: 'STU-3344',
    carrier: 'Expresso Cascavel Ltda',
    state: 'PR',
    vehicleType: 'Caminhão Baú',
    status: 'Em trânsito',
    latitude: -24.9578,
    longitude: -53.4596,
    mdfe: {
      id: 'MDFE007',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Equipamentos agrícolas',
      cargoWeight: 18000,
      origin: 'Cascavel - PR',
      destination: 'Maringá - PR',
      route: ['Cascavel/PR', 'Toledo/PR', 'Umuarama/PR', 'Maringá/PR'],
      value: 250000,
      invoices: [
        {
          id: 'NFE007',
          items: [
            {
              id: 'ITEM010',
              ncm: { code: '84322100', description: 'Grades de discos' },
              quantity: 5,
              value: 150000
            },
            {
              id: 'ITEM011',
              ncm: { code: '84335100', description: 'Ceifeiras combinadas' },
              quantity: 2,
              value: 100000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'AJCTR01', description: 'AJUSTE PR020061/PR000062 INFORMADO E NÃO POSSUI SALDO TRANSFERIDO' },
      { code: 'AJCTR02', description: 'CENTRALIZADORA NÃO INFORMOU AJUSTE PR020061/PR000062 E POSSUI SALDO TRANSFERIDO PELAS FILIAIS' },
      { code: 'AJDF02', description: 'DOCUMENTO FISCAL INFORMADO NO AJUSTE NÃO PERTENCE AO CONTRIBUINTE (E113/E224/E313)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '8',
    plate: 'VWX-5566',
    carrier: 'Transportes Londrina S.A.',
    state: 'PR',
    vehicleType: 'Bitrem',
    status: 'Em trânsito',
    latitude: -23.3045,
    longitude: -51.1696,
    mdfe: {
      id: 'MDFE008',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Soja em grãos',
      cargoWeight: 45000,
      origin: 'Londrina - PR',
      destination: 'Paranaguá - PR',
      route: ['Londrina/PR', 'Rolândia/PR', 'Curitiba/PR', 'Paranaguá/PR'],
      value: 320000,
      invoices: [
        {
          id: 'NFE008',
          items: [
            {
              id: 'ITEM012',
              ncm: { code: '12019000', description: 'Soja em grãos' },
              quantity: 45000,
              value: 320000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'CADST01', description: 'INSCRIÇÃO ESTADUAL - SUBSTITUTO TRIBUTÁRIO INFORMADA NÃO PERTENCE AO CONTRIBUINTE' },
      { code: 'CADST02', description: 'INSCRIÇÃO ESTADUAL - SUBSTITUTO TRIBUTÁRIO INFORMADA ESTÁ BAIXADA/CANCELADA' },
      { code: 'DF05', description: 'EMITENTE DO DF-E DIFERENTE DO INFORMADO NA EFD' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '9',
    plate: 'YZA-7788',
    carrier: 'Frigorífico Oeste Transportes',
    state: 'PR',
    vehicleType: 'Carreta Frigorífica',
    status: 'Parado',
    latitude: -25.0916,
    longitude: -50.1621,
    mdfe: {
      id: 'MDFE009',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Carne bovina',
      cargoWeight: 22000,
      origin: 'Ponta Grossa - PR',
      destination: 'São Paulo - SP',
      route: ['Ponta Grossa/PR', 'Castro/PR', 'Itararé/SP', 'São Paulo/SP'],
      value: 450000,
      invoices: [
        {
          id: 'NFE009',
          items: [
            {
              id: 'ITEM013',
              ncm: { code: '02013000', description: 'Carnes desossadas' },
              quantity: 22000,
              value: 450000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF07B', description: 'DOCUMENTO FISCAL ELETRÔNICO EMITIDO (ENTRADA) NÃO INFORMADO NA EFD' },
      { code: 'DF08', description: 'DOCUMENTO FISCAL ELETRÔNICO REGISTRADO EM MULTIPLICIDADE NA EFD' },
      { code: 'AJDF03', description: 'VALOR DO AJUSTE SUPERIOR AO VALOR DO DOCUMENTO FISCAL / VALOR DO ICMS (E113/E224/E313)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '10',
    plate: 'BCD-9900',
    carrier: 'Distribuidora Foz',
    state: 'PR',
    vehicleType: 'Truck',
    status: 'Em trânsito',
    latitude: -25.5163,
    longitude: -54.5854,
    mdfe: {
      id: 'MDFE010',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Eletrodomésticos',
      cargoWeight: 12000,
      origin: 'Foz do Iguaçu - PR',
      destination: 'Curitiba - PR',
      route: ['Foz do Iguaçu/PR', 'Cascavel/PR', 'Guarapuava/PR', 'Curitiba/PR'],
      value: 180000,
      invoices: [
        {
          id: 'NFE010',
          items: [
            {
              id: 'ITEM014',
              ncm: { code: '84501100', description: 'Máquinas de lavar roupa' },
              quantity: 50,
              value: 90000
            },
            {
              id: 'ITEM015',
              ncm: { code: '84181000', description: 'Refrigeradores' },
              quantity: 30,
              value: 90000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF09', description: 'VALOR ICMS-ST NA EFD É MENOR QUE O INFORMADO NA DF-E (SAÍDA)' },
      { code: 'APUR02', description: 'FILIAL NÃO PODE TER SALDO CREDOR DE PERÍODO ANTERIOR' },
      { code: 'APUR03', description: 'FILIAL NÃO PODE TER "SALDO CREDOR A TRANSPORTAR" OU "SALDO DEVEDOR APURADO" DIFERENTE DE ZERO' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '11',
    plate: 'EFG-1010',
    carrier: 'Química Sul Transportes',
    state: 'PR',
    vehicleType: 'Tanque',
    status: 'Em trânsito',
    latitude: -25.3935,
    longitude: -49.1327,
    mdfe: {
      id: 'MDFE011',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Combustíveis',
      cargoWeight: 30000,
      origin: 'Araucária - PR',
      destination: 'Curitiba - PR',
      route: ['Araucária/PR', 'Curitiba/PR'],
      value: 200000,
      invoices: [
        {
          id: 'NFE011',
          items: [
            {
              id: 'ITEM016',
              ncm: { code: '27101921', description: 'Gasolina' },
              quantity: 30000,
              value: 200000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'AJINF01', description: 'UTILIZAÇÃO DE AJUSTE SEM INFORMAR AS INFORMAÇÕES ADICIONAIS RELACIONADAS (E112/E230/E312)' },
      { code: 'AJST01', description: 'AJUSTE PR020170 INFORMADO E NÃO POSSUI ADRC-ST AUTORIZADO' },
      { code: 'DF10A', description: 'CREDITO DE ATIVO IMOBILIZADO NÃO PERMITIDO' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '12',
    plate: 'HIJ-2020',
    carrier: 'Materiais Construção Express',
    state: 'PR',
    vehicleType: 'Caminhão Plataforma',
    status: 'Atrasado',
    latitude: -25.2521,
    longitude: -49.1614,
    mdfe: {
      id: 'MDFE012',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Materiais de construção',
      cargoWeight: 20000,
      origin: 'São José dos Pinhais - PR',
      destination: 'Pinhais - PR',
      route: ['São José dos Pinhais/PR', 'Curitiba/PR', 'Pinhais/PR'],
      value: 95000,
      invoices: [
        {
          id: 'NFE012',
          items: [
            {
              id: 'ITEM017',
              ncm: { code: '25232900', description: 'Cimento Portland' },
              quantity: 15000,
              value: 45000
            },
            {
              id: 'ITEM018',
              ncm: { code: '72142000', description: 'Barras de ferro' },
              quantity: 5000,
              value: 50000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF10B', description: 'CREDITO DE USO E CONSUMO NÃO PERMITIDO' },
      { code: 'DF11A', description: 'O VALOR DO AJUSTE DE ESTORNO DE DÉBITO NÃO PODE SER MAIOR DO QUE O VALOR DO IMPOSTO DECLARADO PARA O RESPECTIVO DOCUMENTO FISCAL' },
      { code: 'DF02C', description: 'DOCUMENTO FISCAL EM PAPEL ESCRITURADO (ENTRADA) (C100,D100) (OUTROS ESTADOS)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '13',
    plate: 'KLM-3030',
    carrier: 'Têxtil Norte PR',
    state: 'PR',
    vehicleType: 'Baú Sider',
    status: 'Em trânsito',
    latitude: -23.4205,
    longitude: -51.9333,
    mdfe: {
      id: 'MDFE013',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Tecidos e confecções',
      cargoWeight: 8000,
      origin: 'Maringá - PR',
      destination: 'Apucarana - PR',
      route: ['Maringá/PR', 'Astorga/PR', 'Apucarana/PR'],
      value: 120000,
      invoices: [
        {
          id: 'NFE013',
          items: [
            {
              id: 'ITEM019',
              ncm: { code: '52093200', description: 'Tecidos de algodão' },
              quantity: 5000,
              value: 70000
            },
            {
              id: 'ITEM020',
              ncm: { code: '61091000', description: 'Camisetas' },
              quantity: 3000,
              value: 50000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF11B', description: 'ESTORNO DE DÉBITO INFORMADO (PR20000001), SENDO QUE O DOCUMENTO FISCAL APRESENTADO POSSUI CFOP DIFERENTE DE 5103, 6103, 5104 OU 6104' },
      { code: 'DF11C', description: 'ESTORNO DE DÉBITO INFORMADO (PR20000002), SENDO QUE O DOCUMENTO FISCAL APRESENTADO POSSUI CFOP DIFERENTE DE 5929 OU 6929' },
      { code: 'AJCTR03', description: 'SALDO CREDOR TRANSFERIDO DECLARADO MAIOR DO QUE TRANSFERIDO PELAS FILIAIS' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '14',
    plate: 'NOP-4040',
    carrier: 'Energia Elétrica Transporte',
    state: 'PR',
    vehicleType: 'Caminhão Munck',
    status: 'Parado',
    latitude: -24.0438,
    longitude: -52.3783,
    mdfe: {
      id: 'MDFE014',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Transformadores elétricos',
      cargoWeight: 16000,
      origin: 'Campo Mourão - PR',
      destination: 'Guarapuava - PR',
      route: ['Campo Mourão/PR', 'Boa Esperança/PR', 'Guarapuava/PR'],
      value: 380000,
      invoices: [
        {
          id: 'NFE014',
          items: [
            {
              id: 'ITEM021',
              ncm: { code: '85043400', description: 'Transformadores de potência' },
              quantity: 8,
              value: 380000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF11D', description: 'NÃO FOI ENCONTRADO O CT-E SUBSTITUTO OU EVENTO DE PRESTAÇÃO EM DESACORDO PARA O AJUSTE DE ESTORNO DE DÉBITO INFORMADO (PR20001001)' },
      { code: 'DF11E', description: 'O VALOR DO AJUSTE DE ESTORNO DE CRÉDITO NÃO PODE SER MENOR DO QUE O VALOR DO IMPOSTO DECLARADO PARA O RESPECTIVO DOCUMENTO FISCAL (PR53000000)' },
      { code: 'DF12A', description: 'CRÉDITO INDEVIDO DE ENERGIA ELÉTRICA (C500)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '15',
    plate: 'QRS-5050',
    carrier: 'Telecom Paraná Logística',
    state: 'PR',
    vehicleType: 'Furgão',
    status: 'Em trânsito',
    latitude: -25.5292,
    longitude: -49.0922,
    mdfe: {
      id: 'MDFE015',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Equipamentos de telecomunicação',
      cargoWeight: 3000,
      origin: 'Curitiba - PR',
      destination: 'Paranaguá - PR',
      route: ['Curitiba/PR', 'Morretes/PR', 'Paranaguá/PR'],
      value: 280000,
      invoices: [
        {
          id: 'NFE015',
          items: [
            {
              id: 'ITEM022',
              ncm: { code: '85176200', description: 'Aparelhos de comunicação' },
              quantity: 100,
              value: 180000
            },
            {
              id: 'ITEM023',
              ncm: { code: '85176100', description: 'Estações base' },
              quantity: 10,
              value: 100000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF11F', description: 'NÃO FOI ENCONTRADO O RECOLHIMENTO PARA O AJUSTE DE ESTORNO DE DÉBITO INFORMADO (PR20001003)' },
      { code: 'DF12B', description: 'CRÉDITO INDEVIDO DE COMUNICAÇÃO (D500)' },
      { code: 'APUR04', description: 'FILIAL NÃO PODE APRESENTAR "DEDUÇÕES" OU "ICMS A RECOLHER" DIFERENTE DE ZERO' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '16',
    plate: 'TUV-6060',
    carrier: 'Papel e Celulose Trans',
    state: 'PR',
    vehicleType: 'Carreta Graneleira',
    status: 'Em trânsito',
    latitude: -26.2285,
    longitude: -50.3312,
    mdfe: {
      id: 'MDFE016',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Celulose',
      cargoWeight: 35000,
      origin: 'Telêmaco Borba - PR',
      destination: 'Paranaguá - PR',
      route: ['Telêmaco Borba/PR', 'Ponta Grossa/PR', 'Curitiba/PR', 'Paranaguá/PR'],
      value: 420000,
      invoices: [
        {
          id: 'NFE016',
          items: [
            {
              id: 'ITEM024',
              ncm: { code: '47032900', description: 'Celulose' },
              quantity: 35000,
              value: 420000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'CADST03', description: 'INSCRIÇÃO ESTADUAL - SUBSTITUTO TRIBUTÁRIO NÃO INFORMADA' },
      { code: 'DF03C', description: 'DOCUMENTO FISCAL (ENTRADA) COM EVENTO DE "OPERAÇÃO NÃO REALIZADA"/"DESCONHECIMENTO DA OPERAÇÃO"/"PRESTAÇÃO EM DESACORDO"' },
      { code: 'DF02D', description: 'DOCUMENTO FISCAL EM PAPEL ESCRITURADO (ENTRADA) (ENERGIA ELÉTRICA)(C500)' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '17',
    plate: 'WXY-7070',
    carrier: 'Madeireira Sul',
    state: 'PR',
    vehicleType: 'Caminhão Florestal',
    status: 'Parado',
    latitude: -26.0839,
    longitude: -49.8026,
    mdfe: {
      id: 'MDFE017',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Madeira serrada',
      cargoWeight: 28000,
      origin: 'Lapa - PR',
      destination: 'União da Vitória - PR',
      route: ['Lapa/PR', 'Contenda/PR', 'União da Vitória/PR'],
      value: 160000,
      invoices: [
        {
          id: 'NFE017',
          items: [
            {
              id: 'ITEM025',
              ncm: { code: '44071200', description: 'Madeira de coníferas' },
              quantity: 28000,
              value: 160000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF03D', description: 'DOCUMENTO FISCAL CANCELADO INFORMADO NO AJUSTE/CIAP (E113,E240,E313,G130)' },
      { code: 'DF02E', description: 'DOCUMENTO FISCAL MODELO EM PAPEL ESCRITURADO NO BLOCO E (E113/E224/E313)' },
      { code: 'AJCTR04', description: 'SALDO DEVEDOR TRANSFERIDO DECLARADO MENOR DO QUE TRANSFERIDO PELAS FILIAIS' }
    ],
    lastUpdate: new Date()
  },
  {
    id: '18',
    plate: 'ZAB-8080',
    carrier: 'Bebidas PR Express',
    state: 'PR',
    vehicleType: 'Caminhão Sider',
    status: 'Em trânsito',
    latitude: -23.1668,
    longitude: -49.3809,
    mdfe: {
      id: 'MDFE018',
      modalType: MDFeModalType.RODOVIARIO,
      cargoDescription: 'Bebidas',
      cargoWeight: 18000,
      origin: 'Jacarezinho - PR',
      destination: 'Londrina - PR',
      route: ['Jacarezinho/PR', 'Cornélio Procópio/PR', 'Londrina/PR'],
      value: 95000,
      invoices: [
        {
          id: 'NFE018',
          items: [
            {
              id: 'ITEM026',
              ncm: { code: '22030000', description: 'Cerveja' },
              quantity: 10000,
              value: 55000
            },
            {
              id: 'ITEM027',
              ncm: { code: '22021000', description: 'Refrigerantes' },
              quantity: 8000,
              value: 40000
            }
          ]
        }
      ]
    },
    malhasFiscais: [
      { code: 'DF02F', description: 'DOCUMENTO FISCAL MODELO EM PAPEL ESCRITURADO NO BLOCO G (G130)' },
      { code: 'AJCTR05', description: 'USO SIMULTÂNEO DOS AJUSTES PR020061/PR000062 PELO CENTRALIZADO' }
    ],
    lastUpdate: new Date()
  }
];
