import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "public/images/projects/opera-mes");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 720 }, deviceScaleFactor: 1 });

const frame = (content) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
*{box-sizing:border-box}body{margin:0;background:#0b1018;color:#e8edf4;font:14px Arial,sans-serif}
.app{height:720px;background:#101722;border:1px solid #253144}.top{height:62px;display:flex;align-items:center;gap:16px;padding:0 22px;border-bottom:1px solid #2b3748;background:#0c121c}
.logo{width:34px;height:34px;border-radius:50%;background:conic-gradient(#ec1683,#416add,#45c4d5,#f2d24b,#ec1683);display:grid;place-items:center}.logo:after{content:"";width:17px;height:17px;border-radius:50%;background:#101722}
.brand{font-size:17px;font-weight:700}.muted{color:#94a3b8}.layout{display:grid;grid-template-columns:218px 1fr;height:656px}.side{padding:22px 14px;border-right:1px solid #263346;color:#acb8c9}.side strong{display:block;color:#edf3fa;margin:0 8px 20px}.side div{padding:13px 10px;border-radius:6px;margin:4px 0}.side .active{background:#193b60;color:#8dcaff}.main{padding:26px 30px;overflow:hidden}.title{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.title h1{font-size:22px;margin:0}.label{font-size:12px;color:#9badc2}.toolbar{height:42px;display:flex;align-items:center;justify-content:space-between;background:#161f2c;border:1px solid #29384b;border-radius:6px;padding:0 12px;margin-bottom:14px}
table{width:100%;border-collapse:collapse;background:#121a25;border:1px solid #2b3748}th,td{padding:13px 14px;text-align:left;border-bottom:1px solid #293444}th{font-size:12px;color:#9baabd;background:#17212e}td{color:#d5deea}.pill{color:#9fe0c4;background:#15372d;padding:4px 8px;border-radius:20px;font-size:11px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.panel{border:1px solid #29384b;background:#121a25;border-radius:7px;padding:18px}.panel h3{font-size:14px;margin:0 0 14px}.metric{font-size:26px;font-weight:700;margin:10px 0}.bars{height:150px;display:flex;align-items:end;gap:14px;padding:10px 14px;border-left:1px solid #435066;border-bottom:1px solid #435066;background:repeating-linear-gradient(to bottom,transparent 0 35px,#263345 36px)}.bar{flex:1;background:#2687df;border-radius:3px 3px 0 0}.legend{display:flex;gap:14px;margin-top:12px;color:#9baabd;font-size:11px}.dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#288be7;margin-right:5px}.chartline{height:150px;display:flex;align-items:center;justify-content:center;color:#50aaff;font-size:22px;letter-spacing:0;white-space:nowrap;overflow:hidden;border-bottom:1px solid #435066;background:repeating-linear-gradient(to bottom,transparent 0 35px,#263345 36px)}pre{margin:0;padding:18px;background:#0d141e;color:#a9c8e4;border:1px solid #29384b;border-radius:5px;font:13px/1.8 Consolas,monospace}.row{display:flex;justify-content:space-between;border-bottom:1px solid #293444;padding:12px 0;color:#b8c4d3}.row:last-child{border:0}.tag{padding:5px 8px;border:1px solid #35445a;border-radius:5px;color:#a8bad0;font-size:11px}
</style></head><body>${content}</body></html>`;

const shell = (body) => `<div class="app"><header class="top"><span class="logo"></span><span class="brand">Opera MES</span><span class="muted">Operations</span><span class="muted" style="margin-left:auto">Manufacturing execution</span></header><div class="layout"><aside class="side"><strong>WORKSPACE</strong><div>Overview</div><div class="active">${body.nav}</div><div>Production</div><div>Quality</div><div>Maintenance</div></aside><main class="main">${body.main}</main></div></div>`;

const views = {
  machines: shell({
    nav: "Equipment",
    main: `<div class="title"><h1>Equipment overview</h1><span class="tag">Sample workspace</span></div><div class="toolbar"><span>All production areas</span><span class="muted">Updated just now</span></div><table><thead><tr><th>Asset</th><th>Area</th><th>Status</th><th>Availability</th></tr></thead><tbody>${Array.from({ length: 8 }, (_, i) => `<tr><td>Machine ${String(i + 1).padStart(2, "0")}</td><td>Production line ${String.fromCharCode(65 + (i % 3))}</td><td><span class="pill">${i % 4 === 0 ? "Running" : "Available"}</span></td><td>${92 + (i % 8)}%</td></tr>`).join("")}</tbody></table>`
  }),
  charts: shell({
    nav: "Analytics",
    main: `<div class="title"><h1>Production analytics</h1><span class="tag">Illustrative sample data</span></div><div class="cards"><section class="panel"><h3>Output by shift</h3><div class="bars">${[48, 72, 58, 88, 65, 94].map((h) => `<i class="bar" style="height:${h}%"></i>`).join("")}</div><div class="legend"><span>Shift 1</span><span>Shift 2</span><span>Shift 3</span></div></section><section class="panel"><h3>Quality trend</h3><div class="chartline">● ─ ● ─ ● ─ ● ─ ●</div><div class="legend"><span><i class="dot"></i>Target</span><span><i class="dot"></i>Sample</span></div></section><section class="panel"><h3>Key indicators</h3><div class="row"><span>Availability</span><b>94%</b></div><div class="row"><span>Performance</span><b>89%</b></div><div class="row"><span>Quality</span><b>98%</b></div><div class="row"><span>Overall effectiveness</span><b>82%</b></div></section></div><div class="cards" style="margin-top:16px"><section class="panel"><h3>Output summary</h3><div class="metric">1,280 <span class="muted" style="font-size:13px">units</span></div><span class="muted">Illustrative production total</span></section><section class="panel"><h3>Downtime distribution</h3><div class="bars">${[30, 52, 38, 74, 45].map((h) => `<i class="bar" style="height:${h}%"></i>`).join("")}</div></section><section class="panel"><h3>Production areas</h3><div class="row"><span>Line A</span><b>Active</b></div><div class="row"><span>Line B</span><b>Active</b></div><div class="row"><span>Line C</span><b>Idle</b></div></section></div>`
  }),
  "node-manager": shell({
    nav: "Configuration",
    main: `<div class="title"><h1>Configuration manager</h1><span class="tag">Sample configuration</span></div><div class="cards" style="grid-template-columns:0.8fr 1.2fr 1fr"><section class="panel"><h3>Workspace nodes</h3>${["Production", "Monitoring", "Quality", "Maintenance"].map((item, i) => `<div class="row"><span>${item}</span><span class="muted">Node ${i + 1}</span></div>`).join("")}</section><section class="panel"><h3>Node settings</h3>${["Display name", "Workspace", "Category", "Status", "Refresh interval"].map((item, i) => `<div class="row"><span>${item}</span><span class="tag">${["Sample node", "Production", "Operations", "Enabled", "30 seconds"][i]}</span></div>`).join("")}</section><section><h3>Example data structure</h3><pre>{
  "node": "sample-node",
  "name": "Sample node",
  "category": "operations",
  "enabled": true,
  "children": []
}</pre></section></div>`
  })
};

await mkdir(outputDir, { recursive: true });
try {
  for (const [name, html] of Object.entries(views)) {
    await page.setContent(frame(html), { waitUntil: "load" });
    const screenshot = await page.screenshot({ type: "png" });
    await sharp(screenshot).webp({ quality: 84 }).toFile(path.join(outputDir, `${name}.webp`));
  }
} finally {
  await browser.close();
}

console.log(`Generated synthetic Opera MES previews in ${outputDir}`);
