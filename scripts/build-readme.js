// data/courses.js から README.md の「科目一覧」「登録済みの教材」を作り直す。
// 使い方: node scripts/build-readme.js
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
global.window = {};
require(path.join(root, "data/courses.js"));
const courses = window.COURSES;

const lines = ["## 科目一覧", "", "| 番号 | 科目 | ページ | 教材 |", "|------|------|--------|------|"];
for (const c of courses) {
  const n = c.materials.length;
  lines.push(`| ${c.id} | ${c.name} | [courses/${c.id}.html](courses/${c.id}.html) | ${n ? n + "件" : "–"} |`);
}
lines.push("", "## 登録済みの教材");
for (const c of courses) {
  if (!c.materials.length) continue;
  lines.push("", `### ${c.id} ${c.name}`, "", "| 番号 | 教材 | ファイル | 元のページ |", "|------|------|----------|------------|");
  for (const m of c.materials) {
    const file = m.file ? `[${m.file}](${m.file})` : "–";
    const orig = m.url ? `[claude.ai](${m.url})` : "–";
    lines.push(`| ${c.id}-${m.lesson} | ${m.title} | ${file} | ${orig} |`);
  }
}

const START = "<!-- AUTO-GENERATED:START (scripts/build-readme.js が自動更新します。直接編集しないでください) -->";
const END = "<!-- AUTO-GENERATED:END -->";
const readmePath = path.join(root, "README.md");
const readme = fs.readFileSync(readmePath, "utf8");
const i = readme.indexOf(START), j = readme.indexOf(END);
if (i === -1 || j === -1) throw new Error("README.md に AUTO-GENERATED の目印がありません");
const next = readme.slice(0, i + START.length) + "\n" + lines.join("\n") + "\n" + readme.slice(j);
if (next !== readme) {
  fs.writeFileSync(readmePath, next);
  console.log("README.md を更新しました");
} else {
  console.log("README.md は最新です");
}
