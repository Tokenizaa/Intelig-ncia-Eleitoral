# Ficha metodológica do piloto — Eleições 2022 / RS / Deputado Estadual / seção

**ID:** `pilot-2022-rs-deputado-estadual-turno-1-secao`  
**Versão:** 0.1 — especificação prévia à aquisição  
**Data:** 2026-10-09  
**Estado:** proposta documentada; aguardando aquisição do artefato, inspeção do layout, reconciliação e revisão independente.  
**Tipo de análise:** descritiva; a reconciliação é uma verificação de qualidade, não um segundo objetivo analítico.

## A. Identificação

- **Pergunta de pesquisa:** qual é a distribuição observada dos votos nominais por candidato e seção eleitoral para Deputado Estadual no Rio Grande do Sul, no primeiro turno das Eleições Gerais de 2022, e os totais agregados podem ser reconciliados com uma referência oficial compatível?
- **Finalidade:** demonstrar um pipeline eleitoral pequeno, reproduzível e auditável antes de ampliar cargos, anos, UFs ou indicadores.
- **Público destinatário:** equipe técnica e metodológica do produto.
- **Decisão:** não é um modelo preditivo, uma avaliação causal ou uma análise de comportamento individual do eleitor.

## B. Pergunta e finalidade

- **Tipo:** descritiva.
- **População/universo-alvo:** registros oficiais de votação nominal por seção para Deputado Estadual, RS, 1º turno de 2022, conforme o escopo e as regras da fonte oficial.
- **Critérios de inclusão:** registros do arquivo oficial que correspondam ao cargo, turno e UF do piloto, depois de confirmados pelos campos e códigos do layout.
- **Exclusões:** outros cargos, outros turnos, outras UFs, totalizações agregadas de grão incompatível e linhas cuja semântica não possa ser determinada pelo layout. Cada exclusão deve ser quantificada e justificada.
- **Unidade de observação:** registro de votação nominal no grão declarado pelo layout oficial; a expectativa é candidato × seção, mas isso só será confirmado após inspeção.
- **Estimando/quantidade-alvo:** votos nominais observados por candidato e seção no universo definido; soma por candidato no RS; distribuição de registros e cobertura das chaves eleitorais presentes na fonte.
- **Não faz parte do estimando:** votos de partido/lema, votação presidencial, comparecimento, eleitorado apto, participação ou comportamento individual, a menos que uma pergunta separada seja especificada e aprovada.

## C. Conceitos e estimando

- **Voto nominal:** valor oficial associado a candidato e unidade eleitoral, segundo a semântica do layout.
- **Seção eleitoral:** unidade oficial identificada por códigos e contexto territorial do TSE; não será identificada apenas por nome textual.
- **Zero observado:** valor zero explicitamente representado conforme o contrato da fonte. Ausência de linha não será transformada em zero.
- **Ausência:** falta de registro ou valor; deve ser distinguida de não aplicável, inválido, não publicado ou não carregado.
- **Chaves candidatas:** combinação de eleição/ano, turno, UF, município, zona, seção e identificador oficial do candidato, conforme os campos reais do layout. Esta lista é uma hipótese de inspeção, não uma declaração do esquema confirmado.
- **Identidade do candidato:** código/identificador oficial contextualizado pelo pleito e cargo; nome e número de urna não serão usados isoladamente como chave global.

## D. Fontes e proveniência

### Fonte primária candidata

- **Catálogo:** https://dadosabertos.tse.jus.br/dataset/resultados-2022
- **Recurso:** https://dadosabertos.tse.jus.br/dataset/resultados-2022/resource/12858da8-e607-4b3b-8aa4-9a866c70573c
- **Arquivo direto:** https://cdn.tse.jus.br/estatistica/sead/odsele/votacao_secao/votacao_secao_2022_RS.zip
- **Nome do recurso no catálogo:** RS - Votação por seção eleitoral - 2022
- **ID do recurso:** `12858da8-e607-4b3b-8aa4-9a866c70573c`
- **Licença exibida:** Creative Commons Attribution.
- **Metadados exibidos:** recurso criado em 06/10/2022; metadados atualizados em 06/10/2022.
- **Layout/versão exata:** pendente de inspeção e vínculo à especificação oficial pertinente.
- **Data/hora de obtenção, tamanho, SHA-256, encoding, delimitador e nome do arquivo interno:** pendentes; o download não foi concluído nesta sessão.
- **Estado de evidência:** o catálogo foi consultado; o artefato não foi adquirido nem validado.

