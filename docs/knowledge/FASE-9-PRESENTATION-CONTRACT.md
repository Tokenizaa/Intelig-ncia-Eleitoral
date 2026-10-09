# Fase 9 — Contrato Canônico de Apresentação Analítica
**Especificação de Contratos de Interface, Payloads Estruturados e Famílias de Templates**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Interfaces TypeScript, contratos de dados JSON e padrões de renderização entre o Motor Determinístico e as Camadas de Interface / Chatbot.

---

## 1. Princípio da Separação Estrutural

O runtime de Inteligência Eleitoral opera sob o desacoplamento estrito entre:
1. **Motor Determinístico de Domínio:** Executa queries, filtros e cálculos matemáticos sobre a base auditada do TSE. Retorna dados brutos calculados com precisão numérica íntegra.
2. **Camada de Orquestração Analítica:** Valida o escopo do usuário, compõe a intenção e monta o objeto `AnalyticalResult` estruturado.
3. **Camada de Apresentação (UI / Chatbot / Exportador):** Recebe o contrato de apresentação e renderiza componentes visuais (React), gráficos (SVG/Canvas), mapas (Leaflet) ou documentos (PDF/CSV).

**Proibição Canônica:** A LLM e a interface jamais calculam percentuais, deltas ou rankings. A LLM recebe o contrato já calculado e tem como função exclusiva sintetizar a explicação contextual, orientar a navegação e sugerir os próximos passos de investigação.

---

## 2. Tipos TypeScript Fundamentais do Contrato

