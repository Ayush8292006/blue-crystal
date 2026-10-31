import React from 'react';
import { TIMELINE } from '../data.js';
import { usePageAnimations, PageHero, Frame, Title, Words, Eyebrow, Btn } from '../components/ui.jsx';

const PILLARS = [
  { title: 'Accreditation & Approvals', text: 'Recognised by the institutions and partners we work with.' },
  { title: 'Universities Covered', text: 'Outreach to students and young writers on campuses.' },
  { title: 'Global Connections', text: 'Writers, editors and readers in the UK, India and beyond.' },
];

export default function Story() {
  const ref = usePageAnimations();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Our Story"
        title="A crystal begins|as a *dream*"
        text="Blue Crystal started in 2022 with a simple belief: every writer deserves to be read."
        img="reading"
        alt="A person reading a book"
      />

      <section className="section">
        <div className="wrap story-intro">
          <Words
            className="statement__text"
            text="We are a literary magazine for poets, storytellers and photographers. Each season we open a new contest, read every entry with care, and celebrate the winners. Beyond the magazine, we help authors publish full books and bring writers together at our Open Mic evenings."
          />
        </div>
      </section>

      <section className="section section--beige">
        <div className="wrap story-split">
          <div className="story-split__media">
            <Frame name="writing" alt="A writer's desk" ratio="3 / 4" motion="both" />
            <Frame name="openBook" alt="An open book" ratio="1 / 1" motion="both" className="story-split__small" />
          </div>
          <div>
            <Eyebrow>Milestones</Eyebrow>
            <Title text="How we *grew*" />
            <ol className="timeline" data-stagger>
              {TIMELINE.map((t) => (
                <li key={t.year} className="timeline__item">
                  <span className="timeline__year">{t.year}</span>
                  <div><h3>{t.title}</h3><p>{t.text}</p></div>
                </li>
              ))}
            </ol>
            <p className="note">Edit these milestones in data.js to match your history.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="pillars" data-stagger>
            {PILLARS.map((p, i) => (
              <div key={p.title} className="pillar">
                <span className="pillar__no">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
          <div className="center-cta" data-fade><Btn to="people">Meet the people</Btn></div>
        </div>
      </section>
    </div>
  );
}
