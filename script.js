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
