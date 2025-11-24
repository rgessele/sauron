# Sistema de Atualização de Posições de Veículos

## 📋 Visão Geral

Este documento descreve a implementação do sistema de atualização automática de posições de veículos a partir de registros de passagem, conforme especificado na issue.

## ✨ Funcionalidades Implementadas

### 1. **Atualização Automática de Posições**
- ✅ Polling automático a cada 30 segundos
- ✅ Consulta simulada ao banco de dados para novos registros
- ✅ Atualização dinâmica das posições no mapa
- ✅ Indicador visual de última atualização

### 2. **Controles de Atualização**
- ✅ Botão "🔄 Atualizar" - força atualização imediata
- ✅ Botão "⏸️ Pausar / ▶️ Retomar" - controla polling automático
- ✅ Display do horário da última atualização

### 3. **Dados de Teste**
- ✅ 50 veículos com dados realistas
- ✅ Rotas ao longo de rodovias do Paraná
- ✅ ~750 registros de passagem simulando 2 horas de movimento
- ✅ 85% dos veículos com MDFe, 15% sem documento

## 🗺️ Rodovias Cobertas

O sistema simula movimento de veículos ao longo das principais rodovias do Paraná:

### Rodovias Federais
- **BR-277**: Paranaguá → Curitiba → Foz do Iguaçu
- **BR-376**: Curitiba → Ponta Grossa → Apucarana
- **BR-369**: Cascavel → Toledo / Londrina → Maringá
- **BR-373**: Ponta Grossa → Guarapuava → Candói
- **BR-158**: Francisco Beltrão → Pato Branco
- **BR-487**: Campo Mourão → Umuarama
- **BR-272**: Guaíra → Terra Roxa
- **BR-163**: Palmital → Cascavel

### Cidades Incluídas (30+)
Paranaguá, Curitiba, Maringá, Londrina, Foz do Iguaçu, Ponta Grossa, Cascavel, Toledo, Guarapuava, Apucarana, Campo Mourão, Umuarama, Francisco Beltrão, Pato Branco, entre outras.

## 🏗️ Arquitetura da Solução

### Estrutura de Dados

#### 1. **Tabela registro_passagem** (`database/schema.sql`)
```sql
CREATE TABLE registro_passagem (
    id SERIAL PRIMARY KEY,
    veiculo_id INTEGER NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW()
);
```

Índices otimizados para:
- Consultas por veículo
- Consultas por timestamp
- Consultas de última posição por veículo

#### 2. **Tipos TypeScript** (`src/types/registroPassagem.ts`)
```typescript
interface RegistroPassagem {
  id: number;
  veiculo_id: number;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface RoutePoint {
  name: string;
  latitude: number;
  longitude: number;
}
```

### Componentes Principais

#### 1. **Rotas de Rodovias** (`src/data/paranaHighwayRoutes.ts`)
- 10 rotas principais do Paraná
- Função de interpolação para movimento suave
- Coordenadas reais de cidades e pontos de interesse

#### 2. **Gerador de Registros** (`src/data/passageRecordGenerator.ts`)
- Geração de 50 veículos com placas únicas
- ~750 registros de passagem distribuídos em 2 horas
- Simulação de banco de dados em memória
- Classe `PassageRecordDatabase` com métodos:
  - `queryNewRecords()` - simula consulta SQL
  - `getLatestPositions()` - última posição de cada veículo
  - `getVehicleHistory()` - histórico de um veículo

#### 3. **Hook de Atualização** (`src/hooks/useVehiclePositionUpdates.ts`)
Custom hook React que gerencia:
- Estado dos veículos
- Polling automático (30s)
- Controles de pausa/retomada
- Atualização manual
- Logging para debug

#### 4. **Componentes UI**
- **App.tsx**: Integra o hook e passa dados para o mapa
- **VehicleMap.tsx**: Exibe controles de atualização
- **VehicleMap.css**: Estilos para botões de controle

## 📊 Dados Estatísticos

### Distribuição de Veículos
- **Total**: 50 veículos
- **Com MDFe**: 43 veículos (86%)
- **Sem MDFe**: 7 veículos (14%)

### Tipos de Modal (MDFe)
- **Rodoviário**: ~75% (maioria)
- **Aéreo**: ~10%
- **Aquaviário**: ~8%
- **Ferroviário**: ~7%

### Registros de Passagem
- **Total**: ~750 registros
- **Por veículo**: 10-15 registros
- **Período**: Últimas 2 horas
- **Intervalo**: 5-15 minutos entre registros

