import { createFileRoute } from "@tanstack/react-router";
import { DirectoryHome } from "@/components/DirectoryHome";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [
    { title: "OpenSourceStack — Your next stack, not your next subscription" },
    { name: "description", content: "Editorially reviewed open source alternatives to the tools you pay for. 100+ tools across 14 categories." },
    { property: "og:title", content: "OpenSourceStack" },
    { property: "og:description", content: "Editorially reviewed open source alternatives to the tools you pay for." },
    { property: "og:type", content: "website" },
  ] }),
});

function Home() {
  return <DirectoryHome />;
}
