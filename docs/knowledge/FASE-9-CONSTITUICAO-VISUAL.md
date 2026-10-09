# Fase 9 — Constituição Visual e Cartográfica da Inteligência Eleitoral
**Diretrizes de Visualização de Dados, Gramática Gráfica e Cartografia Política**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Padrões visuais, cartográficos, tipográficos e de acessibilidade para dashboards, relatórios e componentes analíticos.

---

## 1. Princípios Fundamentais do Design de Dados

A visualização de dados na Inteligência Eleitoral segue três leis inegociáveis:

1. **A Verdade Estatística Prevalece sobre a Estética:** Nenhuma escolha de layout, cor ou proporção pode distorcer a grandeza matemática dos dados eleitorais.
2. **Eficiência Cognitiva (Tufte & Few):** Maximizar a razão *data-ink* (tinta dedicada ao dado vs tinta de enfeite decorativo). Eliminar ruídos visuais, efeitos 3D, gradientes oclusivos, bordas pesadas e sombras artificiais.
3. **Contextualização com Rótulo Direto (*Direct Labeling*):** Priorizar a anotação do valor diretamente na barra, linha ou ponto em vez de forçar o usuário a percorrer um eixo distante ou decifrar legendas desconexas.

---

## 2. Matriz Sistemática: Pergunta → Dado → Visualização

| Pergunta Analítica | Tipo de Dado | Unidade de Análise | Visualização Indicada | Erros Críticos a Evitar | Quando Preferir Tabela |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Quais municípios deram mais votos ao candidato?** | Quantitativo discreto ($V_{i,m}$) | Município | **Gráfico de Barras Horizontais** ordenado por valor decrescente | Nunca usar barras verticais para rótulos longos de cidades (força inclinação de texto a $45^\circ$). Nunca truncar o eixo zero das barras. | Quando houver mais de 20 municípios ou quando for imperativo ler o valor exato, ranking e percentual simultaneamente. |
| **Como a votação evoluiu entre 2018, 2022 e 2026?** | Série temporal ordenada ($t_1, t_2, t_3$) | Eleição / Pleito | **Gráfico de Linha com Pontos** ou **Slope Chart** | Não interpolar linhas contínuas entre pleitos como se houvesse dados contínuos ano a ano (eleições ocorrem a cada 4 anos). Marcar os nós temporais claramente. | Quando forem comparados mais de 5 candidatos simultaneamente no mesmo município. |
| **Onde o candidato cresceu e onde perdeu votos?** | Saldo numérico ($\Delta V$ ou $\Delta \text{p.p.}$) com valores negativos e positivos | Município ou Zona | **Gráfico de Barras Divergentes** ancorado no marco zero central | Nunca usar escalas sequenciais (ex: só tons de verde). A transição de sinal exige paleta divergente com ponto neutro no zero. | Quando a variação percentual incluir denominadores nulos (`N/D`) que distorceriam as barras relativas. |
| **Qual a relação entre o tamanho do eleitorado e o percentual de votos conquistados?** | Duas variáveis contínuas ($VV_m$ vs $s_{i,m}$) | Município | **Gráfico de Dispersão (Scatter Plot)** com quadrantes médios | Não usar escala linear simples para o eixo X de eleitorado caso a assimetria metropolitana seja extrema (usar escala logarítmica ou truncamento com quebra documentada). | Quando o objetivo for consultar uma cidade individual e não observar o padrão de dispersão geral. |
| **Como os votos do candidato estão distribuídos pelo território?** | Proporções geográficas ($s_{i,m}$ ou $QL_{i,m}$) | Malha municipal ou RGI | **Mapa Coroplético** com quebras por Jenks ou Quantis | Nunca pintar área municipal com base em votos nominais absolutos sem ponderação demográfica ("terra não vota"). | Quando for necessário ordenar alfabeticamente ou classificar por ranking os municípios. |
| **Onde estão concentrados os eleitores do candidato no mapa?** | Contagem absoluta de votos ($V_{i,m}$) | Município / Seção | **Mapa de Símbolos Proporcionais (Círculos Graduados)** | Não usar círculos com raio proporcional ao valor (o olho percebe a **área**, logo a área do círculo deve ser proporcional ao valor: $r \propto \sqrt{V}$). | Sempre que a lista completa com os 497 municípios for o foco da auditoria. |
| **A votação do candidato é concentrada em poucos redutos ou dispersa?** | Fatias percentuais acumuladas | Município ordenado | **Curva de Lorenz Territorial** comparada com a diagonal de igualdade | Não omitir o índice de concentração correspondente (Gini ou HHI). | Quando se desejar ler o Top 5 / Top 10 nominal de cidades. |

