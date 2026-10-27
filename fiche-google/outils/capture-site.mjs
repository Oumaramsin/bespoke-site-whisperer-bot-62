// Capture d'un site via le protocole DevTools de Chrome (émulation iPhone ou bureau).
// node capture.mjs <url> <out-prefix> <largeur> <hauteur> <dpr> <mobile 0|1> <full|scroll> [y1,y2,...]
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [, , url, out, w, h, dpr, mobile, mode = "scroll", scrolls = "0"] = process.argv;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9300 + Math.floor(Math.random() * 600);
const prof = join(process.env.SCRATCH || tmpdir(), "chrome-prof-" + port);
mkdirSync(prof, { recursive: true });
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check",
  `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "about:blank",
], { stdio: "ignore" });

let ver;
for (let i = 0; i < 80 && !ver; i++) {
  try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { await sleep(250); }
}
const ws = new WebSocket(ver.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let id = 0; const pending = new Map(); const listeners = [];
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else listeners.forEach((f) => f(m));
});
const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
  const i = ++id; pending.set(i, (m) => (m.error ? reject(new Error(method + ": " + m.error.message)) : resolve(m.result)));
  ws.send(JSON.stringify({ id: i, method, params, sessionId }));
});

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
const S = (m, p) => send(m, p, sessionId);
const W = +w, H = +h, D = +dpr, M = mobile === "1";
await S("Page.enable");
await S("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: D, mobile: M });
if (M) {
  await S("Emulation.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1", platform: "iPhone" });
  await S("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
}
const loaded = new Promise((r) => listeners.push((m) => m.method === "Page.loadEventFired" && m.sessionId === sessionId && r()));
await S("Page.navigate", { url });
await Promise.race([loaded, sleep(20000)]);
await sleep(5000);
// Masque les bandeaux cookies et pop-ups fixes pour la capture (rien n'est accepté).
const hide = `(() => { let n = 0; document.documentElement.style.scrollBehavior = 'auto';
  for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el);
    if ((cs.position === 'fixed' || cs.position === 'sticky') && /cookie|consent|rgpd|confidentialit/i.test(el.textContent || '') && (el.textContent || '').length < 1500) { el.remove(); n++; } }
  return n; })()`;
console.log("bandeaux masqués:", (await S("Runtime.evaluate", { expression: hide, returnByValue: true })).result.value);
if (mode === "full") {
  const { cssContentSize } = await S("Page.getLayoutMetrics");
  // Fait défiler la page pour déclencher les images et animations paresseuses
  for (let y = 0; y < cssContentSize.height; y += H / 2) { await S("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` }); await sleep(250); }
  await S("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" }); await sleep(1500);
  const m2 = await S("Page.getLayoutMetrics");
  const { data } = await S("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: Math.min(m2.cssContentSize.height, 12000), scale: 1 } });
  writeFileSync(`${out}-full.png`, Buffer.from(data, "base64"));
  console.log("hauteur", m2.cssContentSize.height);
} else {
  for (const y of scrolls.split(",").map(Number)) {
    await S("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
    await sleep(1800);
    const { data } = await S("Page.captureScreenshot", { format: "png" });
    writeFileSync(`${out}-${y}.png`, Buffer.from(data, "base64"));
  }
}
ws.close(); chrome.kill();
process.exit(0);