### Referência para reconciliação

Buscar uma totalização oficial por candidato para o mesmo cargo, UF e turno, preferencialmente em uma extração oficial agregada distinta. Registrar URL, versão/data, grão, checksum e regra de agregação antes de comparar. Se a referência tiver outro grão, a comparação será feita apenas após agregação explícita para o mesmo universo. Por ser material do mesmo órgão, a concordância entre duas extrações do TSE não deve ser descrita como validação por uma fonte institucional independente; é uma reconciliação cruzada de publicações oficiais.

## E. Transformações

1. Preservar o ZIP original sem modificações e calcular SHA-256 e tamanho em bytes.
2. Registrar data/hora da obtenção, URL, metadados e versão do código.
3. Inspecionar o conteúdo compactado e verificar o layout; rejeitar estrutura não reconhecida.
4. Guardar os campos brutos e metadados de origem antes de normalizar.
5. Confirmar no layout os códigos de cargo, turno, UF, município, zona, seção e candidato; não adivinhar nomes de coluna ou códigos.
6. Aplicar filtros explicitamente versionados para Deputado Estadual, RS e primeiro turno.
7. Preservar a granularidade da fonte e produzir agregação por candidato somente como derivação identificada.
8. Não imputar ausências, não remover outliers automaticamente e não deduplicar sem regra baseada no contrato do dado.
9. Registrar contagens e valores antes/depois de cada transformação, com motivo para cada descarte.
10. Calcular uma saída determinística com ordenação estável e formato numérico explícito.

## F. Método de cálculo/modelagem

- **Método:** estatística descritiva determinística; sem inferência amostral, previsão ou causalidade.
- **Cálculo central:** soma dos votos nominais por identificador oficial do candidato sobre os registros elegíveis do universo definido.
- **Denominador:** não há taxa percentual no primeiro escopo. Qualquer proporção posterior exige definição própria de numerador, denominador e universo.
- **Precisão:** preservar votos como inteiros, rejeitando valores que não satisfaçam a semântica e o domínio confirmados no layout.
- **Pressupostos:** a publicação oficial selecionada corresponde ao pleito e ao cargo definidos; os identificadores e o grão são interpretados conforme especificação oficial.
- **Alternativas rejeitadas:** não usar dados por município/zona como se fossem por seção; não inferir votos a partir de gráficos ou páginas narrativas; não substituir dados faltantes por zero; não usar nomes como chave primária.
- **Referências metodológicas:** documentação do conjunto e layout oficial do TSE, a identificar por versão; princípios gerais de proveniência e reprodutibilidade descritos na metodologia canônica.

## G. Validação

### Gates de aceitação

1. **Aquisição:** URL e artefato identificados; download concluído; tamanho maior que zero; SHA-256 calculado e preservado. Falha bloqueia o pipeline.
2. **Layout:** arquivo interno e versão do layout identificados; colunas e semântica confirmadas. Layout desconhecido bloqueia o processamento.
3. **Escopo:** somente registros do cargo, turno, UF e grão definidos; qualquer código não reconhecido gera erro explícito.
4. **Integridade:** chaves obrigatórias não nulas; domínios válidos; duplicatas examinadas contra a chave de negócio derivada do layout; duplicata não explicada bloqueia a publicação.
5. **Ausências:** valores ausentes, não aplicáveis, inválidos, não publicados e não carregados não são convertidos em zero.
6. **Cobertura:** registrar número de registros, chaves únicas, seções e candidatos observados e limitações da fonte; não comparar com baselines sem grão e universo compatíveis.
7. **Reconciliação:** somas por candidato devem ser comparadas com a referência oficial compatível. Qualquer divergência fora de tolerância previamente justificada resulta em falha efetiva (exit code diferente de zero) e bloqueia publicação.
8. **Reprodutibilidade:** repetir a execução com os mesmos artefatos, código e parâmetros deve produzir a mesma saída canônica e checksum.
9. **Publicação atômica:** carregar para staging isolado por execução; validar integralmente; ativar somente a versão aprovada por troca atômica de referência. Falha deve preservar a publicação anterior.
10. **Revisão independente:** revisor distinto do autor da transformação verifica o método, o grão, as chaves, a reconciliação e os resultados antes da publicação.

