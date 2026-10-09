# Registro inicial de fontes eleitorais
**Versão:** 1.1 · **Data:** 2026-10-09  
**Estado:** inventário inicial com um recorte-piloto documentado; artefato oficial identificado, mas ainda não baixado nem validado empiricamente.

## Regras de uso
1. A página do portal não substitui a documentação do conjunto e o layout do arquivo específico.
2. Registrar cada release de dados separadamente, incluindo URL direta, data de obtenção, licença, checksum, filtros e granularidade.
3. Não comparar contagens de fontes de grãos diferentes.
4. Não presumir que todos os arquivos de uma eleição tenham a mesma estrutura dos anos anteriores.
5. A seleção da fonte depende da pergunta de pesquisa. Arquivo por seção e agregado por município/zona não são intercambiáveis.
6. A identificação do recurso no catálogo não equivale a aquisição, inspeção do layout, validação ou aprovação para publicação.
7. Quando checksum ou metadados do arquivo não puderem ser obtidos, registrar o campo como pendente e bloquear os gates dependentes; não preencher por inferência.

## Fontes oficiais de partida

| Fonte | Conteúdo indicado pelo catálogo/documentação | Uso potencial | Validação obrigatória |
|---|---|---|---|
| [Portal de Dados Abertos do TSE](https://dadosabertos.tse.jus.br/) | Catálogo de conjuntos oficiais, com metadados e downloads. | Descoberta e identificação da fonte primária. | Capturar metadados, licença, versão e URL exata do conjunto usado. |
| [Resultados — Eleições 2022](https://dadosabertos.tse.jus.br/dataset/resultados-2022) | O catálogo separa arquivos de votação por seção por UF e informa que os arquivos estaduais incluem Governador, Senador, Deputado Federal e Deputado Estadual; o arquivo BR é destinado à Presidência. | Fonte candidata para análise de votação nominal por seção, em cargo estadual e UF delimitados. | Verificar arquivo interno, layout aplicável, cargo, turno, chaves, cobertura e reconciliação. |
| [Arquivos e especificações do TSE](https://www.tse.jus.br/eleicoes/arquivos) | Especificações de arquivos e layouts da divulgação dos resultados. | Interpretar colunas, códigos e semântica oficial. | Vincular cada importação à versão da especificação aplicável. |
| [Informações técnicas sobre divulgação de resultados](https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados) | Instruções e especificações operacionais da divulgação. | Compreender mudanças de formato e processo. | Não assumir compatibilidade sem verificar o layout do pleito efetivo. |

## Recorte-piloto proposto

- **Identificador:** `pilot-2022-rs-deputado-estadual-turno-1-secao`
- **Eleição:** Eleições Gerais de 2022.
- **Cargo:** Deputado Estadual.
- **Turno:** 1º turno.
- **Território:** Rio Grande do Sul (RS).
- **Granularidade-alvo:** votação nominal por candidato e seção eleitoral, conforme o grão efetivamente definido pelo layout oficial.
- **Pergunta descritiva inicial:** qual é a distribuição observada dos votos nominais para candidatos a Deputado Estadual por seção eleitoral no RS, no 1º turno de 2022, e os totais agregados por candidato reconciliam com uma referência oficial independente compatível?
- **Justificativa:** o catálogo oficial apresenta um recurso estadual específico e declara que os arquivos estaduais de votação por seção incluem o cargo Deputado Estadual. Isso permite delimitar eleição, cargo, turno, UF e granularidade sem inferir que um arquivo agregado por município/zona representa seções.
- **Limite:** o recorte é uma prova metodológica regional, não evidência de cobertura nacional nem autorização para inferência causal ou predição.
- **Estado atual:** fonte identificada no catálogo; aquisição e validação do conteúdo pendentes.

### Release identificado no catálogo

| Campo | Registro verificado |
|---|---|
| Nome no catálogo | RS - Votação por seção eleitoral - 2022 |
| Conjunto | Resultados - 2022 |
| URL do catálogo | https://dadosabertos.tse.jus.br/dataset/resultados-2022 |
| URL da página do recurso | https://dadosabertos.tse.jus.br/dataset/resultados-2022/resource/12858da8-e607-4b3b-8aa4-9a866c70573c |
| URL direta do artefato | https://cdn.tse.jus.br/estatistica/sead/odsele/votacao_secao/votacao_secao_2022_RS.zip |
| Nome do artefato remoto | `votacao_secao_2022_RS.zip` |
| ID do recurso | `12858da8-e607-4b3b-8aa4-9a866c70573c` |
| Formato declarado no catálogo | CSV; o MIME do recurso indica ZIP (arquivo compactado com conteúdo a inspecionar) |
| Licença declarada | Creative Commons Attribution |
| Metadados do recurso | Criado em 06/10/2022; última atualização dos metadados indicada como 06/10/2022 |
| Fonte/área gestora do conjunto | Sistema SISTOT / Assessoria de Gestão Eleitoral (AGEL) |
| Data de consulta ao catálogo | 09/10/2026 |
| SHA-256, tamanho e data de obtenção local | **Pendentes**: o download não foi concluído nesta sessão |
| Layout/versão exata | **Pendente**: requer inspeção do conteúdo e associação à especificação oficial pertinente |
| Colunas, chaves e códigos | **Pendentes**: não inferir sem inspecionar o layout do arquivo |
| Totais de reconciliação | **Pendentes**: obter referência oficial de resultado por candidato compatível com cargo, turno, UF e universo |
| Estado | Documentado no catálogo; não baixado, não parseado, não validado e não publicado |

A página do conjunto informa que os arquivos de votação por seção separados por UF incluem Governador, Senador, Deputado Federal e Deputado Estadual, enquanto o arquivo BR inclui a totalização para Presidente. A presença do cargo no catálogo não comprova, isoladamente, que o artefato tenha sido baixado, que o layout tenha sido interpretado ou que os totais reconciliem.

## Ficha por release a preencher antes da ingestão

- ID interno do release:
- Eleição/ano:
- Cargo:
- Turno:
- UF/abrangência:
- Nome exato do dataset:
- URL do catálogo:
- URL direta do arquivo:
- Data de publicação/atualização oficial:
- Data/hora de obtenção:
- Licença:
- Layout/especificação e versão:
- Granularidade real:
- Número de linhas esperado e fonte desse valor (se existir):
- Campos-chave e códigos oficiais:
- SHA-256:
- Tamanho/encoding/delimitador:
- Regras de inclusão/exclusão:
- Totais oficiais para reconciliação:
- Limitações conhecidas:
- Estado: descoberto | documentado | baixado | parseado | validado | publicado

## Próxima tarefa metodológica
Adquirir o artefato oficial identificado, preservar o original, registrar tamanho e SHA-256, inspecionar o arquivo interno e sua especificação de layout, e obter uma referência independente para reconciliação. Até que esses passos sejam comprovados, o piloto permanece documentado, mas não validado.
