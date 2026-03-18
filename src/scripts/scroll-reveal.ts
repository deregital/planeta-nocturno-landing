const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay;
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => {
  observer.observe(el);
});
