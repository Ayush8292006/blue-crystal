import React, { useEffect, useState } from 'react';
import { useRoute, intro } from './hooks.js';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Issues from './pages/Issues.jsx';
import Winners from './pages/Winners.jsx';
import Story from './pages/Story.jsx';
import People from './pages/People.jsx';
import Publish from './pages/Publish.jsx';
import Submit from './pages/Submit.jsx';
import Contact from './pages/Contact.jsx';

const PAGE_MAP = { home: Home, issues: Issues, winners: Winners, story: Story, people: People, publish: Publish, submit: Submit, contact: Contact };

function jumpTop() {
  const html = document.documentElement;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.style.scrollBehavior = '';
}

export default function App() {
  const route = useRoute();
  // The opening animation shows only on the first visit (remembered in the browser).
  const [loading, setLoading] = useState(!intro.done);

  // Changing page: go straight to the new page, no repeated intro.
  useEffect(() => { jumpTop(); }, [route]);

  const Page = PAGE_MAP[route] || Home;

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Header route={route} />
      <main key={route}>
        <Page />
      </main>
      <Footer key={`f-${route}`} />
    </>
  );
}
