import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV, SITE, IMG } from '../data.js';
import { go, useScrolled } from '../hooks.js';
import { gsap } from '../animations.js';

export default function Header({ route }) {
  const { scrolled, down } = useScrolled();
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const tl = useRef(null);

  // Menu open/close timeline
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' })
        .from('.mn-link > span', { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.05 }, 0.4)
        .from('.mn-side > *', { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.06 }, 0.6);
    }, menu);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tl.current) return;
    if (open) tl.current.timeScale(1).play();
    else tl.current.timeScale(1.6).reverse();
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const nav = (id) => { setOpen(false); setTimeout(() => go(id), open ? 450 : 0); };
  const main = NAV.filter((n) => !['home', 'submit'].includes(n.id));

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${down && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
        <div className="wrap header__inner">
          <button className="logo" onClick={() => nav('home')} aria-label="Blue Crystal home">
            Blue Crystal<span>Literary Magazine</span>
          </button>
          <nav className="header__nav" aria-label="Main">
            {main.map((n) => (
              <button key={n.id} className={`navlink ${route === n.id ? 'is-active' : ''}`} onClick={() => nav(n.id)}>
                <span data-label={n.label}><span>{n.label}</span></span>
              </button>
            ))}
          </nav>
          <div className="header__actions">
            <button className="pill-btn" onClick={() => nav('submit')}>Submit work</button>
            <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
              <span className="menu-btn__label">{open ? 'Close' : 'Menu'}</span>
              <span className="menu-btn__lines"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div className="menu" ref={menu} aria-hidden={!open}>
        <div className="menu__img"><img src={IMG.library} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} /></div>
        <div className="menu__body wrap">
          <ul className="menu__list">
            {NAV.map((n) => (
              <li key={n.id}>
                <button className={`mn-link ${route === n.id ? 'is-active' : ''}`} onClick={() => nav(n.id)} tabIndex={open ? 0 : -1}>
                  <span>{n.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mn-side">
            <p className="eyebrow">Write to the editors</p>
            <p>{SITE.email}</p>
            <p>{SITE.phoneUK} · UK</p>
            <p>{SITE.phoneIN} · India</p>
          </div>
        </div>
      </div>
    </>
  );
}
