import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL="file:///C:/Users/AMD/chambers-redesign/dist/index.html";
const PORT=9344, OUT="C:/Users/AMD/chambers-redesign/review";
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const chrome=spawn(CHROME,["--headless=new","--disable-gpu","--no-sandbox","--hide-scrollbars",`--remote-debugging-port=${PORT}`,"--user-data-dir=C:/Users/AMD/chambers-redesign/review/.cdp2","about:blank"],{stdio:"ignore"});
async function ver(){for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/version`);if(r.ok)return r.json();}catch{}await sleep(250);}throw new Error("no cdp");}
function cdp(ws){let id=0;const p=new Map();ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){const{resolve,reject}=p.get(m.id);p.delete(m.id);m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result);}});return(method,params={},s)=>new Promise((resolve,reject)=>{const m=++id;p.set(m,{resolve,reject});ws.send(JSON.stringify({id:m,method,params,...(s?{sessionId:s}:{})}));});}
const openWS=u=>new Promise((res,rej)=>{const ws=new WebSocket(u);ws.addEventListener("open",()=>res(ws));ws.addEventListener("error",rej);});
const v=await ver();const ws=await openWS(v.webSocketDebuggerUrl);const b=cdp(ws);
const{targetId}=await b("Target.createTarget",{url:"about:blank"});const{sessionId}=await b("Target.attachToTarget",{targetId,flatten:true});
const send=(m,p)=>b(m,p,sessionId);
await send("Page.enable",{});await send("Runtime.enable",{});
const crops=[
 {name:"crop-desk-hero",w:1280,h:820,mobile:false,y:0},
 {name:"crop-desk-about",w:1280,h:820,mobile:false,y:3050},
 {name:"crop-desk-contact",w:1280,h:900,mobile:false,y:5500},
 {name:"crop-mob-hero",w:375,h:760,mobile:true,y:0},
];
for(const c of crops){
 await send("Emulation.setDeviceMetricsOverride",{width:c.w,height:c.h,deviceScaleFactor:1,mobile:c.mobile,screenWidth:c.w,screenHeight:c.h});
 await send("Page.navigate",{url:URL});await sleep(1500);
 await send("Runtime.evaluate",{expression:"document.querySelectorAll('.reveal').forEach(e=>{e.style.transitionDelay='0s';e.classList.add('is-visible')});window.scrollTo(0,"+c.y+");"});
 await sleep(700);
 const shot=await send("Page.captureScreenshot",{format:"png",fromSurface:true});
 writeFileSync(`${OUT}/${c.name}.png`,Buffer.from(shot.data,"base64"));
 console.log(c.name);
}
ws.close();chrome.kill();process.exit(0);
