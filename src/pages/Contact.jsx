import React, { useState } from 'react';
import { SITE } from '../data.js';
import { usePageAnimations, PageHero, Btn } from '../components/ui.jsx';

function CopyLine({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); }).catch(() => {});
  };
  return (
    <div className="contact-line">
      <p className="eyebrow">{label}</p>
      <p className="contact-line__value">{value}</p>
      <button className="copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
  );
}

export default function Contact() {
  const ref = usePageAnimations();
  const [sent, setSent] = useState(false);
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Contact"
        title="Write to|the *editors*"
        text="Questions about a contest, book publication or Open Mic? We read every message."
        img="mic"
        alt="A microphone on stage"
      />
      <section className="section">
        <div className="wrap form-wrap">
          <div className="contact-lines" data-stagger>
            <CopyLine label="Email" value={SITE.email} />
            <CopyLine label="Phone · United Kingdom" value={SITE.phoneUK} />
            <CopyLine label="Phone · India" value={SITE.phoneIN} />
            <CopyLine label="Website" value={SITE.web} />
          </div>
          <div className="form-card" data-fade>
            {sent ? (
              <div className="success">
                <p className="eyebrow">Ready</p>
                <h3>Message received</h3>
                <p>This is a prototype, so nothing was sent. On the live site your message goes to {SITE.email}.</p>
                <Btn onClick={() => setSent(false)} variant="line">Write another</Btn>
              </div>
            ) : (
              <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form__row">
                  <div className="field"><input id="c-name" required placeholder=" " /><label htmlFor="c-name">Your name</label></div>
                  <div className="field"><input id="c-email" type="email" required placeholder=" " /><label htmlFor="c-email">Email</label></div>
                </div>
                <div className="field field--select">
                  <select id="c-topic" defaultValue="">
                    <option value="" disabled>What is it about?</option>
                    <option>Contest entry</option><option>Full book publication</option>
                    <option>Open Mic</option><option>Partnership or university</option><option>Something else</option>
                  </select>
                </div>
                <div className="field"><textarea id="c-msg" rows="5" required placeholder=" " /><label htmlFor="c-msg">Message</label></div>
                <Btn type="submit">Send message</Btn>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
