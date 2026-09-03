import { useEffect } from 'react';

/** Scroll-driven layers are measured in one batch and never move readable copy. */
export default function useHeritageMotion(route, lang, loading) {
  useEffect(() => {
    if (loading) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (preference.matches) return;
      const root = document.querySelector('[data-page-content]');
      if (!root) return;
      let frame = 0;
      const layers = new Map();
      const revealed = new Set();
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) { target.classList.add('motion-visible'); revealObserver.unobserve(target); }
        });
      }, { threshold: .06 });
      const visibleLayers = new Set();
      const layerObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) visibleLayers.add(target); else visibleLayers.delete(target);
        });
        schedule();
      }, { rootMargin: '100px' });
      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const mobile = window.innerWidth < 768;
        const positions = [...visibleLayers].filter(node => node.isConnected).map(node => {
          const item = layers.get(node);
          const box = item.container.getBoundingClientRect();
          const ratio = Math.max(-1,Math.min(1,(height / 2 - box.top - box.height / 2) / ((height + box.height) / 2)));
          const offset = item.hero ? Math.max(0,-box.top) * (mobile ? .1 : .22) : ratio * (mobile ? 14 : 32);
          return [node, offset];
        });
        positions.forEach(([node, offset]) => node.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`));
      };
      function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(update); }
      const discover = () => {
        root.querySelectorAll('.royal-hero__media, .chronicles__image:not(:last-child) img, .heritage-story__image img, .heritage-lineage__image img, .heritage-gallery__item img, .heritage-booking > img, main .overflow-hidden > img.object-cover').forEach(node => {
          if (layers.has(node) || node.getAttribute('src')?.includes('rk01')) return;
          const hero = node.classList.contains('royal-hero__media');
          layers.set(node, { container: hero ? node.closest('.royal-hero') : node.parentElement, hero });
          node.classList.add(hero ? 'motion-hero-layer' : 'motion-image-layer');
          layerObserver.observe(node);
        });
        root.querySelectorAll('.chronicles__chapter, main > .container > div, .royal-legacy-strip__intro, .heritage-trust-card').forEach(node => {
          if (revealed.has(node) || node.closest('.royal-hero')) return;
          revealed.add(node);
          node.classList.add('motion-reveal');
          revealObserver.observe(node);
        });
        schedule();
      };
      discover();
      const mutation = new MutationObserver(discover);
      mutation.observe(root, { childList: true, subtree: true });
      const resize = new ResizeObserver(schedule);
      resize.observe(root);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
      document.addEventListener('visibilitychange', schedule);
      dispose = () => {
        cancelAnimationFrame(frame);
        mutation.disconnect(); resize.disconnect(); layerObserver.disconnect(); revealObserver.disconnect();
        window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule);
        document.removeEventListener('visibilitychange', schedule);
        layers.forEach((_,node) => { node.classList.remove('motion-image-layer','motion-hero-layer'); node.style.removeProperty('--parallax-y'); });
        revealed.forEach(node => node.classList.remove('motion-reveal','motion-visible'));
      };
    };
    setup();
    preference.addEventListener('change', setup);
    return () => { dispose(); preference.removeEventListener('change', setup); };
  }, [route, lang, loading]);
}
