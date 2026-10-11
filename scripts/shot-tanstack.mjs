// Screenshot the new TanStack Start opensourcestack build for review.
import { writeFile } from "node:fs/promises";
import { WebSocket } from "ws";

const targets = [
  { url: "http://127.0.0.1:4175/", out: "F:/.Projects/opensourcestack/.verify/home.png" },
  { url: "http://127.0.0.1:4175/listings/appsmith", out: "F:/.Projects/opensourcestack/.verify/listing.png" },
  { url: "http://127.0.0.1:4175/methodology", out: "F:/.Projects/opensourcestack/.verify/methodology.png" },
];

const list = await fetch("http://127.0.0.1:9223/json").then(r => r.json());
const page = list.find(t => t.type === "page") || list[0];
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((ok, fail) => { ws.once("open", ok); ws.once("error", fail); });
let id = 0; const pending = new Map();
ws.on("message", m => { const msg = JSON.parse(m.toString()); if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); } });
const send = (m, p = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { resolve: res, reject: rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
await send("Page.enable"); await send("Network.enable"); await send("Network.setCacheDisabled", { cacheDisabled: true });

for (const { url, out } of targets) {
  console.log("Visiting", url);
  const navP = new Promise(resolve => {
    const h = m => { const msg = JSON.parse(m.toString()); if (msg.method === "Page.loadEventFired") { ws.off("message", h); resolve(); } };
    ws.on("message", h);
  });
  await send("Page.navigate", { url });
  await navP;
  await new Promise(r => setTimeout(r, 1800));
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, document.body.scrollHeight);" });
  await new Promise(r => setTimeout(r, 600));
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0);" });
  await new Promise(r => setTimeout(r, 500));
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(out, Buffer.from(data, "base64"));
  console.log("  wrote", out);
}
ws.close();
