import { DataTable } from "@/components/dashboard";
import {
  auditColumns,
  auditRows,
  scienceColumns,
  scienceRows,
  trialColumns,
  trialRows,
} from "@/lib/demo-content";

/** Secções que são só uma tabela detalhada (não visual). */
export const CienciaDados = () => <DataTable columns={scienceColumns} rows={scienceRows} />;
export const Auditoria = () => <DataTable columns={auditColumns} rows={auditRows} />;
export const Ensaios = () => <DataTable columns={trialColumns} rows={trialRows} />;
