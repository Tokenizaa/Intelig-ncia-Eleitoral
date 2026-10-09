# Auditoria bruta — referência Carlos Búrigo para a Inteligência Eleitoral

**Status:** levantamento técnico inicial registrado; não equivale a auditoria integral nem a validação de produção.  
**Data da leitura:** 2026-10-09  
**Repositório analisado:** [Tokenizaa/Deputado-Carlos-Burigo](https://github.com/Tokenizaa/Deputado-Carlos-Burigo)  
**Repositório de destino:** [Tokenizaa/Intelig-ncia-Eleitoral](https://github.com/Tokenizaa/Intelig-ncia-Eleitoral)  
**Regra de uso:** aproveitar conhecimento, contratos e código genérico somente depois de verificar aderência. A Inteligência Eleitoral permanece um produto independente; Carlos Búrigo é referência/caso de uso, não proprietário do motor.

## 1. Objetivo e limites deste levantamento

Este documento registra observações diretamente verificáveis nos arquivos consultados do repositório Carlos Búrigo e no estado atual do repositório Inteligência Eleitoral. A finalidade é preservar a análise bruta antes de decidir o que copiar, adaptar, substituir ou rejeitar.

**O que foi consultado:** documentação canônica e de fases da Inteligência Eleitoral; governança e inventário documental; funções analíticas TypeScript; servidor de inteligência; scripts de construção/publicação; migrações SQL; catálogos JSON de agentes, skills e orquestração; contratos de contexto e apresentação; configuração de dependências; estrutura e arquivos-chave do projeto de destino.

**O que não foi executado nesta leitura:** testes, lint, build, ingestão TSE, consultas ao PostgreSQL local, validação do banco Supabase real, verificação de segredos/variáveis do ambiente, deploy, benchmark de modelos ou auditoria linha a linha de todo o repositório. O relatório distingue, portanto, evidência documental/código de validação operacional.

## 2. Constatação principal: existem dois produtos com pontos de contato, não uma única aplicação

### 2.1 Carlos Búrigo

O repositório Carlos Búrigo é uma aplicação parlamentar com site público, área administrativa, autenticação, permissões, demandas, conteúdo, comunicação e outros domínios do gabinete. A Inteligência Eleitoral foi originalmente concebida como módulo privado dentro do dashboard existente.

Evidências:
- `AGENTS.md`: arquitetura React 19 + Vite + TypeScript; produção Cloudflare Workers; Supabase para persistência/autenticação; Worker em `src/worker.ts`; módulos de acesso ao banco em `server/`.
- `docs/roadmap/IE-01-FUNDACAO-INTELIGENCIA-ELEITORAL-2026-10-06.md`: inserção prevista em `/admin`, com shell `AdminLayout`, workspace `AdminWorkspace` e autorização existente.
- `package.json`: comandos de build/deploy Cloudflare, Vitest/Playwright e scripts eleitorais específicos.

### 2.2 Inteligência Eleitoral independente

O repositório de destino é, no estado lido, um frontend React/Vite com vistas analíticas, filtros globais e cálculos de domínio. O código observado usa dados demonstrativos sintéticos e não mostra ainda, na árvore examinada, uma cadeia de ingestão, persistência e publicação equivalente à do repositório Carlos Búrigo.

Evidências:
- `package.json`: nome `react-example`, Vite, scripts `dev`, `build`, `preview`, `clean`, `lint`; dependências incluem Express, Google GenAI e Vite, mas os scripts examinados não demonstram uma API própria funcional nem um runtime eleitoral de produção.
- `src/App.tsx`: composição de navegação lateral e vistas Overview, Performance, Territorial, Comparison, Concentration, Zones/Sections, Spatial, Reports e Methodology.
- `src/context/FilterContext.tsx`: filtros iniciais fixos para RS, Deputado Estadual, 2018→2022, candidato Carlos Búrigo e comparador Guilherme Pasin; importa `MUNICIPALITIES_DATA` e `RAW_SECTIONS` de `src/data/mockElections`.
- `src/data/mockElections.ts`: o cabeçalho declara explicitamente “DADOS DEMONSTRATIVOS SINTÉTICOS”; há candidatos, votos de seção e coordenadas demonstrativas no arquivo.
- `src/types/election.ts`: tipos tipados para candidatos, seções, zonas, municípios e filtros, com anos 2018, 2022 e 2026 codificados no tipo.

**Implicação:** o projeto de destino já contém uma interface e uma linguagem de exploração úteis, mas seus dados demonstrativos não podem ser tratados como dados eleitorais oficiais. A próxima evolução deve substituir a autoridade dos mocks por contratos e dados verificados, preservando a UI útil sem importar cegamente a arquitetura parlamentar do outro produto.

## 3. Achados de maior valor para reaproveitamento

### 3.1 Separação entre fato, indicador e interpretação

A especificação `docs/INTELIGENCIA-ELEITORAL-CANONICA.md` estabelece três níveis:
- **DATA:** fatos de origem, como votos, candidato, município, zona, eleição e ano;
- **INDICATOR:** cálculos reproduzíveis, como total, participação, ranking, crescimento, concentração, diferenças e cobertura;
- **INTELLIGENCE:** interpretação estruturada desses indicadores, sem a IA substituir os cálculos.

O documento também define que a mesma consulta deve produzir resultado consistente no dashboard e no chatbot, com metodologia e evidências rastreáveis.

**Avaliação:** princípio arquitetural de alto valor para a plataforma independente. Deve ser mantido, com contratos próprios e testes próprios.

### 3.2 Contrato estruturado de resultado e apresentação

Em `src/contracts/electoralPresentation.ts`, o repositório Carlos Búrigo define:
- tipos de artefato: texto, KPI, tabela, gráfico, mapa, linha do tempo, comparação, relatório e download;
- contexto eleitoral;
- referências de metodologia e evidência;
- `AnalyticalResult`, com estado, intenção, método, função, contexto, pergunta, resumo, dados, metodologia, evidências, limitações e especificação de apresentação;
- templates reutilizáveis, em vez de um template independente para cada pergunta.

Em `src/contracts/electoralContext.ts`, existe resolução de contexto por workspace, candidato principal/comparáveis, eleições e cargos permitidos.

**Avaliação:** os conceitos são reutilizáveis; as interfaces precisam ser comparadas com o domínio da plataforma independente antes de copiar. A autorização não pode ficar apenas numa função TypeScript de frontend/backend: deve ser imposta também no limite confiável da API e, quando aplicável, no banco.

### 3.3 Funções determinísticas de análise

`src/lib/electoral-analytics.ts` concentra funções de agregação e cálculo, incluindo soma de votos, participação, evolução regional, força territorial, ranking, crescimento/retração e comparação competitiva. Isso é uma referência melhor para reaproveitamento seletivo do que copiar as páginas do dashboard administrativo.

**Ressalvas visíveis:**
- a implementação contém `BASELINES` estáticos por ano, com totais, municípios e linhas; esses números exigem reconciliação com a origem e os scripts de validação antes de serem adotados;
- o escopo de tipo é `2018 | 2022 | 2026`, e a configuração operacional examinada é RS / Deputado Estadual / primeiro turno. Isso não equivale a cobertura nacional genérica;
- uma função de cálculo isolada não prova que seus dados de entrada, denominadores e interpretação estejam corretos;
- o arquivo é extenso e deve ser dividido por domínio somente se a auditoria de chamadas e testes demonstrar necessidade, sem refatoração cosmética antecipada.

### 3.4 Catálogos de agentes, skills e orquestração

Os arquivos `src/data/electoral-agents.json`, `src/data/electoral-skills.json` e `src/data/electoral-orchestration.json` descrevem uma abordagem baseada em configuração:
- um orquestrador que resolve intenção, valida escopo, seleciona especialista/skill e exige evidência;
- especialistas para visão geral, histórico, território e competição;
- skills reutilizáveis como ranking, comparação histórica, taxa de crescimento, concentração e força territorial;
- planos que conectam pergunta, intenção, agente, skills, método, função, escopo e evidência.

A orquestração declara expressamente que o orquestrador monta um plano, mas não calcula.

**Avaliação:** reaproveitar o modelo conceitual e os catálogos como material de referência. Não assumir que os JSONs representam agentes executáveis por si só. A plataforma independente precisa implementar o próprio runtime/orquestrador, validação de esquema, execução limitada, logs, timeout, limite de tentativas e checker. OpenCode não deve ser dependência de produção.

### 3.5 Pipeline de ingestão e publicação

Os documentos `docs/roadmap/IE-02-MODELO-DADOS-INTELIGENCIA-ELEITORAL-2026-10-06.md`, `IE-03-INGESTAO-TSE-2026-10-06.md` e `IE-03.7-COBERTURA-HISTORICA-TERRITORIAL-2026-10-06.md` descrevem uma cadeia oficial TSE → arquivos brutos locais → PostgreSQL local → normalização/auditoria → motor determinístico → publicação analítica → Supabase remoto.

O princípio “LOCAL calcula; REMOTO serve” procura impedir que o runtime de produção dependa de arquivos ou banco local. O projeto de destino deverá adotar o princípio de reprodutibilidade e proveniência, mas não deve herdar a dependência do Supabase do outro produto sem decisão explícita de arquitetura.

Scripts encontrados:
- `scripts/electoral/download-tse-2026.mjs`
- `scripts/electoral/load-tse-rs.mjs`
- `scripts/electoral/validate-tse-rs.mjs`
- `scripts/electoral/audit-tse-2026-rs.mjs`
- `scripts/electoral/build-intelligence-local.mjs`
- `scripts/electoral/publish-analytics-projection.mjs`
- `scripts/electoral/load-tse-candidato-munzona-supabase.mjs`
- `scripts/electoral/validate-tse-candidato-munzona-supabase.mjs`

**Avaliação:** reaproveitar os contratos, verificações e estratégias de ingestão após auditoria de código e teste com arquivos oficiais. Não copiar scripts de carga para produção sem avaliar credenciais, idempotência, reconciliação, segurança, volume e compatibilidade de esquema.

## 4. Achados críticos e discrepâncias que exigem investigação

### 4.1 Escopo geográfico e funcional limitado

A documentação de IE-03.7 declara a primeira onda como RS, eleições gerais 2018/2022/2026, Deputado Estadual, primeiro turno, para todos os candidatos do cargo. Isso é uma fundação regional, não cobertura nacional.

**Ação futura:** tratar cobertura por UF, eleição, cargo, turno, dataset e granularidade como matriz explícita. Não anunciar cobertura que não esteja apoiada por dados e validação.

### 4.2 Divergência entre modelo descrito e migração SQL

A especificação IE-02 descreve um modelo normalizado com entidades de eleição, turno, cargo, partido, candidato, UF, município, zona, seção, datasets de origem e execuções de importação. Parte do texto descreve IDs UUID e um grão de resultado específico.

Já `supabase/migrations/20261007170000_create_clean_electoral_model.sql` cria um esquema mais compacto, com IDs `bigint identity`, tabelas com campos desnormalizados (por exemplo `office_name` em candidatos) e fatos de voto por eleição/município/candidato/zona/seção. O nome “clean model” não prova que o esquema corresponda integralmente à especificação narrativa.

**Ação futura:** comparar a migração aplicada no banco real, o esquema efetivo e os contratos de importação. Não usar a documentação isolada como prova do esquema existente.

### 4.3 Políticas de leitura e sensibilidade do banco eleitoral

Na migração `20261007170000_create_clean_electoral_model.sql`, as tabelas eleitorais são marcadas com RLS, mas as políticas de leitura para eleições, municípios, candidatos e resultados permitem `SELECT` a `anon, authenticated` com `using(true)`. A tabela de execuções permite leitura a `authenticated` com `using(true)`.

Uma migração posterior, `20261008120000_create_electoral_analytics_projection.sql`, cria tabelas de projeção analítica com políticas de leitura para usuários autenticados que satisfaçam `private.is_staff()`.

**Risco/questão aberta:** a intenção de acesso entre o modelo de ingestão e a projeção publicada não é uniforme no código observado. Os fatos eleitorais podem ser públicos, mas detalhes de execução, erros, metadados e status operacional não devem ser expostos sem decisão deliberada. É necessário verificar todas as políticas atuais no Supabase; não concluir o estado real do banco apenas lendo migrações.

### 4.4 Publicação não demonstrada como atômica

`scripts/electoral/publish-analytics-projection.mjs` usa uma chave de serviço no ambiente local, limpa as tabelas de projeção para os anos selecionados e, depois, executa upserts em lotes.

**Risco técnico:** se a limpeza funcionar e uma carga falhar no meio, a projeção pode ficar parcial ou vazia. O trecho consultado não demonstra publicação versionada com troca atômica de versão. Também não foi executado teste de falha para comprovar comportamento real.

**Ação futura:** estudar publicação por versão/snapshot, validação completa antes da ativação e mecanismo de rollback. Não alterar o script nesta etapa sem revisar todo o fluxo e as tabelas dependentes.

### 4.5 Extração local depende de consulta por nome parcial

`scripts/electoral/build-intelligence-local.mjs` recebe um argumento `candidate` com padrão `BURIGO` e filtra pelo nome do candidato usando correspondência parcial; consulta anos 2018, 2022 e 2026 e agrega por ano/município.

**Risco técnico:** busca por nome parcial é adequada para uma ferramenta exploratória, mas não deve servir como identificador estável de candidato para o motor geral. Nomes homônimos, alterações de nome de urna e variações entre eleições podem produzir associação incorreta. O próprio modelo descrito no IE-02 recomenda não identificar candidato apenas pelo nome.

**Ação futura:** preferir identificadores TSE contextualizados por eleição/cargo e manter uma camada explícita de associação histórica, com revisão e evidência.

### 4.6 Baselines e totais precisam de trilha de evidência

`src/lib/electoral-analytics.ts` declara baselines estáticos para 2018, 2022 e 2026. Documentos de IE-03.7 registram provas de consistência para combinações específicas de ano/UF/cargo/turno/candidato.

**Risco técnico:** baseline embutido em código pode ficar desatualizado ou divergir da fonte, principalmente quando há retotalização, alteração judicial, correção do dataset ou mudança de cobertura. Não foi possível confirmar nesta auditoria se todos os valores são recalculados, testados e comparados automaticamente.

**Ação futura:** documentar para cada baseline sua fonte, arquivo, checksum, granularidade, consulta de cálculo e tolerância esperada; fazer o teste falhar quando houver divergência não explicada.

### 4.7 Estado de implementação não deve ser inferido dos catálogos

`server/electoralIntelligence.ts` contém uma lista explícita `RUNTIME_IMPLEMENTED` e uma lista de funções analíticas importadas; o catálogo de orquestração também possui estados por pergunta. Esses artefatos são úteis, mas não substituem testes de contrato por intent nem prova de equivalência entre resultado esperado e resultado executado.

**Ação futura:** comparar catálogo, funções existentes, roteamento real, consultas de dados e testes. Toda pergunta catalogada deve ser classificada como implementada e validada, implementada parcialmente, pendente ou não implementada, com evidência de teste.

### 4.8 Riscos no relatório de validação antigo

`VALIDATION_REPORT.md` registra um teste de produção datado de 2026-09-18, incluindo endpoints e implantação do Worker. Esse documento é evidência histórica, não prova automática de que a produção continua igual em 2026-10-09. Também contém detalhes operacionais de infraestrutura e URLs de preview que não devem ser replicados na documentação pública da nova plataforma.

**Ação futura:** usar relatórios datados como histórico; confirmar estado atual por workflow, commit, ambiente e smoke test quando autorizado.

## 5. Comparação de base de dados: não copiar a base sem confirmar o contrato

A documentação do projeto Carlos Búrigo separa:
- arquivos oficiais RAW preservados com URL, ano, UF, dataset, hash e metadados;
- dados normalizados para consultas e cálculos;
- auditoria de execução, linhas lidas/carregadas/rejeitadas, baselines e divergências;
- projeções analíticas enxutas para o runtime.

Essa separação é conceitualmente valiosa para a plataforma independente. Entretanto, a decisão de compartilhar uma base física ou projeto Supabase não pode ser tomada apenas pela semelhança de propósito. Precisamos verificar:
1. qual é o esquema real aplicado e quais migrações foram executadas;
2. se o esquema serve a vários clientes/projetos sem dependência de tabelas institucionais do gabinete;
3. se o isolamento, privilégios, RLS, chaves e ciclo de publicação são compatíveis;
4. se a plataforma independente pode consumir os dados sem depender do runtime parlamentar;
5. se a proveniência permite reconstruir cada publicação;
6. se há conflitos de identificadores, granularidade ou definição de candidato entre anos.

**Decisão provisória:** compartilhar dados somente após auditoria técnica confirmar compatibilidade; nunca compartilhar o motor de cálculo por consequência automática dessa decisão.

## 6. Governança e skills: o que aproveitar e o que não copiar

### 6.1 O que é útil

O `AGENTS.md` do Carlos Búrigo tem regras valiosas:
- código em `main`, configuração real e validações executadas são evidências do estado funcional;
- não tratar documentos históricos como estado atual;
- não criar módulos duplicados;
- mudanças de arquitetura exigem ADR;
- alterações de autenticação/autorização exigem validação objetiva;
- “NÃO VALIDADO” não significa “NÃO IMPLEMENTADO”.

Essas regras devem inspirar a governança da Inteligência Eleitoral.

### 6.2 O que não deve ser copiado literalmente

A estrutura parlamentar tem skills como admin, auditoria, configurações, conteúdo, demandas, projetos, usuários e votos. Elas pertencem ao produto do gabinete e não são uma decomposição pronta para o motor eleitoral independente.

O arquivo `.opencode/AGENTS.md` do repositório Carlos Búrigo diz para não criar runtime local porque o supervisor/orquestrador é global no OpenCode. Essa regra é específica daquele fluxo de desenvolvimento. **Ela não pode ser transportada para a Inteligência Eleitoral**, cujo runtime de produção deve ser independente do OpenCode.

### 6.3 Diretriz para o projeto de destino

Criar o mínimo de capacidades internas necessárias, com fronteiras justificadas por código e testes. Separar:
- governança do ciclo de desenvolvimento;
- runtime de IA da aplicação;
- funções determinísticas de domínio eleitoral;
- acesso a dados e proveniência;
- validação independente/checker.

Agentes e skills não devem ser criados só para reproduzir nomes ou pastas do projeto de origem. Cada capacidade precisa ter entrada, saída, permissões, limites e critérios de validação claros. A NVIDIA NIM é o provider planejado; o modelo principal acordado é Nemotron 3 Super, com dois fallbacks a confirmar no catálogo e na configuração real antes de implementação.

## 7. Situação atual do projeto de destino — observações diretas

1. A UI tem navegação e vistas para análise territorial, comparação, concentração, seções/zonas, mapas, relatórios e metodologia.
2. Os filtros e tipos ainda são fortemente específicos de RS, Deputado Estadual, primeiro turno e três anos fixos.
3. A fonte de dados importada por `FilterContext` é `mockElections`; o próprio arquivo identifica os dados como sintéticos/demonstrativos.
4. O tipo `GlobalFilters` inclui categorias específicas de região, faixas de votos e filtros de quociente local; esses enums não podem ser tratados como ontologia universal do país sem parametrização.
5. `electoralMath.ts` contém cálculos de mudança absoluta/percentual e indicadores territoriais; por exemplo, a função de total válido para 2026 usa fallback para o total de 2022 quando o dado de 2026 é falsy. Esse comportamento deve ser investigado: fallback silencioso entre eleições pode mascarar dado ausente e contaminar comparações.
6. A estrutura de UI pode ser preservada onde fizer sentido, mas os mocks, os IDs de candidato codificados e os fallbacks de dados devem ser removidos ou substituídos por contratos explícitos antes de declarar a plataforma alimentada por dados oficiais.

## 8. Matriz preliminar de reaproveitamento

| Componente de referência | Direção | Condição antes de reutilizar |
|---|---|---|
| Princípio DATA → INDICATOR → INTELLIGENCE | Reutilizar conceito | Documentar contratos e testes na plataforma independente |
| Funções em `src/lib/electoral-analytics.ts` | Adaptar seletivamente | Auditar fórmula, denominador, nulos, filtros e testes |
| `electoralPresentation.ts` | Adaptar | Validar tipos e evitar dependência do contexto parlamentar |
| Catálogos JSON de agentes/skills/orquestração | Usar como referência | Criar schema versionado e runtime próprio executável |
| Scripts de ingestão TSE | Auditar antes de adaptar | Testar arquivos reais, idempotência, checksum, logs e cobertura |
| Esquema Supabase e migrações | Não copiar ainda | Conferir schema real, RLS, compatibilidade e estratégia de compartilhamento |
| `AdminLayout`, `AdminWorkspace`, RBAC parlamentar | Não portar para a plataforma independente | Pertencem ao dashboard do gabinete |
| Skills de admin/demandas/conteúdo/usuários | Não copiar como estrutura eleitoral | Domínios específicos do produto parlamentar |
| Dados de `mockElections.ts` | Não usar como fato | São explicitamente sintéticos |
| Baselines estáticos | Não adotar sem prova | Recalcular e validar com fontes oficiais |
| Relatórios de deploy históricos | Referência histórica apenas | Revalidar estado atual antes de qualquer alegação operacional |

## 9. Próximas frentes da auditoria profunda

Este levantamento deve ser ampliado em etapas, mantendo evidências por arquivo e sem alterar o projeto Carlos Búrigo:

1. **Dados:** revisar integralmente download, parsers, normalização, chaves de associação, validações e scripts de publicação; localizar as fontes oficiais e os artefatos de checksum.
2. **Banco:** comparar todas as migrações eleitorais com o esquema real, constraints, índices, triggers, policies RLS e dados publicados; não presumir que migração versionada significa migração aplicada.
3. **Motor:** mapear todos os exports de `electoral-analytics.ts`, contratos de entrada/saída, denominadores, valores nulos, limites e testes unitários.
4. **Runtime de consultas:** confrontar catálogo de perguntas, intents, skills, roteamento, funções realmente chamadas e testes de API; detectar duplicações e planos sem implementação.
5. **Agentes e IA:** ler as skills completas, o chatbot e o fluxo de interpretação; separar roteamento determinístico de chamadas LLM e verificar proteção contra loops, limites, timeout e evidência.
6. **Segurança:** rever autorização no Worker, contexto autorizado, RLS e exposição de dados operacionais; confirmar se qualquer endpoint eleitoral está protegido pelo limite certo.
7. **Cobertura:** montar matriz ano × UF × cargo × turno × granularidade × dataset, com estado “documentado”, “adquirido”, “normalizado”, “validado” e “publicado”.
8. **Projeto independente:** fazer inventário equivalente da UI atual, marcar mocks e regras hardcoded, comparar tipos e fórmulas com o modelo de origem e elaborar um plano de migração sem reescrever a interface sem necessidade.

## 10. Regra de evidência e estado

Para cada novo achado, registrar:
- arquivo e símbolo/trecho;
- fato observado;
- consequência provável;
- nível de confiança;
- validação ainda necessária;
- decisão: reutilizar, adaptar, não reutilizar ou manter em aberto.

Não declarar um componente correto só porque está documentado, nem ausente só porque ainda não foi validado. Não executar mudanças no repositório Carlos Búrigo como parte desta auditoria sem autorização específica. Este documento é um inventário técnico inicial no repositório de destino e deve ser atualizado conforme a inspeção avançar.


## 11. Segunda passada — pipeline, esquema efetivamente usado e runtime

**Estado desta passada:** inspeção estática adicional dos loaders, validadores, publicação e catálogos. Nenhum script foi executado e nenhum banco foi consultado.

### 11.1 Há duas famílias de modelo eleitoral coexistindo no mesmo repositório

Foram encontrados dois caminhos com contratos diferentes:

**Caminho A — modelo compacto / carga local**
- Migração: `supabase/migrations/20261007170000_create_clean_electoral_model.sql`.
- Tabelas principais: `electoral_elections`, `electoral_municipalities`, `electoral_candidates`, `electoral_results_nominal`, `electoral_import_runs`.
- IDs `bigint identity`, resultados com `zone`, `section`, `votes` e `source_file`.
- Loader: `scripts/electoral/load-tse-rs.mjs`, usando PostgreSQL local e escrevendo em `electoral_results_nominal`.
- Validador: `scripts/electoral/validate-tse-rs.mjs`, com baselines de 2018/2022/2026 para esse modelo.

**Caminho B — modelo normalizado / loader remoto**
- Documentação IE-02 descreve entidades separadas de eleição, turno, cargo, partido, candidato, território, dataset e execução de importação, com UUIDs e fatos associados a `round_id`, `office_id`, `section_id`, `source_dataset_id` e `import_run_id`.
- Loader: `scripts/electoral/load-tse-candidato-munzona-supabase.mjs`, destinado apenas a 2022 e 2026, usa Supabase diretamente e grava em `electoral_results_totals`.
- Validador: `scripts/electoral/validate-tse-candidato-munzona-supabase.mjs`, consulta esse segundo modelo.

**Achado:** os caminhos não são simples versões intercambiáveis do mesmo esquema. Os scripts usam tabelas, colunas, identificadores e grãos diferentes. A migração compacta examinada não cria as tabelas `electoral_rounds`, `electoral_offices`, `electoral_source_datasets`, `electoral_results_totals` ou as demais entidades da documentação IE-02.

**Conclusão provisória:** não é seguro escolher uma dessas estruturas como canônica apenas pelo nome do arquivo ou pelo estado descrito no roadmap. Antes de qualquer reutilização, é preciso verificar as migrações completas, o histórico de commits e o esquema real do Supabase local/remoto. A documentação deve nomear explicitamente qual modelo está ativo, qual está legado e se existe plano de migração entre eles.

### 11.2 O loader por município/zona não entrega dados por seção

Em `load-tse-candidato-munzona-supabase.mjs`, o filtro é RS + Deputado Estadual + primeiro turno; as linhas positivas são agregadas por município/zona/candidato, e o payload grava `section_id: null`. O nome da fonte é `votacao_candidato_munzona`.

Isso é coerente com uma fonte de município/zona, mas **não demonstra cobertura por seção**. A presença de uma tabela chamada `electoral_results_totals` ou de campos de seção nulos não substitui a ingestão de arquivos por seção. Para análises de seção, é necessário um pipeline específico e validação independente.

### 11.3 Risco de importação parcial no loader remoto

O loader remoto:
- remove registros de execuções anteriores pelo nome do arquivo antes de iniciar a nova carga;
- cria uma execução com status RUNNING;
- carrega dimensões em lotes;
- insere fatos em lotes na tabela de totais;
- marca a execução como COMPLETED no fim.

Não foi identificado, nos trechos examinados, um rollback transacional que abranja a execução completa no Supabase. Se um lote falhar após lotes anteriores terem sido inseridos, a carga pode deixar fatos parciais associados a uma execução que depois é marcada como FAILED. O status ajuda a identificar o problema, mas não garante que a carga anterior tenha sido preservada ou que os fatos parciais não afetem outras consultas.

**Recomendação:** carregar para uma execução/versionamento isolado, validar a execução completa e só então ativá-la como conjunto vigente; alternativamente, garantir limpeza de todos os fatos daquela execução em caso de falha. Testar o comportamento com falha simulada antes de adotar o loader.

### 11.4 Os validadores não são equivalentes e não provam o estado do banco

Há pelo menos dois contratos de validação:
- `validate-tse-rs.mjs` agrega `electoral_results_nominal` e espera, entre outros valores, 110.480 linhas para 2018;
- `validate-tse-candidato-munzona-supabase.mjs` procura execuções em `electoral_import_runs`, lê `electoral_results_totals` e espera 416.556 linhas para 2018, além de valores específicos de municípios, candidatos e votos.

Esses valores pertencem a caminhos/modelos diferentes e não devem ser comparados como se representassem necessariamente o mesmo grão. Além disso, o loader remoto examinado rejeita 2018, embora o validador remoto inclua 2018 no seu conjunto esperado. Isso pode refletir histórico de uma carga anterior ou uma dependência de outro loader, mas não está explicado pelo conjunto de arquivos lido.

**Ação:** identificar a origem exata de cada baseline, documentar seu grão e fazer cada validador falhar com código de saída diferente de zero quando encontrar divergência. No validador `validate-tse-rs.mjs`, a consulta imprime `OK`/ `DIVERGENTE`, mas o processo encerra com o status do `psql`; uma divergência de dados, por si só, não aparece codificada como falha de processo no código observado. Isso reduz a confiabilidade do validador em CI se o pipeline apenas observar o exit code.

### 11.5 A publicação analítica tem risco de janela inconsistente

Em `publish-analytics-projection.mjs`, as linhas são calculadas localmente e há uma validação de dimensão regional antes da publicação. Entretanto:
- a rotina apaga as projeções de anos selecionados antes de completar a nova publicação;
- depois faz upsert em várias tabelas, em lotes separados;
- não existe, no script examinado, uma transação única envolvendo todas as tabelas remotas nem uma troca atômica de versão;
- a tabela `electoral_analytics_municipality_regions` é publicada separadamente e não está na lista de tabelas limpas por ano, porque sua chave é por município;
- o script faz upsert de `electoral_analytics_elections` antes de limpar a projeção e repete o upsert depois da limpeza.

A última repetição parece redundante, enquanto a limpeza seguida de múltiplos lotes cria uma janela em que o runtime pode ler projeções incompletas. Não é prova de que houve falha real, mas é um risco estrutural do método de publicação.

**Direção recomendada:** publicação imutável por `source_version`/snapshot, validação de contagens e totais, e ativação de uma versão completa por troca atômica. Até existir isso, classificar a publicação como não atômica.

### 11.6 O catálogo contém 100 planos; o runtime declara 80 intents

Comparação estática dos arquivos lidos:
- `electoral-orchestration.json`: 100 planos únicos;
- `electoral-skills.json`: 19 skills e 100 mapeamentos de intenção;
- `electoral-agents.json`: 5 agentes e 100 rotas;
- `server/electoralIntelligence.ts`: 80 IDs no conjunto `RUNTIME_IMPLEMENTED` e 83 rótulos de `case` observados no dispatcher.

Vinte IDs declarados nos planos não aparecem no conjunto `RUNTIME_IMPLEMENTED`. Entre eles estão `overview.vote_distribution`, `history.turning_points`, `territory.map_growth`, `territory.region_opportunity` e `competition.candidate_context`. Um deles, `territory.region_opportunity`, é marcado como PENDENTE no catálogo; os outros dezenove aparecem marcados como IMPLEMENTADO apesar de não constarem do conjunto explícito de runtime implementado.

Dez IDs que constam do conjunto `RUNTIME_IMPLEMENTED` não aparecem como rótulos `case` no dispatcher, incluindo `overview.total_votes`, `overview.state_share`, `territory.region_strength` e `competition.regional_competition`. Alguns podem ser executados por caminhos especiais antes do switch, portanto isso não prova ausência de execução; prova que o mapeamento não pode ser inferido apenas pelo conjunto e pelo switch. É necessário seguir cada intent até sua resposta final.

**Conclusão:** os estados declarados nos JSONs não são prova suficiente de implementação funcional. A plataforma independente deve gerar ou testar uma matriz automática de 100 intents: catálogo → agente/skill → handler → método → consulta de dados → contrato de saída → teste. Nenhum item deve ser marcado como implementado sem teste de integração reproduzível.

### 11.7 Guardas de contexto não equivalem a autorização de dados

`src/contracts/electoralContext.ts` valida candidato, eleição e cargo contra o workspace e monta `allowedCandidateIds`. É um bom contrato de domínio, mas essa função TypeScript, isoladamente, não demonstra que toda consulta no servidor ou no banco respeita o contexto autorizado.

O servidor de inteligência consultado executa consultas Supabase por candidato/ano e em tabelas de projeção. A auditoria completa deve verificar se o contexto é sempre resolvido no servidor confiável, se os filtros de UF/cargo/turno são aplicados em cada caminho e se as políticas RLS correspondem à política de acesso pretendida.

**Diretriz para a plataforma independente:** validar escopo no servidor antes de executar cálculo ou consulta; usar IDs oficiais contextualizados; não confiar em IDs ou filtros enviados pelo cliente; testar tentativas de cruzar UF, eleição, cargo e candidato.

### 11.8 Fórmulas determinísticas: riscos metodológicos a testar

A leitura de `src/lib/electoral-analytics.ts` aponta itens para testes de domínio:
- `coveragePercentage` usa por padrão o universo fixo de 497 municípios, adequado ao RS no escopo atual, mas inadequado como default para cobertura nacional ou outras UFs;
- `compareMunicipalHistory` compara somente municípios presentes no conjunto de destino e trata município ausente no conjunto de origem como zero; municípios que só existam na origem podem desaparecer da lista de mudanças;
- `consistentGrowth`, `consistentDecline` e `trendReversals` usam união de municípios, mas substituem ausência por zero. Isso pode confundir ausência de dado com votação efetivamente zero;
- médias e medianas operam sobre as linhas recebidas, não sobre um universo municipal explicitamente completo; o resultado depende da consulta que prepara a entrada;
- rankings e concentrações são reproduzíveis matematicamente, mas a correção eleitoral depende da definição de denominador, cobertura do conjunto e filtro de cargo/turno.

Não são conclusões de que todas essas métricas estão erradas; são casos-limite que precisam de testes explícitos e documentação metodológica antes de transportar o código.

### 11.9 Segurança e configuração: observações adicionais

- O loader remoto aceita a chave de serviço via argumento de linha de comando ou variável de ambiente. A preferência operacional deve ser variável de ambiente/secret manager; passar segredos em argumentos pode expô-los em histórico ou listagem de processos.
- A migração compacta dá leitura pública (`anon, authenticated`) a tabelas de fatos e dimensões, mas permite leitura da tabela de execuções somente a `authenticated`. A projeção analítica, por sua vez, usa `private.is_staff()`. A política final precisa ser deliberada por camada, não herdada acidentalmente.
- Não foi feita varredura de histórico Git, arquivos de ambiente, logs ou workflows para detectar segredos. Este relatório não declara que o repositório esteja livre de segredos.

## 12. Prioridade técnica após a auditoria estática

Antes de adaptar o pipeline à Inteligência Eleitoral, a ordem mais segura é:

1. **Resolver a fonte de verdade do esquema:** inventariar todas as migrações eleitorais e identificar qual esquema existe realmente em cada ambiente.
2. **Resolver a semântica e a cobertura:** separar município/zona de seção e harmonizar baselines por grão, cargo, UF, turno e ano.
3. **Tornar a ingestão recuperável:** garantir idempotência, isolamento por execução, limpeza/rollback de falhas e checksums.
4. **Tornar a publicação atômica/versionada:** impedir que o runtime veja uma projeção parcial.
5. **Gerar o mapa das 100 intenções:** identificar as 20 intents sem runtime declarado e os dez casos sem dispatcher explícito, verificando caminhos especiais e testes.
6. **Testar fórmulas com ausências e limites:** universo municipal completo, zero real versus dado ausente, empates, denominadores zero e filtros.
7. **Só então selecionar código para reutilização:** portar funções puras e contratos aprovados, não scripts ou dependências de banco sem compatibilidade demonstrada.

**Limite da conclusão:** tudo acima é evidência de leitura estática dos arquivos citados. Não foi confirmado se as migrações foram aplicadas, se esses scripts foram usados em produção, se os números esperados correspondem a dados oficiais atuais ou se os riscos descritos já causaram incidente.


## 13. Terceira passada — testes, chatbot e dimensão regional

### 13.1 Há testes unitários, mas parte deles valida contratos mockados

A árvore do repositório contém:
- `tests/unit/electoral-analytics.test.ts`;
- `tests/unit/electoral-intelligence.test.ts`;
- `tests/unit/electoral-chatbot.test.ts`;
- `tests/unit/electoral-dashboard.test.ts`;
- `tests/unit/electoral-presentation.test.ts`;
- `tests/unit/electoral-report.test.ts`;
- `tests/api/electoral-candidates.test.ts`.

A existência desses arquivos é positiva, mas esta auditoria não os executou. A leitura de `electoral-intelligence.test.ts` mostra consultas simuladas com datasets sintéticos e respostas mockadas do Supabase. Isso valida parte do comportamento do código com fixtures, mas não prova que o banco publicado tenha o mesmo conteúdo nem que as queries reais funcionem com o schema aplicado.

O teste de API `electoral-candidates.test.ts` verifica que endpoints eleitorais rejeitam requisições sem autenticação (401). É uma evidência útil para esse caso específico, mas não prova que todos os caminhos estejam protegidos por autorização por papel, workspace, UF, eleição e cargo.

### 13.2 Os testes analíticos não cobrem explicitamente todos os riscos identificados

O teste `electoral-analytics.test.ts` cobre agregações básicas, percentuais com denominador zero, concentração Top-K, rankings, mudanças históricas e algumas métricas territoriais/competitivas. Entretanto, no trecho lido, não há teste explícito para:
- município existente no ano anterior, mas ausente no ano posterior;
- diferença entre zero eleitoral real e ausência de dado;
- universo municipal parametrizado para outras UFs;
- empate de ranking em todas as posições relevantes;
- divergência de soma por granularidade;
- dados duplicados ou múltiplos candidatos com número de urna reutilizado em eleições diferentes;
- reconciliação automática entre fatos e baseline oficial.

Alguns desses casos podem estar cobertos em outros testes ou no restante do arquivo; não foram encontrados na leitura estática realizada. O ponto é criar testes explícitos para os riscos metodológicos, não presumir cobertura por existir um arquivo de teste.

### 13.3 O chatbot tem contrato declarado como pronto, mas o próprio catálogo marca runtime pendente

`src/data/electoral-chatbot.json` declara:
- colocação dentro do dashboard existente do gabinete;
- acesso privado com autenticação/RBAC do gabinete;
- pipeline pergunta → resolução de escopo → intent → plano → resultado determinístico → RAG metodológico → interpretação;
- proibição de inventar números/fórmulas e de acessar banco local/arquivos brutos pelo browser;
- estado `CONTRACT_READY_RUNTIME_PENDING`;
- dependências pendentes: publicar projeção analítica, ligar runtime de orquestração à aplicação, conectar provider LLM após o resultado determinístico e executar integração/E2E.

Esse arquivo é explícito: o contrato conceitual do chatbot não deve ser confundido com runtime concluído. A documentação de agentes também diz que a implementação operacional de chatbot, RAG e chamada real de LLM pertence a fase posterior.

**Consequência para o projeto independente:** aproveitar o pipeline conceitual e o contrato de saída, mas implementar o runtime próprio como parte da plataforma independente. Não assumir que o projeto Carlos Búrigo já oferece um runtime de agentes/skills transplantável e pronto para produção.

### 13.4 Dimensão regional é um componente adicional, não parte garantida do esquema compacto

A árvore contém migrações posteriores:
- `20261008190000_create_electoral_regional_dimension.sql`;
- `20261008200000_fix_electoral_rgi_tse_ibge_crosswalk.sql`.

O script de publicação também lê `src/data/ibge-rs-rgi-2024.json`, associa municípios por nome normalizado e falha se não encontrar código IBGE/região. Esse mecanismo é útil como dimensão geográfica, mas a associação por nome normalizado merece auditoria de colisões, exceções e mudanças de nomenclatura. O código IBGE/TSE deve ser a chave primária do cruzamento sempre que a fonte fornecer código confiável; o nome pode servir como diagnóstico ou fallback controlado.

Como o script publica uma tabela regional por município sem chave de ano, é importante verificar a migração regional e a versão do cruzamento: a região geográfica pode permanecer estável entre eleições, mas a dimensão de correspondência e os códigos de referência precisam de versionamento e rastreabilidade próprios.

### 13.5 Inventário da árvore confirmou ausência de testes e migrações eleitorais no projeto de destino

A árvore consultada do repositório Inteligência Eleitoral continha 40 caminhos no momento da leitura, sem diretório de migrações eleitorais ou arquivos de teste identificados pelo filtro de nomes utilizado. Isso não prova que não exista validação manual ou fora do repositório, mas indica que a base de testes e o pipeline de dados ainda não estão representados no código versionado encontrado.

**Próxima necessidade para o projeto independente:** estabelecer desde o início testes para fórmulas, contratos, ingestão, reconciliação, autorização e runtime de IA, evitando transferir a dívida de evidência do projeto de referência.
