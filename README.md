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
│   │   └── VehicleMarker.tsx    # Marcador de veículo individual
│   ├── types/
│   │   └── vehicle.ts           # Tipos TypeScript (MDFe, Vehicle)
│   ├── data/
│   │   └── sampleVehicles.ts    # Dados de exemplo para demonstração
│   ├── utils/
│   │   └── vehicleIcons.ts      # Funções utilitárias (ícones, formatação)
│   ├── App.tsx                  # Componente principal da aplicação
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais
├── public/                       # Arquivos estáticos
├── package.json                  # Dependências e scripts
├── vite.config.ts               # Configuração do Vite
└── tsconfig.json                # Configuração TypeScript
```

## 📊 Tipos de Dados

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
![Mapa de Monitoramento](https://github.com/user-attachments/assets/389db00c-243c-4b7a-8bf9-eef2854a97cd)

### Tooltip com Informações
![Tooltip de Veículo](https://github.com/user-attachments/assets/7559d46a-9f76-4cab-b657-f8aed4dba907)

## 🔄 Próximas Funcionalidades

- [ ] Integração com API de dados reais
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