---

## 3. Diretrizes Detalhadas por Tipologia de Gráfico

### 3.1 Gráficos de Barras Horizontais para Rankings
* **Regra de Eixo Zero:** O eixo horizontal **deve obrigatoriamente iniciar em zero**. Truncar o eixo de barras viola a proporcionalidade entre a área visual e o valor numérico.
* **Ordenação:** Sempre ordenar as barras pelo valor da métrica (maior para menor ou menor para maior), jamais em ordem alfabética aleatória.
* **Rótulos e Valores:** Inserir o nome da cidade alinhado à esquerda e o número formatado diretamente na ponta da barra ou alinhado à direita da célula.

### 3.2 Gráficos Longitudinais para Três Eleições (2018 · 2022 · 2026)
* **Estrutura Temporal:** Representar os três marcos históricos como vértices destacados com marcadores circulares.
* **Espaçamento de Eixo:** Como o intervalo entre 2018, 2022 e 2026 é homogêneo (4 anos cada ciclo), o espaçamento horizontal deve ser rigorosamente equidistante.
* **Tratamento de Mudança de Regra:** Inserir linha vertical tracejada ou anotação textual indicando mudanças institucionais relevantes (ex: *Fim das coligações proporcionais em 2020/2022*).

### 3.3 Gráficos de Pontos (*Cleveland Dot Plots*)
* **Uso Ideal:** Comparar a posição de múltiplos municípios em dois pleitos distintos ($2018 \to 2022$ ou $2022 \to 2026$) na mesma linha horizontal.
* **Construção:** Um segmento cinza fino conecta o ponto do ano inicial ao ponto do ano final, com cores distintas para cada ano (ex: cinza neutro para 2018, esmeralda escuro para 2022/2026). Permite identificar instantaneamente direção e magnitude sem a sobrecarga visual de pares de barras adjacentes.

### 3.4 Tabelas Analíticas de Alta Densidade (O Padrão Ouro da Consulta)
* **Alinhamento Numérico:** Todos os números, percentuais e datas devem ser alinhados à direita com tipografia monoespaçada (`JetBrains Mono` ou `font-mono`).
* **Alinhamento Textual:** Nomes de municípios, categorias e partidos alinhados à esquerda.
* **Microvisualizações Embutidas (*In-cell Bars*):** Utilizar barras de progresso sutis dentro da coluna de participação percentual para permitir escaneamento visual instantâneo sem abrir mão do número exato.
* **Tratamento de Dados Indefinidos:** Representar ausência com o termo formal `N/D` em fonte destacada e neutra, acompanhado de tooltip explicativo.

---

## 4. Frente D — Cartografia e Mapas Eleitorais Profissionais

### 4.1 A Ilusão Cartográfica Fundamental: Votos vs Território
O maior perigo na comunicação cartográfica eleitoral é o fenômeno conhecido como **"Terra não vota, pessoas votam"**:
* Municípios territorialmente gigantescos (como Alegrete ou Santana do Livramento no RS) ocupam uma mancha visual imensa no mapa, mas podem possuir muito menos eleitores que um município territorialmente diminuto como Esteio ou Caxias do Sul.
* **Regra de Ouro Cartográfica:**
  1. **Para Votos Absolutos:** Utilizar prioritariamente **Mapa de Símbolos Proporcionais** (círculos graduados posicionados no centroide do município, onde a área do círculo reflete o número exato de votos).
  2. **Para Participação Relativa (% dos votos válidos) ou Quociente de Localização ($QL$):** Utilizar **Mapa Coroplético** (coloração do polígono municipal), pois a taxa independe da extensão territorial física.

### 4.2 Métodos de Quebra de Classes Coropléticas (Classificação Estatística)
A escolha do algoritmo de corte de intervalos altera drasticamente a percepção visual do mapa:

