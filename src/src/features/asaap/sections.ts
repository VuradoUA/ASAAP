import type { SectionDef } from "@/features/types";
import { performanceScore, pipeline, recommendations } from "@/lib/metrics";
import { BenchmarkingInterno } from "./BenchmarkingInterno";
import { DadosEvento } from "./DadosEvento";
import { Nfc } from "./Nfc";
import { Operacoes } from "./Operacoes";
import { Pipeline } from "./Pipeline";
import { Recomendacoes } from "./Recomendacoes";
import { Reporting } from "./Reporting";
import { Auditoria, CienciaDados, Ensaios } from "./Tabelas";

/** Secções do Dashboard ASAAP (uso interno). O `id` é o segmento do URL: /asaap/<id>. */
export const ASAAP_SECTIONS: SectionDef[] = [
  {
    id: "operacoes",
    title: "operations",
    description: "operationsDesc",
    Component: Operacoes,
    headline: (v) => `${performanceScore(v)}/100`,
  },
  {
    id: "pipeline",
    title: "pipeline",
    description: "pipelineDesc",
    Component: Pipeline,
    headline: (v) => `PEI ${pipeline(v).pei}`,
  },
  {
    id: "benchmarking",
    title: "internalBench",
    description: "internalBenchDesc",
    Component: BenchmarkingInterno,
  },
  {
    id: "recomendacoes",
    title: "recommendations",
    description: "recommendationsDesc",
    Component: Recomendacoes,
    headline: (v) => String(recommendations(v).length),
  },
  { id: "reporting", title: "reporting", description: "reportingDesc", Component: Reporting },
  { id: "ciencia", title: "scienceRaw", description: "scienceRawDesc", Component: CienciaDados },
  { id: "auditoria", title: "audit", description: "auditDesc", Component: Auditoria },
  { id: "nfc", title: "nfc", description: "nfcDesc", Component: Nfc },
  { id: "evento", title: "eventData", description: "eventDataDesc", Component: DadosEvento },
  { id: "ensaios", title: "trials", description: "trialsDesc", Component: Ensaios },
];
