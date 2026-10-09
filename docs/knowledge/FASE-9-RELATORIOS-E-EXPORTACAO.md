# Fase 9 — Relatórios Executivos e Padrões de Exportação
**Especificação de Relatórios Paginados (PDF), Datasets (CSV/XLSX) e Prova Documental**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Estruturação de relatórios estratégicos para campanhas e gabinetes, regras de paginação, especificações de arquivos e integridade de exportação.

---

## 1. Princípio da Integridade Documental

Um relatório de inteligência eleitoral é um instrumento formal de trabalho político, tomada de decisão de recursos de campanha e prestação de contas.

**Três Regras Invioláveis de Exportação:**
1. **O PDF Não é uma Captura de Tela:** O relatório em PDF é um documento tipográfico paginado e estruturado de forma autônoma, gerado a partir do modelo de dados vetorial, com cabeçalhos de página repetidos, numeração sequencial, notas epistemológicas e sem cortes abruptos de tabelas.
2. **Consistência Numérica Transversal:** O dado exibido na interface interativa, no relatório impresso em PDF e na planilha CSV/Excel exportada deve ser rigorosamente idêntico até a última casa decimal, gerado pelo mesmo snapshot de cálculo.
3. **Todo Dado Exportado Carrega sua Certidão de Origem:** Nenhuma planilha ou documento sai da plataforma sem o bloco de proveniência registrando a eleição, o cargo, o candidato analisado, a data dos arquivos do TSE utilizados e o hash da execução analítica.

---

## 2. Estrutura Canônica do Dossiê Executivo (Relatório PDF de Campanha)

O relatório padrão de diagnóstico municipal ou estadual estrutura-se em **8 seções obrigatórias**:

### Seção 1: Sumário Executivo de Liderança (Página 1)
* **Objetivo:** Fornecer ao candidato, coordenador-geral ou estrategista político a síntese decisória em 3 minutos de leitura.
* **Componentes:**
  * Bloco de Identificação: Nome do Candidato, Cargo, Partido, Pleito ($2018 \to 2022 \to 2026$).
  * Três Cartões de Destaque (KPIs):
    1. Votos Totais no Escopo e Saldo Líquido ($\Delta V$).
    2. Variação Percentual ($\% \Delta$) e Variação em Pontos Percentuais ($\Delta \text{p.p.}$).
    3. Posição no Ranking Oficial e Grau de Dependência Territorial.
  * Síntese Narrativa Executiva (3 parágrafos objetivos sintetizando avanço, retração e principal fator observado).

### Seção 2: Contexto Político e Perguntas Estratégicas
* Descrição do cenário da eleição, número de votantes válidos no estado, quociente eleitoral (QE) e quociente partidário (QP) aplicáveis.
* Enunciação das perguntas investigativas que guiaram o dossiê (ex: *"Onde a base eleitoral sofreu maior pressão competitiva?"*).

### Seção 3: Diagnóstico Histórico Consolidado nos Três Pleitos (2018 · 2022 · 2026)
* Gráfico longitudinal vetorial exibindo a trajetória de votos.
* Tabela comparativa tripla ($2018$, $2022$, $2026$) com decomposição de saldos nominais e taxas de crescimento.
* Classificação da trajetória do território: *Recuperação Plena*, *Crescimento Sustentado*, *Erosão Contínua* ou *Estabilidade*.

### Seção 4: Análise Regional e Territorial (Dimensão IBGE)
* Mapa coroplético de distribuição ou mapa de símbolos proporcionais.
* Agregação pelas **Regiões Geográficas Imediatas (RGI) do IBGE**:
  * Tabela regional com votos absolutos, participação nos válidos regionais e **Quociente de Localização ($QL$)**.
  * Destaque dos municípios classificados como **Bastiões Eleitorais** ($QL > 2,0$).

### Seção 5: Microterritório — Auditoria por Zonas e Seções Eleitorais
* Tabela de alta densidade das seções mais relevantes do colégio eleitoral.
* Identificação dos bairros e escolas onde o candidato obteve os maiores picos de votação e as maiores perdas.
* Tratamento transparente de seções novas ou agregadas com rótulo formal `N/D` (*Não Disponível no Pleito Anterior*).

### Seção 6: Análise Competitiva — "Para Quem Foram os Votos?"
* Identificação dos concorrentes diretos que mais cresceram nas mesmas seções eleitorais onde o candidato recuou.
* Tabela de saldo comparativo direto contra os principais adversários da mesma região geopolítica.

### Seção 7: Ficha Metodológica, Proveniência e Advertências Científicas
* Indicação do dataset oficial do TSE (`votacao_secao`, `votacao_candidato_munzona`), data de publicação e integridade dos arquivos.
* Fórmulas matemáticas aplicadas (fórmula do $QL$, fórmula da variação relativa).
* **Nota Epistemológica Mandatória:** Declaração explícita do que o relatório mede (votos contabilizados em urna) e do que ele **não mede** (não constitui pesquisa de intenção de voto; não viola o sigilo do voto individual; correlações por seção não configuram causalidade individual direta).

### Seção 8: Apêndice Estatístico e Glossário de Termos
* Definição dos termos operacionais (Diferença Absoluta vs Variação Percentual vs Pontos Percentuais).
* Tabela de dados brutos para auditoria interna da assessoria técnica.

