# Glossário metodológico — Inteligência Eleitoral
**Versão:** 1.1 · **Data:** 2026-10-09

Este glossário fixa o significado dos termos usados nos contratos, indicadores, relatórios e prompts da plataforma. Quando a documentação oficial do TSE definir um termo operacional específico, registrar essa definição e sua referência junto à fonte.

| Termo | Definição operacional | Regra de uso |
|---|---|---|
| Unidade de análise | Entidade sobre a qual uma observação ou cálculo é feito. | Declarar explicitamente; não alternar seção, município e candidato sem agregação documentada. |
| População/universo | Conjunto completo de unidades a que a análise se refere. | Informar critérios, período, território e exclusões. |
| Estimando | Quantidade precisa que a análise pretende descrever ou estimar. | Definir antes de escolher fórmula/modelo. |
| Observação | Registro medido ou publicado por uma fonte. | Preservar fonte, granularidade e significado original. |
| Indicador | Medida derivada de uma definição operacional e regra de cálculo versionadas. | Não publicar sem ficha metodológica. |
| Numerador | Quantidade que ocupa a parte superior de uma razão. | Declarar a definição e o universo incluído. |
| Denominador | Quantidade que normaliza uma razão ou proporção. | Declarar e validar; zero ou ausência devem ser tratados explicitamente. |
| Votos nominais | Votos atribuídos a candidatos conforme a definição da fonte e do pleito. | Não confundir com votos válidos totais ou comparecimento. |
| Votos válidos | Categoria de totalização definida pelas regras oficiais do pleito. | Consultar a documentação específica; não inferir por nome de coluna. |
| Eleitorado apto | Quantidade de eleitores aptos segundo a fonte oficial pertinente. | Não usar como sinônimo de votantes ou votos válidos. |
| Comparecimento | Eleitores que compareceram segundo a definição oficial. | Não inferir automaticamente a partir de votos por candidato. |
| Zero observado | Valor medido igual a zero. | Diferenciar de ausência ou falha de ingestão. |
| Dado ausente | Valor esperado que não está disponível. | Não substituir por zero sem regra explícita e justificativa. |
| Dado não publicado | Valor ou registro que a fonte não disponibilizou para o escopo consultado. | Distinguir de falha de aquisição ou carga; registrar evidência da fonte. |
| Dado não carregado | Dado que deveria estar no processo, mas não foi ingerido ou ficou fora da execução. | Tratar como falha de pipeline/cobertura, não como zero nem como ausência oficial. |
| Dado inválido | Valor ou registro que viola domínio, formato, chave ou regra semântica confirmada. | Preservar o original, registrar motivo e bloquear quando a regra for crítica. |
| Não aplicável | Campo que não faz sentido para aquela observação. | Não confundir com ausência ou zero. |
| Cobertura | Fração/universo das unidades esperadas efetivamente presentes e válidas. | Informar universo e regra de cálculo; não usar uma constante territorial universal. |
| Proveniência | Histórico da origem, transformação e uso de um dado/artefato. | Cada saída publicada deve apontar para dados, código e parâmetros. |
| Granularidade | Nível de detalhe real de um conjunto. | Agregado municipal não equivale a seção eleitoral. |
| Harmonização | Regras para tornar categorias/territórios comparáveis entre períodos/fontes. | Versionar e relatar unidades não correspondidas. |
| Baseline | Referência definida para comparação ou validação. | Vincular a fonte, versão, filtros, grão e justificativa. |
| Reprodução computacional | Reexecução da análise com os mesmos dados, código e parâmetros para verificar o resultado. | Guardar ambiente, versões e artefatos suficientes. |
| Replicação | Nova investigação para verificar se resultados se mantêm em novos dados/estudo. | Não chamar simples rerun de replicação independente. |
| Descritivo | Resume observações disponíveis. | Não afirmar causas nem prever futuro. |
| Comparativo | Contrasta unidades/períodos compatíveis ou diferenças explicitadas. | Documentar comparabilidade e universo comum. |
| Associativo | Examina relação estatística entre variáveis. | Associação não prova causalidade. |
| Preditivo | Estima alvo não observado ou futuro. | Exige validação fora da amostra e baseline. |
| Causal | Estima efeito de exposição/intervenção sob pressupostos de identificação. | Não permitido sem desenho causal e pressupostos explícitos. |
| Exploratória | Busca padrões ou hipóteses não previamente especificados. | Rotular como exploratória; requer confirmação independente. |
| Confundimento | Situação em que uma variável se relaciona com exposição e resultado e pode distorcer uma associação. | Avaliar conforme pergunta e desenho, sem ajuste automático indiscriminado. |
| Viés | Desvio sistemático introduzido por seleção, medição, classificação ou modelo. | Descrever mecanismo plausível e direção possível quando conhecida. |
| Incerteza | Limitação de conhecimento sobre valor, medida ou generalização. | Não reduzir automaticamente a erro amostral. |
| Sensibilidade | Avaliação de como escolhas/pressupostos alternativos alteram os resultados. | Aplicar quando decisões metodológicas relevantes forem contestáveis. |
| Reconciliação | Comparação de resultados ou totais com uma referência compatível em universo, filtros, semântica e granularidade. | Registrar referência, tolerância justificada e regra de falha; divergência crítica bloqueia publicação. |
| Publicação atômica | Ativação de uma versão completa de resultados em uma única mudança observável, sem expor carga parcial. | Preparar e validar em staging; falha mantém a versão ativa anterior. |
| Snapshot | Versão identificada e imutável dos resultados publicados. | Publicar integralmente; não misturar lotes de versões diferentes. |
| Revisão independente | Verificação por pessoa/agente diferente do autor da mudança ou análise, com acesso às evidências. | Não confundir com auto-revisão nem com aprovação automática por testes sintéticos. |
| Validação | Evidência de que dados, método ou saída satisfazem critérios definidos. | Declarar exatamente o que foi validado e com quais dados. |

## Termos proibidos sem definição

Não usar isoladamente “crescimento consistente”, “território forte”, “potencial”, “risco eleitoral”, “tendência”, “concentração alta”, “oportunidade” ou “probabilidade” como se fossem medidas objetivas. Cada termo precisa de definição operacional, universo, método e limites de interpretação.

## Referências-base

- FAIR Principles: https://doi.org/10.1038/sdata.2016.18
- National Academies, *Reproducibility and Replicability in Science*: https://doi.org/10.17226/25303
- TSE, Portal de Dados Abertos: https://dadosabertos.tse.jus.br/
- STROBE (quando aplicável a estudos observacionais): https://www.strobe-statement.org/
