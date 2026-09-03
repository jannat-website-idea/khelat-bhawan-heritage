import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** One frame clock for scroll and depth; layout is measured only when it changes. */
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
      const lenis = new Lenis({
        lerp: .13, smoothWheel: true, wheelMultiplier: 1, syncTouch: false,
        prevent: node => !!node.closest('[role="dialog"],.heritage-nav__drawer'),
      });
      window.__lenis = lenis;
      let frame, needsMeasure = true, previousY = -1;
      const layers = new Map();
      const reveals = new Set();
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({target,isIntersecting}) => {
          if (isIntersecting) { target.classList.add('is-revealed'); observer.unobserve(target); }
        });
      }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });
      const discover = () => {
        root.querySelectorAll('.royal-hero__media,.archive-image img,.heritage-story__image img,.heritage-lineage__image img,.heritage-gallery__item img,main .overflow-hidden > img.object-cover').forEach(node => {
          if (layers.has(node) || node.getAttribute('src')?.includes('rk01')) return;
          const hero = node.classList.contains('royal-hero__media');
          layers.set(node, {hero, container: hero ? node.closest('.royal-hero') : node.parentElement});
          node.classList.add(hero ? 'depth-hero' : 'depth-image');
        });
        root.querySelectorAll('[data-reveal],[data-line-reveal],[data-image-reveal],.heritage-story__copy,.heritage-heading-row,.heritage-lineage__copy,.heritage-booking__content,main > .container > div').forEach(node => {
          if (reveals.has(node) || node.closest('[data-reveal],[data-image-reveal]') && !node.matches('[data-reveal],[data-image-reveal]')) return;
          reveals.add(node);
          node.classList.add('reveal-ready');
          observer.observe(node);
        });
        needsMeasure = true;
      };
      discover();
      const resize = new ResizeObserver(() => { needsMeasure = true; });
      resize.observe(root);
      const mutation = new MutationObserver(discover);
      mutation.observe(root, {childList:true,subtree:true});
      const onResize = () => { needsMeasure = true; };
      window.addEventListener('resize',onResize,{passive:true});
      root.addEventListener('load',onResize,true);
      const heroCopy = root.querySelector('.royal-hero__content');
      const animate = time => {
        lenis.raf(time);
        const y = window.scrollY, height = window.innerHeight, mobile = window.innerWidth < 768;
        if (needsMeasure) {
          // Batch geometry reads before any composited writes.
          layers.forEach(item => {
            const rect = item.container.getBoundingClientRect();
            item.top = rect.top + y; item.height = rect.height;
          });
          needsMeasure = false; previousY = -1;
        }
        if (Math.abs(y - previousY) > .05) {
          layers.forEach((item,node) => {
            const top = item.top - y;
            if (top > height + 80 || top + item.height < -80) return;
            const range = Math.min(12,item.height * .02);
            const ratio = Math.max(-1,Math.min(1,(height/2-top-item.height/2)/(height/2+item.height/2)));
            const offset = item.hero ? Math.max(0,-top) * (mobile ? .06 : .19) : (mobile ? 0 : ratio * range);
            node.style.setProperty('--depth-y',offset.toFixed(2)+'px');
            if (item.hero && heroCopy) {
              const travel = Math.max(0,-top);
              heroCopy.style.setProperty('--copy-y',(travel * (mobile ? .02 : .075)).toFixed(2)+'px');
              heroCopy.style.setProperty('--copy-opacity',String(Math.max(.3,1-travel/item.height*.65)));
            }
          });
          previousY = y;
        }
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      dispose = () => {
        cancelAnimationFrame(frame); resize.disconnect(); mutation.disconnect(); observer.disconnect();
        window.removeEventListener('resize',onResize); root.removeEventListener('load',onResize,true);
        lenis.destroy(); if (window.__lenis === lenis) window.__lenis = null;
        layers.forEach((_,node) => { node.classList.remove('depth-hero','depth-image'); node.style.removeProperty('--depth-y'); });
        reveals.forEach(node => node.classList.remove('reveal-ready','is-revealed'));
        heroCopy?.style.removeProperty('--copy-y'); heroCopy?.style.removeProperty('--copy-opacity');
      };
    };
    setup(); preference.addEventListener('change',setup);
    return () => { dispose(); preference.removeEventListener('change',setup); };
  }, [route,lang,loading]);
}
