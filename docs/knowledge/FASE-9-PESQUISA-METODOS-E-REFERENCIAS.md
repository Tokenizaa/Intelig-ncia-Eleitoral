# Fase 9 — Pesquisa Metodológica e Referências de Inteligência Eleitoral
**Documento Canônico de Métodos, Referências e Epistemologia Eleitoral**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Métodos quantitativos, estatística descritiva e territorial, dinâmica competitiva e referências institucionais para a plataforma de Inteligência Eleitoral.

---

## 1. Introdução e Propósito

Este documento consolida a pesquisa aprofundada sobre como consultorias de estratégia política, institutos de pesquisa de opinião, laboratórios de ciência política e redações líderes em jornalismo de dados coletam, tratam, analisam, modelam e apresentam dados eleitorais.

### O Princípio Epistemológico Fundamental
A plataforma de Inteligência Eleitoral opera primordialmente sobre **dados administrativos oficiais do Tribunal Superior Eleitoral (TSE)** — isto é, a contagem censitária, exata e auditada dos votos depositados nas urnas eletrônicas brasileiras.

Existe uma fronteira conceitual intransponível entre:
1. **Dados Eleitorais Administrativos (TSE):** Censo exato de votos válidos, brancos, nulos e abstenções, registrados por seção eleitoral, zona, município e estado. Não contêm margem de erro amostral, não possuem intervalo de confiança estatístico baseado em amostragem probabilística e refletem o comportamento observado de 100% dos votantes contabilizados.
2. **Pesquisas de Opinião e Intenção de Voto (Surveys / Polls):** Amostragens probabilísticas ou por cotas da população de eleitores em um momento específico do tempo, sujeitas a erro amostral ($n \approx 1.000$ a $2.500$), viés de seleção, taxa de não resposta, efeitos de formulação de perguntas e ponderações pós-estratificação (ex: Datafolha, Quaest, Ipec).

**Regra Absoluta do Motor Analítico:** A plataforma nunca atribuirá margem de erro amostral, nível de confiança de pesquisa ou intervalo estocástico a contagens oficiais de urna do TSE. Quando modelos inferenciais, ecológicos ou preditivos forem empregados sobre os dados censitários, suas incertezas serão reportadas como incertezas de modelo/especificação, jamais como erro de amostragem amostral.

---

## 2. Frente A — Referências Institucionais e Profissionais

Foram investigadas nove referências emblemáticas do ecossistema político-eleitoral e de visualização estatística:

### 2.1 CESOP / Unicamp (Centro de Estudos de Opinião Pública)
* **Tipo:** Centro acadêmico de excelência em ciência política e dados eleitorais (Unicamp, Campinas/SP).
* **Problema Analítico:** Preservação histórica, padronização e disponibilização de séries temporais de resultados eleitorais e pesquisas de opinião pública desde a redemocratização (DADOS/CESOP).
* **Fontes Utilizadas:** Dados oficiais do TSE, repositórios históricos regionais (TREs) e pesquisas eleitorais registradas.
* **Métodos Analíticos:** Agregações longitudinais, cálculo de volatilidade eleitoral (Índice de Pedersen), fragmentação partidária (Número Efetivo de Partidos de Laakso-Taagepera) e correspondência cartográfica de distritos.
* **Visualizações e Apresentação:** Tabelas analíticas densas, séries temporais em gráficos de linhas, livros de dados e cadernos de pesquisa (periódico *Opinião Pública*).
* **Práticas de Transparência:** Dicionários de variáveis exaustivos, menção explícita ao tratamento de coligações e registros de retotalização.
* **Elementos a Adaptar:** A metodologia de harmonização de mudanças de nomes de siglas partidárias e fusões/federações intertemporais.
* **Limitações:** Foco histórico e acadêmico; não entrega interfaces em tempo real ou ferramentas de tomada de decisão estratégica de campanha de alta velocidade.

