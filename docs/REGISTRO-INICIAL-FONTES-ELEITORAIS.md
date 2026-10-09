# Registro inicial de fontes eleitorais
**Versão:** 1.0 · **Data:** 2026-10-09  
**Estado:** inventário inicial; nenhum arquivo foi baixado ou validado por este documento.

## Regras de uso
1. A página do portal não substitui a documentação do conjunto e o layout do arquivo específico.
2. Registrar cada release de dados separadamente, incluindo URL direta, data de obtenção, licença, checksum, filtros e granularidade.
3. Não comparar contagens de fontes de grãos diferentes.
4. Não presumir que todos os arquivos de uma eleição tenham a mesma estrutura dos anos anteriores.
5. A seleção da fonte depende da pergunta de pesquisa. Arquivo por seção e agregado por município/zona não são intercambiáveis.

## Fontes oficiais de partida

| Fonte | Conteúdo indicado pelo catálogo/documentação | Uso potencial | Validação obrigatória |
|---|---|---|---|
| [Portal de Dados Abertos do TSE](https://dadosabertos.tse.jus.br/) | Catálogo de conjuntos oficiais, com metadados e downloads. | Descoberta e identificação da fonte primária. | Capturar metadados, licença, versão e URL exata do conjunto usado. |
| [Resultados — Eleições 2022](https://dadosabertos.tse.jus.br/dataset/resultados-2022) | Catálogo descreve histórico de totalização, votação nominal/partido por município e zona, detalhe município/zona/seção e votação por seção; arquivos variam por abrangência. | Série histórica, comparações e análise territorial, conforme arquivo escolhido. | Verificar cargo, turno, UF, grão, layout, colunas, chaves, cobertura e totais. |
| [Arquivos e especificações do TSE](https://www.tse.jus.br/eleicoes/arquivos) | Especificações de arquivos e layouts da divulgação dos resultados. | Interpretar colunas, códigos e semântica oficial. | Vincular cada importação à versão da especificação aplicável. |
| [Informações técnicas sobre divulgação de resultados](https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados) | Instruções e especificações operacionais da divulgação. | Compreender mudanças de formato e processo. | Não assumir compatibilidade sem verificar o layout do pleito efetivo. |

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
Montar um inventário completo para os anos e cargos que o produto pretende suportar, começando por um recorte-piloto explicitamente limitado. Não declarar cobertura nacional até validar fonte, layout, cobertura e reconciliação em cada recorte anunciado.
