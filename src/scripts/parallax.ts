// Parallax effect for Hero screenshots — transforms on scroll
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');

  if (elements.length > 0) {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.15');
        const baseRotation = el.dataset.parallaxRotate || '0';
        const y = -(scrollY * speed);
        el.style.transform = `translateY(${y}px) rotate(${baseRotation}deg)`;
      });
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }
}
