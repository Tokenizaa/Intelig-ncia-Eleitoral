import React, { useState } from 'react';
import {
  FileText,
  Printer,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Database,
  Building,
} from 'lucide-react';
import { useFilter } from '../context/FilterContext';
import { CANDIDATES, MUNICIPALITIES_DATA } from '../data/mockElections';
import {
  computeMunicipalityMetrics,
  calcConcentration,
  formatNumber,
  formatPercent,
  formatPP,
  formatChange,
} from '../utils/electoralMath';

type ReportType = 'variation' | 'concentration' | 'competition';

export const ReportsView: React.FC = () => {
  const { filters } = useFilter();
  const [selectedReport, setSelectedReport] = useState<ReportType>('variation');

  const candidate = CANDIDATES.find((c) => c.id === filters.mainCandidateId) || CANDIDATES[0];
  const rows = computeMunicipalityMetrics(MUNICIPALITIES_DATA, candidate.id);
  const concentration = calcConcentration(MUNICIPALITIES_DATA, candidate.id, filters.endYear);

  const totalVotes2018 = rows.reduce((acc, r) => acc + r.votes2018, 0);
  const totalVotes2022 = rows.reduce((acc, r) => acc + r.votes2022, 0);
  const totalValid2022 = MUNICIPALITIES_DATA.reduce((acc, m) => acc + m.totalValid2022, 0);
  const netDelta = totalVotes2022 - totalVotes2018;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Controles de Seleção do Relatório (ocultados na impressão) */}
      <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="text-xs text-neutral-500 font-medium">Gerador de Inteligência Executiva</div>
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
            Relatórios Estratégicos Estruturados
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            Documentos analíticos com distinção epistemológica formal e layout calibrado para exportação em PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Seletor de Modelo */}
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value as ReportType)}
            className="text-xs rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          >
            <option value="variation">Balanço de Variação Eleitoral (Onde Ganhou e Perdeu Votos)</option>
            <option value="concentration">Diagnóstico de Concentração e Vulnerabilidade de Bases</option>
            <option value="competition">Confronto Competitivo com Concorrentes Regionais</option>
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* DOCUMENTO DO RELATÓRIO (Pronto para Visualização e Impressão) */}
      <div className="bg-white border border-neutral-200 rounded-lg p-8 shadow-sm space-y-6 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* Cabeçalho Formal do Relatório */}
        <div className="border-b-2 border-neutral-900 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-neutral-500">
                Relatório de Inteligência Eleitoral · Mandato 2022
              </div>
              <h1 className="text-xl font-bold text-neutral-900 mt-1">
                {selectedReport === 'variation' && 'Balanço de Variação Territorial: Decomposição de Ganhos e Perdas (2018–2022)'}
                {selectedReport === 'concentration' && 'Diagnóstico Estrutural de Concentração e Dependência de Bases'}
                {selectedReport === 'competition' && 'Confronto Territorial e Disputa de Espaço Competitivo'}
              </h1>
            </div>
            <div className="text-right text-xs text-neutral-600 font-mono">
              <div>Dep. Carlos Búrigo (MDB)</div>
              <div>Data: Outubro/2026</div>
            </div>
          </div>
        </div>

        {/* 1. Pergunta Analítica */}
        <section className="space-y-1.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            1. Pergunta Analítica
          </h3>
          <p className="text-sm font-medium text-neutral-900 bg-neutral-50 p-3 rounded border border-neutral-200">
            {selectedReport === 'variation' &&
              'Quais territórios específicos explicam o saldo líquido de votação de Carlos Búrigo entre 2018 e 2022, e onde ocorreram as maiores inflexões eleitorais?'}
            {selectedReport === 'concentration' &&
              'Em que medida a sustentação eleitoral do mandato depende de um polo único vs dispersão capilar no interior do estado?'}
            {selectedReport === 'competition' &&
              'De que modo o surgimento ou fortalecimento de candidaturas concorrentes correlacionou-se com o desempenho do candidato nos municípios da Serra?'}
          </p>
        </section>

        {/* 2. Territórios e Eleições Consideradas */}
        <section className="space-y-1.5 text-xs text-neutral-700">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            2. Escopo Temporal e Espacial
          </h3>
          <div className="flex flex-wrap gap-4 text-xs font-mono bg-neutral-50/50 p-2.5 rounded border border-neutral-100">
            <span>Eleições: <strong>2018 (1º Turno) vs 2022 (1º Turno)</strong></span>
            <span>·</span>
            <span>Cargo: <strong>Deputado Estadual (RS)</strong></span>
            <span>·</span>
            <span>Territórios: <strong>10 Municípios da Serra Gaúcha e Polos</strong></span>
          </div>
        </section>

        {/* 3. Resumo Executivo */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            3. Resumo Executivo
          </h3>
          <p className="text-xs text-neutral-700 leading-relaxed">
            {selectedReport === 'variation' && (
              <>
                A votação consolidada de Carlos Búrigo na amostra regional passou de{' '}
                <strong>{formatNumber(totalVotes2018)}</strong> votos em 2018 para{' '}
                <strong>{formatNumber(totalVotes2022)}</strong> votos em 2022, registrando saldo líquido de{' '}
                <strong>{formatChange(netDelta)} votos ({formatPercent((netDelta / totalVotes2018) * 100, 1)})</strong>.
                Contrariando a hipótese de erosão homogênea, a perda esteve concentrada em Bento Gonçalves (-2.230 votos),
                enquanto polos vizinhos como Farroupilha (+610 votos) e Flores da Cunha (+470 votos) registraram forte expansão.
              </>
            )}
            {selectedReport === 'concentration' && (
              <>
                O perfil eleitoral do candidato apresenta índice Herfindahl-Hirschman (HHI) de{' '}
                <strong>{formatNumber(concentration.hhi)}</strong> e Coeficiente de Gini de{' '}
                <strong>{concentration.gini.toFixed(3)}</strong>, caracterizando alta centralidade.
                A base principal (Caxias do Sul) responde por <strong>{formatPercent(concentration.top1Share, 1)}</strong>{' '}
                do eleitorado conquistado.
              </>
            )}
            {selectedReport === 'competition' && (
              <>
                A dinâmica competitiva evidencia polarização de redutos territoriais. O principal fator de contenção
                no ciclo 2022 foi a consolidação de Guilherme Pasin (PP) em Bento Gonçalves, onde o concorrente obteve
                28.900 votos contra 1.890 de Carlos Búrigo. Em contrapartida, em Farroupilha e Flores da Cunha o candidato
                manteve ampla competitividade e ampliou vantagem.
              </>
            )}
          </p>
        </section>

        {/* 4. Indicadores Chave Calculados */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            4. Indicadores Chave Calculados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Votação 2022</div>
              <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">{formatNumber(totalVotes2022)}</div>
            </div>
            <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Saldo 2018–2022</div>
              <div className={`text-lg font-bold font-mono mt-0.5 ${netDelta >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {formatChange(netDelta)}
              </div>
            </div>
            <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Top 1 Concentração</div>
              <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">{formatPercent(concentration.top1Share, 1)}</div>
            </div>
            <div className="p-3 rounded border border-neutral-200 bg-neutral-50">
              <div className="text-[10px] text-neutral-500 uppercase font-mono">Índice HHI</div>
              <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">{formatNumber(concentration.hhi)}</div>
            </div>
          </div>
        </section>

        {/* 5. Tabela de Evidência Empírica */}
        <section className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            5. Evidência Tabular Documentada
          </h3>
          <div className="overflow-x-auto border border-neutral-200 rounded">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-neutral-100 text-neutral-800 font-semibold border-b border-neutral-200">
                <tr>
                  <th className="p-2">Município</th>
                  <th className="p-2 text-right">Votos 2018</th>
                  <th className="p-2 text-right">Votos 2022</th>
                  <th className="p-2 text-right">Saldo Absoluto</th>
                  <th className="p-2 text-right">Variação %</th>
                  <th className="p-2 text-right">Part. 2022</th>
                  <th className="p-2 text-right">QL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {rows.slice(0, 6).map((r) => (
                  <tr key={r.municipality.id}>
                    <td className="p-2 font-medium">{r.municipality.name}</td>
                    <td className="p-2 text-right font-mono">{formatNumber(r.votes2018)}</td>
                    <td className="p-2 text-right font-mono font-semibold">{formatNumber(r.votes2022)}</td>
                    <td className={`p-2 text-right font-mono font-bold ${r.absChange >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {formatChange(r.absChange)}
                    </td>
                    <td className="p-2 text-right font-mono">
                      {r.pctChange !== null ? formatPercent(r.pctChange, 1) : 'N/D'}
                    </td>
                    <td className="p-2 text-right font-mono">{formatPercent(r.share2022, 2)}</td>
                    <td className="p-2 text-right font-mono">{r.locationQuotient2022.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Tripartição Epistemológica: Fatos vs Indicadores vs Hipóteses */}
        <section className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            6. Interpretação Fundamentada e Rigor Epistemológico
          </h3>

          <div className="space-y-2.5 text-xs">
            {/* Fato Observado */}
            <div className="p-3 rounded border border-emerald-200 bg-emerald-50/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>[FATO OBSERVADO — Dado Primário de Urna]</span>
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                Em Bento Gonçalves, o candidato obteve 4.120 votos em 2018 e 1.890 votos em 2022. Em Farroupilha, obteve 2.910 votos em 2018 e 3.520 em 2022.
              </p>
            </div>

            {/* Indicador Derivado */}
            <div className="p-3 rounded border border-blue-200 bg-blue-50/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <Building className="w-3.5 h-3.5 text-blue-700" />
                <span>[INDICADOR DERIVADO — Medida Estatística Calculada]</span>
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                A retração em Bento Gonçalves foi de -54,1% (-2.230 votos), correspondendo isoladamente a 90,3% de todas as perdas líquidas territoriais registradas na amostra.
              </p>
            </div>

            {/* Hipótese Interpretativa */}
            <div className="p-3 rounded border border-amber-200 bg-amber-50/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>[HIPÓTESE INTERPRETATIVA — Análise Política Qualitativa]</span>
              </div>
              <p className="text-neutral-700 text-[11px] leading-relaxed">
                A queda em Bento Gonçalves coincide temporalmente com a candidatura de ex-prefeito local com forte apelo distrital. Entretanto, dados de urna agregados não permitem afirmar que os mesmos eleitores individuais de 2018 votaram no adversário em 2022 (evitando a Falácia Ecológica).
              </p>
            </div>
          </div>
        </section>

        {/* 7. Limitações Metodológicas */}
        <section className="space-y-1.5 pt-2 text-xs text-neutral-600">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            7. Limitações Metodológicas
          </h3>
          <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
            <li>Os dados referem-se a uma amostra de 10 polos municipais e não representam a totalidade dos 497 municípios do Rio Grande do Sul.</li>
            <li>Seções eleitorais desmembradas em 2022 sem histórico de 2018 foram mantidas como N/D para não distorcer as séries temporais.</li>
            <li>Correlações territoriais não implicam causalidade mecânica.</li>
          </ul>
        </section>

        {/* 8. Fonte de Dados */}
        <section className="border-t border-neutral-200 pt-3 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-neutral-400" />
            <span>Fonte: Protótipo de Inteligência Eleitoral · Dados Sintéticos de Demonstração</span>
          </div>
          <div>Hash de Auditoria: 28c3-demo-rs</div>
        </section>
      </div>
    </div>
  );
};
