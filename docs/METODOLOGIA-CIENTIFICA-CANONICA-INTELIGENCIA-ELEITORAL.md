# Metodologia Científica Canônica — Inteligência Eleitoral
**Status:** especificação fundacional proposta para aprovação e implementação  
**Versão:** 1.0  
**Data:** 2026-10-09  
**Escopo:** modelo de pesquisa, dados, indicadores, inferência, validação e comunicação da Inteligência Eleitoral independente.

## 1. Decisão fundacional

A Inteligência Eleitoral deve ser construída a partir de uma metodologia científica própria. Sistemas anteriores podem ser consultados apenas como referências técnicas pontuais; não são autoridade metodológica, fonte automática de regras nem modelo a ser copiado.

O software é instrumento de pesquisa, não substituto do método. Nenhum indicador, classificação, hipótese ou conclusão entra em produção apenas porque existe uma fórmula no código, uma resposta de LLM ou um catálogo que o declara implementado.

A ordem de construção é:

1. pergunta de pesquisa e finalidade;
2. definição conceitual e operacional das variáveis;
3. população, unidade de análise, período e estimando;
4. proveniência e avaliação da fonte;
5. desenho analítico e pressupostos;
6. cálculo independente e testes;
7. validação empírica e análise de sensibilidade;
8. interpretação limitada pela evidência;
9. publicação versionada e reproduzível.

## 2. Fundamentos e referências

Esta especificação adapta princípios gerais de transparência, reprodutibilidade, gestão de dados e relato de estudos observacionais ao contexto eleitoral brasileiro. Não declara que uma única checklist seja suficiente para todos os tipos de análise.

- **FAIR Data Principles:** dados e artefatos devem ser localizáveis, acessíveis sob regras explícitas, interoperáveis e reutilizáveis; a proveniência e os fluxos computacionais também importam. https://doi.org/10.1038/sdata.2016.18
- **National Academies — Reproducibility and Replicability in Science (2019):** diferencia reprodução de resultados computacionais com os mesmos dados/métodos de replicação por novo estudo/dados. https://doi.org/10.17226/25303
- **APSA — ética profissional em Ciência Política:** transparência, responsabilidade profissional e ética na pesquisa política. https://apsanet.org/resources/ethics/
- **STROBE:** checklist de relato para estudos observacionais de coorte, caso-controle e transversais. É uma diretriz de relato, não um método universal de desenho ou um selo de qualidade. Usar apenas quando o desenho for pertinente. https://www.strobe-statement.org/
- **TSE — Dados Abertos:** repositório oficial de dados eleitorais, com conjuntos por eleição e granularidades diferentes. A documentação do conjunto específico e o layout correspondente prevalecem sobre inferências feitas a partir do nome do arquivo. https://dadosabertos.tse.jus.br/ e https://www.tse.jus.br/eleicoes/arquivos
- **TSE — informações técnicas sobre divulgação de resultados:** documentação operacional e especificações dos arquivos divulgados. https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados

Essas referências são fundamentos iniciais. Antes de formalizar cada método estatístico, será necessário registrar literatura específica da área, versão consultada, justificativa de escolha e limitações.

## 3. Escopo epistemológico: o que a plataforma pode afirmar

Cada análise deve ser classificada antes da implementação:

### 3.1 Descritiva
Resume o que consta nos dados observados: contagem, proporção, distribuição, diferença aritmética e concentração. Não explica por si só por que um resultado ocorreu.

### 3.2 Comparativa
Compara eleições, territórios, candidatos ou grupos definidos. Deve demonstrar que os objetos comparados são compatíveis em cargo, turno, regra eleitoral, território, granularidade, universo e definição das variáveis.

### 3.3 Associativa
Investiga relações entre variáveis. Deve indicar população, unidade, especificação, possíveis confundidores, incerteza e limites. Associação não equivale a causalidade.

### 3.4 Preditiva
Estima um resultado não observado ou futuro. Exige alvo explícito, horizonte temporal, validação fora da amostra, comparação com baseline simples, métricas adequadas e comunicação da incerteza. Não pode ser misturada com descrição histórica.

