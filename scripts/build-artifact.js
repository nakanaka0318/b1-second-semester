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
for (const c of window.COURSES) for (const m of c.materials) if (m.file) files.push(m.file);
console.log("artifact/portal.html を作成しました。付属ファイル " + files.length + " 件:");
console.log(JSON.stringify(Object.fromEntries(files.map((f) => [f, f]))));