- **Testes unitários planejados:** parsing de valores inteiros, filtros de escopo, agregação por candidato, chaves nulas, duplicatas, código de cargo desconhecido e denominadores/ausências, quando aplicáveis.
- **Testes de propriedade:** idempotência da normalização; soma de agregados igual à soma dos registros elegíveis; saída estável para mesma entrada; nenhuma linha excluída sem motivo.
- **Fixtures sintéticas:** podem verificar lógica, mas nunca serão rotuladas como dados oficiais ou validação empírica.
- **Validação com dados reais:** não realizada.
- **Resultado da revisão independente:** pendente.

## H. Riscos e limitações

- O artefato ainda não foi baixado; checksum, layout, colunas, chaves e totais não estão confirmados.
- A URL de recurso e os metadados de catálogo não provam que o conteúdo atual foi adquirido ou processado.
- A reconciliação oficial ainda precisa de referência compatível e de critérios definidos antes de observar discrepâncias.
- Um resultado por seção não permite inferir comportamento individual do eleitor.
- O recorte RS/2022 não sustenta alegações de cobertura nacional.
- O escopo descritivo não autoriza explicações causais, previsão de eleições futuras ou generalização para outros cargos/anos/territórios.

## I. Reprodutibilidade e publicação

- **Commit/versão de código:** a preencher na implementação.
- **Ambiente e dependências:** a registrar com versões fixadas.
- **Parâmetros:** eleição 2022; RS; Deputado Estadual; 1º turno; grão conforme layout validado.
- **ID da execução analítica:** a gerar para cada execução.
- **Dados de entrada e checksum:** pendentes da aquisição.
- **Artefato de saída e checksum:** pendentes.
- **Snapshot publicado:** nenhum.
- **Rollback:** manter snapshot ativo anterior; ativar novo somente após todos os gates; falha preserva versão anterior.
- **Changelog:** qualquer alteração de filtro, chave, fonte, layout, agregação ou regra de validação exige registro e, quando alterar resultados, nova versão metodológica.

## J. Aprovação

- [x] Pergunta, tipo de análise, unidade pretendida e estimando definidos preliminarmente.
- [x] Recorte eleitoral e fonte candidata identificados no catálogo oficial.
- [ ] Fonte adquirida, checksum e layout registrados.
- [ ] Granularidade e universo confirmados no arquivo real.
- [ ] Fórmula final e chaves confirmadas após inspeção do layout.
- [ ] Referência oficial de reconciliação registrada.
- [ ] Testes independentes e reconciliação executados.
- [ ] Validação com dados reais evidenciada.
- [ ] Revisão independente aprovada.
- [ ] Publicação atômica implementada e testada.

**Decisão atual:** devolver para complementação; não aprovado para ingestão/publicação.  
**Justificativa:** o recorte está delimitado e o recurso foi identificado no catálogo oficial, mas o artefato não pôde ser obtido nesta sessão. Não há checksum, inspeção de layout, reconciliação, testes executados ou validação empírica.  
**Evidências:** [catálogo oficial do TSE](https://dadosabertos.tse.jus.br/dataset/resultados-2022) · [página do recurso RS](https://dadosabertos.tse.jus.br/dataset/resultados-2022/resource/12858da8-e607-4b3b-8aa4-9a866c70573c).
