# Fase 9 — Arquitetura Reutilizável, Contexto de Candidato e Workspace (White-Label)
**Diretrizes de Desacoplamento de Domínio, Parametrização Multi-Candidato e Modelo de Workspace**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Abstrações arquiteturais para permitir que a plataforma atenda diferentes gabinetes, partidos, consultorias e candidatos sem acoplamento a um nome fixo.

---

## 1. Princípio da Neutralidade do Motor Analítico

A plataforma de Inteligência Eleitoral foi concebida sob um princípio inegociável de engenharia de software:

> **O motor analítico não tem candidato, partido ou território fixo.**  
> Carlos Búrigo é o caso de uso piloto e a referência empírica de validação da primeira onda (RS / Deputado Estadual). O código do motor matemático, os contratos de apresentação, os gráficos, os mapas e os relatórios operam sobre entidades abstratas (`targetCandidateId`, `competitorCandidates`, `electoralScope`).

Amanhã, a plataforma deve atender outro deputado estadual no Rio Grande do Sul, um deputado federal em São Paulo ou um diretório partidário em Minas Gerais sem que nenhuma linha das funções matemáticas determinísticas precise ser alterada.

---

## 2. As Camadas Desacopladas da Plataforma

```text
┌────────────────────────────────────────────────────────┐
│ 1. CAMADA DE DADOS OFICIAIS TSE (IMUTÁVEL E NEUTRA)     │
│    Votação por seção, candidatos, partidos e municípios │
├────────────────────────────────────────────────────────┤
│ 2. MOTOR MATEMÁTICO DETERMINÍSTICO (PURO)              │
│    Cálculo de QL, HHI, deltas, participações e rankings │
├────────────────────────────────────────────────────────┤
│ 3. CONTEXTO DE WORKSPACE / MANDATO (PARAMÉTRICO)        │
│    Candidato Alvo · Concorrentes · Escopo Autorizado    │
├────────────────────────────────────────────────────────┤
│ 4. CAMADA DE APRESENTAÇÃO E THEME (WHITE-LABEL)        │
│    Branding, paleta de cores, relatórios personalizados│
└────────────────────────────────────────────────────────┘
```

---

## 3. Especificação do Modelo de Workspace

Para evitar uma engenharia prematura de SaaS multi-tenant complexo e manter a simplicidade operacional do MVP, a parametrização é resolvida por meio de uma abstração mínima e elegante de **Configuração de Workspace**:

```typescript
/**
 * Especificação do Contexto de Workspace e Candidatura
 */

export interface CandidateIdentity {
  id: string;                      // Identificador estável (ex: "carlos_burigo")
  tseCandidateNumber: string;      // Número de urna oficial (ex: "15150")
  officialBallotName: string;      // Nome de urna registrado (ex: "CARLOS BÚRIGO")
  fullName: string;                // Nome civil completo
  partyCode: string;               // Sigla do partido (ex: "MDB")
  federationCode?: string;         // Federação partidária, quando houver
  office: string;                  // "Deputado Estadual"
  state: string;                   // "RS"
  primaryColor: string;            // Cor de destaque institucional (ex: "#064e3b")
  secondaryColor?: string;
  avatarUrl?: string;
}

export interface WorkspaceElectoralScope {
  state: string;                   // "RS"
  office: string;                  // "Deputado Estadual"
  availableYears: Array<2018 | 2022 | 2026>;
  primaryBenchmarkYear: 2022;
  geographicFocusRegion?: string;  // ex: "Serra Gaúcha" ou RGI de Caxias do Sul
}

export interface WorkspaceConfig {
  workspaceId: string;             // Identificador único do gabinete ou cliente
  workspaceName: string;           // "Gabinete Parlamentar Dep. Carlos Búrigo"
  clientType: 'parliamentary_office' | 'campaign_team' | 'political_consulting' | 'party_directory';
  targetCandidate: CandidateIdentity;
  rosterOfKeyCompetitors: CandidateIdentity[]; // Lista de concorrentes de comparação direta
  electoralScope: WorkspaceElectoralScope;
  branding: {
    organizationName: string;      // "Assembleia Legislativa do RS" ou "Equipe Búrigo"
    logoUrl?: string;
    reportHeaderSubtitle: string;  // Subtítulo padrão nos relatórios exportados
  };
}
```

---

## 4. Resolução Segura de Contexto no Servidor

O acesso aos dados e cálculos é intermediado pelo resolvedor de contexto, garantindo que o cliente consulte apenas o que lhe é pertinente:

```typescript
export interface ResolvedElectoralContext {
  workspaceId: string;
  targetCandidate: CandidateIdentity;
  availableCompetitors: CandidateIdentity[];
  activeYears: [number, number];
  allowedState: string;
  allowedOffice: string;
}

export function resolveElectoralContext(
  workspaceConfig: WorkspaceConfig,
  requestedCandidateId?: string,
  requestedYears?: [number, number]
): ResolvedElectoralContext {
  // Se nenhum candidato for solicitado, utiliza o candidato titular do workspace
  const activeCandidate = (requestedCandidateId && requestedCandidateId === workspaceConfig.targetCandidate.id)
    ? workspaceConfig.targetCandidate
    : workspaceConfig.targetCandidate;

  const validYears = requestedYears || [2018, 2022];

  return {
    workspaceId: workspaceConfig.workspaceId,
    targetCandidate: activeCandidate,
    availableCompetitors: workspaceConfig.rosterOfKeyCompetitors,
    activeYears: validYears,
    allowedState: workspaceConfig.electoralScope.state,
    allowedOffice: workspaceConfig.electoralScope.office,
  };
}
```

---

## 5. Roteiro Prático: Como Adicionar um Novo Candidato ou Cliente

Para habilitar um novo mandato ou candidato na plataforma, o processo não exige alteração no código das fórmulas matemáticas:

1. **Passo 1 (Carga dos Dados Oficiais no Banco):**
   * Os dados oficiais do TSE já contêm todos os candidatos a Deputado Estadual do Rio Grande do Sul que disputaram os pleitos de 2018, 2022 e 2026. Nenhuma tabela precisa ser recriada; os votos de todos os concorrentes já estão no banco de dados.
2. **Passo 2 (Criação do Arquivo de Configuração do Workspace):**
   * Criar um arquivo de configuração JSON/TypeScript para o novo cliente (ex: `workspace-deputado-novo.json`):
     * Indicar o `id` do candidato alvo (número de urna ou código TSE).
     * Definir a lista de 3 a 5 concorrentes de interesse direto da sua região ou espectro partidário.
     * Definir as cores institucionais do mandato e o logotipo.
3. **Passo 3 (Injeção de Dependência no Frontend / API):**
   * O provedor de contexto (`FilterProvider` / `WorkspaceProvider`) carrega o arquivo de configuração correspondente ao usuário logado.
   * Todos os gráficos, mapas, tabelas e respostas do assistente conversacional assumem instantaneamente o novo candidato como figura central, calculando seu Quociente de Localização, suas seções prioritárias e seus relatórios em PDF com sua própria identidade visual.
