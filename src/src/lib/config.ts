/**
 * Configuração da plataforma num só sítio.
 * Metas e limiares dão escala aos meters e podem ser mostrados ao cliente.
 * Pesos e fórmulas dos scores compostos NUNCA vêm para aqui nem para a UI (proteção de PI).
 */

export const TARGETS = {
  /** RR_target — meta de devolução, visível no meter de Return Rate. */
  returnRate: 85,
  /** C_max — limite de contaminação, visível no meter de Contaminação. */
  contaminationMax: 20,
  /** Escala máxima do meter de contaminação (o limite fica a meio). */
  contaminationScale: 40,
  /** Meta interna do Pipeline Efficiency Index. */
  pei: 70,
  /** Meta interna do Performance Score. */
  performance: 80,
} as const;

/** Benchmarks externos de referência (demo). */
export const EXTERNAL_BENCHMARK = {
  /** Btype — média do mesmo tipo de evento. */
  btype: 71,
  /** Bmarket — média do mercado. */
  bmarket: 64,
} as const;

/** Funcionalidades que dependem de dados ainda por validar. */
export const FEATURES = {
  /** Impacto no solo (carbono e água retidos) — só aparece quando houver ensaios ISA. */
  showSoilImpact: true,
  /** Valor de microplásticos ainda sem confirmação científica interna → mostra selo. */
  microplasticsValidated: false,
  /** BioValue Score: não publicar com valor até 2027. */
  bioValuePublishedFrom: 2027,
} as const;

/** Nome configurável do mesmo indicador RR (é sempre o mesmo número). */
export type RrLabel = "returnRate" | "landfill" | "leakage";
export const DEFAULT_RR_LABEL: RrLabel = "returnRate";
