/* Chambers Financial — concept redesign (v2)
   Motion layer: nav, scroll progress, reveal, counters, parallax,
   3D tilt, magnetic buttons, marquee loop, journey timeline. Vanilla JS. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var raf = window.requestAnimationFrame.bind(window);

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    var setOpen = function (o) { toggle.setAttribute("aria-expanded", String(o)); menu.classList.toggle("is-open", o); };
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* ---------------- Header + scroll progress ---------------- */
  var header = document.querySelector(".site-header");
  var bar = document.getElementById("scrollProgress");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("is-stuck", y > 8);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll (data-anim) ---------------- */
  var anims = document.querySelectorAll("[data-anim]");
  if (reduce || !("IntersectionObserver" in window)) {
    anims.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var d = parseInt(en.target.getAttribute("data-anim-delay") || "0", 10);
          en.target.style.transitionDelay = (d * 0.08) + "s";
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    anims.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Count-up stats ---------------- */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var dur = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(easeOut(p) * target) + suffix;
      if (p < 1) raf(step);
    }
    raf(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else { counters.forEach(countUp); }

  /* ---------------- Marquee: seamless loop ---------------- */
  var track = document.querySelector(".marquee-track");
  if (track) {
    var clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.parentNode.appendChild(clone);
    // wrap both in flex already; duplicate sits inline so -50% loops seamlessly
    track.style.paddingRight = "2.2rem";
  }

  if (!reduce) {
    /* ------------- Hero group parallax (pointer + scroll) ------------- */
    var stage = document.querySelector(".hero-stage");
    var hero = document.querySelector(".hero");
    if (stage && hero) {
      var px = 0, py = 0, sy = 0, tx = 0, ty = 0;
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        px = ((e.clientX - r.left) / r.width - 0.5) * 26;
        py = ((e.clientY - r.top) / r.height - 0.5) * 22;
      });
      hero.addEventListener("pointerleave", function () { px = 0; py = 0; });
      var ticking = false;
      function loop() {
        sy = (window.scrollY || 0) * 0.06;
        tx += (px - tx) * 0.08;
        ty += (py + sy - ty) * 0.08;
        stage.style.transform = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px,0)";
        raf(loop);
      }
      raf(loop);
    }

    /* ------------- 3D tilt cards ------------- */
    document.querySelectorAll(".tilt").forEach(function (card) {
      var rx = 0, ry = 0, trx = 0, try_ = 0, active = false, rafId = null;
      function render() {
        trx += (rx - trx) * 0.15; try_ += (ry - try_) * 0.15;
        card.style.transform = "perspective(800px) rotateX(" + trx.toFixed(2) + "deg) rotateY(" + try_.toFixed(2) + "deg) translateY(-6px)";
        if (active || Math.abs(rx - trx) > 0.05 || Math.abs(ry - try_) > 0.05) rafId = raf(render);
        else { card.style.transform = ""; rafId = null; }
      }
      card.addEventListener("pointermove", function (e) {
        if (window.innerWidth < 760) return;
        var r = card.getBoundingClientRect();
        ry = ((e.clientX - r.left) / r.width - 0.5) * 9;
        rx = -((e.clientY - r.top) / r.height - 0.5) * 9;
        active = true;
        if (!rafId) rafId = raf(render);
      });
      card.addEventListener("pointerleave", function () { rx = 0; ry = 0; active = false; if (!rafId) rafId = raf(render); });
    });

    /* ------------- Magnetic buttons ------------- */
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        if (window.innerWidth < 760) return;
        var r = btn.getBoundingClientRect();
        btn.style.setProperty("--tx", ((e.clientX - r.left) / r.width - 0.5) * 14 + "px");
        btn.style.setProperty("--ty", ((e.clientY - r.top) / r.height - 0.5) * 12 + "px");
      });
      btn.addEventListener("pointerleave", function () { btn.style.setProperty("--tx", "0px"); btn.style.setProperty("--ty", "0px"); });
    });
  }

  /* ---------------- Journey: progress fill + lit steps ---------------- */
  var jlist = document.getElementById("journeyLine");
  var jfill = document.getElementById("journeyFill");
  var jsteps = document.querySelectorAll(".jstep");
  if (jlist && jsteps.length) {
    function journeyScroll() {
      var r = jlist.getBoundingClientRect();
      var vh = window.innerHeight;
      // progress: 0 when list top reaches 70% of viewport, 1 when bottom passes 40%
      var startY = vh * 0.7, endY = vh * 0.35;
      var p = (startY - r.top) / (startY - endY + r.height);
      p = Math.max(0, Math.min(1, p));
      if (jfill) jfill.style.width = (p * 100) + "%";
      var litCount = Math.round(p * jsteps.length);
      jsteps.forEach(function (s, i) { s.classList.toggle("lit", i < Math.max(1, litCount)); });
    }
    window.addEventListener("scroll", journeyScroll, { passive: true });
    window.addEventListener("resize", journeyScroll);
    journeyScroll();
  }
})();
