# Documentação dos Pontos Fixos

Este documento descreve a implementação dos pontos fixos no mapa (Postos da PRF e Delegacias da Receita Estadual do Paraná).

## Fontes de Dados

### Polícia Rodoviária Federal (PRF)

**Fonte oficial:** [Portal PRF - Unidades no Paraná](https://www.gov.br/prf/pt-br/canais-de-atendimento/unidades-prf/parana)

**Telefone de emergência:** 191

**Dados incluídos:**
- Superintendência Regional da PRF no Paraná (Curitiba)
- 7 Delegacias Regionais (Colombo, Pato Branco, Ponta Grossa, Cascavel, Foz do Iguaçu, Guaíra, Londrina)
- 2 Postos Operacionais principais (Paranaguá, Maringá)

**Observações:**
- A PRF possui 38 postos operacionais no Paraná
- Foram incluídos os principais postos com endereços completos disponíveis
- Alguns postos menores não foram incluídos devido à falta de endereços completos
- Para postos sem endereço completo, foi utilizada apenas a cidade como referência

### Receita Estadual do Paraná

**Fonte oficial:** [Portal da Secretaria da Fazenda do Paraná](http://pdp.fazenda.pr.gov.br/pdp/delegacias)

**Dados incluídos:**
- 10 Delegacias Regionais distribuídas pelo estado
- Todos os dados incluem endereço completo e telefone

**Delegacias incluídas:**
1. Curitiba - Delegacia Regional
2. Ponta Grossa
3. Guarapuava
4. Jacarezinho
5. Londrina
6. Maringá
7. Umuarama
8. Cascavel
9. Pato Branco
10. DCOE Curitiba (Delegacia de Controle e Orientação de Empresas)

## Implementação Técnica

### Arquivos Criados

1. **src/types/fixedPoint.ts** - Definição de tipos TypeScript
2. **src/data/prfPosts.ts** - Dados dos postos da PRF
3. **src/data/receitaOffices.ts** - Dados das delegacias da Receita
4. **src/utils/fixedPointIcons.ts** - Funções utilitárias para ícones
5. **src/components/FixedPointMarker.tsx** - Componente de marcador

### Arquivos Modificados

1. **src/components/VehicleMap.tsx** - Adicionada renderização dos pontos fixos e atualização da legenda
2. **src/components/VehicleMap.css** - Adicionados estilos para marcadores de pontos fixos

### Ícones Utilizados

- **PRF:** 🚔 (Carro de polícia) - Representa a Polícia Rodoviária Federal
- **Receita Estadual:** 🏛️ (Prédio governamental) - Representa as delegacias da Receita

### Coordenadas GPS

As coordenadas GPS foram obtidas através de geocodificação dos endereços oficiais, utilizando os seguintes métodos:
- Endereços completos foram geocodificados para obter latitude/longitude precisas
- Para locais sem endereço completo, foram utilizadas coordenadas aproximadas do centro da cidade

## Tooltip de Informações

Cada ponto fixo exibe um tooltip ao passar o mouse com as seguintes informações:

- **Nome:** Nome completo do posto ou delegacia
- **Tipo:** Polícia Rodoviária Federal ou Receita Estadual do Paraná
- **Endereço:** Endereço completo
- **Telefone:** Número de telefone para contato
- **E-mail:** E-mail (quando disponível, principalmente para PRF)

## Dados Incompletos

### PRF
- **Postos de Guaíra e Londrina:** Endereços completos não disponíveis publicamente no momento da implementação. Utilizadas coordenadas aproximadas do centro das cidades.
- **Postos Operacionais menores:** Não incluídos devido à falta de dados completos de endereço e telefone específico (usam telefone geral 191).

### Receita Estadual
- Todos os dados estão completos conforme disponibilizado no portal oficial da Secretaria da Fazenda do Paraná.

## Possíveis Melhorias Futuras

1. Adicionar mais postos operacionais da PRF quando os endereços completos estiverem disponíveis
2. Implementar filtros para mostrar/ocultar pontos fixos específicos
3. Adicionar mais informações nos tooltips (horário de atendimento, serviços disponíveis)
4. Integrar com APIs oficiais para manter dados sempre atualizados
5. Adicionar rotas/navegação até os pontos fixos

## Última Atualização

Data: Novembro 2025
Responsável: Implementação automática via GitHub Copilot
