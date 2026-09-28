(function () {
  var courses = window.COURSES || [];
  var root = document.body.getAttribute("data-root") || "";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* file があればポータル内ビューアへ、なければ元URLを新しいタブで開く */
  function matHref(course, m) {
    if (m.file && m.id) return root + "courses/" + course.id + ".html#" + encodeURIComponent(m.id);
    return m.url;
  }

  function matLink(course, m, showCourse) {
    var inPortal = !!(m.file && m.id);
    var label = course.id + "-" + m.lesson;
    return '<a class="mat" href="' + esc(matHref(course, m)) + '"' +
      (inPortal ? "" : ' target="_blank" rel="noopener"') + '>' +
      '<span class="mid">' + esc(label) + '</span>' +
      '<span><div class="mt">' + esc(m.title) + '</div>' +
      '<div class="mn">' + (showCourse ? esc(course.name) + " 第" + m.lesson + "回" + (m.note ? " ・ " : "") : "") +
      esc(m.note || "") + '</div></span>' +
      '<span class="arrow" aria-hidden="true">' + (inPortal ? "›" : "↗") + '</span></a>';
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
    var baseTitle = c.id + " " + c.name + " | 教材ポータル";
    document.getElementById("cname").innerHTML = '<span class="code-badge">' + esc(c.id) + '</span>' + esc(c.name);
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

    /* --- ポータル内ビューア(URL の #教材ID で表示を切り替え) --- */
    var viewable = c.materials.filter(function (m) { return m.file && m.id; });
    var listView = document.getElementById("list-view");
    var viewer = document.getElementById("viewer");
    var frame = document.getElementById("vframe");

    function navLink(m, cls, text) {
      if (!m) return '<span class="vnav ' + cls + ' off">' + text + '</span>';
      return '<a class="vnav ' + cls + '" href="#' + encodeURIComponent(m.id) + '" title="' + esc(m.title) + '">' + text + '</a>';
    }

    function route() {
      var key = decodeURIComponent(location.hash.slice(1));
      var idx = -1;
      viewable.forEach(function (m, k) { if (m.id === key) idx = k; });
      if (idx === -1) {
        viewer.hidden = true;
        listView.hidden = false;
        document.body.classList.remove("viewing");
        if (frame.hasAttribute("src")) {
          var blank = frame.cloneNode(false);
          blank.removeAttribute("src");
          frame.parentNode.replaceChild(blank, frame);
          frame = blank;
        }
        document.title = baseTitle;
        return;
      }
      var m = viewable[idx];
      document.getElementById("vid").textContent = c.id + "-" + m.lesson;
      document.getElementById("vtitle").textContent = m.title;
      document.getElementById("vorig").hidden = !m.url;
      if (m.url) document.getElementById("vorig").href = m.url;
      document.getElementById("vprev").outerHTML = navLink(viewable[idx - 1], "vprev-el", "‹ 前");
      document.getElementById("vnext").outerHTML = navLink(viewable[idx + 1], "vnext-el", "次 ›");
      /* outerHTML で置き換えた要素に id を振り直す */
      viewer.querySelector(".vprev-el").id = "vprev";
      viewer.querySelector(".vnext-el").id = "vnext";
      var src = root + m.file;
      if (frame.getAttribute("src") !== src) {
        /* src の書き換えは履歴が積まれて「戻る」がずれるので、iframe ごと差し替える */
        var fresh = frame.cloneNode(false);
        fresh.setAttribute("src", src);
        frame.parentNode.replaceChild(fresh, frame);
        frame = fresh;
      }
      frame.title = m.title;
      listView.hidden = true;
      viewer.hidden = false;
      document.body.classList.add("viewing");
      document.title = m.title + " | " + baseTitle;
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", route);
    route();
  }

  var courseId = document.body.getAttribute("data-course");
  if (courseId) renderCourse(courseId); else renderHome();
})();
