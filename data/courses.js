/*
 * 教材データ
 * 教材を追加するときは、教材の HTML を materials/<科目番号>/ に置き、該当する科目の materials に
 *   { id: "5-2-2-xxx", lesson: 回, title: "タイトル", file: "materials/5-2/5-2-2-xxx.html",
 *     url: "https://claude.ai/artifact/...", note: "ひとこと説明" }
 * を足すだけでOKです。トップページと科目ページの両方に自動で反映されます。
 * file があるとポータル内で表示し、url は「元のページ」へのリンクになります。
 * file を省略すると url を新しいタブで開きます。
 * refs には教材のもとにしたノート写真やスライド(refs/ 以下、git には入れない)を書きます。
 *   { label: "ノート", files: ["refs/xxx.jpg"] } または { label: "スライド #1", dir: "refs/slide-01", pages: 25 }
 * アーティファクト版では、教材の左下に「参照」ボタンとして表示されます。
 */
window.LESSON_COUNT = 15;

window.COURSES = [
  { id: "1-1", name: "確率統計",               materials: [
    { id: "1-1-1-probability-space", refs: [{ label: "ノート", files: ["refs/1-1-1-note.jpg"] }],
      lesson: 1, title: "確率の考え方と確率空間",
      file: "materials/1-1/1-1-1-probability-space.html",
      note: "数学的・統計的・主観的確率、σ集合体、確率測度。σ集合体チェッカーと大数の法則のグラフ付き" },
    { id: "1-1-2-conditional", refs: [{ label: "ノート", files: ["refs/1-1-2-note.jpg"] }],
      lesson: 2, title: "独立な試行と条件付き確率",
      file: "materials/1-1/1-1-2-conditional.html",
      note: "独立な試行・反復試行の定理・条件付き確率・乗法定理。サイコロ表とシミュレーション、答え合わせ付き練習問題10問" },
    { id: "1-1-3-bayes", refs: [{ label: "ノート", files: ["refs/1-1-3-note.jpg"] }],
      lesson: 3, title: "全確率の定理とベイズの定理",
      file: "materials/1-1/1-1-3-bayes.html",
      note: "クロス表、くじの順番、全確率の定理、ベイズの定理、事前確率・事後確率。不良品の原因を探る工場シミュレーション付き" }
  ] },
  { id: "1-2", name: "テクニカルリテラシー",   materials: [
    { id: "1-2-1-technical-documents", refs: [{ label: "ノート", files: ["refs/1-2-1-note.jpg"] }],
      lesson: 1, title: "理系の文書力と技術文書の種類",
      file: "materials/1-2/1-2-1-technical-documents.html",
      note: "文書力が必要な理由、技術文書の読み方(行間を読む)、6種類の技術文書。文書あてクイズと理解度チェック付き" },
    { id: "1-2-2-writing-rules", refs: [{ label: "ノート", files: ["refs/1-2-2-note.jpg"] }],
      lesson: 2, title: "理系の文書で必要なこと・不要なこと",
      file: "materials/1-2/1-2-2-writing-rules.html",
      note: "事実と意見の区別、不要な表現、首尾一貫しない文の直し方。自分の文を診断できる文章チェッカー付き" },
    { id: "1-2-3-document-structure", refs: [{ label: "ノート", files: ["refs/1-2-3-note.jpg"] }],
      lesson: 3, title: "文章の構造と逆茂木型の文",
      file: "materials/1-2/1-2-3-document-structure.html",
      note: "隠れた主語、首尾一貫の心得、文・パラグラフ・節・章、逆茂木型の文。17の句に分けた例文を解体できる図付き" }
  ] },
  { id: "1-3", name: "コンピュータアーキテクチャ", materials: [
    { id: "1-3-1-organization-isa", refs: [{ label: "ノート①", files: ["refs/1-3-1-note-a.jpg"] }, { label: "ノート②(二重線より上)", files: ["refs/1-3-x-note-b.jpg"] }],
      lesson: 1, title: "コンピュータの構成と命令セット",
      file: "materials/1-3/1-3-1-organization-isa.html",
      note: "ノイマン型、5大構成要素、語長、機械語とアセンブリ言語、命令セット、RISC/CISC。C言語→機械語の変換デモ付き" },
    { id: "1-3-2-instruction-cycle", refs: [{ label: "ノート①(二重線より下)", files: ["refs/1-3-x-note-b.jpg"] }, { label: "ノート②", files: ["refs/1-3-2-note-c.jpg"] }],
      lesson: 2, title: "プロセッサの基本動作と命令サイクル",
      file: "materials/1-3/1-3-2-instruction-cycle.html",
      note: "PC・IR・ALU、命令サイクル7段階、PCの計算(+4)、制御方式。1ステップずつ動かせるCPUシミュレータ付き" },
    { id: "1-3-3-addressing", refs: [{ label: "ノート", files: ["refs/1-3-3-note.jpg"] }],
      lesson: 3, title: "アドレッシングと記憶装置",
      file: "materials/1-3/1-3-3-addressing.html",
      note: "絶対・実効・相対アドレス、アドレス空間、6つのアドレッシング方式、記憶階層、ノイマン・ボトルネック。方式を切り替えられるシミュレータ付き" }
  ] },
  { id: "1-4", name: "情報通信ネットワーク",   materials: [
    { id: "1-4-1-network-osi", refs: [{ label: "スライド #1", dir: "refs/slide-01", pages: 25 }],
      lesson: 1, title: "ネットワーク基礎とOSI参照モデル",
      file: "materials/1-4/1-4-1-network-osi.html",
      note: "#1 ネットワークの規模・歴史・プロトコル・OSI参照モデル。スライドの穴埋め、ヘッダが付く様子を追えるカプセル化の図付き" },
    { id: "1-4-2-tcpip", refs: [{ label: "スライド #2", dir: "refs/slide-02", pages: 28 }],
      lesson: 2, title: "TCP/IP基礎",
      file: "materials/1-4/1-4-2-tcpip.html",
      note: "#2 TCP/IPの歴史・RFC・階層モデル・アドレス・パケット構造。回線交換とパケット交換のシミュレーション付き" },
    { id: "1-4-3-physical-layer", refs: [{ label: "スライド #3", dir: "refs/slide-03", pages: 30 }],
      lesson: 3, title: "物理層と伝送媒体",
      file: "materials/1-4/1-4-3-physical-layer.html",
      note: "#3 ビットの表現・マンチェスター符号・ケーブル・電波・変調・ネットワーク機器。波形を描くツール付き" },
    { id: "1-4-4-datalink", refs: [{ label: "スライド #4", dir: "refs/slide-04", pages: 25 }],
      lesson: 4, title: "データリンク層",
      file: "materials/1-4/1-4-4-datalink.html",
      note: "#4 MACアドレス・ブリッジ/スイッチ・CSMA/CD・Ethernetフレーム・無線LAN・多元接続。スイッチのアドレス学習シミュレータと穴埋め付き" }
  ] },
  { id: "2-1", name: "社会科学基礎",           materials: [
    { id: "2-1-1-cold-war", refs: [{ label: "スライド 第1・2回", dir: "refs/2-1-1", pages: 7 }],
      lesson: 1, title: "冷戦の時代",
      file: "materials/2-1/2-1-1-cold-war.html",
      note: "共産主義と資本主義、冷戦の始まり、安全保障のジレンマ、キューバ危機、ベトナム戦争、イメージ戦争。年表・ジレンマ体験ゲーム付き" }
  ] },
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
      note: "文字列と ASCII コード、大文字変換、^ で大文字の位置を示す課題の解説" },
    { id: "5-2-2-c-basics", lesson: 2, title: "C言語の基本構造",
      file: "materials/5-2/5-2-2-c-basics.html",
      note: "プログラムができるまで、文・識別子・変数と型・定数・printf/scanf・制御構造・関数の宣言と定義・配列と文字列、用語集" },
    { id: "5-2-2-kadai2", refs: [{ label: "課題のスライド", files: ["refs/5-2-2-kadai2.jpg"] }],
      lesson: 2, title: "課題2 解説 ― 条件分岐と繰り返し",
      file: "materials/5-2/5-2-2-kadai2.html",
      note: "序数の接尾辞・文字の種類・暗証番号3回の段階的ヒント、解答例、別解、よくある間違い。ブラウザで試せる体験コーナー付き" }
  ] },
  { id: "5-3", name: "プラティカルICT",        materials: [] }
];
