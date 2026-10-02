/**
 * Valores derivados para o protótipo. São ilustrativos, não científicos:
 * quando o Motor de Impacto estiver ligado, substituem-se aqui sem mexer na UI.
 */
import { TARGETS } from "./config";
import { buildView, round, type AllData, type View } from "./data";
import type { Bilingual } from "./i18n";

export const equivalences = (v: View) => ({
  km: Math.round(v.co2 / 0.12),
  trees: Math.round(v.co2 / 21),
  showers: Math.round(v.co2 / 0.9),
  bottles: Math.round((v.plastic * 1000) / 25),
});

export const communitySplit = (v: View) => {
  const direct = Math.round(45 + (v.community % 20));
  return { direct, indirect: 100 - direct };
};

/** Escala 0–100 do meter de Circularity a partir dos ciclos de reutilização. */
export const circularity = (v: View) => Math.min(100, Math.round(v.reuseCycles * 15));

export const returnCurve = (v: View) =>
  Array.from({ length: 9 }, (_, i) => ({
    hour: `${i}h`,
    value: Math.round(v.returnRate * (1 - Math.exp(-(i + 0.4) / (2.2 + (100 - v.adoption) / 25)))),
  }));

// ---------- Só Dashboard ASAAP ----------

/** Partes do Performance Score. A composição fica apenas neste ficheiro. */
export function performanceParts(v: View) {
  const behaviour = Math.round((v.returnRate + v.consistency) / 2);
  const circ = Math.round((Math.max(0, 100 - v.contamination * 2) + circularity(v)) / 2);
  return { behaviour, circularity: circ };
}

export const performanceScore = (v: View) =>
  Math.round(
    0.4 * v.returnRate + 0.3 * Math.max(0, 100 - v.contamination * 2) + 0.3 * v.consistency,
  );

export type PipelineStep = { key: PipelineKey; value: number };
export type PipelineKey =
  | "distributed"
  | "used"
  | "returned"
  | "washed"
  | "restocked"
  | "reused"
  | "toCompost"
  | "composted";

export function pipeline(v: View) {
  const distributed = Math.round(v.participants * 1.6);
  const used = Math.round(distributed * 0.94);
  const returned = Math.round(used * (v.returnRate / 100));
  const washed = Math.round(returned * (1 - v.contamination / 200));
  const restocked = Math.round(washed * 0.96);
  const reused = Math.round(restocked * 0.9);
  const toCompost = returned - washed + Math.round(restocked * 0.04);
  const composted = Math.round(toCompost * 0.85);
  const mainLoop: PipelineStep[] = [
    { key: "distributed", value: distributed },
    { key: "used", value: used },
    { key: "returned", value: returned },
    { key: "washed", value: washed },
    { key: "restocked", value: restocked },
    { key: "reused", value: reused },
  ];
  const compostBranch: PipelineStep[] = [
    { key: "toCompost", value: toCompost },
    { key: "composted", value: composted },
  ];
  /** PEI v0.1: exclui compostados/solo. */
  const pei = distributed ? Math.round((reused / distributed) * 100) : 0;
  return { mainLoop, compostBranch, pei, distributed };
}

/** Recovery by Location agregado de toda a frota (todos os clientes). */
export const fleetLocations = (data: AllData) => buildView(data, data.events, "")?.locations ?? [];

export type Priority = "high" | "medium" | "low";
export type Recommendation = { priority: Priority; text: Bilingual };

export function recommendations(v: View): Recommendation[] {
  const out: Recommendation[] = [];
  if (v.returnRate < TARGETS.returnRate) {
    out.push({
      priority: v.returnRate < TARGETS.returnRate - 10 ? "high" : "medium",
      text: {
        pt: `Return Rate em ${v.returnRate}%, abaixo da meta de ${TARGETS.returnRate}%. Testar incentivo de caução ou gamificação.`,
        en: `Return Rate at ${v.returnRate}%, below the ${TARGETS.returnRate}% target. Test a deposit incentive or gamification.`,
      },
    });
  }
  if (v.contamination > TARGETS.contaminationMax / 2) {
    out.push({
      priority: v.contamination > TARGETS.contaminationMax ? "high" : "medium",
      text: {
        pt: `Contaminação em ${v.contamination}%. Reforçar sinalética e briefing do staff nos Smart Bins.`,
        en: `Contamination at ${v.contamination}%. Improve signage and staff briefing at Smart Bins.`,
      },
    });
  }
  const worst = [...v.locations].sort((a, b) => a.recovery - b.recovery)[0];
  if (worst && v.locations.length > 1) {
    out.push({
      priority: worst.recovery < 65 ? "high" : "medium",
      text: {
        pt: `Reforçar os pontos de devolução em "${worst.name}" (${worst.recovery}% de recuperação).`,
        en: `Reinforce return points at "${worst.name}" (${worst.recovery}% recovery).`,
      },
    });
  }
  if (v.adoption < 70) {
    out.push({
      priority: "low",
      text: {
        pt: "Adopção lenta nas primeiras horas. Comunicar o sistema logo à entrada.",
        en: "Slow early adoption. Communicate the system at the entrance.",
      },
    });
  }
  if (!out.length) {
    out.push({
      priority: "low",
      text: {
        pt: "Desempenho acima das metas. Manter a configuração operacional.",
        en: "Performance above targets. Keep the current setup.",
      },
    });
  }
  const order: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
  return out.sort((a, b) => order[a.priority] - order[b.priority]);
}

export const avgOf = (xs: number[]) =>
  xs.length ? round(xs.reduce((a, b) => a + b, 0) / xs.length, 0) : 0;