```typescript
/**
 * Contrato Canônico de Apresentação de Inteligência Eleitoral
 */

export type PresentationArtifactType =
  | 'kpi_summary'
  | 'data_table'
  | 'line_chart'
  | 'bar_chart'
  | 'divergent_bar_chart'
  | 'choropleth_map'
  | 'proportional_symbol_map'
  | 'ballot_box_inspector'
  | 'hypothesis_evaluation';

export type AnalyticalIntentFamily =
  | 'territorial_trajectory'    // Família 1: Desempenho e evolução nos 3 pleitos
  | 'competitive_migration'     // Família 2: Disputa e quem capturou os votos
  | 'ranking_specialization'    // Família 3: Rankings e Quociente de Localização (QL)
  | 'concentration_dependency'  // Família 4: HHI, Gini e vulnerabilidade de base
  | 'microterritory_audit'      // Família 5: Zonas e seções críticas
  | 'hypothesis_testing';       // Família 6: Teste de hipóteses (ex: abstenção)

export interface AnalyticalEvidenceCitation {
  id: string;
  sourceDataset: string;           // ex: "TSE - votacao_secao_2022_RS"
  datasetReleaseDate: string;      // ex: "06/10/2022"
  sha256Checksum?: string;
  electoralScope: {
    startYear: 2018 | 2022 | 2026;
    endYear: 2018 | 2022 | 2026;
    state: string;                 // "RS"
    office: string;                // "Deputado Estadual"
    round: 1;
    targetCandidateId: string;
    targetMunicipalityId?: string;
    targetZoneId?: string;
  };
  methodReference: {
    methodId: string;              // ex: "calc_location_quotient_v1"
    specificationDocument: string; // ex: "docs/knowledge/FASE-9-PESQUISA-METODOS-E-REFERENCIAS.md"
    formulaApplied: string;
  };
  epistemologicalNotice: string;   // Limitações do método e o que ele não prova
}

export interface KPIArtifact {
  type: 'kpi_summary';
  title: string;
  primaryValue: string;            // ex: "23.900"
  unit: string;                    // "votos nominais"
  comparisonLabel: string;         // "vs. 2022"
  absoluteDifference: number;      // +2677
  percentageDifference: number | null; // +12.6
  percentagePointsDifference?: number; // +1.5
  trend: 'positive' | 'negative' | 'neutral' | 'undefined';
  benchmarks?: Array<{ label: string; value: string }>;
}

export interface TableColumnDefinition {
  field: string;
  label: string;
  align: 'left' | 'center' | 'right';
  format: 'text' | 'integer' | 'decimal' | 'percentage' | 'percentage_points' | 'badge';
  highlightDifference?: boolean;
}

export interface DataTableArtifact {
  type: 'data_table';
  title: string;
  subtitle?: string;
  columns: TableColumnDefinition[];
  rows: Array<Record<string, any>>;
  totalSummaryRow?: Record<string, any>;
  drilldownAction?: {
    targetView: string;
    parameterKey: string;
  };
}

export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  dataPoints: Array<{ x: string | number; y: number | null }>;
}

export interface ChartSpecificationArtifact {
  type: 'line_chart' | 'bar_chart' | 'divergent_bar_chart';
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  series: ChartSeries[];
  zeroBaselineEnforced: boolean;
  annotations?: Array<{ x: string | number; text: string }>;
}

export interface MapSpecificationArtifact {
  type: 'choropleth_map' | 'proportional_symbol_map';
  title: string;
  metricKey: string;
  metricLabel: string;
  geographicLevel: 'municipality' | 'rgi_ibge' | 'polling_station';
  colorPalette: 'divergent_green_red' | 'sequential_emerald' | 'bivariate';
  breaks: number[];                // Quebras de corte (Jenks ou Quantis)
  dataBinding: Record<string, {
    ibgeCode: string;
    name: string;
    value: number;
    formattedValue: string;
    details?: string;
  }>;
}

export interface HypothesisEvaluationArtifact {
  type: 'hypothesis_evaluation';
  hypothesisTested: string;
  status: 'supported' | 'refuted' | 'inconclusive' | 'secondary_effect';
  evidenceSummary: string;
  formalProofData: Record<string, any>;
}

export interface AnalyticalPresentationContract {
  contractVersion: '1.0';
  executionId: string;
  timestamp: string;
  intentFamily: AnalyticalIntentFamily;
  intentId: string;
  questionOrigin: string;

  // Bloco Executivo de Comunicação
  executiveSummary: {
    headline: string;
    narrativeSynthesis: string;
    oralBriefingText: string;      // Texto curto e fluido otimizado para TTS de voz
  };

  // Artefatos Ricos de Apresentação
  primaryArtifact: KPIArtifact | ChartSpecificationArtifact | DataTableArtifact | MapSpecificationArtifact;
  secondaryArtifacts: Array<KPIArtifact | DataTableArtifact | ChartSpecificationArtifact | MapSpecificationArtifact | HypothesisEvaluationArtifact>;

  // Ações de Continuidade e Investigação Guiada
  followUpSuggestions: Array<{
    promptText: string;
    intentId: string;
    contextOverrides?: Record<string, any>;
  }>;

  // Evidências e Prova de Rastreabilidade
  evidence: AnalyticalEvidenceCitation;
}
```

---

## 3. As Seis Famílias Canônicas de Templates

Em vez de criar 100 templates independentes, todos os 100 planos de consulta da plataforma são mapeados para **6 famílias canônicas de templates reutilizáveis**:

### Família 1: Desempenho e Trajetória Territorial (`territorial_trajectory`)
* **Objetivo:** Explicar a evolução de votos de um candidato em um território nos 3 ciclos (2018, 2022 e 2026).
* **Composição do Contrato:**
  * `KPI`: Saldo líquido absoluto ($\Delta V$) e variação percentual ($\% \Delta$).
  * `Chart`: Linha com os 3 pleitos ou Cleveland dot plot.
  * `Table`: Tabela com 2018, 2022, 2026, $\Delta$ absoluto e $\Delta \text{ p.p.}$.
  * `Narrative`: Diagnóstico classificando em *Recuperação*, *Crescimento Sustentado* ou *Erosão*.

### Família 2: Disputa e Migração Competitiva (`competitive_migration`)
* **Objetivo:** Responder *"Para quem perdemos votos?"* e auditar a disputa contra concorrentes diretos.
* **Composição do Contrato:**
  * `Table`: Balanço urna a urna das seções em declínio correlacionadas com avanço de concorrentes.
  * `Chart`: Barras divergentes comparando o candidato principal contra os 3 principais concorrentes no território.
  * `Narrative`: Identificação nominal do concorrente que mais capturou fatias eleitorais na localidade.

