/* アーティファクト版ポータル(1ページで トップ → 科目 → 教材 を # で切り替える) */
(function () {
  var courses = window.COURSES || [];
  var MAXL = window.LESSON_COUNT || 15;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function findMat(id) {
    for (var i = 0; i < courses.length; i++)
      for (var j = 0; j < courses[i].materials.length; j++)
        if (courses[i].materials[j].id === id) return [courses[i], courses[i].materials[j]];
    return null;
  }
  function matLink(c, m, showCourse) {
    var inPortal = !!(m.file && m.id);
    return '<a class="mat" href="' + (inPortal ? "#" + esc(m.id) : esc(m.url)) + '"' + (inPortal ? "" : ' target="_blank" rel="noopener"') + '>' +
      '<span class="mid">' + esc(c.id + "-" + m.lesson) + '</span>' +
      '<span><div class="mt">' + esc(m.title) + '</div><div class="mn">' +
      (showCourse ? esc(c.name) + " 第" + m.lesson + "回" + (m.note ? " ・ " : "") : "") + esc(m.note || "") + '</div></span>' +
      '<span class="arrow" aria-hidden="true">' + (inPortal ? "›" : "↗") + '</span></a>';
  }

  /* ---------- トップ ---------- */
  var q = document.getElementById("q");
  function drawHome() {
    var f = (q.value || "").trim().toLowerCase(), h = "";
    courses.forEach(function (c) {
      var hay = (c.id + " " + c.name + " " + c.materials.map(function (m) { return m.title; }).join(" ")).toLowerCase();
      if (f && hay.indexOf(f) === -1) return;
      var n = c.materials.length;
      h += '<a class="card' + (n ? " has" : "") + '" href="#c' + esc(c.id) + '"><span class="cid">' + esc(c.id) + '</span>' +
        '<span class="cname">' + esc(c.name) + '</span><span class="count">' + (n ? "教材 <b>" + n + "</b> 件" : "教材はまだありません") + "</span></a>";
    });
    document.getElementById("grid").innerHTML = h || '<p class="empty-msg">該当する科目がありません。</p>';
  }
  q.addEventListener("input", drawHome);
  var all = [];
  courses.forEach(function (c) { c.materials.forEach(function (m) { all.push(matLink(c, m, true)); }); });
  document.getElementById("recent").innerHTML = all.length ? all.reverse().slice(0, 8).join("") : '<p class="empty-msg">まだ教材がありません。</p>';
  drawHome();

  /* ---------- 科目 ---------- */
  var hideEmpty = true;
  function drawCourse(c) {
    document.getElementById("cname").innerHTML = '<span class="code-badge">' + esc(c.id) + "</span>" + esc(c.name);
    var n = c.materials.length, max = MAXL, h = "";
    document.getElementById("csub").textContent = n ? "教材 " + n + " 件" : "教材はまだありません。追加されるとここに表示されます。";
    c.materials.forEach(function (m) { if (m.lesson > max) max = m.lesson; });
    for (var i = 1; i <= max; i++) {
      var ms = c.materials.filter(function (m) { return m.lesson === i; });
      if (!ms.length && hideEmpty && n) continue;
      h += '<li class="lesson' + (ms.length ? "" : " none") + '"><h3><span class="ln">' + esc(c.id + "-" + i) + "</span>第" + i + "回</h3>" +
        ms.map(function (m) { return matLink(c, m, false); }).join("") + "</li>";
    }
    document.getElementById("lessons").innerHTML = h;
    var t = document.getElementById("toggle");
    t.hidden = !n;
    t.textContent = hideEmpty ? "準備中の回も表示" : "教材がある回だけ表示";
    t.onclick = function () { hideEmpty = !hideEmpty; drawCourse(c); };
  }

  /* ---------- 教材ビューア ---------- */
  var frame = document.getElementById("vframe"), loaded = null;
  function openMat(c, m) {
    var list = c.materials.filter(function (x) { return x.file; }), k = list.indexOf(m);
    document.getElementById("vid").textContent = c.id + "-" + m.lesson;
    document.getElementById("vtitle").textContent = m.title;
    document.getElementById("vback").href = "#c" + c.id;
    var o = document.getElementById("vorig"); o.hidden = !m.url; if (m.url) o.href = m.url;
    function nav(id, x, txt) {
      var e = document.getElementById(id);
      if (x) { e.href = "#" + x.id; e.title = x.title; e.classList.remove("off"); e.removeAttribute("aria-disabled"); }
      else { e.removeAttribute("href"); e.classList.add("off"); e.setAttribute("aria-disabled", "true"); }
      e.textContent = txt;
    }
    nav("vprev", list[k - 1], "‹ 前"); nav("vnext", list[k + 1], "次 ›");
    if (loaded !== m.file) {
      loaded = m.file;
      var fresh = frame.cloneNode(false); fresh.removeAttribute("src"); fresh.removeAttribute("srcdoc");
      fresh.title = m.title; frame.parentNode.replaceChild(fresh, frame); frame = fresh;
      /* 同じアーティファクト内のファイルを読み込んで表示(読めない環境では直接開く) */
      fetch(m.file).then(function (r) { if (!r.ok) throw 0; return r.text(); })
        .then(function (t) { if (loaded === m.file) frame.srcdoc = t; })
        .catch(function () { if (loaded === m.file) frame.src = m.file; });
    }
  }

  /* ---------- ルーティング ---------- */
  var views = { home: document.getElementById("home"), course: document.getElementById("course"), viewer: document.getElementById("viewer") };
  function show(v) {
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== v; });
    document.body.classList.toggle("viewing", v === "viewer");
  }
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    var c = h.charAt(0) === "c" ? courses.filter(function (x) { return "c" + x.id === h; })[0] : null;
    if (c) { drawCourse(c); show("course"); window.scrollTo(0, 0); return; }
    var fm = h ? findMat(h) : null;
    if (fm && fm[1].file) { openMat(fm[0], fm[1]); show("viewer"); return; }
    show("home");
  }
  window.addEventListener("hashchange", route);
  route();
})();