### 2.2 Tribunal Superior Eleitoral (TSE) — Estatísticas e Dados Abertos
* **Tipo:** Órgão judiciário constitucional responsável pela administração, contagem e proclamação eleitoral no Brasil.
* **Problema Analítico:** Prestação de contas oficial, transparência pública e divulgação do resultado da apuração e prestações de contas de campanha.
* **Fontes Utilizadas:** Sistemas de Votação e Apuração (SISTOT, Gerenciador de Totalização), Cadastro Nacional de Eleitores e Registros de Candidatura (CandContas).
* **Métodos Analíticos:** Cálculo de quociente eleitoral (QE), quociente partidário (QP), distribuição de sobras eleitorais (art. 109 do Código Eleitoral e alterações legislativas de 2021/2024), classificação legal de votos válidos, anulados *sub judice*, nulos e brancos.
* **Visualizações:** Painéis BI (DivulgaCandContas, Resultados), tabelas simples de apuração, mapas estáticos de apuração por município.
* **Práticas de Transparência:** Divulgação completa dos microdados e arquivos brutos (`votacao_secao`, `votacao_candidato_munzona`, `perfil_eleitorado`, boletins de urna - BU) com layouts detalhados em PDF/ODS.
* **Elementos a Adaptar:** A fidelidade matemática às fórmulas legais de totalização proporcional e os layouts de boletins de urna.
* **Limitações:** A interface oficial do TSE é descritiva da eleição corrente; não oferece ferramentas de diagnóstico estratégico de perda de votos entre pleitos, análise competitiva de transferências ou espacialização com inteligência preditiva.

### 2.3 Datafolha / Ipec / Quaest (Institutos Profissionais de Pesquisa de Opinião)
* **Tipo:** Institutos comerciais/científicos de pesquisa de mercado e opinião pública.
* **Problema Analítico:** Estimar intenções de voto espontânea e estimulada, rejeição, avaliação de governos e expectativas eleitorais durante o período pré e intra-campanha.
* **Fontes Utilizadas:** Amostragens face-a-face ou telefônicas com eleitores aptos, ponderadas por variáveis do Censo IBGE e TSE (sexo, idade, escolaridade, renda, região).
* **Métodos Analíticos:** Amostragem probabilística estratificada com seleção por conglomerados ou cotas proporcionais; modelos de pós-estratificação (MRP na Quaest); testes de significância entre rodadas e análise de cruzamento (*crosstabs*).
* **Visualizações:** Gráficos de barras horizontais com margem de erro indicada visualmente, séries temporais de linha com áreas sombreadas de intervalo de confiança ($95\%$), matrizes de transferência hipotética de segundo turno.
* **Práticas de Transparência:** Registro obrigatório no sistema PesqEle do TSE com relatório metodológico, intervalo de confiança, contratante e questionário completo.
* **Elementos a Adaptar:** O modelo de clareza na apresentação de margens competitivas e relatórios executivos compactos de leitura imediata.
* **Limitações:** Suas métricas são probabilidades amostrais; **não se aplicam diretamente ao dado de urna**. A Inteligência Eleitoral analisa o comportamento já consumado na urna, não a opinião prévia coletada por questionário.

### 2.4 Pew Research Center (Washington, DC)
* **Tipo:** *Think tank* independente e centro de pesquisa social factual sem fins lucrativos.
* **Problema Analítico:** Compreensão profunda de tendências demográficas, atitudes cívicas e padrões de polarização ao longo de décadas.
* **Fontes Utilizadas:** Dados de votação oficiais federais/estaduais, American Community Survey (US Census Bureau) e pesquisas próprias em painel probabilístico (*American Trends Panel*).
* **Métodos Analíticos:** Análise de coorte longitudinal, decomposição demográfica de eleitorados, modelos de regressão logística para determinantes do voto.
* **Visualizações:** *Slope charts* para comparar dois períodos, gráficos de pontos (*dot plots*) para contrastar subgrupos sem poluição visual, paletas sóbrias com contraste elevado, anotações de dados ricas diretamente na linha (*direct labeling*).
* **Práticas de Transparência:** Política estrita de neutralidade metodológica, publicação de datasets completos e cadernos de perguntas (*toplines*).
* **Elementos a Adaptar:** A disciplina de *direct labeling* (rótulos nos próprios dados em vez de legendas distantes) e a sobriedade na redação analítica ("O que os dados mostram" vs "O que não podemos concluir").

