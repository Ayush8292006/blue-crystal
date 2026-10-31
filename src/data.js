// All site content lives here. Edit this file to update text, images, issues and contacts.

export const SITE = {
  name: 'Blue Crystal',
  full: 'Blue Crystal Literary Magazine',
  tagline: 'Crystallized Dreams Since 2022',
  email: 'editor@bluecrystallit.uk',
  phoneUK: '+44 7460 029978',
  phoneIN: '+91 7810 933369',
  web: 'bluecrystallit.uk',
};

// Free photos from Unsplash (unsplash.com/license). Replace with your own images any time.
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero: u('1481627834876-b7833e8f5570', 2200),      // library shelves
  writing: u('1455390582262-044cdead277a'),          // writer's desk
  books: u('1512820790803-83ca734da794'),            // stack of books
  openBook: u('1506880018603-83d5b814b5a6'),         // open book
  library: u('1507842217343-583bb7270b66', 2000),   // grand library
  reading: u('1516979187457-637abb4f9353'),          // reading
  shelf: u('1532012197267-da84d127e765'),            // books on shelf
  camera: u('1452587925148-ce544e77e70d'),           // camera
  mic: u('1478737270239-2f02b77fc618'),              // microphone
  night: u('1534447677768-be436bb09401'),            // night sky
  winter: u('1519681393784-d120267933ba'),
  fall: u('1477414348463-c0eb7f1359b6'),
  summer: u('1507525428034-b723cf961d3e'),
  dark: u('1518709268805-4e9042af9f23'),
  spring: u('1490750967868-88aa4486c946'),
};

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'issues', label: 'Issues' },
  { id: 'winners', label: 'Winners' },
  { id: 'story', label: 'Our Story' },
  { id: 'people', label: 'People' },
  { id: 'publish', label: 'Publish a Book' },
  { id: 'submit', label: 'Submit' },
  { id: 'contact', label: 'Contact' },
];

export const ISSUES = [
  { no: 30, season: 'Winter', kind: 'Contest', date: '14 Sep 2026', status: 'open', img: 'winter',
    blurb: 'Frost, stillness and long nights. Send us poems, stories and photographs that hold the cold light of winter.' },
  { no: 29, season: 'Fall', kind: 'Challenge', date: '11 Aug 2026', status: 'open', img: 'fall',
    blurb: 'Falling leaves, harvest moons and a little Halloween mischief. Write the turning of the year.' },
  { no: 28, season: 'Summer', kind: 'Contest', date: '8 Apr 2026', status: 'judging', img: 'summer',
    blurb: 'Long afternoons, salt air and the restless heat of summer in verse, prose and image.' },
  { no: 27, season: 'Dark', kind: 'Challenge', date: '11 Mar 2026', status: 'judging', img: 'dark',
    blurb: 'Shadows, secrets and the things we do not say aloud. Our darkest issue yet.' },
  { no: 26, season: 'Spring', kind: 'Contest', date: '4 Feb 2026', status: 'closed', img: 'spring',
    blurb: 'New growth, first light and fresh beginnings. Winners now announced.' },
];

export const WINNERS = [
  { no: 26, title: 'Spring Poetry, Short Story & Photography Contest', date: '29 Sep 2026', img: 'spring' },
  { no: 25, title: 'Dream Poetry, Short Story & Photography Challenge', date: '4 Aug 2026', img: 'night' },
  { no: 24, title: 'Spanish Poetry, Short Story & Photography Contest', date: '9 May 2026', img: 'summer' },
  { no: 23, title: 'Winter Poetry, Short Story & Photography Challenge', date: '6 Feb 2026', img: 'winter' },
  { no: 22, title: 'Sea Poetry, Short Story & Photography Contest', date: '2 Apr 2026', img: 'summer' },
];

export const FORMS = [
  { name: 'Poetry', img: 'openBook', text: 'Free verse, sonnets, haiku and everything between. Every voice and every form is welcome.' },
  { name: 'Short Story', img: 'writing', text: 'Flash fiction to full short stories. Characters and worlds that stay with the reader.' },
  { name: 'Photography', img: 'camera', text: 'Images that tell a story without a single word. Shot on any camera, including your phone.' },
];

export const OFFERINGS = [
  { name: 'Full Book Publication', page: 'publish', img: 'books', text: 'Take your manuscript from draft to a finished, published book.' },
  { name: 'Open Mic', page: 'contact', img: 'mic', text: 'Read your work aloud to a live audience of writers and readers.' },
  { name: 'The Library', page: 'issues', img: 'shelf', text: 'Browse every past issue and the authors featured in them.' },
];

// Replace with your real team members.
export const TEAM = [
  { name: 'Editor-in-Chief', role: 'Founder & Editor', group: 'Editorial' },
  { name: 'The Eminent Editors', role: 'Senior Editorial Board', group: 'Editorial' },
  { name: 'Poetry Editor', role: 'Poetry Desk', group: 'Editorial' },
  { name: 'Fiction Editor', role: 'Short Story Desk', group: 'Editorial' },
  { name: 'Photo Editor', role: 'Photography Desk', group: 'Creative' },
  { name: 'Design Lead', role: 'Creative Team', group: 'Creative' },
  { name: 'Community Lead', role: 'Open Mic & Events', group: 'Creative' },
  { name: 'Outreach Lead', role: 'Universities & Partners', group: 'Creative' },
];

export const TIMELINE = [
  { year: '2022', title: 'The first crystal', text: 'Blue Crystal Literary Magazine is founded with one idea: give every dreamer a page.' },
  { year: '2023', title: 'Seasons of writing', text: 'Seasonal poetry, short story and photography contests become our signature.' },
  { year: '2024', title: 'Across two countries', text: 'A growing community of writers in the UK and India, with university outreach.' },
  { year: '2025', title: 'Books, not just pages', text: 'Full book publication opens for authors ready to publish their own work.' },
  { year: '2026', title: 'Issue 30', text: 'Thirty issues in, with Open Mic evenings and global connections.' },
];

export const PUBLISH_STEPS = [
  { title: 'Send your manuscript', text: 'Share your draft and a short synopsis with our editorial team.' },
  { title: 'Editorial review', text: 'Our editors read it and suggest edits for structure, language and flow.' },
  { title: 'Design & layout', text: 'Cover design and interior typesetting, approved by you.' },
  { title: 'Publication', text: 'Your book is published and listed among our Full Book Published Authors.' },
  { title: 'Launch', text: 'We announce your book to our readers and community.' },
];

export const SUBMIT_STEPS = [
  { title: 'Pick an open issue', text: 'Choose a contest or challenge that is currently open.' },
  { title: 'Read the guidelines', text: 'Check the theme, word limit and format for your category.' },
  { title: 'Send your work', text: 'Submit through the form with your name and a short bio.' },
  { title: 'Results', text: 'Winners are announced on the Winners page and on social media.' },
];
