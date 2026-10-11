import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MatrixRain } from "@/components/MatrixRain";
import "../styles.css";

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { title: "OpenSourceStack — Open source alternatives, hand-curated" },
      { name: "description", content: "A directory of open source alternatives to the tools you pay for. Editorially reviewed, transparently scored, and free of paid rankings." },
      { name: "robots", content: "index, follow" },
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: "OpenSourceStack" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return <html lang="en">
    <head><HeadContent /></head>
    <body>
      <div className="site-page">
        <MatrixRain />
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
      <Scripts />
    </body>
  </html>;
}

function NotFound() {
  return <main className="prose-page shell">
    <div className="eyebrow">404</div>
    <h1>Page not found</h1>
    <p className="lead">That URL isn't part of the directory. Try the home page or the full <a href="/">tool index</a>.</p>
  </main>;
}
