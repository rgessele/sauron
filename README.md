# Sauron - Sistema de Monitoramento de Veículos de Carga

Projeto de monitoramento em tempo real de transporte do estado do Paraná.

🌐 **[Ver Demo ao Vivo](https://rgessele.github.io/sauron/)** (após habilitar GitHub Pages)

## 📋 Descrição

Sistema web para monitoramento em tempo real de veículos de carga no estado do Paraná. O sistema exibe veículos em um mapa interativo, diferenciando-os por tipo de modal de transporte (MDFe), e apresenta informações detalhadas sobre a carga ao passar o mouse sobre cada veículo.

## ✨ Funcionalidades

### 🗺️ Mapa Interativo
- Visualização de veículos em tempo real no mapa
- Mapa centrado no estado do Paraná (Curitiba)
- Zoom e navegação interativa
- Interface responsiva

### 🚛 Tipos de Modal (MDFe)
Cada tipo de modal de transporte possui um ícone específico:

- **🚛 Rodoviário** - Transporte terrestre por caminhão
- **✈️ Aéreo** - Transporte aéreo
- **🚢 Aquaviário** - Transporte marítimo/fluvial  
- **🚂 Ferroviário** - Transporte ferroviário
- **📍 Sem MDFe** - Veículos sem documento fiscal associado

### 🔍 Filtro por NCM
Sistema de filtragem avançada por NCM (Nomenclatura Comum do Mercosul):

- **Seleção múltipla** - Filtre por um ou mais NCMs simultaneamente
- **Busca inteligente** - Pesquise NCMs por código ou descrição
- **Indicadores visuais** - Badge mostrando quantidade de NCMs selecionados
- **Estatísticas em tempo real** - Contador de veículos filtrados
- **Ações rápidas**:
  - "Selecionar todos" - Seleciona todos os NCMs disponíveis
  - "Limpar filtro" - Remove todos os filtros aplicados

Quando um ou mais NCMs são selecionados, o mapa exibe apenas os veículos cujos MDF-es contêm notas fiscais com os NCMs filtrados.

### 💬 Tooltip Informativo
Ao passar o mouse sobre um veículo, são exibidas as seguintes informações:

**Para veículos com MDFe:**
- Placa do veículo
- Número do MDFe
- Tipo de modal
- Descrição da carga
- Peso da carga (kg ou toneladas)
- Origem e destino
- Valor da carga (R$)

**Para veículos sem MDFe:**
- Placa do veículo
- Indicação de ausência de MDFe

## 🛠️ Tecnologias

- **React 19.2** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite 7.2** - Build tool e dev server
- **Leaflet** - Biblioteca de mapas interativos
- **React-Leaflet** - Componentes React para Leaflet
- **OpenStreetMap** - Tiles do mapa
- **ESLint** - Linting de código

## 🚀 Como Executar

### 🌐 Online (GitHub Pages)

O projeto está configurado para deploy automático no GitHub Pages.

**URL:** https://rgessele.github.io/sauron/

Para habilitar, veja o guia completo em [DEPLOY.md](./DEPLOY.md)

### 💻 Localmente

#### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/rgessele/sauron.git
cd sauron

# Instalar dependências
npm install
```

#### Desenvolvimento

```bash
# Executar servidor de desenvolvimento
npm run dev

# Acessar em http://localhost:5173
```

#### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Testar build de produção
npm run preview
```

#### Linting

```bash
# Verificar código
npm run lint
```

## 📁 Estrutura do Projeto

```
sauron/
├── src/
│   ├── components/
│   │   ├── VehicleMap.tsx       # Componente principal do mapa
│   │   ├── VehicleMap.css       # Estilos do mapa
│   │   ├── VehicleMarker.tsx    # Marcador de veículo individual
│   │   ├── NCMFilter.tsx        # Componente de filtro por NCM
│   │   └── NCMFilter.css        # Estilos do filtro NCM
│   ├── types/
│   │   └── vehicle.ts           # Tipos TypeScript (MDFe, Vehicle)
│   ├── data/
│   │   └── sampleVehicles.ts    # Dados de exemplo para demonstração
│   ├── utils/
│   │   ├── vehicleIcons.ts      # Funções utilitárias (ícones, formatação)
│   │   └── ncmUtils.ts          # Funções utilitárias para filtro de NCM
│   ├── App.tsx                  # Componente principal da aplicação
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais
├── public/                       # Arquivos estáticos
├── package.json                  # Dependências e scripts
├── vite.config.ts               # Configuração do Vite
└── tsconfig.json                # Configuração TypeScript
```

## 📊 Tipos de Dados

### NCM (Nomenclatura Comum do Mercosul)
```typescript
interface NCM {
  code: string;        // Código NCM de 8 dígitos
  description: string; // Descrição do produto
}
```

### InvoiceItem (Item de Nota Fiscal)
```typescript
interface InvoiceItem {
  id: string;
  ncm: NCM;
  quantity: number;
  value: number;       // em BRL
}
```

### Invoice (Nota Fiscal Eletrônica)
```typescript
interface Invoice {
  id: string;
  items: InvoiceItem[];
}
```

### MDFe (Manifesto de Documentos Fiscais Eletrônico)
```typescript
interface MDFe {
  id: string;
  modalType: MDFeModalType;  // 1-Rodoviário, 2-Aéreo, 3-Aquaviário, 4-Ferroviário
  cargoDescription: string;
  cargoWeight: number;       // em kg
  origin: string;
  destination: string;
  value: number;             // em BRL
  invoices: Invoice[];       // NF-es associadas ao MDFe
}
```

### Vehicle
```typescript
interface Vehicle {
  id: string;
  plate: string;
  latitude: number;
  longitude: number;
  mdfe?: MDFe;              // Opcional
  lastUpdate: Date;
}
```

## 🎨 Screenshots

### Visualização Geral
![Mapa de Monitoramento](https://github.com/user-attachments/assets/503215b1-2c72-4c38-bd79-398f7386bc02)

### Filtro de NCM
![Filtro de NCM Aberto](https://github.com/user-attachments/assets/66bbee6c-b922-49aa-a460-0fe22e9c6ff5)

### Filtro de NCM Aplicado
![Filtro Aplicado - Único NCM](https://github.com/user-attachments/assets/a1b4c89c-c3f6-459b-8c76-865cf7b6f487)

### Filtro com Múltiplos NCMs
![Filtro Aplicado - Múltiplos NCMs](https://github.com/user-attachments/assets/61c0c009-4dfa-444f-b4fe-bb31bbae5a37)

### Busca de NCM
![Busca de NCM por Descrição](https://github.com/user-attachments/assets/dfdd59af-6d73-4465-b0bb-2efb4330e598)

### Tooltip com Informações
![Tooltip de Veículo](https://github.com/user-attachments/assets/7559d46a-9f76-4cab-b657-f8aed4dba907)

## 🔄 Próximas Funcionalidades

- [ ] Integração com API de dados reais
- [x] Filtro por NCM (Nomenclatura Comum do Mercosul)
- [ ] Filtros por tipo de modal
- [ ] Histórico de rotas
- [ ] Alertas em tempo real
- [ ] Dashboard de estatísticas
- [ ] Exportação de relatórios
- [ ] Autenticação de usuários
- [ ] Notificações push

## 📝 Licença

Este projeto foi desenvolvido para fins de monitoramento de transporte no estado do Paraná.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugestões e melhorias.

## 📧 Contato

Para mais informações sobre o projeto, entre em contato através do GitHub.
