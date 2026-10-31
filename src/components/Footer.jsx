import React, { useState } from 'react';
import { NAV, SITE } from '../data.js';
import { go } from '../hooks.js';
import { Title, usePageAnimations } from './ui.jsx';

export default function Footer() {
  const ref = usePageAnimations();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  return (
    <footer className="footer" ref={ref}>
      <div className="wrap">
        <div className="footer__cta">
          <Title text="Every dream|deserves *a page.*" className="footer__big" />
          <form className="footer__form" data-fade onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setDone(true); }}>
            <label htmlFor="footer-email" className="eyebrow">New issues, straight to your inbox</label>
            {done ? (
              <p className="footer__thanks">Thank you. You are on the list.</p>
            ) : (
              <div className="field-inline">
                <input id="footer-email" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Subscribe</button>
              </div>
            )}
          </form>
        </div>

        <span className="rule rule--light" data-line />

        <div className="footer__grid" data-stagger>
          <div>
            <p className="footer__logo">Blue Crystal</p>
            <p className="footer__muted">{SITE.tagline}. Poetry, short story and photography from the UK, India and the world.</p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="footer__links">
              {NAV.map((n) => <li key={n.id}><button onClick={() => go(n.id)}>{n.label}</button></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="footer__links">
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>{SITE.phoneUK} <span className="footer__muted">UK</span></li>
              <li>{SITE.phoneIN} <span className="footer__muted">India</span></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Information</p>
            <ul className="footer__links">
              <li>Accreditation &amp; Approvals</li>
              <li>Privacy Policy</li>
              <li>Terms &amp; Conditions</li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span>© {new Date().getFullYear()} {SITE.full}</span>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