### 3.5 Causal
Afirma efeito de uma intervenção ou exposição. Só pode ser produzida com desenho causal defensável, estimando explícito, pressupostos identificados e análises de robustez. Correlações ecológicas, mapas, séries históricas ou diferenças de votos isoladas não autorizam conclusões causais.

### 3.6 Interpretativa / exploratória
Gera hipóteses para investigação posterior. Deve ser marcada como exploratória e não apresentada como achado confirmado. Hipóteses descobertas depois de observar os dados não podem ser descritas como pré-registradas.

A interface e os relatórios devem exibir o tipo de análise e proibir linguagem mais forte que a classe de evidência autoriza.

## 4. Protocolo obrigatório de cada análise

Nenhum indicador ou relatório científico pode ser publicado sem uma ficha metodológica versionada contendo:

1. **ID estável e versão** do método.
2. **Pergunta de pesquisa**, finalidade e público destinatário.
3. **Tipo de análise** (descritiva, comparativa, associativa, preditiva, causal ou exploratória).
4. **Conceito teórico** e definição operacional.
5. **Estimando/quantidade-alvo:** exatamente o que se pretende medir ou estimar.
6. **Unidade de análise:** voto, candidato, seção, zona, município, UF, eleição ou outra unidade, sem alternância implícita.
7. **População/universo e critérios de inclusão/exclusão.**
8. **Cargo, turno, eleição, território e janela temporal** abrangidos.
9. **Fonte primária**, URL/identificador do conjunto, versão/data de obtenção, licença, layout e checksum dos arquivos.
10. **Transformações:** filtros, joins, deduplicação, conversões, normalizações e agregações.
11. **Fórmula ou algoritmo**, convenções, denominador e tratamento de valores nulos.
12. **Pressupostos** e evidências necessárias para sustentá-los.
13. **Vieses e limitações conhecidas.**
14. **Plano de validação:** invariantes, reconciliações, casos de teste e referência independente.
15. **Análise de sensibilidade**, quando houver escolhas analíticas que possam alterar o resultado.
16. **Versão de código, dependências, parâmetros e artefatos de saída.**
17. **Responsável/revisor**, data da revisão e estado: rascunho, validado, publicado, suspenso ou obsoleto.
18. **Interpretação permitida e afirmações proibidas.**

Campos não aplicáveis devem ser justificados; não devem ser simplesmente omitidos.

## 5. Modelo conceitual de dados

O esquema deve preservar os fatos de origem e não confundir entidades, medidas e projeções derivadas.

### 5.1 Entidades mínimas

- **Election:** eleição, ano, tipo, turno, situação e referência oficial.
- **Office:** cargo e regras pertinentes ao pleito.
- **Candidate:** identidade eleitoral contextualizada por eleição/cargo; nomes não são chaves globais.
- **Party / Coalition:** filiação e composição conforme o contexto temporal.
- **Geography:** país, UF, município e códigos oficiais, com validade temporal quando necessário.
- **ElectoralUnit:** zona, seção e demais unidades oficiais, com vínculo geográfico e temporal explicitado.
- **DatasetRelease:** conjunto oficial, layout, data/versão, URL, licença, checksum e metadados.
- **ImportRun:** execução de ingestão, versão do código, parâmetros, logs, contagens, validações e estado.
- **Observation / Fact:** valor observado na granularidade real da fonte, ligado às dimensões relevantes.
- **IndicatorDefinition:** ficha metodológica e versão da fórmula.
- **AnalysisRun:** dados de entrada exatos, filtros, método, parâmetros, versão de código e resultados.
- **PublicationSnapshot:** conjunto de resultados validado e imutável que foi ativado para consumo.

Os nomes acima são conceitos, não ordem para criar todas as tabelas antecipadamente. O esquema físico será definido após o catálogo de fontes, granularidades e consultas de pesquisa. Não se deve criar uma tabela para cada conceito sem necessidade demonstrada.

### 5.2 Regras de integridade

