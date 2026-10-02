import { createFileRoute, notFound } from "@tanstack/react-router";
import { SectionPage } from "@/components/layout/SectionPage";
import { CLIENT_SECTIONS } from "@/features/cliente/sections";

export const Route = createFileRoute("/cliente/$secao")({
  loader: ({ params }) => {
    const section = CLIENT_SECTIONS.find((s) => s.id === params.secao);
    if (!section) throw notFound();
    return { id: section.id };
  },
  component: ClientSection,
});

function ClientSection() {
  const { id } = Route.useLoaderData();
  const section = CLIENT_SECTIONS.find((s) => s.id === id);
  return section ? (
    <SectionPage section={section} sections={CLIENT_SECTIONS} base="/cliente" />
  ) : null;
}
