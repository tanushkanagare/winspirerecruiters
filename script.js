/* ==========================================================================
   WINSPIRE RECRUITERS — Behaviour
   Progressive enhancement only: the page is fully readable with JS off.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Sticky navbar shadow ---------------- */
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var onScroll = function () {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navLinks.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = !isOpen ? "hidden" : "";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
        navToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("is-open");
        document.body.style.overflow = "";
        navToggle.focus();
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-group]");

  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- Animated counters ---------------- */
  var counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1200;
    var start = null;

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  /* ---------------- Process: tabs (Clients / Candidates) ---------------- */
  var tabs = document.querySelectorAll(".process-tab");
  var panels = document.querySelectorAll(".process-panel");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var targetId = tab.getAttribute("aria-controls");

      tabs.forEach(function (t) {
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
      });
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");

      panels.forEach(function (panel) {
        panel.classList.toggle("is-active", panel.id === targetId);
      });
    });

    tab.addEventListener("keydown", function (e) {
      var list = Array.prototype.slice.call(tabs);
      var index = list.indexOf(tab);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var nextIndex = e.key === "ArrowRight" ? (index + 1) % list.length : (index - 1 + list.length) % list.length;
        list[nextIndex].focus();
        list[nextIndex].click();
      }
    });
  });

  /* ---------------- Process: step-by-step reveal + progress line ---------------- */
  document.querySelectorAll(".timeline").forEach(function (timeline) {
    var steps = timeline.querySelectorAll(".step");
    var progress = timeline.querySelector(".timeline-progress");

    if ("IntersectionObserver" in window) {
      var stepObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              if (progress) {
                var visibleCount = timeline.querySelectorAll(".step.is-visible").length;
                var ratio = visibleCount / steps.length;
                progress.style.height = Math.min(ratio * 100, 100) + "%";
              }
            }
          });
        },
        { threshold: 0.5, rootMargin: "0px 0px -10% 0px" }
      );
      steps.forEach(function (step) {
        stepObserver.observe(step);
      });
    } else {
      steps.forEach(function (step) {
        step.classList.add("is-visible");
      });
    }
  });

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Loader
  window.addEventListener('load', function () {
      const loader = document.getElementById('loader');
      if (loader) {
          loader.style.display = 'none'; // This hides the spinner
      }
  });
})();