### 2.5 Financial Times Visual Journalism & John Burn-Murdoch
* **Tipo:** Equipe de jornalismo de dados e estatística visual do *Financial Times* (Londres).
* **Problema Analítico:** Comunicar fenômenos complexos, dinâmicas de votação e mudanças socioeconômicas para líderes de decisão com altíssimo rigor visual e cognitivo.
* **Fontes Utilizadas:** Dados de resultados de apurações nacionais, censos oficiais e bases econômicas globais.
* **Métodos Analíticos:** Normalizações padronizadas por habitante/eleitor, modelos de *swing* eleitoral (balanço de votos entre dois partidos/blocos), cartogramas de hexágonos/blocos demográficos para eliminar a distorção geográfica territorial.
* **Visualizações:** Cartogramas hexagonais de áreas iguais (*equal-area tile maps*), gráficos de dispersão conectados (*connected scatter plots*) para trajetórias temporais bidimensionais, gráficos de barras divergentes para ganhos/perdas.
* **Práticas de Transparência:** Metodologia descrita em notas de rodapé de cada gráfico, repositórios públicos em GitHub com scripts de geração e dados tratados.
* **Elementos a Adaptar:** O rigor na escolha da escala, o uso de subtítulos analíticos ("lead with the finding") e a rejeição expressa de gráficos decorativos vazios.

### 2.6 Our World in Data (Global Change Data Lab / Universidade de Oxford)
* **Tipo:** Plataforma científica de pesquisa e visualização de dados de desenvolvimento humano e governança.
* **Problema Analítico:** Apresentação comparável e duradoura de séries estatísticas globais e indicadores de democracia (como V-Dem).
* **Fontes Utilizadas:** Organismos internacionais (ONU, Banco Mundial), institutos acadêmicos e registros administrativos.
* **Métodos Analíticos:** Padronização de séries históricas, tratamento uniforme de valores ausentes (N/D), cálculos de taxas e índices compostos.
* **Visualizações:** Sistema unificado de *Chart / Map / Table / Sources* (o mesmo dado pode ser inspecionado como mapa coroplético, série de linha ou tabela detalhada com alternância imediata em um clique).
* **Práticas de Transparência:** Todas as fontes documentadas com DOI, URL, metodologia de coleta e licença aberta; código aberto no GitHub.
* **Elementos a Adaptar:** A alternância multimodal instantânea entre Gráfico, Mapa, Tabela e Ficha de Fontes para qualquer indicador exibido na plataforma.

### 2.7 Datawrapper & Lisa Charlotte Muth (Academy)
* **Tipo:** Ferramenta e laboratório de engenharia e boas práticas de visualização de dados para publicação profissional.
* **Problema Analítico:** Garantir que repórteres e analistas gerem gráficos acessíveis, responsivos e estatisticamente corretos sem erros de formatação.
* **Fontes Utilizadas:** Dados tabulares arbitrários de governos, censos e instituições de pesquisa.
* **Métodos Analíticos:** Algoritmos de quebra de classes cartográficas (Jenks, quantis, escala contínua com ancoragem no zero), ordenação automática de categorias por magnitude.
* **Visualizações:** Barras horizontais ordenadas com barras de valor absoluto vs percentual, tabelas interativas com micrográficos embutidos (*sparklines* e barras de progresso na própria célula).
* **Práticas de Transparência:** Guias públicos de anatomia do gráfico, regras de paletas para daltônicos (testadas contra deuteranopia, protanopia e tritanopia).
* **Elementos a Adaptar:** O design de tabelas analíticas ricas que combinam o número exato formatado com uma representação gráfica proporcional na mesma linha.

### 2.8 UK Electoral Commission (Comissão Eleitoral Britânica)
* **Tipo:** Órgão regulador eleitoral independente do Reino Unido.
* **Problema Analítico:** Fiscalização de gastos de campanha, auditoria de integridade da contagem e relato de participação eleitoral (*turnout*).
* **Fontes Utilizadas:** Contagens de circunscrições eleitorais (*constituencies* e *wards*), declarações de despesas de partidos e candidatos.
* **Métodos Analíticos:** Índices de participação sobre eleitorado registrado vs eleitorado votante, proporções de votos postais vs presenciais, métricas de eficiência de gastos (custo por voto conquistado).
* **Visualizações:** Relatórios formais paginados com resumos executivos em duas páginas, tabelas com códigos oficiais de circunscrição (ONS codes), mapas com limites exatos de jurisdição.
* **Práticas de Transparência:** Separação rígida entre fatos consolidados e investigações em andamento; notas técnicas anexas a cada documento.
* **Elementos a Adaptar:** O formato de relatórios executivos auditáveis para prestação de contas interna de gabinetes e partidos.

