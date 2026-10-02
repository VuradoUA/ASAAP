import { createFileRoute, notFound } from "@tanstack/react-router";
import { SectionPage } from "@/components/layout/SectionPage";
import { ASAAP_SECTIONS } from "@/features/asaap/sections";

export const Route = createFileRoute("/asaap/$secao")({
  loader: ({ params }) => {
    const section = ASAAP_SECTIONS.find((s) => s.id === params.secao);
    if (!section) throw notFound();
    return { id: section.id };
  },
  component: AsaapSection,
});

function AsaapSection() {
  const { id } = Route.useLoaderData();
  const section = ASAAP_SECTIONS.find((s) => s.id === id);
  return section ? <SectionPage section={section} sections={ASAAP_SECTIONS} base="/asaap" /> : null;
}
