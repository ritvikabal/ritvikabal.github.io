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

// Awards carousel — cards slide so the current one is centered and sharp;
// neighboring cards stay visible but blurred.
(function () {
  const root = document.getElementById("awards-carousel");
  if (!root) return;

  const viewport = root.querySelector(".awards-viewport");
  const track = root.querySelector(".awards-track");
  const cards = Array.from(track.children);
  const dotsWrap = root.querySelector(".awards-dots");
  if (!cards.length) return;

  let current = cards.findIndex((c) => c.classList.contains("is-current"));
  if (current < 0) current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "awards-dot" + (i === current ? " is-current" : "");
    dot.setAttribute("aria-label", "Go to award " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function update() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
    const step = cardWidth + gap;
    const viewportWidth = viewport.clientWidth;
    const offset = viewportWidth / 2 - cardWidth / 2 - current * step;

    track.style.transform = "translateX(" + offset + "px)";
    cards.forEach((card, i) => card.classList.toggle("is-current", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("is-current", i === current));
  }

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    update();
  }

  root.querySelector(".awards-prev").addEventListener("click", () => goTo(current - 1));
  root.querySelector(".awards-next").addEventListener("click", () => goTo(current + 1));
  window.addEventListener("resize", update);

  update();
})();
