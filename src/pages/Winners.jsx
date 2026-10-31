import React, { useState } from 'react';
import { WINNERS, FORMS } from '../data.js';
import { usePageAnimations, PageHero, Img } from '../components/ui.jsx';

const PLACES = ['First', 'Second', 'Third'];

export default function Winners() {
  const ref = usePageAnimations();
  const [open, setOpen] = useState(WINNERS[0].no);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Winner announcements"
        title="Recently|*crowned*"
        text="Congratulations to every winner. Open an issue to see the poets, storytellers and photographers it honoured."
        img="night"
        alt="Night sky full of stars"
      />
      <section className="section">
        <div className="wrap">
          <ul className="accordion" data-stagger>
            {WINNERS.map((w) => {
              const isOpen = open === w.no;
              return (
                <li key={w.no} className={`acc ${isOpen ? 'is-open' : ''}`}>
                  <button className="acc__head" onClick={() => setOpen(isOpen ? null : w.no)} aria-expanded={isOpen}>
                    <span className="acc__no">No. {w.no}</span>
                    <span className="acc__title">{w.title}</span>
                    <span className="acc__date">{w.date}</span>
                    <span className="acc__icon" aria-hidden="true" />
                  </button>
                  <div className="acc__body">
                    <div>
                      <div className="acc__inner">
                        <div className="acc__img"><Img name={w.img} alt="" /></div>
                        {FORMS.map((f) => (
                          <div className="podium" key={f.name}>
                            <p className="eyebrow">{f.name}</p>
                            <ol>
                              {PLACES.map((p) => <li key={p}><span>{p}</span><strong>Winner name</strong></li>)}
                            </ol>
                          </div>
                        ))}
                      </div>
                      <p className="note acc__note">Sample layout. Add the real winners for Issue {w.no} in data.js.</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