---

## 3. Especificação Técnica do Mecanismo de PDF

### 3.1 Paginação e Quebras de Controle
* **Formato de Folha:** A4 vertical ($210\text{ mm} \times 297\text{ mm}$), margens de $15\text{ mm}$ em todos os lados.
* **Controle de Órfãos e Viúvas:** Proibição de títulos isolados no fim da página (`page-break-after: avoid`).
* **Repetição de Cabeçalhos em Tabelas:** Caso uma tabela analítica ultrapasse a altura de uma página, o elemento `thead` deve repetir-se automaticamente no topo da página seguinte, com indicação visual *(continuação)*.
* **Numeração de Página Canônica:** Inserida no rodapé no formato `Página X de Y` (ex: `Página 3 de 8`).

### 3.2 Cabeçalho e Rodapé de Controle Documental
* **Cabeçalho:** Logotipo do cliente/plataforma à esquerda; Título do Dossiê e Identificação do Território ao centro; Data de Geração e Pleito à direita.
* **Rodapé:** Texto de rastreabilidade:  
  `Plataforma de Inteligência Eleitoral · Dados Oficiais TSE · ID de Execução: [hash-curto] · Confidencial`

---

## 4. Padrões de Exportação Tabular: CSV e XLSX

Para permitir que cientistas de dados, jornalistas e assessores aprofundem as análises no R, Python, Stata ou Excel, a plataforma disponibiliza exportações tabulares estritas.

### 4.1 Especificação para Arquivos CSV
* **Codificação:** UTF-8 com BOM (`\uFEFF`) para garantir abertura perfeita com acentuação correta no Microsoft Excel em qualquer sistema operacional brasileiro.
* **Delimitador de Campos:** Ponto e vírgula (`;`), o padrão do Excel configurado para a localidade Brasil (evita que a vírgula decimal confunda a separação de colunas).
* **Separador Decimal:** Vírgula (`,`).
* **Nomes de Colunas:** Formato `snake_case` descritivo e padronizado em minúsculas (sem caracteres especiais ou espaços).

### 4.2 Dicionário Padrão de Colunas do CSV de Desempenho Municipal

| Nome da Coluna | Tipo | Exemplo | Descrição Operacional |
| :--- | :--- | :--- | :--- |
| `codigo_ibge` | Texto (7 dígitos) | `"4305108"` | Código oficial do município no IBGE (sempre preservado como texto para não perder o zero à esquerda). |
| `codigo_tse` | Texto (5 dígitos) | `"85995"` | Código eleitoral do município utilizado nos arquivos brutos do TSE. |
| `municipio_nome` | Texto | `"Caxias do Sul"` | Nome canônico do município conforme tabela oficial do IBGE. |
| `regiao_imediata_ibge` | Texto | `"Caxias do Sul"` | Região Geográfica Imediata do IBGE à qual o município pertence. |
| `votos_candidato_2018` | Inteiro | `23113` | Votos nominais apurados para o candidato em 2018 no município. |
| `votos_candidato_2022` | Inteiro | `21223` | Votos nominais apurados para o candidato em 2022 no município. |
| `votos_candidato_2026` | Inteiro | `23900` | Votos nominais apurados para o candidato em 2026 no município. |
| `saldo_absoluto_ciclo` | Inteiro | `2677` | Variação absoluta entre o ano final e o ano inicial selecionados ($V_{\text{fim}} - V_{\text{início}}$). |
| `variacao_percentual_ciclo` | Decimal ou `N/D` | `12,61` | Variação relativa percentual ($\% \Delta$). Registrado como `N/D` se o ponto inicial for zero. |
| `participacao_validos_inicio` | Decimal | `8,70` | Porcentagem dos votos válidos do município conquistada no ano inicial. |
| `participacao_validos_fim` | Decimal | `10,21` | Porcentagem dos votos válidos do município conquistada no ano final. |
| `variacao_pontos_percentuais` | Decimal | `1,51` | Diferença em pontos percentuais ($\text{Part}_{\text{fim}} - \text{Part}_{\text{início}}$). |
| `quociente_localizacao_fim` | Decimal | `3,12` | Quociente de Localização ($QL$) no ano final da comparação. |
| `classificacao_dinamica` | Texto | `"Recuperação Plena"` | Diagnóstico algorítmico da trajetória territorial. |

### 4.3 Especificação para Planilhas Excel (XLSX)
O arquivo XLSX gerado pela plataforma é composto por **duas abas obrigatórias**:
1. **Aba 1: `Dados_Analiticos`:** Tabela formatada nativamente no Excel com tipos corretos (números inteiros como inteiros, percentuais como percentuais nativos com máscara `0.00%`, cabeçalho congelado e filtros automáticos ativados).
2. **Aba 2: `Metadados_e_Fontes`:** Documento de proveniência registrando:
   * Candidato Analisado e Cargo.
   * Eleição de Início e Eleição de Fim.
   * Fonte dos Dados Oficiais (Portal de Dados Abertos do TSE com links e datas).
   * Data e Hora da Exportação.
   * Versão do Motor Analítico da Plataforma.
   * Definição matemática de cada indicador presente na primeira aba.