## 🔄 Fluxo de Atualização

### Inicialização
1. Hook `useVehiclePositionUpdates` é montado
2. Banco de dados simulado é inicializado com todos os registros
3. Primeira consulta retorna posições iniciais de todos os veículos
4. Mapa exibe os 50 veículos em suas posições iniciais

### Polling Automático (a cada 30s)
1. Timer dispara a função `updateVehiclePositions()`
2. Consulta simula `SELECT * FROM registro_passagem WHERE timestamp > last_query`
3. Se houver novos registros:
   - Gera lista atualizada de veículos
   - Atualiza estado React
   - Mapa re-renderiza com novas posições
4. Atualiza timestamp de última atualização

### Controles do Usuário
- **Refresh**: Força consulta imediata
- **Pause**: Para o timer de polling
- **Resume**: Reinicia o timer de polling

## 🎯 Flexibilidade para Backend Real

A arquitetura foi projetada para facilitar migração para backend real:

### O que NÃO precisa mudar:
- ✅ Tipos TypeScript
- ✅ Componentes de UI
- ✅ Hook de atualização (interface)
- ✅ Estrutura do banco de dados

### O que precisa ser adaptado:
1. **Substituir simulação por API real**
   ```typescript
   // Atual (simulado)
   const newRecords = passageRecordDB.queryNewRecords();
   
   // Futuro (API real)
   const newRecords = await fetch('/api/passage-records/new').then(r => r.json());
   ```

2. **Configurar conexão com PostgreSQL**
   - Executar `database/schema.sql`
   - Popular com dados reais ou usar `database/seed.sql` como referência

3. **Ajustar intervalo de polling** (se necessário)
   - Atualmente: 30 segundos
   - Configurável via parâmetro do hook

## 📝 Logging e Debug

O sistema inclui logging detalhado no console:

```
[Vehicle Updates] Initializing vehicle data...
[Vehicle Updates] Loaded 50 vehicles
[Vehicle Updates] Polling interval set to 30000ms
[Vehicle Updates] Polling for new passage records...
[Vehicle Updates] Found 456 new passage records
[Vehicle Updates] Updated positions for 50 vehicles
```

Útil para:
- Verificar funcionamento do polling
- Debug de problemas
- Monitorar performance

## 🚀 Como Usar

### Desenvolvimento
```bash
npm install
npm run dev
```

### Produção
```bash
npm run build
npm run preview
```

### Observações
1. O mapa está configurado com zoom 7 para mostrar todo o estado do Paraná
2. Veículos aparecem com ícones diferentes conforme o tipo de modal
3. Tooltips mostram informações detalhadas ao passar o mouse
4. O sistema funciona completamente offline (simulação)

## 🔮 Próximos Passos

Para implementação em produção:

1. **Backend API**
   - Criar endpoint `/api/passage-records/new`
   - Implementar autenticação
   - Otimizar queries com índices

2. **WebSocket** (opcional)
   - Para atualizações em tempo real
   - Eliminar polling (push em vez de pull)

3. **Cache**
   - Redis para últimas posições
   - Reduzir carga no banco

4. **Monitoramento**
   - Métricas de atualização
   - Alertas para veículos parados
   - Dashboard administrativo

## 📄 Arquivos Criados/Modificados

### Novos Arquivos
- `database/README.md` - Documentação do banco
- `database/schema.sql` - Estrutura da tabela
- `database/seed.sql` - Script de população (exemplo)
- `src/types/registroPassagem.ts` - Tipos TypeScript
- `src/data/paranaHighwayRoutes.ts` - Rotas das rodovias
- `src/data/passageRecordGenerator.ts` - Gerador de dados
- `src/hooks/useVehiclePositionUpdates.ts` - Hook de atualização
- `docs/VEHICLE_UPDATES.md` - Este arquivo

### Arquivos Modificados
- `src/App.tsx` - Integração do hook
- `src/components/VehicleMap.tsx` - Controles de atualização
- `src/components/VehicleMap.css` - Estilos dos controles

## 🎉 Conclusão

O sistema está totalmente funcional e atende todos os requisitos:
- ✅ Atualização automática a cada 30 segundos
- ✅ 50 veículos com dados de teste
- ✅ Rotas realistas pelas rodovias do Paraná
- ✅ Estrutura de banco de dados definida
- ✅ Visualização dinâmica no mapa
- ✅ Flexível para integração futura com backend real