- Usar códigos oficiais estáveis como chaves de ligação sempre que existirem; nomes normalizados são apoio diagnóstico, não chave principal.
- A identidade de candidato deve ser contextualizada por eleição, cargo e registro oficial, evitando colisões de nomes.
- Distinguir zero observado, valor ausente, não aplicável, não publicado, não carregado e dado inválido.
- Não substituir automaticamente ausência por zero.
- Preservar a granularidade original. Uma agregação municipal não pode ser apresentada como dado por seção.
- Registrar mudanças de limites, códigos, nomes e classificações territoriais ao longo do tempo.
- Projeções analíticas são artefatos derivados; não substituem os fatos de origem.
- Todo resultado publicado deve apontar para as versões dos dados e do método que o produziram.

## 6. Proveniência e ingestão de dados

### 6.1 Registro de fonte

Para cada arquivo, registrar: fonte e URL, nome original, data/hora de obtenção, versão do dataset/layout, eleição/cargo/turno/UF abrangidos, tamanho, SHA-256, licença, formato, encoding, delimitador, esquema esperado e observações de qualidade.

### 6.2 Pipeline em etapas isoladas

1. **Acquire:** baixar e arquivar o artefato original sem modificá-lo.
2. **Verify:** verificar checksum, tamanho, assinatura quando aplicável e metadados.
3. **Parse:** interpretar conforme layout versionado; rejeitar estrutura desconhecida.
4. **Normalize:** mapear códigos e tipos, preservando campos brutos.
5. **Validate:** executar regras de integridade, cobertura e reconciliação.
6. **Stage:** armazenar dados candidatos isolados por execução/versão.
7. **Compare:** comparar com totais e referências oficiais compatíveis.
8. **Approve:** aprovar a versão somente se todas as regras críticas passarem.
9. **Publish:** ativar uma versão completa e identificada, sem expor mistura parcial.
10. **Retain:** manter histórico, logs, relatórios e artefatos necessários para reproduzir o resultado.

Uma falha deve manter a versão ativa anterior intacta. Carga parcial nunca pode ser marcada como completa nem entrar silenciosamente nos relatórios.

### 6.3 Reconciliação

Contagens de linhas só são úteis quando o grão é idêntico. Validar separadamente, conforme a fonte e o grão:

- número de registros e chaves únicas;
- duplicatas e chaves nulas;
- cobertura de eleições, cargos, turnos, UFs e territórios;
- somas de votos por candidato e totalizações pertinentes;
- consistência entre detalhe e agregados oficiais;
- distribuição de categorias, brancos/nulos e votos válidos quando presentes e semanticamente comparáveis;
- registros descartados, motivos e impacto quantitativo;
- comparação com referência independente e tolerância explícita.

Não codificar um número esperado de linhas como verdade universal. Baselines precisam estar ligados a versão da fonte, filtros, grão e justificativa. Uma divergência deve produzir falha de validação real (exit code não zero), não apenas imprimir uma mensagem.

## 7. Regras para comparações eleitorais

Antes de comparar dois resultados, verificar equivalência ou documentar a diferença em:

- cargo e regras de eleição;
- turno;
- tipo de eleição e status da totalização;
- definição de votos computados;
- granularidade da fonte;
- fronteiras e códigos territoriais;
- identidade do candidato/partido;
- cobertura e completude;
- critérios de inclusão/exclusão;
- denominador;
- data/versão da fonte.

### 7.1 Variação absoluta e relativa

Definir a diferença absoluta como (V_{t_2}-V_{t_1}). A variação percentual só é definida quando o denominador inicial é válido e diferente de zero; quando o valor inicial é zero, reportar a diferença absoluta e sinalizar que a taxa percentual não é definida, salvo se uma convenção alternativa tiver justificativa explícita.

### 7.2 Votos e participação

Votos nominais, votos válidos, comparecimento, eleitorado apto e participação são conceitos diferentes. Não misturá-los nem inferir participação usando denominador de votos válidos. Cada taxa deve declarar numerador, denominador e população.

### 7.3 Mudança territorial e cobertura

