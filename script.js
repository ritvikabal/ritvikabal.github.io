document.getElementById("year").textContent = new Date().getFullYear();

// Count up the ledger stats and impact-table figures once each scrolls
// into view. This is the one deliberate motion moment on the page —
// everything else stays still on purpose.
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  function animateCount(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr.replace(/,/g, ""), 10);
    if (Number.isNaN(target)) return;

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = raw;
      }
    }
    requestAnimationFrame(tick);
  }

  const targets = document.querySelectorAll(".ledger-item dd, .impact-table td");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  targets.forEach((el) => io.observe(el));
})();

// Leadership photo carousel — cross-fades between slides, no sliding.
(function () {
  const carousel = document.getElementById("leadership-carousel");
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const dotsWrap = carousel.querySelector(".carousel-dots");
  if (!slides.length) return;

  let current = slides.findIndex((s) => s.classList.contains("is-active"));
  if (current < 0) current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (i === current ? " is-active" : "");
    dot.setAttribute("aria-label", "Go to photo " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  carousel.querySelector(".carousel-prev").addEventListener("click", () => goTo(current - 1));
  carousel.querySelector(".carousel-next").addEventListener("click", () => goTo(current + 1));
})();
