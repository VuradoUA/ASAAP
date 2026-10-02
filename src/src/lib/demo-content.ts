/**
 * Conteúdo de demonstração que ainda não vem da base de dados.
 * Quando existir tabela no Supabase, troca-se aqui e as secções continuam iguais.
 */
import type { Bilingual } from "./i18n";

export type Column = { key: string; label: Bilingual };
export type Row = Record<string, string | number>;

/** Cartões públicos da secção Ciência (Dashboard Cliente). Texto vazio = ainda sem resultados. */
export const scienceCards: {
  title: "partners" | "ongoingStudy" | "plannedStudies" | "prelimResults";
  text: Bilingual | null;
}[] = [
  {
    title: "partners",
    text: {
      pt: "Universidade parceira e laboratório de solos (exemplo).",
      en: "Partner university and soil lab (example).",
    },
  },
  {
    title: "ongoingStudy",
    text: {
      pt: "Qualidade do composto obtido a partir de copos compostáveis.",
      en: "Quality of compost made from compostable cups.",
    },
  },
  {
    title: "plannedStudies",
    text: {
      pt: "Microplásticos no solo e ecotoxicidade.",
      en: "Soil microplastics and ecotoxicity.",
    },
  },
  { title: "prelimResults", text: null },
];

export const scienceColumns: Column[] = [
  { key: "lote", label: { pt: "Lote", en: "Batch" } },
  { key: "partner", label: { pt: "Parceiro", en: "Partner" } },
  { key: "status", label: { pt: "Estado", en: "Status" } },
  { key: "ph", label: { pt: "pH", en: "pH" } },
  { key: "humidity", label: { pt: "Humidade", en: "Moisture" } },
  { key: "npk", label: { pt: "NPK", en: "NPK" } },
  { key: "metals", label: { pt: "Metais pesados", en: "Heavy metals" } },
  { key: "maturation", label: { pt: "Maturação", en: "Maturity" } },
];
export const scienceRows: Row[] = [
  {
    lote: "L-2025-01",
    partner: "ISA",
    status: "Concluído",
    ph: 7.1,
    humidity: "48%",
    npk: "1.2-0.8-0.9",
    metals: "< limite",
    maturation: "Maduro",
  },
  {
    lote: "L-2025-02",
    partner: "GAIKER",
    status: "Em análise",
    ph: 6.8,
    humidity: "52%",
    npk: "1.0-0.7-1.1",
    metals: "< limite",
    maturation: "Em maturação",
  },
  {
    lote: "L-2025-03",
    partner: "ISA",
    status: "Recolhido",
    ph: "—",
    humidity: "—",
    npk: "—",
    metals: "—",
    maturation: "—",
  },
];

export const trialColumns: Column[] = [
  { key: "lote", label: { pt: "lote_id", en: "lote_id" } },
  { key: "lab", label: { pt: "Laboratório", en: "Lab" } },
  { key: "cupsKg", label: { pt: "Copos compostados (kg)", en: "Cups composted (kg)" } },
  { key: "compostKg", label: { pt: "Composto gerado (kg)", en: "Compost generated (kg)" } },
  { key: "carbon", label: { pt: "Carbono retido", en: "Carbon retained" } },
  { key: "water", label: { pt: "Água retida", en: "Water retained" } },
  { key: "crops", label: { pt: "Impacto em culturas", en: "Crop impact" } },
];
export const trialRows: Row[] = [
  {
    lote: "L-2025-01",
    lab: "ISA",
    cupsKg: 42.5,
    compostKg: 18.2,
    carbon: "—",
    water: "—",
    crops: "—",
  },
  {
    lote: "L-2025-02",
    lab: "GAIKER",
    cupsKg: 37.1,
    compostKg: 15.9,
    carbon: "—",
    water: "—",
    crops: "—",
  },
  {
    lote: "L-2025-03",
    lab: "ISA",
    cupsKg: 29.8,
    compostKg: "—",
    carbon: "—",
    water: "—",
    crops: "—",
  },
];

export const auditColumns: Column[] = [
  { key: "metric", label: { pt: "Métrica", en: "Metric" } },
  { key: "status", label: { pt: "Estado", en: "Status" } },
  { key: "source", label: { pt: "Origem", en: "Source" } },
  { key: "seal", label: { pt: "Estimado / Medido", en: "Estimated / Measured" } },
  { key: "changed", label: { pt: "Última alteração", en: "Last change" } },
];
export const auditRows: Row[] = [
  {
    metric: "Impact Score",
    status: "Validado",
    source: "Motor PlastNatur",
    seal: "Estimado",
    changed: "2026-03-22",
  },
  {
    metric: "Return Rate",
    status: "Validado",
    source: "Smart Bins (NFC)",
    seal: "Medido",
    changed: "2026-03-22",
  },
  {
    metric: "Contaminação",
    status: "Validado",
    source: "Contagem staff",
    seal: "Medido",
    changed: "2026-03-21",
  },
  {
    metric: "CO₂ evitado",
    status: "Em revisão",
    source: "Fatores LCA",
    seal: "Estimado",
    changed: "2026-03-18",
  },
  {
    metric: "Microplásticos",
    status: "Em validação",
    source: "Estudo parceiro",
    seal: "Estimado",
    changed: "2026-02-02",
  },
  {
    metric: "Composto gerado",
    status: "Validado",
    source: "Pesagem compostagem",
    seal: "Estimado",
    changed: "2026-03-25",
  },
];

export const NFC_ACTIONS = ["lavagem", "reposição", "não usado", "compostagem"] as const;

export const nfcColumns: Column[] = [
  { key: "cup", label: { pt: "cup_id", en: "cup_id" } },
  { key: "lote", label: { pt: "lote_id", en: "lote_id" } },
  { key: "staff", label: { pt: "staff_id", en: "staff_id" } },
  { key: "mode", label: { pt: "Modo", en: "Mode" } },
  { key: "action", label: { pt: "Ação", en: "Action" } },
  { key: "time", label: { pt: "Registo", en: "Logged at" } },
];

/** Gera eventos NFC fictícios para o evento selecionado. */
export function nfcRows(eventDate: string): Row[] {
  return Array.from({ length: 16 }, (_, i) => ({
    cup: `CUP-${48213 + i * 17}`,
    lote: `L-2025-0${(i % 3) + 1}`,
    staff: `STF-0${(i % 4) + 1}`,
    mode: i % 3 ? "individual" : "batch",
    action: NFC_ACTIONS[i % NFC_ACTIONS.length] ?? "",
    time: `${eventDate} ${String(16 + Math.floor(i / 3)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  }));
}
