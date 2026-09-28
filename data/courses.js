/*
 * 教材データ
 * 教材を追加するときは、教材の HTML を materials/<科目番号>/ に置き、該当する科目の materials に
 *   { id: "5-2-2-xxx", lesson: 回, title: "タイトル", file: "materials/5-2/5-2-2-xxx.html",
 *     url: "https://claude.ai/artifact/...", note: "ひとこと説明" }
 * を足すだけでOKです。トップページと科目ページの両方に自動で反映されます。
 * file があるとポータル内で表示し、url は「元のページ」へのリンクになります。
 * file を省略すると url を新しいタブで開きます。
 */
window.LESSON_COUNT = 15;

window.COURSES = [
  { id: "1-1", name: "確率統計",               materials: [
    { id: "1-1-1-conditional", lesson: 1, title: "独立な試行と条件付き確率",
      file: "materials/1-1/1-1-1-conditional.html",
      note: "独立な試行・反復試行の定理・条件付き確率・乗法定理。サイコロ表とシミュレーション、答え合わせ付き練習問題10問" },
    { id: "1-1-2-probability-space", lesson: 2, title: "確率の考え方と確率空間",
      file: "materials/1-1/1-1-2-probability-space.html",
      note: "数学的・統計的・主観的確率、σ集合体、確率測度。σ集合体チェッカーと大数の法則のグラフ付き" }
  ] },
  { id: "1-2", name: "テクニカルリテラシー",   materials: [] },
  { id: "1-3", name: "コンピュータアーキテクチャ", materials: [] },
  { id: "1-4", name: "情報通信ネットワーク",   materials: [] },
  { id: "2-1", name: "社会科学基礎",           materials: [] },
  { id: "2-2", name: "微分積分2",              materials: [] },
  { id: "3-2", name: "中国語",                 materials: [] },
  { id: "3-3", name: "物理学2",                materials: [] },
  { id: "4-2", name: "線形代数2",              materials: [] },
  { id: "4-3", name: "物理学演習",             materials: [] },
  { id: "5-1", name: "創造的思考法",           materials: [] },
  { id: "5-2", name: "プログラミング演習",     materials: [
    { id: "5-2-1-operators", lesson: 1, title: "演算子と型修飾子",
      file: "materials/5-2/5-2-1-operators.html",
      url: "https://claude.ai/artifact/WPM49GQkEvCe24SHigcLRs",
      note: "代入・論理・ビット演算子、優先順位、signed/unsigned、const と練習問題16問" },
    { id: "5-2-1-kadai1", lesson: 1, title: "課題1 解説 ― 文字と文字コード",
      file: "materials/5-2/5-2-1-kadai1.html",
      url: "https://claude.ai/artifact/RLJRE4NrTHtg6a7vnc27yN",
      note: "文字列と ASCII コード、大文字変換、^ で大文字の位置を示す課題の解説" }
  ] },
  { id: "5-3", name: "プラティカルICT",        materials: [] }
];
