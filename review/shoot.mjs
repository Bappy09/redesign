// CDP screenshot driver — precise device emulation + true full-page capture.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "file:///C:/Users/AMD/chambers-redesign/dist/index.html";
const PORT = 9333;
const OUT = "C:/Users/AMD/chambers-redesign/review";

const shots = [
  { name: "final-mobile",  w: 375,  h: 812,  mobile: true },
  { name: "final-tablet",  w: 768,  h: 1024, mobile: true },
  { name: "final-desktop", w: 1280, h: 900,  mobile: false },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=C:/Users/AMD/chambers-redesign/review/.cdp-profile",
  "about:blank",
], { stdio: "ignore" });

async function getVersion() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome CDP not reachable");
}

function cdp(ws) {
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    }
  });
  return (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const m = ++id;
      pending.set(m, { resolve, reject });
      ws.send(JSON.stringify({ id: m, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
}

const openWS = (url) =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.addEventListener("open", () => resolve(ws));
    ws.addEventListener("error", reject);
  });

const v = await getVersion();
const bws = await openWS(v.webSocketDebuggerUrl);
const bsend = cdp(bws);

// Route session events to per-session senders
const { targetId } = await bsend("Target.createTarget", { url: "about:blank" });
const { sessionId } = await bsend("Target.attachToTarget", { targetId, flatten: true });

// We need a sender bound to sessionId but sharing same ws; simplest: new sender reusing ws
const send = (method, params) => bsend(method, params, sessionId);

await send("Page.enable", {});
await send("Runtime.enable", {});

for (const s of shots) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.mobile,
    screenWidth: s.w, screenHeight: s.h,
  });
  await send("Page.navigate", { url: URL });
  await sleep(1600); // fonts + chart draw
  // Force all scroll-reveal items to their visible end-state so a no-scroll
  // full-page capture matches what a scrolling user actually sees.
  await send("Runtime.evaluate", {
    expression: "document.querySelectorAll('[data-anim]').forEach(function(e){e.style.transitionDelay='0s';e.classList.add('in');});" +
      "document.querySelectorAll('[data-count]').forEach(function(e){e.textContent=e.getAttribute('data-count')+(e.getAttribute('data-suffix')||'');});" +
      "document.querySelectorAll('.jstep').forEach(function(e){e.classList.add('lit');});" +
      "var jf=document.getElementById('journeyFill'); if(jf) jf.style.width='100%';",
  });
  await sleep(1000);
  const { result } = await send("Runtime.evaluate", {
    expression: "document.documentElement.scrollWidth + 'x' + document.documentElement.scrollHeight + ' vw=' + document.documentElement.clientWidth",
    returnByValue: true,
  });
  console.log(s.name, "=>", result.value);
  const shot = await send("Page.captureScreenshot", {
    format: "png", captureBeyondViewport: true, fromSurface: true,
  });
  writeFileSync(`${OUT}/${s.name}.png`, Buffer.from(shot.data, "base64"));
}

bws.close();
chrome.kill();
console.log("done");
process.exit(0);
