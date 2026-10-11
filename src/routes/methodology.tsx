import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/methodology")({
  component: Methodology,
  head: () => ({ meta: [
    { title: "Methodology — OpenSourceStack" },
    { name: "description", content: "How OpenSourceStack selects, scores, and revises its directory entries." },
  ] }),
});

function Methodology() {
  return <main className="prose-page shell">
    <div className="eyebrow">// Methodology</div>
    <h1>How we review every project.</h1>
    <p className="lead">There is no mystery to a good directory. Every entry is reviewed against the same five signals, scored on the same two scales, and re-verified on a fixed cadence. Here's exactly how it works.</p>
    <h2>The five signals</h2>
    <p>For every project we ask, in order:</p>
    <ul>
      <li><strong>Documentation.</strong> Can a new user follow the docs from a clean checkout to a working install? Are the commands current? Is the changelog honest?</li>
      <li><strong>Licensing.</strong> Is the licence clear? Is it OSI-approved? Are there commercial restrictions a self-hoster would care about?</li>
      <li><strong>Maintenance.</strong> Are issues being triaged? Is there a recent release? Are PRs reviewed in a reasonable window? Is there a single point of failure (one maintainer, no co-maintainers)?</li>
      <li><strong>Security.</strong> Has there been a recent CVE? Is there a security policy? Are dependencies updated? Are there public incidents we can describe?</li>
      <li><strong>Adoption evidence.</strong> Is the project used by people we can name, with a use case we can describe?</li>
    </ul>
    <p>A project that fails on any of the first three is removed or held for re-review. A project that is excellent on the first three but unproven on the last two can still be listed — the entry will say so.</p>
    <h2>The two scores</h2>
    <p>Every entry carries a <strong>Security</strong> and a <strong>Quality</strong> score, each out of 100. They are independent, recomputed manually at every quarterly re-check, and explained on the entry page.</p>
    <ul>
      <li><strong>Security 0–100.</strong> Weight: licensing clarity (15), CVE history (25), security policy (15), dependency freshness (20), update responsiveness (25).</li>
      <li><strong>Quality 0–100.</strong> Weight: documentation quality (25), install ergonomics (20), community health (20), feature completeness (20), maintenance velocity (15).</li>
    </ul>
    <p>Scores are advisory, not absolute. A 78 in Quality is not a guarantee. A 95 in Security is not a green light to skip your own due diligence.</p>
    <h2>What "independently reviewed" actually means</h2>
    <p>It means an editor has read the documentation, examined the repository, and made a call. It does <em>not</em> mean we have run the software in production for six months. Where we have, the entry says so. Where we have only reviewed the public evidence, the entry says that too.</p>
    <h2>Re-review cadence</h2>
    <p>Every entry is re-checked on a quarterly rolling schedule. The re-check is the same five signals plus a delta against the previous score. If anything has materially worsened, the entry is held for re-review and the score is recomputed. If anything has materially improved, the score is recomputed in the other direction.</p>
    <h2>Removal</h2>
    <p>An entry is removed when one of the following becomes true:</p>
    <ul>
      <li>The project is archived or the repository becomes read-only for more than 90 days without an active fork.</li>
      <li>The licence changes in a way that breaks existing users' rights.</li>
      <li>The maintainer asks for removal.</li>
      <li>The project is acquired by a vendor and the open source edition is end-of-life'd.</li>
    </ul>
    <p>Removed entries stay in the git history but are no longer indexed or surfaced in the directory.</p>
    <h2>Sponsorship</h2>
    <p>Sponsorship is allowed and labelled. It never purchases a review outcome, an editorial slot, or a higher score. Sponsor tiers cover the cost of running the directory and let us spend more time on harder reviews.</p>
  </main>;
}
