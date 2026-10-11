import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({ meta: [
    { title: "About — OpenSourceStack" },
    { name: "description", content: "Why OpenSourceStack exists, how it is curated, and what we will not do." },
  ] }),
});

function About() {
  return <main className="prose-page shell">
    <div className="eyebrow">// About</div>
    <h1>The directory we kept wishing existed.</h1>
    <p className="lead">Finding an open source alternative shouldn't mean digging through outdated listicles, abandoned repositories, or paid recommendations disguised as reviews. We curate. We score. We tell you when we don't know.</p>
    <h2>What we do</h2>
    <p>OpenSourceStack is a hand-curated directory of open source alternatives to the tools you pay for. Every entry is selected, scored, and explained by an editor — no aggregation, no scraping, no paid placement.</p>
    <h2>What we will not do</h2>
    <ul>
      <li>We will not run sponsored reviews. Any sponsorship is labelled clearly and never purchases a review outcome.</li>
      <li>We will not aggregate from the wider web. If we have not looked at a tool, it is not in the directory.</li>
      <li>We will not pretend to have tested what we have not tested. Where a listing has not been directly exercised, the page says so.</li>
      <li>We will not let abandoned projects linger. Dead links and stale metadata are removed at every quarterly check.</li>
    </ul>
    <h2>How a project gets in</h2>
    <p>Three signals: <strong>documentation</strong> (does it tell you how to run it?), <strong>licensing</strong> (can you actually use it?), and <strong>maintenance</strong> (is anyone still answering issues?). If all three look healthy and the project solves a real problem, it goes in. The full rubric lives on the <Link to="/methodology">methodology page</Link>.</p>
    <h2>Why this exists</h2>
    <p>Because the cost of "I'll just subscribe" compounds. Because teams deserve to know what self-hosting really costs. Because some of the best software in the world is free, but "free" has a marketing problem — and a discovery problem. OpenSourceStack exists to make the discovery problem smaller.</p>
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      <Link className="btn-glow" to="/methodology">Read the methodology<ArrowUpRight size={14} /></Link>
      <Link className="btn-outline" to="/contact">Contact<ArrowUpRight size={14} /></Link>
    </div>
  </main>;
}