Comparar apenas territórios comuns pode responder a uma pergunta específica, mas altera o universo da análise. Relatar territórios ausentes em cada período, cobertura, regra de harmonização e resultados com/sem harmonização quando material.

### 7.4 Candidato ausente em um dos pleitos

Ausência de candidatura não é automaticamente zero votos, nem prova de desaparecimento político. Distinguir: não concorreu, identidade não reconciliada, dado ausente, candidatura inelegível e zero efetivamente observado.

### 7.5 Concentração e distribuição

Métricas como participação do maior território, HHI, Gini, quantis ou dispersão devem ter definição, unidade, universo e interpretação documentados. Não comparar índices calculados sobre universos diferentes sem advertência e justificativa.

### 7.6 Indicadores de tendência

“Crescimento consistente”, “declínio”, “reversão” ou termos semelhantes precisam de regras formais prévias, número mínimo de períodos, tratamento de ausências, limiar e incerteza. Com dois pontos, descrever diferença; não sugerir tendência estável sem fundamento adicional.

## 8. Inferência estatística e modelos

- Escolher o método a partir da pergunta e do desenho, não da disponibilidade de uma biblioteca.
- Documentar população-alvo, estimando, hipóteses, pressupostos, especificação e critério de validação.
- Distinguir população eleitoral observada de amostra. Se os dados cobrem a totalização completa do universo definido, não aplicar automaticamente erro amostral como se fosse uma pesquisa por amostragem. Ainda podem existir incerteza de mensuração, cobertura, classificação, mudança de contexto ou modelo.
- Quando a inferência se estender além dos dados observados, explicar qual mecanismo probabilístico/modelo sustenta essa extensão.
- Reportar intervalos de incerteza e tamanho de efeito quando metodologicamente apropriados; não usar somente p-valores.
- Se houver muitos testes, indicadores, territórios ou subgrupos, definir como será tratada a multiplicidade e separar análise confirmatória de exploratória.
- Modelos preditivos devem ter separação temporal/fora da amostra e evitar vazamento de informação futura; comparar com baseline simples e reportar desempenho por subgrupo pertinente.
- Modelos causais exigem diagrama causal ou estrutura de pressupostos, definição de tratamento/resultado, confundidores, mecanismo de identificação e testes de robustez.
- Não selecionar silenciosamente o modelo que produz narrativa mais atraente.

## 9. Ausências, outliers, correções e revisões

- Ausência não é zero; nunca imputar sem registrar método e justificativa.
- Outlier é sinal para investigação, não autorização automática para remoção.
- Correções devem manter valor original, valor corrigido, motivo, evidência, autor e versão.
- Quando a fonte oficial for revisada, criar nova versão do dataset e reexecutar as análises afetadas; não sobrescrever silenciosamente o histórico.
- Se um erro metodológico for descoberto, suspender a publicação afetada, identificar dependências e emitir correção rastreável.

## 10. Testes e critérios de aceitação

Cada método deve ter testes em camadas:

1. **Unitários:** fórmulas puras, limites, denominadores zero, valores nulos, empate, duplicata e precisão numérica.
2. **Propriedades/invariantes:** soma de partes, monotonicidade quando aplicável, idempotência da normalização, ausência de dupla contagem e estabilidade de chaves.
3. **Contratos de dados:** colunas, tipos, chaves, domínios e versão de layout.
4. **Reconciliação independente:** resultados comparados com totalização ou cálculo independente compatível.
5. **Regressão:** conjunto pequeno e versionado de casos conhecidos, com origem e cálculo esperado documentados.
6. **Integração:** pipeline real contra schema/migrações efetivamente aplicados.
7. **Publicação:** provar que falha de ingestão/validação não altera a versão ativa.
8. **Reprodutibilidade:** repetir a análise a partir dos mesmos artefatos e parâmetros e comparar saídas.
9. **Segurança e autorização:** acesso compatível com finalidade, dados públicos/privados e privilégio mínimo.

Fixtures sintéticas servem para testes de lógica, mas não provam cobertura ou validade histórica. Resultados esperados não podem ser derivados do mesmo código que está sendo testado sem uma verificação independente.

