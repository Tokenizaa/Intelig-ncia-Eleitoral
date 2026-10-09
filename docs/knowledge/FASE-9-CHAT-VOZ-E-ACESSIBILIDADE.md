# Fase 9 — Assistente Analítico, Interação por Voz e Acessibilidade
**Especificação do Chatbot Estruturado, Síntese Oral (TTS), Reconhecimento de Fala (STT) e Conformidade WCAG**  
**Data:** 2026-10-09 · **Status:** Documento Fundacional Aprovado  
**Escopo:** Diretrizes de interação conversacional, integração multimodal de voz, acessibilidade para leitores de tela e controle estrito contra alucinações de LLM.

---

## 1. O Modelo do Assistente de Inteligência Eleitoral

O assistente conversacional da plataforma não é um chatbot genérico de conversação aberta. Ele opera como um **copiloto analítico e orquestrador de investigações eleitorais**.

### 1.1 O Que a LLM Faz
1. **Compreensão de Linguagem Natural e Desambiguação:** Mapeia perguntas informais da campanha (ex: *"Como a gente foi em Caxias?"*, *"Onde nós perdemos votos pro Pasin?"*, *"A abstenção prejudicou a gente?"*) para os parâmetros formais da consulta (município, ciclo eleitoral, candidato alvo, concorrente).
2. **Seleção de Família de Intenção:** Identifica qual das 6 famílias canônicas de templates responde à dúvida com maior rigor.
3. **Explicação Contextual dos Resultados:** Recebe o payload estruturado já calculado matematicamente pelo motor determinístico e redige uma explicação em prosa fluida, acessível para analistas, consultores e coordenadores sem formação estatística avançada.
4. **Sinalização de Limitações Epistemológicas:** Adiciona advertências mandatórias sobre as fronteiras do que os dados provam e não provam.
5. **Formulação de Próximos Passos (Guided Discovery):** Oferece sugestões inteligentes de continuidade investigativa.

### 1.2 O Que a LLM Jamais Faz (Proibições Incondicionais)
* **Nunca calcula dados matemáticos:** Fórmulas, subtrações, percentuais, rankings e quocientes de localização são executados com precisão estrita em TypeScript/SQL no motor determinístico.
* **Nunca inventa denominadores ou dados ausentes:** Se um dado não existir no TSE para o ano consultado, a IA reporta formalmente `N/D` e explica que o dado não consta na base oficial.
* **Nunca transforma correlação em causalidade:** É terminantemente proibido afirmar "o eleitor de X votou em Y porque ocorreu o fato Z" sem estudo causal formal aprovado.

---

## 2. Anatomia de uma Resposta no Chatbot

Toda resposta analítica gerada pelo assistente segue uma hierarquia visual e cognitiva em **6 camadas**:

```text
┌────────────────────────────────────────────────────────┐
│ 1. SÍNTESE EXECUTIVA EM LINGUAGEM CLARA                │
│    "Identificamos uma perda de 1.890 votos em Caxias... │
├────────────────────────────────────────────────────────┤
│ 2. INDICADOR-CHAVE (KPI CARD)                          │
│    [-1.890 votos | -8,2% | Share: 10,1% -> 8,7%]       │
├────────────────────────────────────────────────────────┤
│ 3. EVIDÊNCIA ESTRUTURADA (TABELA / GRÁFICO / MAPA)     │
│    [Tabela microterritorial das seções mais críticas]   │
├────────────────────────────────────────────────────────┤
│ 4. NOTA METODOLÓGICA & TESTE DE HIPÓTESES              │
│    "A hipótese de abstenção foi refutada porque..."    │
├────────────────────────────────────────────────────────┤
│ 5. SUGESTÕES CLICÁVEIS DE APROFUNDAMENTO (FOLLOW-UP)   │
│    [Ver seções de 2026] [Comparar com Pepe Vargas]     │
├────────────────────────────────────────────────────────┤
│ 6. AÇÃO DIRETA NO SISTEMA                              │
│    [Abrir Dossiê Territorial Completo de Caxias do Sul]│
└────────────────────────────────────────────────────────┘
```

---

## 3. Frente G — Arquitetura de Interação por Voz (STT e TTS)

A interação por voz expande a utilidade da plataforma para o trabalho de campo (veículos de campanha, reuniões rápidas e acessibilidade para pessoas com deficiência visual ou motora).

### 3.1 Entrada por Voz: Speech-to-Text (STT)
A transcrição da fala do usuário para texto opera em arquitetura híbrida de duas camadas:

* **Camada 1 — Web Speech API Nativa (`webkitSpeechRecognition` / `SpeechRecognition`):**
  * *Vantagens:* Zero custo de API, execução local/nativa no navegador, sem latência de rede adicional para envio de áudio, privacidade preservada.
  * *Configuração:* `lang: 'pt-BR'`, `continuous: false`, `interimResults: true`.
  * *Tratamento de Vocabulário Eleitoral Especializado:* Inserção de gramática de apoio ou pós-processamento de nomes próprios comuns do contexto político do RS (ex: converter fonética *"Burigo"* em *"Carlos Búrigo"*, *"Pasin"* em *"Guilherme Pasin"*, *"Pepe"* em *"Pepe Vargas"*, *"Farroupilha"*, *"Caxias"*).