### Família 3: Ranking e Força Relativa (`ranking_specialization`)
* **Objetivo:** Exibir a ordem dos municípios e destacar bastiões via Quociente de Localização ($QL$).
* **Composição do Contrato:**
  * `Chart`: Barras horizontais ordenadas com os 10 maiores municípios.
  * `Map`: Mapa coroplético categorizado por faixas de $QL$ ($>2,0$ bastiões, $1,0$ a $2,0$ acima da média, $<1,0$ sub-representado).
  * `Table`: Lista completa paginada com ranking estadual e regional.

### Família 4: Concentração e Risco Espacial (`concentration_dependency`)
* **Objetivo:** Avaliar a vulnerabilidade política decorrente da dependência de poucos polos.
* **Composição do Contrato:**
  * `KPI`: Índice Herfindahl-Hirschman ($HHI$) e fatias do Top 1 e Top 5 municípios.
  * `Chart`: Curva de Lorenz territorial ou barras empilhadas de composição regional (RGIs do IBGE).
  * `Narrative`: Análise de risco eleitoral com classificação em *Base Hiperconcentrada*, *Moderada* ou *Dispersa*.

### Família 5: Microterritório e Seções Críticas (`microterritory_audit`)
* **Objetivo:** Investigar o menor nível de agregação oficial (urna a urna por bairro e local de votação).
* **Composição do Contrato:**
  * `Table`: Tabela de seções com filtros de anomalia (maiores perdas, maiores ganhos, seções atípicas).
  * `Artifact`: Inspetor de Boletim de Urna (BU) com votos de legenda, brancos, nulos e total de votantes.
  * `Map`: Marcadores georreferenciados dos colégios e pavilhões eleitorais.

### Família 6: Teste de Hipóteses e Decomposição de Fatores (`hypothesis_testing`)
* **Objetivo:** Testar hipóteses analíticas levantadas pela equipe de campanha (ex: *"A abstenção causou a derrota em Caxias?"*).
* **Composição do Contrato:**
  * `HypothesisArtifact`: Veredito formal (*Hipótese Refutada*, *Sustentada* ou *Secundária*).
  * `Table`: Confronto entre votos válidos do município e variação da candidatura.
  * `Narrative`: Demonstração matemática auditável do porquê a hipótese foi descartada ou aceita.

---

## 4. Exemplo Concreto de Payload JSON Estruturado

Abaixo, o payload JSON gerado deterministicamente para a consulta canônica:  
*"Por que a votação caiu em Caxias do Sul entre 2018 e 2022?"*

