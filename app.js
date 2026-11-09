/* Lógica del calendario. No hace falta tocar este archivo: el contenido está en contenido.js */
(function () {
  "use strict";
  var C = window.ADVIENTO || {};
  var YEAR = C.anio || new Date().getFullYear();
  var DIAS = C.dias || {};
  var FIRMA = C.firma || "";
  var TIPOS = { mensaje: "Una carta", sobre: "Del paquete", post: "Encontrado para ti", video: "Un vídeo",
                preguntas: "Para conocernos", quiz: "Un juego", memoria: "Un juego", historia: "Una historia", vales: "Para canjear", puzle: "Un juego", candado: "Un juego", wordle: "Un juego" };
  var SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  function $(s) { return document.querySelector(s); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---- modo de prueba y sobres vistos ---- */
  var modo = { ensayo: false, hoy: null };
  try { var m = JSON.parse(sessionStorage.getItem("adv-modo") || "null"); if (m) modo = m; } catch (e) {}
  function guardarModo() { try { sessionStorage.setItem("adv-modo", JSON.stringify(modo)); } catch (e) {} }
  var vistos = {};
  try { vistos = JSON.parse(localStorage.getItem("adv-vistos") || "{}") || {}; } catch (e) {}
  function marcarVisto(n) { vistos[n] = 1; try { localStorage.setItem("adv-vistos", JSON.stringify(vistos)); } catch (e) {} }

  /* ---- fechas (siempre en hora de Madrid) ---- */
  function hoy() {
    if (modo.hoy) return { y: YEAR, m: 12, d: modo.hoy };
    var p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid", year: "numeric", month: "numeric", day: "numeric" }).formatToParts(new Date());
    function g(t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return +p[i].value; }
    return { y: g("year"), m: g("month"), d: g("day") };
  }
  function clave(y, m, d) { return y * 10000 + m * 100 + d; }
  function abierto(n) { if (modo.ensayo) return true; var t = hoy(); return clave(t.y, t.m, t.d) >= clave(YEAR, 12, n); }
  function numHoy() { var t = hoy(); return (t.y === YEAR && t.m === 12 && t.d <= 24) ? t.d : 0; }
  function diasHastaInicio() { var t = hoy(); return Math.round((Date.UTC(YEAR, 11, 1) - Date.UTC(t.y, t.m - 1, t.d)) / 864e5); }
  function fecha(n) { return SEMANA[new Date(Date.UTC(YEAR, 11, n, 12)).getUTCDay()] + " " + n + " de diciembre"; }

  /* ---- avisos ---- */
  var tt;
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(tt); tt = setTimeout(function () { t.hidden = true; }, 2600); }

  /* ---- pantalla de inicio ---- */
  function sobre(n, cls) { return '<span class="env ' + (cls || "") + '"><span class="flap"></span><span class="seal">' + n + '</span></span>'; }

  function pintarInicio() {
    $("#ano").textContent = "Diciembre " + YEAR;
    var av = $("#aviso");
    if (modo.ensayo) { av.textContent = "Modo ensayo: todo abierto"; av.hidden = false; }
    else if (modo.hoy) { av.textContent = "Simulando el " + modo.hoy + " de diciembre"; av.hidden = false; }
    else av.hidden = true;

    var tn = numHoy(), falta = diasHastaInicio(), h = $("#hoy");
    if (tn) {
      var v = vistos[tn];
      h.innerHTML = '<a class="hoy-card" href="#dia-' + tn + '">' + sobre(tn, "today" + (v ? " opened" : "")) +
        '<span class="hoy-txt"><span class="k">Hoy, ' + fecha(tn) + '</span>' +
        '<span class="t">' + (v ? "Ya lo has abierto" : "Tienes un sobre nuevo") + '</span>' +
        '<span class="btn">' + (v ? "Volver a leerlo" : "Abrir") + '</span></span></a>';
      h.querySelector("a").onclick = function (e) { e.preventDefault(); irA(tn); };
    } else if (falta > 0) {
      h.innerHTML = '<div class="hoy-card"><span class="big-n">' + falta + '</span><span class="hoy-txt">' +
        '<span class="k">' + (falta === 1 ? "Falta 1 día" : "Faltan " + falta + " días") + '</span>' +
        '<span class="t">para abrir el primer sobre</span>' +
        '<span class="sub">El ' + fecha(1) + ', a medianoche.</span></span></div>';
    } else {
      h.innerHTML = '<div class="hoy-card"><span class="hoy-txt"><span class="k">25 de diciembre</span>' +
        '<span class="t">Feliz Navidad. Ya están abiertos los 24.</span>' +
        '<span class="sub">Puedes volver a cualquiera cuando quieras.</span></span></div>';
    }

    var g = $("#sobres"); g.innerHTML = "";
    for (var n = 1; n <= 24; n++) (function (n) {
      var ab = abierto(n), b = document.createElement("button");
      b.type = "button";
      b.className = "env" + (ab ? "" : " locked") + (n === tn ? " today" : "") + (ab && vistos[n] ? " opened" : "") + (ab && !vistos[n] ? " nuevo" : "");
      b.innerHTML = '<span class="flap"></span><span class="seal">' + n + '</span>';
      b.setAttribute("aria-label", ab ? "Abrir el día " + n : "Día " + n + ", se abre el " + fecha(n));
      b.onclick = ab ? function () { irA(n); } : function () { toast("Este se abre el " + fecha(n)); };
      g.appendChild(b);
    })(n);
  }

  /* ---- contenido de cada día ---- */
  /* Un párrafo que empieza por · • - o * (con o sin espacios delante) se pinta como elemento de lista */
  function par(t, cls) {
    var m = String(t).match(/^\s*[·•\-–*]\s+([\s\S]*)$/);
    if (m) return '<p class="li' + (cls ? " " + cls : "") + '">' + esc(m[1]) + "</p>";
    return "<p" + (cls ? ' class="' + cls + '"' : "") + ">" + esc(t) + "</p>";
  }
  function parrafos(a) { return (a || []).map(function (t) { return par(t); }).join(""); }
  function foto(f, i) {
    if (typeof f === "string") f = { src: f };
    f = f || {};
    return '<figure class="polaroid' + (f.pie ? " cap" : "") + '" style="--r:' + (i % 2 ? 1.2 : -1.2) + 'deg">' +
      (f.src ? '<img src="' + esc(f.src) + '" alt="' + esc(f.pie || "Foto") + '" loading="lazy">' : '<span class="ph">Aquí irá una foto</span>') +
      (f.pie ? "<figcaption>" + esc(f.pie) + "</figcaption>" : "") + "</figure>";
  }
  /* historia: texto y fotos mezclados, sin marco */
  function imgLibre(src, pie) {
    return '<img src="' + esc(src) + '" alt="' + esc(pie || "Foto") + '" loading="lazy">';
  }
  function bloque(b) {
    if (typeof b === "string") return par(b, "h-txt");
    var s = "";
    if (b.texto) s += (Array.isArray(b.texto) ? b.texto : [b.texto]).map(function (t) { return par(t, "h-txt"); }).join("");
    if (b.titulo) s += '<h3 class="h-sub">' + esc(b.titulo) + "</h3>";
    if (b.foto) s += '<figure class="h-foto">' + imgLibre(b.foto, b.pie) + (b.pie ? "<figcaption>" + esc(b.pie) + "</figcaption>" : "") + "</figure>";
    if (b.fotos) s += '<div class="h-fotos">' + b.fotos.map(function (f) {
      if (typeof f === "string") f = { src: f };
      return '<figure class="h-foto">' + imgLibre(f.src, f.pie) + (f.pie ? "<figcaption>" + esc(f.pie) + "</figcaption>" : "") + "</figure>";
    }).join("") + "</div>";
    return s;
  }
  function boton(url, txt, cls) { return '<a class="btn ' + (cls || "") + '" href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(txt) + "</a>"; }

  function cuerpo(d) {
    var t = "<h2>" + esc(d.titulo || "") + "</h2>";
    switch (d.tipo) {
      case "sobre":
        return t + '<div class="bigno">' + esc(d.numero) + '</div><div class="hand">' + parrafos(d.texto) + "</div>";
      case "post":
        return t + parrafos(d.texto) + (d.captura ? foto(d.captura, 0) : "") +
          (d.enlace ? '<div class="row">' + boton(d.enlace, (d.boton || "Abrir") + " ↗") + "</div>" : "");
      case "video":
        var v;
        if (d.youtube) v = '<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(d.youtube) + '?rel=0&playsinline=1" title="Vídeo" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>' +
          '<div class="row">' + boton("https://youtu.be/" + d.youtube, "Abrir en YouTube ↗", "ghost") + "</div>";
        else if (d.archivo) v = '<video class="vid-file" controls playsinline preload="metadata" src="' + esc(d.archivo) + '"></video>';
        else v = foto({ src: d.miniatura || "" }, 0) + (d.enlace ? '<div class="row">' + boton(d.enlace, "▶ " + (d.boton || "Ver el vídeo")) + "</div>" : "");
        return t + parrafos(d.texto) + v;
      case "preguntas":
        return t + "<p>" + esc(d.intro || "") + '</p><div class="qcard" id="qc"></div>' +
          '<div class="qnav"><span class="qcount" id="qn"></span><span class="row" style="margin:0">' +
          '<button type="button" class="btn ghost" id="qp">Anterior</button><button type="button" class="btn" id="qx">Siguiente</button></span></div>';
      case "historia":
        return t + '<div class="historia' + (d.mano ? " mano" : "") + '">' + (d.bloques || []).map(bloque).join("") + "</div>";
      case "puzle":
        return t + "<p>" + esc(d.intro || "") + '</p><div id="puzle"></div>';
      case "candado":
        return t + "<p>" + esc(d.intro || "") + '</p><div id="candado"></div>';
      case "wordle":
        return t + "<p>" + esc(d.intro || "") + '</p><div id="wordle"></div>';
      case "vales":
        return t + (d.intro ? "<p>" + esc(d.intro) + "</p>" : "") + '<div class="vales" id="vales"></div>';
      case "quiz":
        return t + '<div id="quiz"></div>';
      case "memoria":
        return t + "<p>" + esc(d.intro || "") + '</p><div class="mem" id="mem"></div><div id="memr"></div>';
      default:
        return t + (d.fotos || []).map(foto).join("") + '<div class="hand">' + parrafos(d.texto) + "</div>";
    }
  }
  function extras(d) {
    var s = "";
    if (d.paquete && d.tipo !== "sobre") s += '<div class="stamp"><b>' + esc(d.paquete) + "</b><span>Y ahora, abre el sobre " + esc(d.paquete) + " del paquete.</span></div>";
    var f = typeof d.firma === "string" ? d.firma : (d.firma === false ? "" : (["mensaje", "sobre", "video", "post", "historia"].indexOf(d.tipo || "mensaje") >= 0 ? FIRMA : ""));
    if (f) s += '<div class="sign">— ' + esc(f) + "</div>";
    return s;
  }

  /* sangría en la primera línea de cada párrafo (solo en días de texto) */
  function conSangria(d) {
    var tipo = d.tipo || "mensaje";
    if (["mensaje", "sobre", "post", "video", "historia"].indexOf(tipo) < 0) return false;
    return d.sangria != null ? !!d.sangria : !!C.sangria;
  }

  var scrollInicio = 0, desdeInicio = false;
  function mostrarDia(n) {
    if (!$("#inicio").hidden) scrollInicio = window.scrollY;
    var d = DIAS[n] || { tipo: "mensaje", titulo: "Sobre por rellenar", texto: ["Aún no hay nada para el día " + n + ". Se rellena en contenido.js."], firma: false };
    var prev = n > 1 && abierto(n - 1) ? n - 1 : 0, next = n < 24 && abierto(n + 1) ? n + 1 : 0;
    $("#dia").innerHTML =
      '<div class="daybar"><button type="button" class="back" id="volver">← Sobres</button><div class="nav">' +
      '<button type="button" class="navb" id="ant" aria-label="Día anterior"' + (prev ? "" : " disabled") + ">‹</button>" +
      '<span class="navd">' + n + " dic</span>" +
      '<button type="button" class="navb" id="sig" aria-label="Día siguiente"' + (next ? "" : " disabled") + ">›</button></div></div>" +
      '<article class="sheet' + (conSangria(d) ? " sangria" : "") + '"><header class="dayhead"><span class="d">' + n + '</span><span class="k">' + esc(TIPOS[d.tipo] || TIPOS.mensaje) + "<br>" + fecha(n) + "</span></header>" +
      cuerpo(d) + extras(d) + "</article>";
    $("#inicio").hidden = true; $("#dia").hidden = false; window.scrollTo(0, 0);
    $("#volver").onclick = volver;
    if (prev) $("#ant").onclick = function () { location.replace("#dia-" + prev); };
    if (next) $("#sig").onclick = function () { location.replace("#dia-" + next); };
    if (d.tipo === "preguntas") preguntas(d.preguntas || []);
    if (d.tipo === "quiz") quiz(d);
    if (d.tipo === "memoria") memoria(d);
    if (d.tipo === "vales") vales(d, n);
    if (d.tipo === "puzle") puzle(d);
    if (d.tipo === "candado") candado(d);
    if (d.tipo === "wordle") wordle(d);
    marcarVisto(n);
  }
  function mostrarInicio() {
    var venia = !$("#dia").hidden;
    $("#dia").hidden = true; $("#inicio").hidden = false; $("#dia").innerHTML = "";
    pintarInicio(); desdeInicio = false;
    if (venia) window.scrollTo(0, scrollInicio);
  }

  /* ---- juegos ---- */
  function preguntas(q) {
    var i = 0, c = $("#qc"), nEl = $("#qn"), p = $("#qp"), x = $("#qx");
    function draw() { c.textContent = q[i] || ""; nEl.textContent = (i + 1) + " de " + q.length; p.disabled = i === 0; x.textContent = i === q.length - 1 ? "Volver a la primera" : "Siguiente"; }
    p.onclick = function () { if (i > 0) { i--; draw(); } };
    x.onclick = function () { i = (i + 1) % q.length; draw(); };
    draw();
  }
  /* mensaje final según la nota: finales = [{ desde: 0, texto: "..." }, { desde: 2, texto: "..." }]
     sale el de mayor "desde" que no supere la nota. Si no hay finales, se usa "final". */
  function mensajeFinal(d, score) {
    var best = null;
    (d.finales || []).forEach(function (f) {
      if (f.desde <= score && (!best || f.desde > best.desde)) best = f;
    });
    return best ? best.texto : (d.final || "");
  }
  function quiz(d) {
    var box = $("#quiz"), i = 0, score = 0, Q = d.preguntas || [];
    function draw() {
      if (i >= Q.length) {
        box.innerHTML = '<div class="bigno" style="font-size:72px">' + score + "/" + Q.length + '</div><div class="reveal hand">' + esc(mensajeFinal(d, score)) +
          '</div><div class="row" style="margin-top:14px"><button type="button" class="btn ghost" id="qr">Repetir</button></div>';
        $("#qr").onclick = function () { i = 0; score = 0; draw(); };
        return;
      }
      var q = Q[i];
      box.innerHTML = '<p class="qcount">Pregunta ' + (i + 1) + " de " + Q.length + '</p><p class="quiz-q">' + esc(q.p) + '</p><div class="opts">' +
        q.o.map(function (o, k) { return '<button type="button" class="opt" data-k="' + k + '">' + esc(o) + "</button>"; }).join("") + '</div><div id="nx"></div>';
      Array.prototype.forEach.call(box.querySelectorAll(".opt"), function (b) {
        b.onclick = function () {
          if (+b.dataset.k === q.ok) score++;
          Array.prototype.forEach.call(box.querySelectorAll(".opt"), function (o) {
            o.disabled = true;
            if (+o.dataset.k === q.ok) o.classList.add("ok"); else if (o === b) o.classList.add("bad");
          });
          var nb = document.createElement("button"); nb.type = "button"; nb.className = "btn";
          nb.textContent = i === Q.length - 1 ? "Ver resultado" : "Siguiente";
          nb.onclick = function () { i++; draw(); };
          $("#nx").appendChild(nb);
        };
      });
    }
    draw();
  }
  /* vales: cada uno se puede marcar como canjeado (se recuerda solo en su móvil) */
  function vales(d, n) {
    var box = $("#vales"), V = d.vales || [], key = "adv-vales-" + n, got = {};
    try { got = JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch (e) {}
    function guardar() { try { localStorage.setItem(key, JSON.stringify(got)); } catch (e) {} }
    function draw() {
      box.innerHTML = V.map(function (v, i) {
        var u = got[i];
        return '<article class="vale' + (u ? " usado" : "") + '"><span class="vale-n">Vale ' + (i + 1) + " de " + V.length + "</span>" +
          "<h3>" + esc(v.titulo) + "</h3>" + (v.texto ? "<p>" + esc(v.texto) + "</p>" : "") +
          (u ? '<span class="sello">Canjeado</span><button type="button" class="deshacer" data-i="' + i + '">Deshacer</button>'
             : '<button type="button" class="btn" data-i="' + i + '">Canjear</button>') + "</article>";
      }).join("");
      Array.prototype.forEach.call(box.querySelectorAll("button[data-i]"), function (b) {
        b.onclick = function () {
          var i = +b.dataset.i;
          if (got[i]) delete got[i]; else { got[i] = 1; toast("Hecho. Enséñale esta pantalla cuando nos veamos."); }
          guardar(); draw();
        };
      });
    }
    draw();
  }
  function memoria(d) {
    var m = $("#mem"), r = $("#memr"), fotos = !!(d.fotos && d.fotos.length), S = fotos ? d.fotos : (d.simbolos || []);
    var deck = S.concat(S).map(function (s) { return { s: s, r: Math.random() }; }).sort(function (a, b) { return a.r - b.r; }).map(function (x) { return x.s; });
    var up = [], lock = false, done = 0;
    deck.forEach(function (s) {
      var c = document.createElement("button"); c.type = "button"; c.className = "card";
      c.dataset.v = s; if (fotos) c.classList.add("foto");
      c.innerHTML = '<span class="s">' + (fotos ? '<img src="' + esc(s) + '" alt="" draggable="false">' : esc(s)) + "</span>"; c.setAttribute("aria-label", "Carta tapada");
      c.onclick = function () {
        if (lock || c.classList.contains("up") || c.classList.contains("done")) return;
        c.classList.add("up"); c.setAttribute("aria-label", fotos ? "Foto" : s); up.push(c);
        if (up.length < 2) return;
        lock = true; var a = up[0], b = up[1];
        if (a.dataset.v === b.dataset.v) {
          setTimeout(function () {
            a.classList.add("done"); b.classList.add("done"); up = []; lock = false; done++;
            if (done === S.length) r.innerHTML = '<div class="reveal hand">' + esc(d.premio || "") + "</div>";
          }, 250);
        } else {
          setTimeout(function () {
            [a, b].forEach(function (x) { x.classList.remove("up"); x.setAttribute("aria-label", "Carta tapada"); });
            up = []; lock = false;
          }, 800);
        }
      };
      m.appendChild(c);
    });
  }

  /* puzle: 3x3 deslizante con una foto. Se mezcla con jugadas válidas, así que siempre tiene solución */
  function puzle(d) {
    var box = $("#puzle"), N = 3, T = N * N, cells, blank, moves, solved;
    box.innerHTML = '<div class="pz-board" id="pzb"></div><div class="pz-bar"><span class="qcount" id="pzm"></span>' +
      '<button type="button" class="btn ghost" id="pzr">Mezclar de nuevo</button></div><div id="pzp"></div>';
    var board = $("#pzb"), tiles = [];
    for (var id = 0; id < T; id++) (function (id) {
      var t = document.createElement("button"); t.type = "button"; t.className = "pz-t"; t.setAttribute("aria-label", "Pieza " + (id + 1));
      t.style.backgroundImage = 'url("' + String(d.foto || "").replace(/"/g, "%22") + '")';
      t.style.backgroundSize = (N * 100) + "% " + (N * 100) + "%";
      t.style.backgroundPosition = (id % N) * 100 / (N - 1) + "% " + Math.floor(id / N) * 100 / (N - 1) + "%";
      t.onclick = function () { mover(id); };
      board.appendChild(t); tiles.push(t);
    })(id);
    tiles[T - 1].hidden = true;
    var im = new Image();
    im.onload = function () { if (im.naturalWidth) board.style.aspectRatio = im.naturalWidth + " / " + im.naturalHeight; };
    im.src = d.foto || "";

    function pinta() {
      for (var c = 0; c < T; c++) {
        var t = tiles[cells[c]];
        t.style.left = (c % N) * 100 / N + "%"; t.style.top = Math.floor(c / N) * 100 / N + "%";
      }
      $("#pzm").textContent = "Movimientos: " + moves;
    }
    function vecinas(c) {
      var r = Math.floor(c / N), k = c % N, v = [];
      if (r > 0) v.push(c - N); if (r < N - 1) v.push(c + N); if (k > 0) v.push(c - 1); if (k < N - 1) v.push(c + 1);
      return v;
    }
    function mezclar() {
      cells = []; for (var i = 0; i < T; i++) cells.push(i);
      blank = T - 1; moves = 0; solved = false;
      board.classList.remove("resuelto"); tiles[T - 1].hidden = true; $("#pzp").innerHTML = "";
      var prev = -1;
      do {
        for (var s = 0; s < 120; s++) {
          var op = vecinas(blank).filter(function (x) { return x !== prev; }), n = op[Math.floor(Math.random() * op.length)];
          cells[blank] = cells[n]; cells[n] = T - 1; prev = blank; blank = n;
        }
      } while (cells.every(function (v, i) { return v === i; }));
      pinta();
    }
    function mover(id) {
      if (solved) return;
      var c = cells.indexOf(id);
      if (vecinas(c).indexOf(blank) < 0) return;
      cells[blank] = id; cells[c] = T - 1; blank = c; moves++; pinta();
      if (cells.every(function (v, i) { return v === i; })) {
        solved = true; board.classList.add("resuelto"); tiles[T - 1].hidden = false;
        $("#pzp").innerHTML = '<div class="reveal hand">' + esc(d.premio || "") + "</div>";
      }
    }
    $("#pzr").onclick = mezclar;
    mezclar();
  }

  /* candado: combinación de cifras con ruedas; pistas opcionales que se piden una a una */
  function candado(d) {
    var box = $("#candado"), code = String(d.codigo == null ? "0000" : d.codigo).replace(/\D/g, "") || "0000", N = Math.min(code.length, 8);
    var val = [], pistas = d.pistas || [], shown = 0, abierto = false, i;
    for (i = 0; i < N; i++) val.push(0);
    var ruedas = "";
    for (i = 0; i < N; i++) ruedas += '<div class="cd-wheel"><button type="button" class="cd-b" data-i="' + i + '" data-d="1" aria-label="Subir la cifra ' + (i + 1) + '">▲</button>' +
      '<span class="cd-d" id="cd' + i + '" aria-live="polite">0</span>' +
      '<button type="button" class="cd-b" data-i="' + i + '" data-d="-1" aria-label="Bajar la cifra ' + (i + 1) + '">▼</button></div>';
    box.innerHTML = '<div class="cd-lock" id="cdl" style="--n:' + N + '"><div class="cd-shackle"></div><div class="cd-body">' + ruedas + "</div></div>" +
      '<p class="cd-msg" id="cdm" role="status"></p>' +
      '<div class="row cd-row"><button type="button" class="btn" id="cdo">Abrir</button>' +
      (pistas.length ? '<button type="button" class="btn ghost" id="cdp">Pedir una pista</button>' : "") + '</div><div id="cdh"></div><div id="cdr"></div>';
    var lock = $("#cdl"), msg = $("#cdm");
    Array.prototype.forEach.call(box.querySelectorAll(".cd-b"), function (b) {
      b.onclick = function () {
        if (abierto) return;
        var k = +b.dataset.i; val[k] = (val[k] + (+b.dataset.d) + 10) % 10;
        $("#cd" + k).textContent = val[k]; msg.textContent = "";
      };
    });
    $("#cdo").onclick = function () {
      if (abierto) return;
      if (val.join("") === code) {
        abierto = true; lock.classList.add("abierto"); msg.textContent = "Se ha abierto.";
        $("#cdo").hidden = true; if ($("#cdp")) $("#cdp").hidden = true;
        $("#cdr").innerHTML = (d.foto ? '<figure class="h-foto" style="margin-top:14px"><img src="' + esc(d.foto) + '" alt="' + esc(d.pie || "") + '"></figure>' : "") +
          (d.premio ? '<div class="reveal hand" style="margin-top:14px">' + esc(d.premio) + "</div>" : "");
      } else {
        msg.textContent = d.error || "Esa no es la combinación. Prueba otra" + (pistas.length ? " o pide una pista." : ".");
        lock.classList.remove("shake"); void lock.offsetWidth; lock.classList.add("shake");
      }
    };
    if ($("#cdp")) $("#cdp").onclick = function () {
      if (shown >= pistas.length) return;
      var p = document.createElement("p"); p.className = "cd-pista";
      p.innerHTML = "<b>Pista " + (shown + 1) + " de " + pistas.length + ":</b> " + esc(pistas[shown]);
      $("#cdh").appendChild(p); shown++;
      if (shown >= pistas.length) $("#cdp").hidden = true;
    };
  }

  /* wordle: adivinar una palabra en varios intentos (no se comprueba contra un diccionario) */
  var wordleTecla = null;
  function normaPal(s) {
    return String(s || "").toUpperCase().replace(/Ñ/g, "#").replace(/Ç/g, "$").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/#/g, "Ñ").replace(/\$/g, "Ç").replace(/[^A-ZÑÇ]/g, "");
  }
  function wordle(d) {
    var box = $("#wordle"), W = normaPal(d.palabra) || "AMORE", L = W.length, T = d.intentos || 6, fila = 0, cur = "", fin = false, estado = {}, i, j;
    var filas = "";
    for (i = 0; i < T; i++) { filas += '<div class="wl-row">'; for (j = 0; j < L; j++) filas += '<span class="wl-t"></span>'; filas += "</div>"; }
    var base = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"], extra = "";
    W.split("").forEach(function (c) { if (base.join("").indexOf(c) < 0 && extra.indexOf(c) < 0) extra += c; });
    base[2] += extra;
    function tecla(c, cls, lab) { return '<button type="button" class="wl-k ' + (cls || "") + '" data-k="' + c + '"' + (lab ? ' aria-label="' + lab + '"' : "") + ">" + (c === "ENTER" ? "Enviar" : c === "BACK" ? "⌫" : c) + "</button>"; }
    var kb = "";
    base.forEach(function (r, k) {
      kb += '<div class="wl-kr">' + (k === 2 ? tecla("ENTER", "wl-wide", "Enviar") : "") + r.split("").map(function (c) { return tecla(c); }).join("") + (k === 2 ? tecla("BACK", "wl-wide", "Borrar") : "") + "</div>";
    });
    box.innerHTML = '<div class="wl-board" id="wlb" style="--l:' + L + '">' + filas + '</div><p class="wl-msg" id="wlm" role="status"></p>' +
      '<div class="wl-kb" id="wlk">' + kb + '</div><div class="row" id="wla"></div><div id="wlr"></div>' +
      (d.pista ? '<div class="row"><button type="button" class="btn ghost" id="wlh">Ver pista</button></div><p id="wlp" hidden></p>' : "");
    var msg = $("#wlm"), rows = box.querySelectorAll(".wl-row");
    function pinta() {
      var ts = rows[fila] ? rows[fila].children : [];
      for (var k = 0; k < L && ts.length; k++) { ts[k].textContent = cur[k] || ""; ts[k].classList.toggle("lleno", !!cur[k]); }
    }
    function evalua(g) {
      var r = [], resto = {}, k;
      for (k = 0; k < L; k++) { if (g[k] === W[k]) r[k] = "c"; else { r[k] = "a"; resto[W[k]] = (resto[W[k]] || 0) + 1; } }
      for (k = 0; k < L; k++) if (r[k] === "a" && resto[g[k]] > 0) { r[k] = "p"; resto[g[k]]--; }
      return r;
    }
    var peso = { a: 1, p: 2, c: 3 };
    function envia() {
      if (cur.length < L) { msg.textContent = "Faltan letras: la palabra tiene " + L + "."; return; }
      var r = evalua(cur), ts = rows[fila].children;
      for (var k = 0; k < L; k++) {
        (function (k) {
          ts[k].style.transitionDelay = (k * 110) + "ms"; ts[k].classList.add(r[k] === "c" ? "ok" : r[k] === "p" ? "pres" : "no");
          var c = cur[k]; if (!estado[c] || peso[r[k]] > peso[estado[c]]) estado[c] = r[k];
        })(k);
      }
      Array.prototype.forEach.call(box.querySelectorAll(".wl-k"), function (b) {
        var e = estado[b.dataset.k]; b.classList.remove("ok", "pres", "no"); if (e) b.classList.add(e === "c" ? "ok" : e === "p" ? "pres" : "no");
      });
      msg.textContent = "";
      if (cur === W) {
        fin = true; msg.textContent = "¡Lo has conseguido en " + (fila + 1) + (fila === 0 ? " intento!" : " intentos!");
        $("#wlr").innerHTML = d.premio ? '<div class="reveal hand" style="margin-top:12px">' + esc(d.premio) + "</div>" : "";
      } else if (fila + 1 >= T) {
        fin = true; msg.textContent = "No ha podido ser. La palabra era " + W + ".";
        $("#wla").innerHTML = '<button type="button" class="btn" id="wlo">Intentarlo otra vez</button>';
        $("#wlo").onclick = reinicia;
      }
      fila++; cur = ""; pinta();
    }
    function reinicia() {
      Array.prototype.forEach.call(box.querySelectorAll(".wl-t"), function (t) { t.textContent = ""; t.className = "wl-t"; t.style.transitionDelay = ""; });
      Array.prototype.forEach.call(box.querySelectorAll(".wl-k"), function (b) { b.classList.remove("ok", "pres", "no"); });
      fila = 0; cur = ""; fin = false; estado = {}; msg.textContent = ""; $("#wla").innerHTML = ""; $("#wlr").innerHTML = "";
    }
    function pulsa(k) {
      if (fin) return;
      if (k === "ENTER") return envia();
      if (k === "BACK") { cur = cur.slice(0, -1); msg.textContent = ""; return pinta(); }
      if (cur.length < L) { cur += k; msg.textContent = ""; pinta(); }
    }
    Array.prototype.forEach.call(box.querySelectorAll(".wl-k"), function (b) {
      b.onclick = function () { pulsa(b.dataset.k); b.blur(); };
    });
    if (wordleTecla) document.removeEventListener("keydown", wordleTecla);
    wordleTecla = function (e) {
      if (!document.getElementById("wlb") || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") { e.preventDefault(); pulsa("ENTER"); }
      else if (e.key === "Backspace") { e.preventDefault(); pulsa("BACK"); }
      else if (e.key.length === 1) { var c = normaPal(e.key); if (c.length === 1) pulsa(c); }
    };
    document.addEventListener("keydown", wordleTecla);
    if ($("#wlh")) $("#wlh").onclick = function () { var p = $("#wlp"); p.textContent = "Pista: " + d.pista; p.hidden = false; $("#wlh").hidden = true; };
  }

  /* ---- navegación (el botón atrás del móvil vuelve a los sobres) ---- */
  function irA(n) { desdeInicio = true; location.hash = "dia-" + n; }
  function volver() { if (desdeInicio) history.back(); else location.hash = "inicio"; }
  function ruta() {
    var h = location.hash.replace(/^#/, ""), mh;
    if (h === "ensayo") { modo = { ensayo: true, hoy: null }; guardarModo(); }
    else if (h === "normal") { modo = { ensayo: false, hoy: null }; guardarModo(); }
    else if ((mh = h.match(/^hoy-(\d{1,2})$/))) { modo = { ensayo: false, hoy: Math.min(25, Math.max(1, +mh[1])) }; guardarModo(); }
    var md = h.match(/^dia-(\d{1,2})$/), n = md ? +md[1] : 0;
    if (n >= 1 && n <= 24 && abierto(n)) mostrarDia(n); else mostrarInicio();
  }
  window.addEventListener("hashchange", ruta);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !$("#dia").hidden) volver(); });
  document.addEventListener("visibilitychange", function () { if (!document.hidden && !$("#inicio").hidden) pintarInicio(); });

  /* ---- nieve ---- */
  (function () {
    var cv = $("#nieve");
    if (!cv || !cv.getContext || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var cx = cv.getContext("2d"), W, H, f = [], dpr = Math.min(window.devicePixelRatio || 1, 2);
    function size() {
      W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      f = []; for (var i = 0; i < Math.min(110, W / 6); i++) f.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .6, v: Math.random() * .45 + .2, w: Math.random() * 6.28 });
    }
    size(); addEventListener("resize", size);
    (function tick() {
      cx.clearRect(0, 0, W, H); cx.fillStyle = "rgba(239,229,211,.65)";
      for (var i = 0; i < f.length; i++) { var p = f[i]; p.y += p.v; p.w += .01; p.x += Math.sin(p.w) * .3; if (p.y > H) { p.y = -4; p.x = Math.random() * W; } cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill(); }
      requestAnimationFrame(tick);
    })();
  })();

  ruta();
})();