* **Camada 2 — Fallback de Servidor:**
  * Para navegadores sem suporte à Web Speech API nativa (ex: alguns navegadores corporativos restritos ou Firefox legado), gravação de blob de áudio de até 15 segundos enviada para rota segura com transcrição via Whisper ou Gemini Audio.

### 3.2 Saída por Voz: Text-to-Speech (TTS) e A "Regra de Ouro da Síntese Oral"
O maior erro em assistentes de dados por voz é forçar o sintetizador a ler tabelas inteiras ou listas infindáveis de números, gerando fadiga auditiva e incompreensão.

**A Regra de Ouro da Síntese Oral:**  
A voz do assistente **nunca lerá tabelas linha por linha, nem recitará dezenas de decimais**.  
O sintetizador lerá exclusivamente o campo **`oralBriefingText`** do contrato de apresentação — uma síntese falada elegante, fluida e concisa (2 a 3 frases) elaborada especificamente para escuta.

*Exemplo de Comparação:*
* **O que a tela exibe (Visual Completo):** Tabela de 10 seções, votos nominais de 2018, 2022 e 2026, $\Delta V$, $\Delta \text{p.p.}$, quociente eleitoral, gráfico de barras e boletim de urna.
* **O que a voz fala (`oralBriefingText`):**  
  *"Em Caxias do Sul, a votação registrou recuo de mil oitocentos e noventa votos entre 2018 e 2022. Os dados de urna confirmam que a causa principal não foi abstenção, mas migração de votos para concorrentes regionais nas seções centrais da cidade."*

### 3.3 Controles de Áudio e Usabilidade por Voz
* **Controles Físicos na Interface:**
  * Botão de reprodução/pausa com indicador visual de áudio ativo (animação suave de onda sonora).
  * Controle de velocidade da fala: $1,0\times$ (padrão), $1,25\times$ (rápido executivo) e $1,5\times$.
* **Interrupção Imediata (Barge-in):**
  * Tecla `Escape` (`Esc`): Silencia a voz imediatamente.
  * Envio de uma nova pergunta: Interrompe instantaneamente a leitura da resposta anterior.

---

## 4. Acessibilidade Digital e Conformidade WCAG 2.1 (Nível AA / AAA)

A plataforma é projetada para uso integral por pessoas com deficiência visual, auditiva ou motora, cumprindo rigorosamente as diretrizes internacionais da W3C / WAI:

### 4.1 Navegação Completa por Teclado
* Nenhum componente ou ação depende exclusivamente do cursor do mouse.
* Ordem de tabulação lógica (`tabindex` natural):
  1. Menu lateral e alternância de abas analíticas (`ArrowUp` / `ArrowDown` ou `Tab`).
  2. Barra de filtros ativos e controles de ciclo eleitoral (`Enter` ou `Space` para ativar).
  3. Tabelas navegáveis com foco em células e ações de expansão (`Enter` para abrir inspeção de seções).
  4. Botão e campo do assistente analítico acessíveis via atalho universal (`Alt + K` ou `Ctrl + K`).
* Ausência de *keyboard traps* (o foco nunca fica preso em nenhum modal ou gaveta sem que `Escape` permita fechá-lo).

### 4.2 Suporte a Leitores de Tela (NVDA, JAWS, VoiceOver, TalkBack)
* **Regiões Semânticas HTML5:** Uso estrito de `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>` e `<footer>`.
* **Regiões Vivas para Mensagens (`aria-live="polite"`):** Quando o assistente conclui o cálculo de uma resposta, a síntese executiva é anunciada com cortesia ao leitor de tela sem interromper a leitura atual.
* **Acessibilidade em Tabelas:**
  * Uso correto de `<th>` com atributos `scope="col"` e `scope="row"`.
  * Cabeçalhos complexos associados via atributo `id` e `headers`.
  * Números formatados com atributos de texto audível quando houver abreviações (ex: `<span aria-label="menos dois vírgula quatro pontos percentuais">-2,4 p.p.</span>`).
* **Equivalente Textual para Gráficos e Mapas:**
  * Todo gráfico SVG ou mapa Leaflet possui um elemento alternativo semanticamente acessível (`<table class="sr-only">`) contendo a mesma massa de dados em formato tabular oculto para ser consumido por leitores de tela.

### 4.3 Acessibilidade de Cores e Daltonismo
* **Conformidade de Contraste:** Relação mínima de $4,5:1$ para texto comum e $3,0:1$ para componentes de interface em relação ao plano de fundo.
* **Testes Contra Deficiências de Visão Cromática:**
  * *Deuteranopia e Protanopia (Daltonismo Vermelho-Verde):* As cores de avanço (verde esmeralda escuro `#064e3b`) e recuo (vermelho carmim `#991b1b`) possuem diferenças acentuadas de luminosidade intrínseca e são sempre acompanhadas de sinal de positivo/negativo e setas direcionais $\uparrow / \downarrow$, garantindo distinção imediata mesmo em visão monocromática total.
