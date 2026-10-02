/**
 * Motor de storytelling: gera a narrativa curta de impacto.
 * É o mesmo em toda a plataforma (Resumo do Dashboard Cliente e Reporting Automático do ASAAP).
 */
import { TARGETS } from "./config";
import type { View } from "./data";
import type { Lang } from "./i18n";

export const formatNumber = (lang: Lang, x: number) =>
  x.toLocaleString(lang === "pt" ? "pt-PT" : "en-GB");

export function narrative(v: View, lang: Lang, cumulative: boolean): string {
  const f = (x: number) => formatNumber(lang, x);
  const aboveTarget = v.returnRate >= TARGETS.returnRate;

  if (lang === "pt") {
    const subject = cumulative
      ? `No conjunto de ${v.eventCount} eventos, alcançou-se`
      : "Este evento alcançou";
    return (
      `${subject} um Impact Score de ${v.impact}, evitando ${f(v.plastic)} kg de plástico descartável e ${f(v.co2)} kg de CO₂e. ` +
      `A taxa de devolução foi de ${f(v.returnRate)}%${aboveTarget ? `, acima da meta de ${TARGETS.returnRate}%` : ""}, ` +
      `com ${f(v.participants)} participantes envolvidos.`
    );
  }
  const subject = cumulative
    ? `Across ${v.eventCount} events, the programme achieved`
    : "This event achieved";
  return (
    `${subject} an Impact Score of ${v.impact}, avoiding ${f(v.plastic)} kg of single-use plastic and ${f(v.co2)} kg CO₂e. ` +
    `The return rate was ${f(v.returnRate)}%${aboveTarget ? `, above the ${TARGETS.returnRate}% target` : ""}, ` +
    `engaging ${f(v.participants)} participants.`
  );
}
