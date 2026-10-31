import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroDelay } from './hooks.js';

gsap.registerPlugin(ScrollTrigger);

/*
  Scroll animations, driven by data attributes in the markup:
  data-hero-title   heading lines rise in on page load
  data-title        heading lines rise in when scrolled into view
  data-fade         fade + lift (optional data-delay in seconds)
  data-stagger      children fade + lift one after another
  data-img          image wipes open from the bottom, photo settles from zoom
  data-hero-img     same as data-img on page load, then slow zoom while scrolling
  data-parallax     photo drifts inside its frame while scrolling
  data-words        paragraph words light up as you scroll through it
  data-hscroll      section pins and its .hs-track scrolls sideways (desktop)
  data-line         rule draws from left to right
  data-count        number counts up to its data-count value
*/
export function initAnimations(scope) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !scope) return () => {};

  const q = gsap.utils.selector(scope);
  const delay = heroDelay();
  const mm = gsap.matchMedia(scope);

  const ctx = gsap.context(() => {
    // Hero headline
    q('[data-hero-title]').forEach((el) => {
      gsap.from(el.querySelectorAll('.t-line > span'), {
        yPercent: 110, duration: 1.4, ease: 'power4.out', stagger: 0.12, delay,
      });
    });
    q('[data-hero-fade]').forEach((el, i) => {
      gsap.from(el, { y: 24, autoAlpha: 0, duration: 1.2, ease: 'power3.out', delay: delay + 0.5 + i * 0.1 });
    });
    q('[data-hero-img]').forEach((el) => {
      const img = el.querySelector('img, .img-fallback');
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', delay: delay + 0.1 });
      if (img) {
        gsap.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.2, ease: 'expo.out', delay: delay + 0.1 });
        gsap.to(el, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    });

    // Headings on scroll
    q('[data-title]').forEach((el) => {
      gsap.from(el.querySelectorAll('.t-line > span'), {
        yPercent: 110, duration: 1.2, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    q('[data-fade]').forEach((el) => {
      gsap.from(el, {
        y: 40, autoAlpha: 0, duration: 1.2, ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });

    q('[data-stagger]').forEach((el) => {
      gsap.from(el.children, {
        y: 50, autoAlpha: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    q('[data-img]').forEach((el) => {
      const img = el.querySelector('img, .img-fallback');
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
      tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' });
      if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0);
    });

    q('[data-parallax]').forEach((el) => {
      const img = el.querySelector('img, .img-fallback');
      if (!img) return;
      gsap.fromTo(img, { yPercent: -9 }, {
        yPercent: 9, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    q('[data-words]').forEach((el) => {
      gsap.fromTo(el.querySelectorAll('.w'), { opacity: 0.14 }, {
        opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    });

    q('[data-line]').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      });
    });

    q('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = Math.round(obj.v); },
      });
    });

    // Horizontal scroll (desktop only)
    mm.add('(min-width: 900px)', () => {
      q('[data-hscroll]').forEach((sec) => {
        const track = sec.querySelector('.hs-track');
        if (!track) return;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: sec, start: 'top top', end: () => '+=' + dist(),
            pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
          },
        });
      });
    });
  }, scope);

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  const t = setTimeout(refresh, 600);

  return () => {
    clearTimeout(t);
    window.removeEventListener('load', refresh);
    mm.revert();
    ctx.revert();
  };
}

export { gsap, ScrollTrigger };
