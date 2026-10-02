# PlastNatur Impact Engine

## Navegação

- `/` página inicial: escolher Dashboard Cliente, Dashboard ASAAP ou Gestão de dados
- `/cliente` resumo (Impact Score + narrativa) e lista de secções
- `/cliente/<secao>` uma secção: ambiental, compostagem, social, comportamento, ciencia, badges, benchmarking, evolucao
- `/asaap` e `/asaap/<secao>` o mesmo para o dashboard interno
- `/dados` criar clientes/eventos, editar métricas, configurar o nome do indicador RR

## Estrutura de `src/`

| Pasta / ficheiro | O que tem |
| --- | --- |
| `routes/` | Só páginas finas: layout de cada dashboard e as rotas dinâmicas `$secao` |
| `features/cliente/` | Um ficheiro por secção do Dashboard Cliente + `sections.ts` (lista e ordem) + `ExportDialog` |
| `features/asaap/` | Um ficheiro por secção do Dashboard ASAAP + `sections.ts` |
| `components/dashboard/` | Peças visuais da especificação: `StatTile`, `Meter`, `LineMetric`, `Heatmap`, `SplitBar`, `BarList`, `DataTable` |
| `components/layout/` | Cabeçalho, filtros, lista de secções, moldura das sub-páginas |
| `lib/config.ts` | Metas e limiares (RR_target, C_max, PEI…) e flags de funcionalidades |
| `lib/data.ts` | Leitura do Supabase e agregação numa `View` (Por Evento / Acumulado) |
| `lib/metrics.ts` | Valores derivados (pipeline, Performance Score, recomendações…). Só aqui vivem fórmulas |
| `lib/storytelling.ts` | Motor da narrativa, partilhado pelos dois dashboards |
| `lib/demo-content.ts` | Tabelas de demo que ainda não estão na base de dados |
| `lib/i18n.ts` | Todos os textos PT/EN |

Para adicionar uma secção: criar o componente em `features/<dashboard>/`, juntar uma linha em `sections.ts`
e os textos em `i18n.ts`. A página principal e a navegação atualizam-se sozinhas.

# Pixel Perfect

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69c0ef35-c689-4ad1-bdce-170e80e65766).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
