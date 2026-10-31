import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../animations.js';
import { markIntroSeen } from '../hooks.js';

// Opening screen: name rises letter by letter, a rule draws, then the panel lifts away.
export default function Loader({ onDone }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { markIntroSeen(); onDone(); return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => { markIntroSeen(); onDone(); },
      });
      tl.from('.ld-char', { yPercent: 120, duration: 1, ease: 'power4.out', stagger: 0.035 })
        .from('.ld-meta', { autoAlpha: 0, y: 10, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, 0.3)
        .fromTo('.ld-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, 0.4)
        .to('.ld-inner', { yPercent: -40, autoAlpha: 0, duration: 0.8, ease: 'power3.in' }, 1.45)
        .to(root.current, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 1.55);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="loader" ref={root} role="status" aria-label="Loading Blue Crystal">
      <div className="ld-inner">
        <p className="ld-meta">Literary Magazine</p>
        <p className="ld-name" aria-hidden="true">
          {'Blue Crystal'.split('').map((c, i) => (
            <span className="ld-mask" key={i}><span className="ld-char">{c === ' ' ? ' ' : c}</span></span>
          ))}
        </p>
        <span className="ld-rule" />
        <p className="ld-meta">Crystallized Dreams · Since 2022</p>
      </div>
    </div>
  );
}
