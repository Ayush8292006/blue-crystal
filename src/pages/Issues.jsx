import React, { useEffect, useState } from 'react';
import { ISSUES } from '../data.js';
import { usePageAnimations, PageHero, Img, Btn, StatusPill } from '../components/ui.jsx';
import { gsap, ScrollTrigger } from '../animations.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open now' },
  { id: 'judging', label: 'In judging' },
  { id: 'closed', label: 'Winners out' },
];

export default function Issues() {
  const ref = usePageAnimations();
  const [filter, setFilter] = useState('all');
  const list = filter === 'all' ? ISSUES : ISSUES.filter((i) => i.status === filter);

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.issue-row');
    if (items?.length) gsap.fromTo(items, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 });
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="The Library"
        title="Every issue,|every *season*"
        text="Seasonal contests and challenges in poetry, short story and photography. Enter an open issue or browse past ones."
        img="shelf"
        alt="Books on a shelf"
      />
      <section className="section">
        <div className="wrap">
          <div className="filters" data-fade>
            {FILTERS.map((f) => (
              <button key={f.id} className={`chip ${filter === f.id ? 'is-active' : ''}`} onClick={() => setFilter(f.id)} aria-pressed={filter === f.id}>
                {f.label}<sup>{f.id === 'all' ? ISSUES.length : ISSUES.filter((i) => i.status === f.id).length}</sup>
              </button>
            ))}
          </div>
          <div className="issue-list">
            {list.map((iss) => (
              <article className="issue-row" key={iss.no}>
                <div className="issue-row__img zoom"><Img name={iss.img} alt={`${iss.season} issue`} /></div>
                <div className="issue-row__no">No. {iss.no}</div>
                <div className="issue-row__body">
                  <div className="issue-row__meta"><span>{iss.date}</span><StatusPill status={iss.status} /></div>
                  <h2 className="h3">{iss.season} Poetry, Short Story &amp; Photography {iss.kind}</h2>
                  <p>{iss.blurb}</p>
                  {iss.status === 'open' && <Btn to="submit">Enter this issue</Btn>}
                  {iss.status === 'closed' && <Btn to="winners" variant="line">See the winners</Btn>}
                  {iss.status === 'judging' && <p className="note">Entries closed. Winners will be announced soon.</p>}
                </div>
              </article>
            ))}
            {list.length === 0 && <p className="note">No issues in this group right now.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
