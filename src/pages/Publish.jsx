import React from 'react';
import { PUBLISH_STEPS } from '../data.js';
import { usePageAnimations, PageHero, Title, Eyebrow, Btn, Frame } from '../components/ui.jsx';

export default function Publish() {
  const ref = usePageAnimations();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Full Book Publication"
        title="From manuscript|to *bookshelf*"
        text="Ready to publish your own collection of poems, stories or photographs? Our editors guide you through every step."
        img="books"
        alt="A stack of books"
      >
        <Btn to="contact">Start your book</Btn>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div><Eyebrow>The process</Eyebrow><Title text="Five steps|to your *book*" /></div>
          </div>
          <span className="rule" data-line />
          <ol className="steps" data-stagger>
            {PUBLISH_STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__no">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--beige">
        <div className="wrap feature">
          <div className="feature__media"><Frame name="openBook" alt="An open book" ratio="4 / 5" motion="both" /></div>
          <div className="feature__text">
            <Eyebrow>Full Book Published Authors</Eyebrow>
            <Title text="Join our|published *authors*" />
            <p className="lead" data-fade>Every book we publish is listed on our authors page and shared with readers in the UK, India and beyond.</p>
            <div data-fade><Btn to="contact">Talk to an editor</Btn></div>
          </div>
        </div>
      </section>
    </div>
  );
}
