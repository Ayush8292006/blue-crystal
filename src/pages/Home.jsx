import React from 'react';
import { ISSUES, WINNERS, FORMS, OFFERINGS } from '../data.js';
import { go } from '../hooks.js';
import { usePageAnimations, Frame, Img, Title, Words, Btn, TextLink, Eyebrow, StatusPill, HoverList } from '../components/ui.jsx';

export default function Home() {
  const ref = usePageAnimations();
  const featured = ISSUES[0];

  return (
    <div ref={ref}>
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div className="hero__meta">
            <span data-hero-fade>Literary Magazine</span>
            <span data-hero-fade>United Kingdom · India</span>
            <span data-hero-fade>Issue {featured.no} — submissions open</span>
          </div>
          <Title as="h1" className="hero__title" hero text="Crystallized|*Dreams*" />
          <div className="hero__row">
            <p className="hero__lead" data-hero-fade>
              A literary magazine for poets, storytellers and photographers. Enter our seasonal
              contests, see your work in print, and publish your own book.
            </p>
            <div className="hero__ctas" data-hero-fade>
              <Btn to="submit">Submit your work</Btn>
              <Btn to="issues" variant="line">Read the issues</Btn>
            </div>
          </div>
        </div>
        <div className="wrap">
          <Frame name="hero" alt="Library shelves filled with books" ratio="16 / 7" motion="hero" className="hero__img" />
        </div>
      </section>

      {/* STATEMENT */}
      <section className="section">
        <div className="wrap statement">
          <Eyebrow>About the magazine</Eyebrow>
          <Words
            className="statement__text"
            text="Since 2022, Blue Crystal has published new voices from around the world. Every season we open a new theme, read every entry with care, and give the best work the page it deserves."
          />
          <div className="statement__stats" data-stagger>
            <div><p className="num"><span data-count="30">30</span></p><p className="eyebrow">Issues published</p></div>
            <div><p className="num"><span data-count="3">3</span></p><p className="eyebrow">Forms of writing</p></div>
            <div><p className="num"><span data-count="2">2</span></p><p className="eyebrow">Home countries</p></div>
          </div>
        </div>
      </section>

      {/* FEATURED OPEN CALL */}
      <section className="section section--beige">
        <div className="wrap feature">
          <div className="feature__media">
            <Frame name={featured.img} alt={`${featured.season} landscape`} ratio="4 / 5" motion="both" />
            <span className="feature__badge" data-fade>No. {featured.no}</span>
          </div>
          <div className="feature__text">
            <Eyebrow>Now open · Issue {featured.no}</Eyebrow>
            <Title text={`The *${featured.season}*|${featured.kind}`} />
            <p className="lead" data-fade>{featured.blurb}</p>
            <dl className="facts" data-stagger>
              <div><dt>Categories</dt><dd>Poetry, Short Story, Photography</dd></div>
              <div><dt>Opened</dt><dd>{featured.date}</dd></div>
              <div><dt>Status</dt><dd><StatusPill status={featured.status} /></dd></div>
            </dl>
            <div data-fade><Btn to="submit">Enter Issue {featured.no}</Btn></div>
          </div>
        </div>
      </section>

      {/* HORIZONTAL ISSUES */}
      <section className="hscroll" data-hscroll>
        <div className="hs-track">
          <div className="hs-intro">
            <Eyebrow>The issues</Eyebrow>
            <Title text="Seasons|of *writing*" />
            <p className="lead" data-fade>Each issue has its own theme. Scroll through the latest.</p>
            <div data-fade><TextLink to="issues">All issues</TextLink></div>
          </div>
          {ISSUES.slice(1).map((iss) => (
            <article className="hs-card" key={iss.no} onClick={() => go('issues')}>
              <div className="hs-card__img"><Img name={iss.img} alt={`${iss.season} issue`} /></div>
              <div className="hs-card__meta"><span>No. {iss.no}</span><StatusPill status={iss.status} /></div>
              <h3>{iss.season} {iss.kind}</h3>
              <p>{iss.date}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FORMS */}
      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <Eyebrow>What we publish</Eyebrow>
              <Title text="Three ways|to tell a *story*" />
            </div>
            <p className="lead" data-fade>Send us your strongest work in any of our three categories, in any style.</p>
          </div>
          <div className="forms">
            {FORMS.map((f, i) => (
              <article className={`form-item form-item--${i}`} key={f.name}>
                <Frame name={f.img} alt={f.name} ratio={i === 1 ? '3 / 4' : '4 / 5'} motion="both" className="zoom" />
                <div className="form-item__body" data-fade>
                  <span className="form-item__no">0{i + 1}</span>
                  <h3>{f.name}</h3>
                  <p>{f.text}</p>
                  <TextLink to="submit">Submit {f.name.toLowerCase()}</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WINNERS */}
      <section className="section section--ink">
        <div className="wrap">
          <div className="head-row">
            <div>
              <Eyebrow>Winner announcements</Eyebrow>
              <Title text="Recently *crowned*" />
            </div>
            <div data-fade><Btn to="winners" variant="light">All winners</Btn></div>
          </div>
          <span className="rule rule--light" data-line />
          <HoverList
            items={WINNERS}
            onSelect={() => go('winners')}
            render={(w) => (
              <>
                <span className="hl-no">No. {w.no}</span>
                <span className="hl-title">{w.title}</span>
                <span className="hl-date">{w.date}</span>
              </>
            )}
          />
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="section">
        <div className="wrap">
          <div className="head-row">
            <div>
              <Eyebrow>Beyond the magazine</Eyebrow>
              <Title text="More ways|to be *read*" />
            </div>
          </div>
          <div className="offers">
            {OFFERINGS.map((o, i) => (
              <button className="offer" key={o.name} onClick={() => go(o.page)} data-fade data-delay={i * 0.12}>
                <div className="offer__img"><Img name={o.img} alt={o.name} /></div>
                <div className="offer__body">
                  <h3>{o.name}</h3>
                  <p>{o.text}</p>
                </div>
                <span className="offer__arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="cta-band">
        <Frame name="library" alt="A grand library hall" ratio="auto" motion="parallax" className="cta-band__bg" />
        <div className="wrap cta-band__inner">
          <Eyebrow>Full Book Publication</Eyebrow>
          <Title text="Your book,|*published.*" className="h1" />
          <div data-fade><Btn to="publish" variant="light">Start your book</Btn></div>
        </div>
      </section>
    </div>
  );
}
