import type { SectionDef } from "@/features/types";
import { TARGETS } from "@/lib/config";
import { Ambiental } from "./Ambiental";
import { Badges } from "./Badges";
import { Benchmarking } from "./Benchmarking";
import { Ciencia } from "./Ciencia";
import { Comportamento } from "./Comportamento";
import { Compostagem } from "./Compostagem";
import { Evolucao } from "./Evolucao";
import { Social } from "./Social";

/**
 * Secções do Dashboard Cliente, pela ordem em que aparecem.
 * O `id` é o segmento do URL: /cliente/<id>.
 */
export const CLIENT_SECTIONS: SectionDef[] = [
  {
    id: "ambiental",
    title: "environmental",
    description: "environmentalDesc",
    Component: Ambiental,
    headline: (v, d) => `${d.fmt(v.plastic)} kg`,
  },
  {
    id: "compostagem",
    title: "composting",
    description: "compostingDesc",
    Component: Compostagem,
    headline: (v, d) => `${d.fmt(v.compost)} kg`,
  },
  {
    id: "social",
    title: "social",
    description: "socialDesc",
    Component: Social,
    headline: (v, d) => `${d.fmt(v.returnRate)}% / ${TARGETS.returnRate}%`,
  },
  {
    id: "comportamento",
    title: "behaviour",
    description: "behaviourDesc",
    Component: Comportamento,
    headline: (v) => `${v.adoption}/100`,
  },
  { id: "ciencia", title: "science", description: "scienceDesc", Component: Ciencia },
  {
    id: "badges",
    title: "badges",
    description: "badgesDesc",
    Component: Badges,
    headline: (v) => (v.badges.length ? String(v.badges.length) : null),
  },
  {
    id: "benchmarking",
    title: "benchmarking",
    description: "benchmarkingDesc",
    Component: Benchmarking,
  },
  {
    id: "evolucao",
    title: "evolution",
    description: "evolutionDesc",
    Component: Evolucao,
    cumulativeOnly: true,
  },
];
