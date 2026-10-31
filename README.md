# Blue Crystal Literary Magazine — React prototype

An animated, multi-page magazine website prototype built with React + Vite.
Colours: white, beige and black. Fonts: Newsreader (headings) and Instrument Sans (text). Animations: GSAP + ScrollTrigger.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

Build for hosting:

```bash
npm run build
```

The finished site is in the `dist/` folder.

## Pages

| Page | File |
|---|---|
| Home | `src/pages/Home.jsx` |
| Issues (contests) | `src/pages/Issues.jsx` |
| Winners | `src/pages/Winners.jsx` |
| Our Story | `src/pages/Story.jsx` |
| People (team, editors, authors) | `src/pages/People.jsx` |
| Publish a Book | `src/pages/Publish.jsx` |
| Submit | `src/pages/Submit.jsx` |
| Contact | `src/pages/Contact.jsx` |

Pages switch with `#hash` links (e.g. `/#issues`), so no router library is needed.

## Animations included

- Opening screen: name rises letter by letter, then the black panel lifts away
- Page transition: beige panel sweeps over the page on every route change
- Headlines rise line by line from a mask
- Photos wipe open from the bottom and settle from a slow zoom
- Parallax photos and a scroll-linked hero image
- About text lights up word by word as you scroll
- Issues section scrolls sideways while pinned (desktop)
- Winners list shows a floating photo that follows the cursor
- Hover: rolling button labels, slow image zoom, italic headline shift, drawing underlines
- Respects the "reduce motion" system setting

All scroll animations are in `src/animations.js` and switch on with data attributes
(`data-img`, `data-parallax`, `data-title`, `data-fade`, `data-stagger`, `data-words`, `data-hscroll`).

## Editing content

All text, issues, winners, team members and contact details are in **`src/data.js`**.
Replace the sample team names, winner names and timeline with your real ones.
Photos come from Unsplash (free licence) and are listed in `IMG` in `src/data.js`. Put your own images in `public/images/` and change the links to `/images/your-file.jpg`.

Forms (Submit, Contact, newsletter) are front-end only. Connect them to an email service
(EmailJS, Formspree) or your backend inside the `onSubmit` handlers.
