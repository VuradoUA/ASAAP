import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/lib/app-state";
import type { Column, Row } from "@/lib/demo-content";
import { Panel } from "./Block";

/** Tabela simples para dados detalhados (uso interno). */
export function DataTable({
  columns,
  rows,
  empty,
}: {
  columns: Column[];
  rows: Row[];
  empty?: string;
}) {
  const { lang } = useI18n();
  return (
    <Panel className="overflow-x-auto p-0">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key}>{c.label[lang]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              {columns.map((c, j) => (
                <TableCell key={c.key} className={j === 0 ? "font-medium" : undefined}>
                  {r[c.key] ?? "—"}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {!rows.length && empty && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-muted-foreground">
                {empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Panel>
  );
}
