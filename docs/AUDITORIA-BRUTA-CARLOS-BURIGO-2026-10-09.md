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
