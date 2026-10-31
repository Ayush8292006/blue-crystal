import React, { useEffect, useState } from 'react';
import { TEAM } from '../data.js';
import { usePageAnimations, PageHero, Title, Eyebrow, Btn, Frame } from '../components/ui.jsx';
import { gsap } from '../animations.js';

const TABS = ['All', 'Editorial', 'Creative'];
const initials = (n) => n.split(' ').filter((w) => /[A-Z]/.test(w[0])).slice(0, 2).map((w) => w[0]).join('');

export default function People() {
  const ref = usePageAnimations();
  const [tab, setTab] = useState('All');
  const list = tab === 'All' ? TEAM : TEAM.filter((p) => p.group === tab);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.person');
    if (els?.length) gsap.fromTo(els, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.06 });
  }, [tab]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Creative Team · Eminent Editors · Our Authors"
        title="The people|behind the *pages*"
        text="Editors who read every entry, a creative team that shapes each issue, and the authors who make it shine."
      />
      <section className="section section--tight">
        <div className="wrap">
          <div className="filters" data-fade>
            {TABS.map((t) => (
              <button key={t} className={`chip ${tab === t ? 'is-active' : ''}`} onClick={() => setTab(t)} aria-pressed={tab === t}>{t}</button>
            ))}
          </div>
          <div className="team-grid">
            {list.map((p) => (
              <article className="person" key={p.name}>
                <div className="person__photo"><span>{initials(p.name)}</span></div>
                <div className="person__info">
                  <h3>{p.name}</h3>
                  <p>{p.role}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="note">Add real names and photos in data.js.</p>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap feature feature--rev">
          <div className="feature__text">
            <Eyebrow>Our Authors</Eyebrow>
            <Title text="Published with|*Blue Crystal*" />
            <p className="lead" data-fade>Writers from many countries have appeared in our issues, and a growing list have published full books with us.</p>
            <div className="btn-row" data-fade>
              <Btn to="issues" variant="light">Browse the library</Btn>
              <Btn to="publish" variant="line-light">Publish your book</Btn>
            </div>
          </div>
          <div className="feature__media"><Frame name="books" alt="Stack of books" ratio="4 / 5" motion="both" /></div>
        </div>
      </section>
    </div>
  );
}