| Método de Quebra | Como Funciona | Quando Utilizar | Quando Não Utilizar |
| :--- | :--- | :--- | :--- |
| **Quebras Naturais (Jenks)** | Algoritmo de otimização que minimiza a variância interna de cada classe e maximiza a variância entre classes diferentes. | **Padrão recomendado para dados eleitorais assimétricos.** Identifica agrupamentos naturais dos votos. | Quando for necessário comparar múltiplos mapas lado a lado com a mesma legenda fixa. |
| **Quantis (Quantiles)** | Divide o número de municípios igualmente entre as classes (ex: 5 classes com exatamente $20\%$ dos municípios cada). | Para destacar a distribuição relativa e rankings (os $20\%$ melhores, os $20\%$ piores). | Cria falsa ilusão de variação homogênea quando muitos municípios possuem valores idênticos (ex: zero votos). |
| **Intervalos Iguais** | Divide a amplitude total $(\text{Máximo} - \text{Mínimo})$ pelo número de classes. | Para variáveis contínuas com distribuição uniforme conhecida. | **Péssimo para dados eleitorais**, pois os poucos polos gigantescos empurram $95\%$ dos municípios para a primeira classe. |
| **Desvio Padrão** | As classes são formadas em torno da média estadual em intervalos de $\pm 0,5\sigma$ ou $\pm 1\sigma$. | Excelente para mapear desvios em relação à média (compatível com $QL$). | Requer distribuição aproximadamente normal. |

### 4.3 Paletas de Cores Cartográficas e Semântica Visual
* **Paleta Sequencial Monocromática (para volumes positivos de 0 a 100%):**
  * Gradiente esmeralda profissional: `#f0fdf4` (0% a 2%) $\to$ `#bbf7d0` $\to$ `#4ade80` $\to$ `#16a34a` $\to$ `#064e3b` (pico de penetração).
* **Paleta Divergente Bipolar (para saldos $\Delta V$ ou $\Delta \text{p.p.}$):**
  * Valores Negativos (Erosão/Perda): `#991b1b` (vermelho escuro) $\to$ `#f87171` (vermelho claro).
  * Ponto Neutro (Estabilidade): `#f3f4f6` (cinza neutro suave no zero).
  * Valores Positivos (Avanço/Ganho): `#34d399` (verde suave) $\to$ `#064e3b` (esmeralda profundo).
* **Dados Ausentes / Territórios sem Voto:**
  * Polígono preenchido com cinza médio `#e5e7eb` com textura sutil ou contorno tracejado, rotulado como `N/D` na legenda.

### 4.4 Georreferenciamento e Divisões Regionais Oficiais
* **Chave Primária de Junção Cartográfica:** Utilizar estritamente o **Código IBGE de 7 dígitos** como chave oficial de junção geográfica. A base do TSE utiliza códigos municipais próprios de 5 dígitos (código TSE). A plataforma mantém uma tabela de cruzamento (*crosswalk*) imutável e auditada entre Código TSE e Código IBGE.
* **Agregação Regional Canônica:** Utilizar a divisão oficial do IBGE em **Regiões Geográficas Imediatas (RGI)** (instituída em 2017 pelo IBGE, substituindo as antigas microrregiões). O RS possui 32 RGIs oficiais (ex: Região Geográfica Imediata de Caxias do Sul, de Bento Gonçalves, de Porto Alegre).

---

## 5. Padrões de Tipografia, Numerais e Acessibilidade

### 5.1 Formatação Numérica Brasileira (ABNT NBR 5892)
A plataforma segue com rigor as convenções numéricas brasileiras em todas as interfaces, tabelas, gráficos e exportações:
* **Separador de Milhar:** Ponto (`.`). Exemplo: `23.900` votos (e não `23,900`).
* **Separador Decimal:** Vírgula (`,`). Exemplo: `8,7%` de participação (e não `8.7%`).
* **Pontos Percentuais:** Notação explícita `+2,4 p.p.` ou `-1,8 p.p.`.
* **Sinais Operacionais:** Variações positivas acompanhadas de sinal explícito `+` em verde escuro (`+1.850 votos`); variações negativas acompanhadas de sinal `-` em vinho escuro (`-2.410 votos`).

### 5.2 Acessibilidade Visual (WCAG 2.1 Nível AA / AAA)
* **Razão de Contraste Mínima:** Todos os textos essenciais sobre o fundo possuem contraste mínimo de $4,5:1$ (nível AA) e preferencialmente $7:1$ (nível AAA).
* **Sobriedade Funcional:** Proibição de paletas estridentes ou fundos pretos fluorescentes. O ambiente de trabalho analítico utiliza fundos claros (`bg-neutral-50` / `bg-white`) com bordas suaves (`border-neutral-200`) para reduzir a fadiga ocular em sessões prolongadas de trabalho de gabinete.
* **Não Dependência Exclusiva de Cor:** Todo dado que utiliza codificação por cor (ex: verde para alta e vermelho para baixa) deve conter um indicador redundante em texto ou símbolo (ícone de seta $\uparrow / \downarrow$, sinal matemático $+ / -$, ou texto descritivo).
