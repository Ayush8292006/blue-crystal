import React, { useState } from 'react';
import { SUBMIT_STEPS, ISSUES } from '../data.js';
import { usePageAnimations, PageHero, Title, Eyebrow, Btn } from '../components/ui.jsx';

export default function Submit() {
  const ref = usePageAnimations();
  const openIssues = ISSUES.filter((i) => i.status === 'open');
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState('');

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Submission Guidelines"
        title="Send us your|best *work*"
        text="Poetry, short stories and photographs are welcome from writers everywhere. Here is how to enter."
        img="writing"
        alt="A writer's desk with notebook"
      />

      <section className="section">
        <div className="wrap">
          <div className="head-row"><div><Eyebrow>How it works</Eyebrow><Title text="Four simple *steps*" /></div></div>
          <span className="rule" data-line />
          <ol className="steps steps--four" data-stagger>
            {SUBMIT_STEPS.map((s, i) => (
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
        <div className="wrap form-wrap">
          <div>
            <Eyebrow>Entry form</Eyebrow>
            <Title text="Enter an|open *issue*" />
            <p className="lead" data-fade>Fill in your details and attach your work. You will receive a confirmation by email.</p>
            <ul className="rules" data-stagger>
              <li>Work must be original and your own.</li>
              <li>Follow the theme of the issue you enter.</li>
              <li>Writing as .doc, .docx or .pdf. Photographs as .jpg.</li>
              <li>Add a short bio of up to 50 words.</li>
            </ul>
          </div>
          <div className="form-card" data-fade>
            {sent ? (
              <div className="success">
                <p className="eyebrow">Received</p>
                <h3>Thank you for your entry</h3>
                <p>This is a prototype, so nothing was sent. On the live site this form will send your entry to the editors.</p>
                <Btn onClick={() => setSent(false)} variant="line">Send another</Btn>
              </div>
            ) : (
              <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="form__row">
                  <div className="field"><input id="s-name" required placeholder=" " /><label htmlFor="s-name">Full name</label></div>
                  <div className="field"><input id="s-email" type="email" required placeholder=" " /><label htmlFor="s-email">Email</label></div>
                </div>
                <div className="form__row">
                  <div className="field field--select">
                    <select id="s-issue" required defaultValue="">
                      <option value="" disabled>Choose issue</option>
                      {openIssues.map((i) => <option key={i.no}>Issue {i.no} · {i.season} {i.kind}</option>)}
                    </select>
                  </div>
                  <div className="field field--select">
                    <select id="s-cat" required defaultValue="">
                      <option value="" disabled>Category</option>
                      <option>Poetry</option><option>Short Story</option><option>Photography</option>
                    </select>
                  </div>
                </div>
                <div className="field"><input id="s-title" required placeholder=" " /><label htmlFor="s-title">Title of your work</label></div>
                <div className="field"><textarea id="s-bio" rows="3" placeholder=" " /><label htmlFor="s-bio">Short bio</label></div>
                <label className="upload" htmlFor="s-file">
                  <input id="s-file" type="file" onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
                  <span className="upload__plus">+</span>
                  <span>{fileName || 'Attach your file'}</span>
                </label>
                <Btn type="submit">Submit entry</Btn>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