## 11. Contrato de saída para todo resultado analítico

Cada gráfico, tabela, relatório ou resposta de IA deve carregar ou permitir consultar:

- o que foi medido e em que unidade;
- população, filtros, cargo, turno, período e território;
- numerador/denominador quando aplicável;
- fonte, versão dos dados e data de atualização;
- método e versão;
- cobertura, ausências e limitações relevantes;
- estado de validação;
- se a análise é descritiva, comparativa, associativa, preditiva, causal ou exploratória;
- nível de incerteza ou motivo para não estimá-lo;
- interpretação autorizada e alertas;
- identificador reproduzível da execução.

Uma visualização sem esses metadados não deve ser considerada evidência autossuficiente.

## 12. Papel da LLM

A LLM pode:
- traduzir perguntas em propostas de análise;
- selecionar entre métodos previamente aprovados;
- explicar resultados calculados e limitações;
- identificar inconsistências para revisão humana;
- redigir sínteses com citações às evidências registradas.

A LLM não pode:
- inventar ou corrigir valores de dados;
- criar denominadores ou preencher ausências silenciosamente;
- executar cálculos oficiais apenas por geração de texto;
- transformar associação em causalidade;
- declarar um método validado sem evidências;
- publicar resultado quando validações críticas falham;
- mudar definições de indicadores sem nova versão e revisão.

O runtime deve receber resultados estruturados do motor determinístico. Cada afirmação quantitativa deve apontar para uma saída registrada, e não para uma estimativa textual improvisada.

## 13. Governança de método e mudanças

Toda alteração de fórmula, universo, fonte, regra de inclusão, harmonização territorial ou interpretação cria nova versão do método quando puder alterar o resultado.

O processo de mudança exige:
1. justificativa e issue rastreável;
2. comparação entre definição anterior e proposta;
3. efeito sobre resultados existentes;
4. testes e dados de referência;
5. revisão por agente/checker independente;
6. decisão explícita de aprovar, rejeitar ou adiar;
7. changelog e plano de reprocessamento;
8. publicação versionada e possibilidade de rollback.

Não se deve editar retrospectivamente a metodologia para fazer um resultado parecer consistente com a expectativa inicial.

## 14. Portões de qualidade

- **Gate A — pergunta:** pergunta, tipo de análise, unidade e estimando definidos.
- **Gate B — fonte:** origem, licença, layout, versão e proveniência registrados.
- **Gate C — dados:** esquema, integridade, cobertura e reconciliação aprovados.
- **Gate D — método:** fórmula/pressupostos, limitações e plano de validação revisados.
- **Gate E — resultado:** testes, análise de sensibilidade e revisão independente concluídos.
- **Gate F — publicação:** snapshot imutável, metadados, versão e rollback disponíveis.

Falha em um gate crítico bloqueia a publicação. O status deve distinguir claramente “não implementado”, “implementado sem validação”, “validado em fixtures”, “validado com dados reais” e “publicado”.

## 15. Plano de implantação por fases

### Fase 1 — Constituição metodológica
Aprovar esta especificação, criar glossário, registro de fontes, template de ficha metodológica, política de versionamento e vocabulário de status. Não expandir o dashboard nem criar agentes em massa antes disso.

### Fase 2 — Catálogo de fontes e modelo canônico
Inventariar conjuntos oficiais por eleição, cargo, turno, UF e granularidade; registrar layouts e licenças; mapear chaves e mudanças temporais. Decidir o esquema físico com base em consultas concretas.

### Fase 3 — Um pipeline vertical verificável
O recorte inicial documentado é **Eleições Gerais de 2022, Deputado Estadual, 1º turno, Rio Grande do Sul, votação nominal por seção**, identificado como `pilot-2022-rs-deputado-estadual-turno-1-secao`. A escolha é provisória e metodológica: o catálogo oficial do TSE possui um recurso estadual de votação por seção e informa que os arquivos por UF incluem Deputado Estadual. A ficha específica registra a fonte e separa o que foi confirmado no catálogo do que depende de inspeção do arquivo real.

