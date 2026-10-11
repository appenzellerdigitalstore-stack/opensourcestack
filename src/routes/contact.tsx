import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({ meta: [
    { title: "Contact — OpenSourceStack" },
    { name: "description", content: "Get in touch about a tool, a correction, a sponsorship, or anything else." },
  ] }),
});

function Contact() {
  return <main className="prose-page shell">
    <div className="eyebrow">// Contact</div>
    <h1>Get in touch.</h1>
    <p className="lead">A few different things might have brought you here. Pick the one that fits and the response will be more useful.</p>
    <h2>I want to suggest a tool</h2>
    <p>Email us at <strong>hello [at] opensourcestack.ink</strong> with the project URL, the category you'd put it in, and one sentence on why it deserves a spot. We triage weekly and respond to every suggestion. Suggesting a tool does not guarantee a listing — every entry still has to clear the methodology.</p>
    <h2>I have a correction</h2>
    <p>If something on a listing is wrong — a broken link, a stale score, a misuse, an outdated pricing note — point at the page and tell us what should change. Corrections are usually applied within a few days.</p>
    <h2>I represent a project that's in the directory</h2>
    <p>If you'd like a refresh, a new screenshot, or a correction to a listing that describes your work, email us. We treat maintainer corrections as high-priority.</p>
    <h2>Sponsorship or press</h2>
    <p>For sponsorship enquiries, see the relevant section in the <em>about</em> page. For press, mention <em>press</em> in the subject line.</p>
    <h2>Why a contact page, not a form</h2>
    <p>An email is the lowest-friction way to reach a real person and it lets you include context, links, and screenshots without being constrained by form fields. Replies usually come from the editor directly.</p>
  </main>;
}
