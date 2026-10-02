export type Lang = "pt" | "en";

/** Texto bilingue solto (usado em dados de demo e mensagens geradas). */
export type Bilingual = { pt: string; en: string };
export const pick = (lang: Lang, text: Bilingual) => text[lang];

const dict = {
  // Geral
  appName: { pt: "PlastNatur Impact Engine", en: "PlastNatur Impact Engine" },
  home: { pt: "Início", en: "Home" },
  chooseDashboard: { pt: "Escolha por onde quer começar", en: "Choose where to start" },
  clientDash: { pt: "Dashboard Cliente", en: "Client Dashboard" },
  clientDashDesc: {
    pt: "O que cada cliente vê ao entrar com a sua conta.",
    en: "What each client sees when they sign in.",
  },
  asaapDash: { pt: "Dashboard ASAAP", en: "ASAAP Dashboard" },
  asaapDashDesc: {
    pt: "Operações, pipeline e auditoria. Só para a equipa ASAAP.",
    en: "Operations, pipeline and audit. ASAAP team only.",
  },
  data: { pt: "Gestão de dados", en: "Data management" },
  dataDesc: {
    pt: "Criar clientes e eventos, editar métricas de demonstração.",
    en: "Create clients and events, edit demo metrics.",
  },
  perEvent: { pt: "Por Evento", en: "Per Event" },
  cumulative: { pt: "Acumulado", en: "Cumulative" },
  export: { pt: "Exportar", en: "Export" },
  client: { pt: "Cliente", en: "Client" },
  event: { pt: "Evento", en: "Event" },
  date: { pt: "Ano", en: "Year" },
  location: { pt: "Localização", en: "Location" },
  all: { pt: "Todos", en: "All" },
  allF: { pt: "Todas", en: "All" },
  demoNote: { pt: "Protótipo com dados fictícios", en: "Prototype with fictitious data" },
  noData: {
    pt: "Não há eventos para estes filtros. Mude o ano ou a localização.",
    en: "No events match these filters. Change the year or location.",
  },
  loading: { pt: "A carregar…", en: "Loading…" },
  sections: { pt: "Secções", en: "Sections" },
  nextSection: { pt: "Secção seguinte", en: "Next section" },
  onlyCumulative: {
    pt: "Esta secção mostra a evolução entre eventos e só existe na aba Acumulado.",
    en: "This section shows evolution across events and only exists in the Cumulative tab.",
  },
  switchToCumulative: { pt: "Ver em Acumulado", en: "View cumulative" },
  inValidation: { pt: "Em validação", en: "In validation" },
  estimate: { pt: "(estimativa)", en: "(estimate)" },
  target: { pt: "Meta", en: "Target" },
  limit: { pt: "Limite", en: "Limit" },
  participants: { pt: "participantes", en: "participants" },
  events: { pt: "eventos", en: "events" },
  internalOnly: {
    pt: "Uso interno, não partilhar com clientes",
    en: "Internal use, do not share with clients",
  },

  // Dashboard Cliente — secções
  summary: { pt: "Resumo", en: "Summary" },
  environmental: { pt: "Ambiental", en: "Environmental" },
  environmentalDesc: {
    pt: "Plástico e CO₂ evitados, TEI e equivalências.",
    en: "Plastic and CO₂ avoided, TEI and equivalences.",
  },
  composting: { pt: "Compostagem", en: "Composting" },
  compostingDesc: {
    pt: "Composto gerado, qualidade e impacto no solo.",
    en: "Compost generated, quality and soil impact.",
  },
  social: { pt: "Impacto Social", en: "Social Impact" },
  socialDesc: {
    pt: "Devolução, circularidade, contaminação e participação.",
    en: "Returns, circularity, contamination and participation.",
  },
  behaviour: { pt: "Comportamento", en: "Behaviour" },
  behaviourDesc: {
    pt: "Velocidade de adopção, consistência e curva de retorno.",
    en: "Adoption speed, consistency and return curve.",
  },
  science: { pt: "Ciência", en: "Science" },
  scienceDesc: {
    pt: "Parceiros, estudos e resultados preliminares.",
    en: "Partners, studies and preliminary results.",
  },
  badges: { pt: "Badges", en: "Badges" },
  badgesDesc: { pt: "Distinções conquistadas.", en: "Badges earned." },
  benchmarking: { pt: "Benchmarking", en: "Benchmarking" },
  benchmarkingDesc: {
    pt: "O seu Impact Score face ao setor e ao mercado.",
    en: "Your Impact Score against the sector and the market.",
  },
  evolution: { pt: "A sua evolução", en: "Your evolution" },
  evolutionDesc: {
    pt: "Como cada métrica mudou ao longo dos seus eventos.",
    en: "How each metric changed across your events.",
  },

  // Métricas
  impactScore: { pt: "Impact Score", en: "Impact Score" },
  plastic: { pt: "Plástico evitado", en: "Plastic avoided" },
  co2: { pt: "CO₂ evitado", en: "CO₂ avoided" },
  micro: { pt: "Microplásticos evitados", en: "Microplastics avoided" },
  ecotox: { pt: "Ecotoxicidade evitada", en: "Ecotoxicity avoided" },
  tei: { pt: "Total Environmental Impact", en: "Total Environmental Impact" },
  equivalences: { pt: "Equivalências", en: "Equivalences" },
  km: { pt: "km de carro evitados", en: "car km avoided" },
  trees: { pt: "árvores (absorção anual)", en: "trees (annual uptake)" },
  showers: { pt: "banhos", en: "showers" },
  bottles: { pt: "garrafas PET", en: "PET bottles" },
  compost: { pt: "Composto gerado", en: "Compost generated" },
  compostQuality: { pt: "Qualidade do composto", en: "Compost quality" },
  ph: { pt: "pH", en: "pH" },
  humidity: { pt: "Humidade", en: "Moisture" },
  npk: { pt: "NPK", en: "NPK" },
  heavyMetals: { pt: "Metais pesados", en: "Heavy metals" },
  fragments: { pt: "Fragmentos", en: "Fragments" },
  maturation: { pt: "Maturação", en: "Maturity" },
  soilImpact: { pt: "Impacto no solo", en: "Soil impact" },
  soilCarbon: { pt: "Carbono retido", en: "Carbon retained" },
  soilWater: { pt: "Água retida", en: "Water retained" },
  biovalue: { pt: "BioValue Score", en: "BioValue Score" },
  returnRate: { pt: "Return Rate", en: "Return Rate" },
  landfill: { pt: "Landfill Diversion", en: "Landfill Diversion" },
  leakage: { pt: "Leakage Prevented", en: "Leakage Prevented" },
  circularity: { pt: "Circularity / Reuse Loop", en: "Circularity / Reuse Loop" },
  reuseCycles: { pt: "ciclos de reutilização", en: "reuse cycles" },
  contamination: { pt: "Contaminação", en: "Contamination" },
  lowerBetter: { pt: "quanto menor, melhor", en: "lower is better" },
  community: { pt: "Community Participation Score", en: "Community Participation Score" },
  direct: { pt: "Direta", en: "Direct" },
  indirect: { pt: "Indireta", en: "Indirect" },
  recoveryByLocation: { pt: "Recovery by Location", en: "Recovery by Location" },
  adoption: { pt: "Velocidade de Adopção", en: "Adoption Speed" },
  consistency: { pt: "Consistência", en: "Consistency" },
  returnCurve: { pt: "Curva de retorno", en: "Return curve" },
  staff: { pt: "Voluntários e staff envolvidos", en: "Volunteers and staff involved" },
  partners: { pt: "Parceiros", en: "Partners" },
  ongoingStudy: { pt: "Estudo em curso", en: "Ongoing study" },
  plannedStudies: { pt: "Estudos planeados", en: "Planned studies" },
  prelimResults: { pt: "Resultados preliminares", en: "Preliminary results" },
  noBadges: {
    pt: "Ainda sem badges. Aparecem aqui assim que um critério for atingido.",
    en: "No badges yet. They appear here once a criterion is met.",
  },
  yourScore: { pt: "O seu Impact Score", en: "Your Impact Score" },
  btype: { pt: "Média do mesmo tipo de evento", en: "Same event type average" },
  bmarket: { pt: "Média do mercado", en: "Market average" },
  rank: { pt: "Posição entre clientes PlastNatur", en: "Position among PlastNatur clients" },

  // Tooltips (descrevem o KPI em palavras, nunca a fórmula)
  tipImpact: {
    pt: "Baseado no impacto ambiental, na taxa de devolução e na participação do evento.",
    en: "Based on environmental impact, return rate and event participation.",
  },
  tipPlastic: {
    pt: "Plástico descartável que deixou de ser usado graças aos copos reutilizáveis.",
    en: "Single-use plastic no longer used thanks to reusable cups.",
  },
  tipCo2: {
    pt: "Emissões evitadas ao longo do ciclo de vida, face ao descartável.",
    en: "Lifecycle emissions avoided versus single-use.",
  },
  tipMicro: {
    pt: "Fragmentos de plástico que deixam de chegar ao ambiente.",
    en: "Plastic fragments kept out of the environment.",
  },
  tipEcotox: {
    pt: "Potencial de toxicidade para ecossistemas evitado.",
    en: "Avoided ecosystem toxicity potential.",
  },
  tipTei: {
    pt: "Junta numa só escala o plástico, o CO₂, os microplásticos e a ecotoxicidade evitados.",
    en: "Brings plastic, CO₂, microplastics and ecotoxicity avoided onto one scale.",
  },
  tipFromCo2: { pt: "Calculado a partir do CO₂ evitado.", en: "Calculated from CO₂ avoided." },
  tipFromPlastic: {
    pt: "Calculado a partir do plástico evitado.",
    en: "Calculated from plastic avoided.",
  },
  tipRR: {
    pt: "= Return Rate (RR): copos recuperados face aos distribuídos.",
    en: "= Return Rate (RR): cups recovered versus distributed.",
  },
  tipCircularity: {
    pt: "Baseado nos ciclos de reutilização dos copos do seu lote.",
    en: "Based on the reuse cycles of the cups in your batch.",
  },
  tipContamination: {
    pt: "Resíduos indevidos encontrados nos pontos de recolha.",
    en: "Wrong items found at collection points.",
  },
  tipCommunity: {
    pt: "Baseado na participação direta e indireta no evento.",
    en: "Based on direct and indirect participation in the event.",
  },
  tipAdoption: {
    pt: "Rapidez com que o público atingiu a meta de devolução.",
    en: "How fast the audience reached the return target.",
  },
  tipConsistency: {
    pt: "Regularidade das devoluções ao longo do evento.",
    en: "How steady returns were throughout the event.",
  },
  tipReturnCurve: {
    pt: "Devoluções acumuladas ao longo do evento: mostra quando aconteceram.",
    en: "Cumulative returns during the event: shows when they happened.",
  },

  // ASAAP
  asaapTitle: { pt: "Dashboard ASAAP", en: "ASAAP Dashboard" },
  operations: { pt: "Operações", en: "Operations" },
  operationsDesc: {
    pt: "Performance Score, devolução, contaminação e recolha por localização.",
    en: "Performance Score, returns, contamination and recovery by location.",
  },
  performanceScore: { pt: "Performance Score", en: "Performance Score" },
  behaviourPart: { pt: "Comportamento", en: "Behaviour" },
  circularityPart: { pt: "Circularidade", en: "Circularity" },
  fleetRecovery: {
    pt: "Recovery by Location, toda a frota",
    en: "Recovery by Location, whole fleet",
  },
  pipeline: { pt: "Pipeline CupFlow", en: "CupFlow Pipeline" },
  pipelineDesc: {
    pt: "O percurso dos copos e o Pipeline Efficiency Index.",
    en: "The cups' journey and the Pipeline Efficiency Index.",
  },
  losses: { pt: "perdidos", en: "lost" },
  compostBranch: { pt: "Saem do ciclo para compostagem", en: "Leave the loop for composting" },
  pei: { pt: "Pipeline Efficiency Index", en: "Pipeline Efficiency Index" },
  peiNote: {
    pt: "v0.1: exclui compostados e solo. A v0.2 vai incluí-los.",
    en: "v0.1: excludes composted and soil. v0.2 will include them.",
  },
  internalBench: { pt: "Benchmarking Interno", en: "Internal Benchmarking" },
  internalBenchDesc: {
    pt: "Comparação entre clientes pelo Performance Score.",
    en: "Client comparison by Performance Score.",
  },
  bpilot: { pt: "Média dos pilotos", en: "Pilot average" },
  bclient: { pt: "Cliente selecionado", en: "Selected client" },
  bhistorical: { pt: "Histórico do cliente", en: "Client history" },
  recommendations: { pt: "Recomendações", en: "Recommendations" },
  recommendationsDesc: {
    pt: "Ações sugeridas, por prioridade.",
    en: "Suggested actions, by priority.",
  },
  priorityHigh: { pt: "Prioridade alta", en: "High priority" },
  priorityMedium: { pt: "Prioridade média", en: "Medium priority" },
  priorityLow: { pt: "Prioridade baixa", en: "Low priority" },
  reporting: { pt: "Reporting Automático", en: "Automated Reporting" },
  reportingDesc: {
    pt: "Resumo, KPIs e narrativa para o relatório ESG.",
    en: "Summary, KPIs and narrative for the ESG report.",
  },
  keyKpis: { pt: "KPIs principais", en: "Key KPIs" },
  exportReport: { pt: "Exportar base do relatório", en: "Export report base" },
  reportExported: {
    pt: "Base do relatório gerada (simulação)",
    en: "Report base generated (simulation)",
  },
  scienceRaw: { pt: "Ciência, dados brutos", en: "Science, raw data" },
  scienceRawDesc: {
    pt: "Ensaios ISA/GAIKER e estado das parcerias.",
    en: "ISA/GAIKER trials and partnership status.",
  },
  audit: { pt: "Auditoria", en: "Audit" },
  auditDesc: {
    pt: "Assumptions Layer: alterações e selos Estimado/Medido.",
    en: "Assumptions Layer: changes and Estimated/Measured seals.",
  },
  nfc: { pt: "Pipeline de copos NFC", en: "NFC cup pipeline" },
  nfcDesc: {
    pt: "Eventos brutos registados na app ASAAP.",
    en: "Raw events logged in the ASAAP app.",
  },
  nfcSearch: {
    pt: "Procurar cup_id, lote_id ou staff_id",
    en: "Search cup_id, lote_id or staff_id",
  },
  allActions: { pt: "Todas as ações", en: "All actions" },
  eventData: { pt: "Dados do evento", en: "Event data" },
  eventDataDesc: {
    pt: "Hora de início, duração e participantes: previsto e real.",
    en: "Start time, duration and participants: planned and actual.",
  },
  startTime: { pt: "Hora de início", en: "Start time" },
  duration: { pt: "Duração", en: "Duration" },
  expectedParticipants: { pt: "Participantes previstos", en: "Expected participants" },
  planned: { pt: "Previsto", en: "Planned" },
  actual: { pt: "Real", en: "Actual" },
  notRecorded: { pt: "Por registar", en: "Not recorded" },
  participantsNote: {
    pt: "Só existe valor previsto nesta fase. É ele que alimenta a Participação Direta.",
    en: "Only the planned value exists for now. It feeds Direct Participation.",
  },
  trials: { pt: "Resultados dos ensaios", en: "Trial results" },
  trialsDesc: { pt: "Dados ISA e GAIKER por lote.", en: "ISA and GAIKER data by batch." },

  // Exportar
  exportTitle: { pt: "Exportar relatório", en: "Export report" },
  exportDesc: {
    pt: "Escolha as secções e o formato. Só inclui dados do Dashboard Cliente.",
    en: "Choose sections and format. Only Client Dashboard data is included.",
  },
  format: { pt: "Formato", en: "Format" },
  generate: { pt: "Exportar", en: "Export" },
  cancel: { pt: "Cancelar", en: "Cancel" },
  exported: { pt: "Relatório exportado", en: "Report exported" },

  // Gestão de dados
  newClient: { pt: "Novo cliente", en: "New client" },
  newEvent: { pt: "Novo evento", en: "New event" },
  name: { pt: "Nome", en: "Name" },
  company: { pt: "Empresa", en: "Company" },
  save: { pt: "Guardar métricas", en: "Save metrics" },
  addClient: { pt: "Adicionar cliente", en: "Add client" },
  addEvent: { pt: "Adicionar evento", en: "Add event" },
  saved: { pt: "Guardado", en: "Saved" },
  editMetrics: { pt: "Métricas do evento", en: "Event metrics" },
  settings: { pt: "Configuração", en: "Settings" },
  rrLabelSetting: {
    pt: "Nome do indicador de devolução no Dashboard Cliente",
    en: "Return indicator name on the Client Dashboard",
  },
} as const satisfies Record<string, Bilingual>;

export type DictKey = keyof typeof dict;
export const translate = (lang: Lang, key: DictKey): string => dict[key][lang];
