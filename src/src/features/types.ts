import type { ComponentType } from "react";
import type { Dashboard } from "@/lib/app-state";
import type { View } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";

/** Uma secção = uma sub-página. A lista de secções alimenta a página principal de cada dashboard. */
export type SectionDef = {
  id: string;
  title: DictKey;
  description: DictKey;
  Component: ComponentType<{ view: View }>;
  /** Número-chave mostrado ao lado da secção na lista da página principal. */
  headline?: (view: View, d: Dashboard) => string | null;
  /** Só faz sentido com mais de um evento (ex.: "A sua evolução"). */
  cumulativeOnly?: boolean;
};
