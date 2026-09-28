# B1後期 教材ポータル

Claude Code で作った各科目の教材へ遷移するためのホームページです。
トップページ `index.html` から科目を選ぶと、授業回ごとの教材が表示されます。
教材はページを移動せず、ポータルの中でそのまま開きます(上部バーで「一覧に戻る・前/次の教材・元のページ」)。

## 科目一覧

| 番号 | 科目 | ページ | 教材 |
|------|------|--------|------|
| 1-1 | 確率統計 | [courses/1-1.html](courses/1-1.html) | – |
| 1-2 | テクニカルリテラシー | [courses/1-2.html](courses/1-2.html) | – |
| 1-3 | コンピュータアーキテクチャ | [courses/1-3.html](courses/1-3.html) | – |
| 1-4 | 情報通信ネットワーク | [courses/1-4.html](courses/1-4.html) | – |
| 2-1 | 社会科学基礎 | [courses/2-1.html](courses/2-1.html) | – |
| 2-2 | 微分積分2 | [courses/2-2.html](courses/2-2.html) | – |
| 3-2 | 中国語 | [courses/3-2.html](courses/3-2.html) | – |
| 3-3 | 物理学2 | [courses/3-3.html](courses/3-3.html) | – |
| 4-2 | 線形代数2 | [courses/4-2.html](courses/4-2.html) | – |
| 4-3 | 物理学演習 | [courses/4-3.html](courses/4-3.html) | – |
| 5-1 | 創造的思考法 | [courses/5-1.html](courses/5-1.html) | – |
| 5-2 | プログラミング演習 | [courses/5-2.html](courses/5-2.html) | 2件 |
| 5-3 | プラティカルICT | [courses/5-3.html](courses/5-3.html) | – |

## 登録済みの教材

### 5-2 プログラミング演習

| 番号 | 教材 | ファイル | 元のページ |
|------|------|----------|------------|
| 5-2-1 | 演算子と型修飾子 | [materials/5-2/5-2-1-operators.html](materials/5-2/5-2-1-operators.html) | [claude.ai](https://claude.ai/artifact/WPM49GQkEvCe24SHigcLRs) |
| 5-2-1 | 課題1 解説 ― 文字と文字コード | [materials/5-2/5-2-1-kadai1.html](materials/5-2/5-2-1-kadai1.html) | [claude.ai](https://claude.ai/artifact/RLJRE4NrTHtg6a7vnc27yN) |

## 教材の追加方法

1. 教材の HTML を `materials/<科目番号>/` に置く(claude.ai の教材は他サイトに埋め込めない設定のため、HTML をコピーして置きます)
2. `data/courses.js` の該当科目の `materials` に追加する

```js
{ id: "5-2-2-xxx", lesson: 2, title: "教材タイトル",
  file: "materials/5-2/5-2-2-xxx.html",
  url: "https://claude.ai/artifact/xxxx", note: "ひとこと説明" },
```

`file` があるとポータル内で表示し、`url` は「元のページ」ボタンのリンクになります。`file` を省略すると `url` を新しいタブで開きます。

`lesson` が授業回で、`5-2` の `lesson: 2` なら「5-2-2(プログラミング演習 第2回)」になります。

## 構成

```
index.html          トップページ(科目一覧・最近追加した教材・検索)
courses/<番号>.html  科目ページ(第1〜15回の教材リスト + 教材ビューア。#教材ID で表示)
materials/<番号>/    教材の HTML 本体
data/courses.js     科目と教材のデータ(ここだけ編集すればOK)
assets/style.css    共通スタイル(ライト/ダーク両対応)
assets/app.js       描画スクリプト
```

## 公開(GitHub Pages)

リポジトリの Settings → Pages で、Branch をこのブランチ(または main)の `/ (root)` に設定すると、
`https://nakanaka0318.github.io/b1-second-semester/` で公開されます。
ビルド不要の静的サイトなので、`index.html` をブラウザで直接開いても動きます。
