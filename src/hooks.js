import { useEffect, useState } from 'react';
import { NAV } from './data.js';

// ---------- Simple #page routing ----------
const PAGES = NAV.map((n) => n.id);

function readRoute() {
  const h = window.location.hash.replace('#', '');
  return PAGES.includes(h) ? h : 'home';
}

export function go(id) {
  if (readRoute() === id) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.location.hash = id;
}

export function useRoute() {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

// The opening animation plays only on a visitor's first visit.
const INTRO_KEY = 'bc_intro_seen';

function readSeen() {
  try { return localStorage.getItem(INTRO_KEY) === '1'; } catch (e) { return false; }
}

export const intro = { done: readSeen(), delay: 1.9 };

export function markIntroSeen() {
  intro.done = true;
  try { localStorage.setItem(INTRO_KEY, '1'); } catch (e) { /* storage blocked: fine */ }
}

export function heroDelay() {
  return intro.done ? 0.1 : intro.delay;
}

export function useScrolled(offset = 40) {
  const [state, setState] = useState({ scrolled: false, down: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setState({ scrolled: y > offset, down: y > last && y > 400 });
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return state;
}