### 2.9 AAPOR (American Association for Public Opinion Research)
* **Tipo:** Associação científica e profissional de referência internacional em padrões metodológicos para pesquisa eleitoral e social.
* **Problema Analítico:** Estabelecer padrões éticos e técnicos para cálculo de taxas de resposta, transparência de amostras e combate à desinformação metodológica.
* **Fontes Utilizadas:** Normas industriais, códigos de prática profissional (*Code of Professional Ethics and Practices*).
* **Métodos Analíticos:** Fórmulas padronizadas para taxa de cooperação, taxa de contato, taxa de recusa e taxa de resposta (RR1 a RR6).
* **Práticas de Transparência:** Exigência de declaração formal de: tamanho da amostra, universo populacional, método de contato, taxa de resposta calculada, intervalo de incerteza e entidade financiadora.
* **Elementos a Adaptar:** A lista de itens obrigatórios que devem acompanhar qualquer nota analítica (o contrato de transparência metodológica da nossa Fase 1).

---

## 3. Frente B — Métodos Científicos e Estatísticos de Análise Eleitoral

Abaixo detalham-se os métodos organizados por finalidade, com suas formulações exatas, denominadores e limitações operacionais.

### 3.1 Estatística Descritiva Eleitoral

#### Contagens e Agregações Básicas
* **Voto Nominal ($V_{i,m,t}$):** Votos contabilizados especificamente para o candidato $i$ no município $m$ na eleição $t$.
* **Total de Votos Nominais do Candidato ($V_{i,t}$):**
  $$V_{i,t} = \sum_{m \in M} V_{i,m,t}$$
* **Total de Votos Válidos do Município ($VV_{m,t}$):** Votos atribuídos a todos os candidatos nominais concorrentes somados aos votos de legenda partidária válidos.
  $$VV_{m,t} = \sum_{j \in C} V_{j,m,t} + \text{VotosLegenda}_{m,t}$$
* **Total de Votos Válidos do Estado ($VV_{\text{UF},t}$):**
  $$VV_{\text{UF},t} = \sum_{m \in M} VV_{m,t}$$

#### Medidas de Tendência Central e Dispersão Territorial
* **Média de Votos por Município ($\bar{V}_i$):**
  $$\bar{V}_i = \frac{1}{|M|} \sum_{m \in M} V_{i,m}$$
  *Ressalva:* No RS com 497 municípios, a distribuição de votos é assimetricamente positiva extrema (distribuição com cauda longa à direita: muitos municípios com poucos votos e polo metropolitano com dezenas de milhares). A média é fortemente distorcida por Caxias do Sul e Porto Alegre.
* **Mediana de Votos ($\tilde{V}_i$):** O valor central do ordenamento dos votos nos municípios onde o candidato pontuou. Reflete muito mais fielmente o "município típico" da campanha do que a média.
* **Desvio Absoluto Mediano (MAD - *Median Absolute Deviation*):**
  $$\text{MAD} = \text{mediana}(|V_{i,m} - \tilde{V}_i|)$$
  Métrica robusta de dispersão que não se deixa influenciar pelos valores discrepantes dos grandes colégios eleitorais.
* **Intervalo Interquartil (IQR):** $Q_3 - Q_1$, indicando a dispersão dos $50\%$ municípios centrais da base.

---

### 3.2 Métodos de Comparação Eleitoral e Variação Intertemporal

#### Variação Absoluta ($\Delta V$)
$$\Delta V_{i,m} = V_{i,m,t_2} - V_{i,m,t_1}$$
Representa o ganho ou perda física de eleitores na urna. Essencial para contabilidade de campanha (ex: "perdemos 1.890 votos em Caxias do Sul").

#### Variação Percentual Relativa ($\% \Delta$)
$$\% \Delta_{i,m} = \left( \frac{V_{i,m,t_2} - V_{i,m,t_1}}{V_{i,m,t_1}} \right) \times 100$$
*Regra de Proteção contra Denominador Zero:*
* Se $V_{i,m,t_1} = 0$ e $V_{i,m,t_2} > 0$: A variação percentual é **matematicamente indefinida** (divisão por zero). A plataforma reportará `N/D` (*Não Definido*) com a nota: *"Candidato sem votação no pleito inicial; crescimento absoluto de $+V_{i,m,t_2}$ votos"*.
* Nunca imputar $100\%$ ou valores arbitrários quando o ponto de partida for zero.

#### Participação Percentual nos Votos Válidos Locais (*Local Vote Share* - $s_{i,m}$)
$$s_{i,m,t} = \left( \frac{V_{i,m,t}}{VV_{m,t}} \right) \times 100$$
Mede o peso do candidato dentro da disputa política daquele município específico (ex: $8,7\%$ dos votos válidos de Caxias do Sul).