A URL do recurso foi identificada, mas o download não foi concluído na sessão de registro. Portanto, layout exato, checksum, colunas, chaves, cobertura, totais de referência e reconciliação continuam pendentes; o piloto está **documentado, não adquirido e não validado**. A próxima execução deverá preservar o original, verificar o layout, processar em staging, reconciliar totais compatíveis e testar a publicação atômica antes de expor resultados. Não declarar cobertura nacional a partir de um piloto regional.

### Fase 4 — Biblioteca de indicadores
Implementar apenas indicadores com ficha aprovada, função determinística, testes independentes e documentação de interpretação.

### Fase 5 — Comparabilidade histórica e territorial
Harmonizar eleições e códigos territoriais com regras explícitas, relatórios de cobertura e análises de sensibilidade.

### Fase 6 — Inferência, predição e exploração
Adicionar métodos estatísticos apenas após as fases de dados e descrição serem verificáveis. Métodos causais e preditivos exigem gates próprios.

### Fase 7 — Runtime de IA e comunicação
Integrar a LLM como camada explicativa/orquestradora sobre métodos e resultados versionados, com citações internas de proveniência e limites de execução.

### Fase 8 — Auditoria e publicação contínua
Executar testes de regressão, reproduzir relatórios, revisar alterações metodológicas, monitorar falhas de ingestão e manter histórico de publicações.

## 16. Critérios de conclusão da Fase 1

A Fase 1 só pode ser considerada concluída quando existirem no repositório:
- esta metodologia canônica revisada;
- glossário de termos eleitorais e estatísticos;
- template versionado de ficha metodológica;
- registro inicial de fontes oficiais e seus layouts;
- política de proveniência, versão e estados de validação;
- critérios de gate codificáveis em checklist;
- decisão documentada sobre o recorte do primeiro pipeline, com ficha metodológica específica e estado de evidência explícito;
- critérios de gate objetivos, com falhas críticas capazes de bloquear a publicação e gerar falha efetiva do processo;
- revisão independente que confirme ausência de contradições entre esses artefatos.

**Estado registrado em 2026-10-09:** a base documental e o recorte-piloto estão registrados. A Fase 1 permanece **parcialmente concluída**: o recurso do TSE foi identificado no catálogo, mas a aquisição não foi concluída; layout, checksum, reconciliação e revisão independente permanecem pendentes. Não há, neste registro, evidência de pipeline implementado ou de validação empírica.

A existência deste documento isoladamente **não** significa que a plataforma esteja cientificamente validada, nem que qualquer dado, fórmula ou relatório atual esteja aprovado.

## 17. Bibliografia e fontes de referência

1. Wilkinson, M. D. et al. (2016). *The FAIR Guiding Principles for scientific data management and stewardship*. Scientific Data, 3, 160018. https://doi.org/10.1038/sdata.2016.18
2. National Academies of Sciences, Engineering, and Medicine (2019). *Reproducibility and Replicability in Science*. https://doi.org/10.17226/25303
3. American Political Science Association. *Ethics resources and Guide to Professional Ethics in Political Science*. https://apsanet.org/resources/ethics/
4. von Elm, E. et al. (2007). *The Strengthening the Reporting of Observational Studies in Epidemiology (STROBE) Statement*. https://www.strobe-statement.org/
5. Tribunal Superior Eleitoral. *Portal de Dados Abertos*. https://dadosabertos.tse.jus.br/
6. Tribunal Superior Eleitoral. *Arquivos e especificações de divulgação de resultados*. https://www.tse.jus.br/eleicoes/arquivos
7. Tribunal Superior Eleitoral. *Informações técnicas sobre a divulgação de resultados*. https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados

---
**Nota de rigor:** esta é uma norma metodológica fundacional para o produto, não um artigo acadêmico revisado por pares nem uma validação de cada técnica estatística que venha a ser adotada. Cada método especializado deverá receber referências próprias, revisão e evidência empírica antes de ser liberado.
