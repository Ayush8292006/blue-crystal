import React, { useLayoutEffect, useRef, useState } from 'react';
import { IMG } from '../data.js';
import { go } from '../hooks.js';
import { initAnimations, gsap } from '../animations.js';

// Runs all scroll animations inside a page. Use: const ref = usePageAnimations(); <div ref={ref}>
export function usePageAnimations(deps = []) {
  const ref = useRef(null);
  useLayoutEffect(() => initAnimations(ref.current), deps);
  return ref;
}

// Image with a graceful fallback if the photo cannot load.
export function Img({ name, src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);
  const url = src || IMG[name];
  if (failed || !url) {
    return <div className={`img-fallback ${className}`} role="img" aria-label={alt}><span>{alt}</span></div>;
  }
  return <img className={className} src={url} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

// Framed image with an animation: "img" (wipe reveal), "parallax", or "hero".
export function Frame({ name, src, alt, ratio = '4 / 5', motion = 'img', className = '' }) {
  const attrs = {};
  if (motion === 'img') { attrs['data-img'] = ''; }
  if (motion === 'parallax') { attrs['data-parallax'] = ''; }
  if (motion === 'both') { attrs['data-img'] = ''; attrs['data-parallax'] = ''; }
  if (motion === 'hero') { attrs['data-hero-img'] = ''; }
  return (
    <div className={`frame ${className}`} style={{ aspectRatio: ratio }} {...attrs}>
      <Img name={name} src={src} alt={alt} />
    </div>
  );
}

// Heading split into masked lines. Use "|" to mark line breaks: "Every issue,|every season".
export function Title({ text, as = 'h2', className = 'h2', hero = false }) {
  const Tag = as;
  const lines = text.split('|');
  const attr = hero ? { 'data-hero-title': '' } : { 'data-title': '' };
  return (
    <Tag className={className} {...attr} aria-label={lines.join(' ')}>
      {lines.map((l, i) => (
        <span className="t-line" key={i} aria-hidden="true">
          <span dangerouslySetInnerHTML={{ __html: l.replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
        </span>
      ))}
    </Tag>
  );
}

// Paragraph whose words brighten as you scroll.
export function Words({ text, className = '' }) {
  return (
    <p className={`words ${className}`} data-words>
      {text.split(' ').map((w, i) => <span className="w" key={i}>{w} </span>)}
    </p>
  );
}

export function Btn({ children, to, onClick, variant = 'dark', type = 'button' }) {
  return (
    <button type={type} className={`btn btn--${variant}`} onClick={(e) => { onClick && onClick(e); to && go(to); }}>
      <span className="btn__text" data-label={typeof children === 'string' ? children : ''}><span>{children}</span></span>
      <span className="btn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
      </span>
    </button>
  );
}

export function TextLink({ children, to, onClick }) {
  return (
    <button className="tlink" onClick={(e) => { onClick && onClick(e); to && go(to); }}>
      {children}<span aria-hidden="true">→</span>
    </button>
  );
}

export function Eyebrow({ children, hero = false }) {
  return <p className="eyebrow" {...(hero ? { 'data-hero-fade': '' } : { 'data-fade': '' })}>{children}</p>;
}

export function StatusPill({ status }) {
  const label = { open: 'Open now', judging: 'In judging', closed: 'Winners out' }[status];
  return <span className={`pill pill--${status}`}>{label}</span>;
}

// Inner page header: title + wide image.
export function PageHero({ eyebrow, title, text, img, alt, children }) {
  return (
    <header className="page-hero">
      <div className="wrap">
        <div className="page-hero__top">
          <Eyebrow hero>{eyebrow}</Eyebrow>
          <Title as="h1" className="h1" text={title} hero />
        </div>
        <div className="page-hero__row">
          {text && <p className="lead" data-hero-fade>{text}</p>}
          {children && <div data-hero-fade>{children}</div>}
        </div>
      </div>
      {img && (
        <div className="wrap">
          <Frame name={img} alt={alt} ratio="21 / 9" motion="hero" className="page-hero__img" />
        </div>
      )}
    </header>
  );
}

// List rows that show a floating image following the cursor on hover (desktop).
export function HoverList({ items, render, onSelect }) {
  const box = useRef(null);
  const [active, setActive] = useState(null);

  const move = (e) => {
    if (!box.current) return;
    const r = box.current.parentElement.getBoundingClientRect();
    gsap.to(box.current, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.7, ease: 'power3.out' });
  };

  return (
    <div className="hover-list" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      <ul data-stagger>
        {items.map((it, i) => (
          <li key={i}>
            <button className="hl-row" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => onSelect && onSelect(it)}>
              {render(it)}
            </button>
          </li>
        ))}
      </ul>
      <div className={`hl-preview ${active !== null ? 'is-on' : ''}`} ref={box} aria-hidden="true">
        {items.map((it, i) => (
          <div key={i} className={`hl-preview__img ${active === i ? 'is-active' : ''}`}>
            <Img name={it.img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