#### Participação Percentual no Voto Estadual do Candidato (*Internal Share* - $p_{i,m}$)
$$p_{i,m,t} = \left( \frac{V_{i,m,t}}{V_{i,t}} \right) \times 100$$
Mede a dependência do candidato em relação àquele município (ex: $63,2\%$ de todos os votos de Carlos Búrigo vieram de Caxias do Sul). A soma de $p_{i,m}$ sobre todos os municípios do estado totaliza exatamente $100\%$.

#### Variação em Pontos Percentuais ($\text{p.p.}$)
$$\Delta \text{p.p.}_{i,m} = s_{i,m,t_2} - s_{i,m,t_1}$$
Diferença direta entre duas proporções percentuais.
*Exemplo Fundamental:* Se o candidato tinha $10\%$ dos votos válidos em 2018 e passa a ter $8\%$ em 2022:
* A variação em pontos percentuais é de **$-2,0\text{ p.p.}$**
* A variação percentual relativa de sua fatia é de **$-20,0\%$**
A plataforma nunca confundirá `%` com `p.p.`, pois tal confusão induz a erros graves de diagnóstico político.

---

### 3.3 Análise Territorial e Especialização Espacial

#### Quociente de Localização Eleitoral ($QL_{i,m}$)
Adaptado da economia regional (análise de concentração industrial e insumo-produto de Walter Isard), o Quociente de Localização Eleitoral compara a densidade de votos de um candidato em um município com sua densidade média no estado inteiro:

$$QL_{i,m,t} = \frac{s_{i,m,t}}{s_{i,\text{UF},t}} = \frac{V_{i,m,t} / VV_{m,t}}{V_{i,\text{UF},t} / VV_{\text{UF},t}}$$

**Interpretação Canônica do QL:**
* **$QL > 1,0$:** O candidato está **sobrerrepresentado** no município. Sua fatia eleitoral naquele território é superior à sua média estadual.
* **$QL > 2,0$:** **Bastião Eleitoral.** O candidato tem mais que o dobro de penetração relativa no município do que no conjunto do estado.
* **$QL \approx 1,0$:** O candidato tem penetração neutra (proporcional à sua média estadual).
* **$QL < 1,0$:** O candidato está **sub-representado** naquele território (zona de baixa penetração relativa).

*Vantagem Analítica:* O $QL$ permite identificar municípios pequenos onde o candidato possui uma votação proporcionalmente estrondosa (ex: Flores da Cunha ou São Marcos), o que seria ocultado se olhássemos apenas para o ranking de votos brutos absolutos (que é sempre dominado pelas maiores cidades populacionais).

#### Cobertura Territorial Efetiva
Número e porcentagem de municípios onde o candidato obteve votação acima de limiares objetivos:
* Municípios com $V \ge 1$: Presença nominal mínima.
* Municípios com $V \ge 100$: Presença operacional relevante.
* Municípios com $V \ge 1.000$: Polos eleitorais estruturados.
* Proporção sobre os 497 municípios do Rio Grande do Sul:
  $$\text{Cobertura} = \frac{|\{m \in M \mid V_{i,m} \ge \text{Limiar}\}|}{497} \times 100$$

---

### 3.4 Concentração e Competição Política

#### Índice de Herfindahl-Hirschman Espacial ($HHI_{\text{espacial}}$)
Mede o grau de concentração geográfica da votação de um candidato em poucos municípios:

$$HHI_i = \sum_{m \in M} \left( p_{i,m} \right)^2 \quad \text{onde } p_{i,m} \in [0, 100]$$

* **$HHI > 2.500$:** **Votação Altamente Concentrada.** O candidato depende de um enclave ou reduto territorial estreito (caso típico de deputados de base municipal forte, como Caxias do Sul). Risco de vulnerabilidade política a concorrentes locais.
* **$1.500 \le HHI \le 2.500$:** **Concentração Moderada.**
* **$HHI < 1.500$:** **Votação Dispersa / Difusa.** O candidato tem votos espalhados de forma homogênea por várias regiões (perfil de lideranças estaduais temáticas, corporativas, religiosas ou de opinião).

#### Coeficiente de Gini Espacial
Calculado sobre a curva de Lorenz territorial acumulada dos votos do candidato versus o número acumulado de municípios ordenados por votação:
$$G = \frac{\sum_{j=1}^n \sum_{k=1}^n |V_{i,j} - V_{i,k}|}{2 n^2 \bar{V}_i}$$
Varia de $0$ (votos perfeitamente distribuídos entre todos os municípios de forma idêntica) a $1$ (todos os votos do candidato vieram de um único município).

