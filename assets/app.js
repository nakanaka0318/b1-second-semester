(function () {
  var courses = window.COURSES || [];
  var root = document.body.getAttribute("data-root") || "";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function matLink(course, m, showCourse) {
    var label = course.id + "-" + m.lesson;
    return '<a class="mat" href="' + esc(m.url) + '" target="_blank" rel="noopener">' +
      '<span class="mid">' + esc(label) + '</span>' +
      '<span><div class="mt">' + esc(m.title) + '</div>' +
      '<div class="mn">' + (showCourse ? esc(course.name) + " 第" + m.lesson + "回" + (m.note ? " ・ " : "") : "") +
      esc(m.note || "") + '</div></span>' +
      '<span class="arrow" aria-hidden="true">↗</span></a>';
  }

  /* ---------- トップページ ---------- */
  function renderHome() {
    var grid = document.getElementById("grid");
    var recent = document.getElementById("recent");
    var q = document.getElementById("q");

    function draw(filter) {
      filter = (filter || "").trim().toLowerCase();
      var html = "";
      courses.forEach(function (c) {
        var hay = (c.id + " " + c.name + " " + c.materials.map(function (m) { return m.title; }).join(" ")).toLowerCase();
        if (filter && hay.indexOf(filter) === -1) return;
        var n = c.materials.length;
        html += '<a class="card' + (n ? " has" : "") + '" href="' + root + "courses/" + c.id + '.html">' +
          '<span class="cid">' + esc(c.id) + '</span>' +
          '<span class="cname">' + esc(c.name) + '</span>' +
          '<span class="count">' + (n ? "教材 <b>" + n + "</b> 件" : "教材はまだありません") + '</span></a>';
      });
      grid.innerHTML = html || '<p class="empty-msg">該当する科目がありません。</p>';
    }
    q.addEventListener("input", function () { draw(q.value); });
    draw("");

    var all = [];
    courses.forEach(function (c) {
      c.materials.forEach(function (m) { all.push(matLink(c, m, true)); });
    });
    recent.innerHTML = all.length ? all.reverse().slice(0, 8).join("") : '<p class="empty-msg">まだ教材がありません。</p>';
  }

  /* ---------- 科目ページ ---------- */
  function renderCourse(id) {
    var c = courses.filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    document.getElementById("cname").innerHTML = '<span class="code-badge">' + esc(c.id) + '</span>' + esc(c.name);
    document.title = c.id + " " + c.name + " | 教材ポータル";
    var n = c.materials.length;
    document.getElementById("csub").textContent = n ? "教材 " + n + " 件" : "教材はまだありません。追加されるとここに表示されます。";

    var max = window.LESSON_COUNT || 15;
    c.materials.forEach(function (m) { if (m.lesson > max) max = m.lesson; });
    var list = document.getElementById("lessons");
    var html = "";
    for (var i = 1; i <= max; i++) {
      var ms = c.materials.filter(function (m) { return m.lesson === i; });
      html += '<li class="lesson' + (ms.length ? "" : " none") + '">' +
        '<h3><span class="ln">' + esc(c.id + "-" + i) + '</span>第' + i + '回</h3>' +
        ms.map(function (m) { return matLink(c, m, false); }).join("") + "</li>";
    }
    list.innerHTML = html;

    var btn = document.getElementById("toggle");
    var hidden = false;
    function apply() {
      Array.prototype.forEach.call(list.querySelectorAll(".lesson.none"), function (el) { el.hidden = hidden; });
      btn.textContent = hidden ? "準備中の回も表示" : "教材がある回だけ表示";
    }
    btn.addEventListener("click", function () { hidden = !hidden; apply(); });
    btn.hidden = n === 0;
    hidden = n > 0;
    apply();
  }

  var courseId = document.body.getAttribute("data-course");
  if (courseId) renderCourse(courseId); else renderHome();
})();
