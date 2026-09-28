// アーティファクト版ポータル artifact/portal.html を作る。
// 使い方: node scripts/build-artifact.js
// 公開するときは artifact/portal.html をページに、materials/ 以下の HTML を同じパスの付属ファイルにする。
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const css = read("assets/style.css") + `
/* アーティファクト用の追加 */
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){color-scheme:dark}}
:root[data-theme="dark"]{color-scheme:dark}
body{background:var(--bg)}
.vbar{padding-top:calc(8px + env(safe-area-inset-top, 0px))}
.vnav.off{pointer-events:none}
/* 参照ボタンとパネル */
.viewer{isolation:isolate}
.vref{position:absolute;left:12px;bottom:calc(12px + env(safe-area-inset-bottom, 0px));z-index:3;font:inherit;font-size:.88rem;font-weight:700;
  padding:8px 14px;border-radius:99px;border:1.5px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.18)}
.vref span{color:var(--sub);font-weight:400;font-size:.8rem;margin-left:2px}
.vref:hover{border-color:var(--accent);color:var(--accent)}
.vref:focus-visible,.refhead button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.refpanel{position:absolute;inset:0;z-index:4;background:rgba(10,16,28,.55);display:flex;align-items:flex-end;justify-content:flex-start;padding:12px;padding-bottom:calc(12px + env(safe-area-inset-bottom, 0px))}
.refbox{width:min(560px,100%);max-height:min(88%,900px);display:flex;flex-direction:column;background:var(--paper);border-radius:14px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.3)}
.refhead{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--line);flex-wrap:wrap}
.refhead b{font-size:.95rem}
.reftabs{display:flex;gap:6px;flex-wrap:wrap;order:3;flex-basis:100%}
.reftabs:empty{display:none}
.reftabs button{font:inherit;font-size:.8rem;padding:3px 10px;border-radius:99px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer}
.reftabs button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}
#refclose{font:inherit;font-size:.85rem;padding:4px 12px;border-radius:99px;border:1px solid var(--line);background:var(--bg);color:var(--ink);cursor:pointer;margin-left:auto}
.refbody{overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:12px;background:var(--bg)}
.refbody figure{margin:0}
.refbody img{display:block;width:100%;height:auto;border-radius:8px;border:1px solid var(--line);background:#fff}
.refbody figcaption{font-size:.75rem;color:var(--sub);text-align:center;margin-top:3px;font-family:"JetBrains Mono",monospace}
`;

const html = `<title>B1後期 教材ポータル</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
${css}
</style>

<div class="wrap" id="home">
<header>
  <h1>B1後期 教材ポータル</h1>
  <p>Claude Code で作った各科目の教材です。科目を選ぶと、回ごとの教材がこのページの中で開きます。</p>
</header>
<div class="search"><input id="q" type="search" placeholder="科目名・教材名で絞り込み(例: プログラミング、OSI)" aria-label="科目を検索"></div>
<h2 class="sec">科目一覧</h2>
<div class="grid" id="grid"></div>
<h2 class="sec">最近追加した教材</h2>
<div id="recent"></div>
</div>

<div class="wrap" id="course" hidden>
<nav class="crumb"><a href="#top">← 教材ポータル</a></nav>
<header>
  <h1 id="cname"></h1>
  <p id="csub"></p>
</header>
<h2 class="sec">授業ごとの教材</h2>
<ul class="lessons" id="lessons"></ul>
<button class="toggle" id="toggle" type="button"></button>
</div>

<section class="viewer" id="viewer" hidden>
  <div class="vbar">
    <a class="vback" id="vback" href="#top" aria-label="教材一覧に戻る">← 一覧</a>
    <div class="vhead"><span class="mid" id="vid"></span><span class="vtitle" id="vtitle"></span></div>
    <div class="vtools">
      <a class="vnav" id="vprev">‹ 前</a><a class="vnav" id="vnext">次 ›</a>
      <a class="vorig" id="vorig" href="#top" target="_blank" rel="noopener" title="元のページを新しいタブで開く">↗</a>
    </div>
  </div>
  <iframe id="vframe" class="vframe" title="教材"></iframe>
  <button class="vref" id="vref" type="button" hidden>参照</button>
  <div class="refpanel" id="refpanel" hidden role="dialog" aria-modal="true" aria-label="参照した資料">
    <div class="refbox">
      <div class="refhead"><b>参照した資料</b><div class="reftabs" id="reftabs"></div><button id="refclose" type="button">閉じる</button></div>
      <div class="refbody" id="refbody"></div>
    </div>
  </div>
</section>

<script>
${read("data/courses.js")}
</script>
<script>
${read("assets/portal.js")}
</script>
`;

fs.mkdirSync(path.join(root, "artifact"), { recursive: true });
fs.writeFileSync(path.join(root, "artifact/portal.html"), html);

global.window = {};
require(path.join(root, "data/courses.js"));
const files = [];
for (const c of window.COURSES) for (const m of c.materials) {
  if (m.file) files.push(m.file);
  for (const r of m.refs || []) {
    if (r.files) files.push(...r.files);
    else for (let i = 1; i <= r.pages; i++) files.push(r.dir + "/p" + String(i).padStart(2, "0") + ".jpg");
  }
}
const missing = [...new Set(files)].filter((f) => !fs.existsSync(path.join(root, f)));
if (missing.length) console.log("※ 手元にないファイル(公開済みならそのまま残る): " + missing.length + " 件");
console.log("artifact/portal.html を作成しました。付属ファイル " + files.length + " 件:");
fs.writeFileSync(path.join(root, "artifact/files.json"), JSON.stringify(Object.fromEntries([...new Set(files)].filter((f) => fs.existsSync(path.join(root, f))).map((f) => [f, f])), null, 1));
console.log("公開するファイルの対応表: artifact/files.json");