#### Número Efetivo de Candidatos Competidores ($N_v$ - Laakso-Taagepera)
Mede a fragmentação da disputa na urna em um município ou seção:
$$N_{v,m} = \frac{1}{\sum_{j \in C} \left( \frac{V_{j,m}}{VV_m} \right)^2}$$
Indica quantos candidatos de fato dividem os votos da localidade. Se $N_v = 2,1$, a eleição é polarizada entre dois nomes; se $N_v = 8,4$, a votação é hiperfragmentada, permitindo que fatias pequenas garantam liderança local.

#### Volatilidade Eleitoral Territorial (Índice de Pedersen)
Mede a renovação ou mudança líquida de fatias eleitorais entre dois pleitos consecutivos:
$$\text{Volatilidade} = \frac{1}{2} \sum_{j \in C} |s_{j,m,t_2} - s_{j,m,t_1}|$$
Varia de $0\%$ (nenhum partido/candidato mudou de participação) a $100\%$ (transferência total de todos os votos para concorrentes distintos).

---

### 3.5 Métodos Longitudinais para Três Pleitos (2018 · 2022 · 2026)

A análise tripla permite classificar a trajetória territorial de cada município em categorias dinâmicas verificáveis:

| Padrão Longitundinal | Comportamento 2018→2022 | Comportamento 2022→2026 | Significado Político |
| :--- | :--- | :--- | :--- |
| **Crescimento Sustentado** | $\Delta V > 0$ | $\Delta V > 0$ | Base em expansão contínua e fidelização. |
| **Recuperação Plena** | $\Delta V < 0$ | $\Delta V > 0$ e $V_{2026} > V_{2018}$ | Superação de desgaste conjuntural de 2022. |
| **Recuperação Parcial** | $\Delta V < 0$ | $\Delta V > 0$ e $V_{2026} \le V_{2018}$ | Reação positiva, sem atingir pico histórico. |
| **Erosão Agravada** | $\Delta V < 0$ | $\Delta V < 0$ | Declínio contínuo; desestruturação da base local. |
| **Reversão Negativa** | $\Delta V > 0$ | $\Delta V < 0$ | Ganho efêmero em 2022 seguido de perda em 2026. |
| **Estabilidade Dinâmica** | $|\% \Delta| \le 5\%$ | $|\% \Delta| \le 5\%$ | Eleitorado cativo inalterado. |

---

### 3.6 Estatística Inferencial vs Censo da Urna: As Fronteiras Científicas

| Dimensão | Censo da Urna (TSE) | Pesquisa Amostral (Surveys) | Modelagem Inferencial Ecológica |
| :--- | :--- | :--- | :--- |
| **Natureza** | Fato administrativo censitário | Amostra probabilística de opiniões | Modelo estatístico sobre agregados |
| **Universo** | $100\%$ das seções transmitidas | Amostra ($n \approx 1.000$ a $2.500$) | Unidades espaciais agregadas |
| **Margem de Erro** | **Não existe** ($\pm 0,0\%$) | Existe ($\pm 2\text{ a }3\text{ p.p.}$) | Erro de estimação de parâmetros |
| **Incerteza** | Apenas jurídica/retotalização | Erro amostral + não resposta | Incerteza do modelo e falácia ecológica |
| **Uso Correto** | Auditoria e diagnóstico real | Fotografia de tendência pré-eleição | Teste de hipóteses explicativas |

#### A Falácia Ecológica de Robinson (1950)
Um erro metodológico gravíssimo na ciência política é assumir que relações observadas no agregado municipal se aplicam ao indivíduo eleitor.
*Exemplo:* Observar que municípios com maior renda média tiveram maior crescimento de votos para o candidato **não autoriza** dizer que "os eleitores ricos votaram no candidato". A correlação ecológica entre médias municipais não prova correlação ao nível individual sem modelagem de inferência ecológica (ex: método de King / EI).

---

## 4. Conclusão Metodológica

A plataforma de Inteligência Eleitoral fundamenta sua autoridade na separação irrestrita entre:
1. **Fatos Oficiais:** Contagens de votos extraídas de arquivos primários do TSE.
2. **Indicadores Determinísticos:** Métricas calculadas por fórmulas matemáticas com denominadores auditáveis ($QL$, $HHI$, $N_v$, $\Delta V$, $\Delta \text{p.p.}$, taxas de cobertura).
3. **Interpretação Científica:** Sínteses descritivas e diagnósticos situados, sempre acompanhados de suas limitações formais.