```json
{
  "contractVersion": "1.0",
  "executionId": "exec-20261009-caxias-001",
  "timestamp": "2026-10-09T00:20:00Z",
  "intentFamily": "competitive_migration",
  "intentId": "territory.municipality_loss_diagnostic",
  "questionOrigin": "Por que a votação caiu em Caxias do Sul entre 2018 e 2022?",
  "executiveSummary": {
    "headline": "Erosão de 1.890 votos em Caxias do Sul absorvida pelo avanço de concorrentes da Serra",
    "narrativeSynthesis": "Entre 2018 e 2022, Carlos Búrigo recuou de 23.113 para 21.223 votos em Caxias do Sul (-1.890 votos nominais; -8,2%). A hipótese de aumento de abstenção foi refutada, visto que o total de votos válidos do município cresceu no período. A microanálise por seções eleitorais comprova que a retração coincidiu com a ascensão eleitoral de Guilherme Pasin e Pepe Vargas nos mesmos bairros de votação tradicional.",
    "oralBriefingText": "Em Caxias do Sul, a votação caiu 1.890 votos entre 2018 e 2022, uma retração de 8,2%. Os dados da urna mostram que a causa não foi abstenção, mas migração direta de votos para concorrentes regionais como Guilherme Pasin nas seções centrais."
  },
  "primaryArtifact": {
    "type": "kpi_summary",
    "title": "Saldo Eleitoral em Caxias do Sul (2018 → 2022)",
    "primaryValue": "-1.890",
    "unit": "votos nominais",
    "comparisonLabel": "23.113 em 2018 para 21.223 em 2022",
    "absoluteDifference": -1890,
    "percentageDifference": -8.18,
    "percentagePointsDifference": -1.14,
    "trend": "negative"
  },
  "secondaryArtifacts": [
    {
      "type": "data_table",
      "title": "Top Seções com Maior Erosão e Beneficiários Diretos",
      "subtitle": "Auditoria urna a urna na base de seções de Caxias do Sul",
      "columns": [
        { "field": "section", "label": "Zona / Seção", "align": "left", "format": "text" },
        { "field": "neighborhood", "label": "Bairro", "align": "left", "format": "text" },
        { "field": "votesStart", "label": "2018", "align": "right", "format": "integer" },
        { "field": "votesEnd", "label": "2022", "align": "right", "format": "integer" },
        { "field": "deltaCandidate", "label": "Saldo Búrigo", "align": "right", "format": "integer", "highlightDifference": true },
        { "field": "topCompetitor", "label": "Principal Beneficiário", "align": "left", "format": "badge" },
        { "field": "competitorGain", "label": "Salto do Concorrente", "align": "right", "format": "integer" }
      ],
      "rows": [
        {
          "section": "Z.169 Seção 0012",
          "neighborhood": "Centro / Col. Carmo",
          "votesStart": 115,
          "votesEnd": 80,
          "deltaCandidate": -35,
          "topCompetitor": "Guilherme Pasin",
          "competitorGain": 48
        },
        {
          "section": "Z.016 Seção 0045",
          "neighborhood": "São Pelegrino",
          "votesStart": 98,
          "votesEnd": 72,
          "deltaCandidate": -26,
          "topCompetitor": "Pepe Vargas",
          "competitorGain": 32
        }
      ]
    },
    {
      "type": "hypothesis_evaluation",
      "hypothesisTested": "A retração decorreu do aumento da abstenção ou de votos nulos em Caxias do Sul",
      "status": "refuted",
      "evidenceSummary": "O total de votos válidos de Caxias do Sul aumentou de 229.412 em 2018 para 243.890 em 2022 (+6,3%). A perda do candidato foi de participação política (market share de 10,08% para 8,70%), descartando evasão de comparecimento.",
      "formalProofData": {
        "validVotes2018": 229412,
        "validVotes2022": 243890,
        "validVotesChangePct": 6.31,
        "candidateShare2018": 10.08,
        "candidateShare2022": 8.70
      }
    }
  ],
  "followUpSuggestions": [
    {
      "promptText": "Como foi a recuperação no pleito de 2026 em Caxias do Sul?",
      "intentId": "territory.municipality_recovery_2026",
      "contextOverrides": { "municipalityId": "caxias_do_sul", "startYear": 2022, "endYear": 2026 }
    },
    {
      "promptText": "Quais seções registraram crescimento de votos mesmo em 2022?",
      "intentId": "microterritory.resilient_sections",
      "contextOverrides": { "municipalityId": "caxias_do_sul" }
    }
  ],
  "evidence": {
    "id": "ev-proof-caxias-2022",
    "sourceDataset": "TSE - votacao_secao_2022_RS.zip / votacao_secao_2018_RS.zip",
    "datasetReleaseDate": "06/10/2022",
    "electoralScope": {
      "startYear": 2018,
      "endYear": 2022,
      "state": "RS",
      "office": "Deputado Estadual",
      "round": 1,
      "targetCandidateId": "carlos_burigo",
      "targetMunicipalityId": "caxias_do_sul"
    },
    "methodReference": {
      "methodId": "calc_section_dispute_flow_v1",
      "specificationDocument": "docs/knowledge/FASE-9-PESQUISA-METODOS-E-REFERENCIAS.md",
      "formulaApplied": "mainCandidateDiff = votes2022 - votes2018; competitorDiff = compVotes2022 - compVotes2018"
    },
    "epistemologicalNotice": "A análise microterritorial correlaciona variações simultâneas na mesma urna de votação. Não constitui inferência individual de voto sob sigilo constitucional, mas sim balanço estritamente agregado dos resultados da urna."
  }
}
```
