const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseFloat(el.dataset.counterTarget || '0');
        const suffix = el.dataset.counterSuffix || '';
        const prefix = el.dataset.counterPrefix || '';
        const hasDecimal = String(target).includes('.');
        const duration = 1500;
        const start = performance.now();

        const animate = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;

          if (hasDecimal) {
            el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
          } else {
            el.textContent = `${prefix}${Math.floor(current).toLocaleString('es-AR')}${suffix}`;
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('[data-counter-target]').forEach((el) => {
  counterObserver.observe(el);
});
