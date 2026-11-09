// Motion (from home-v3): split headlines, reveal on scroll, count-up, smooth FAQ.
// Everything is a no-op when the page has none of the hooks, so it is safe to load on every page.

document.documentElement.classList.add('motion-ready'); // tells the 4 s safety net in BaseLayout that this script is running

const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
const reduce = reduceQuery.matches;

/* ---- Split headlines into words (kept as real text for search engines and screen readers) ---- */
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  const esc = (t: string) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
  el.innerHTML = (el.textContent || '').trim().split(/\s+/)
    .map((w, i) => `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`).join(' ');
  el.classList.add('split-done');
});
const hero = document.querySelector<HTMLElement>('[data-split="hero"]');
if (hero) {
  hero.style.setProperty('--d', '150ms');
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('in')));
}

/* ---- Index children for the cascades ---- */
document.querySelectorAll('.rv-stagger, .rv-cells').forEach((g) =>
  [...g.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(Math.min(i, 7)))), // capped: no long waits in big lists
);

/* ---- Count-up (elements with data-count inside [data-countup]) ---- */
const counters = [...document.querySelectorAll<HTMLElement>('[data-countup]')];
const countUp = (group: HTMLElement) =>
  group.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count), t0 = performance.now(), dur = 1300;
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
if (!reduce) counters.forEach((g) => {
  if (g.getBoundingClientRect().top > innerHeight) g.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => (el.textContent = '0'));
});

/* ---- Reveal on scroll (once) ----
   A section animates when its top crosses the trigger line (88% down the screen), so the motion
   happens where you can see it. Positions are checked on every scroll frame (requestAnimationFrame),
   not with a delayed observer callback: on phones those callbacks arrive late during a fling and left
   content invisible on screen. Two edge cases:
   - at the bottom of the page, the last sections can never reach the line, so anything on screen reveals;
   - sections already scrolled past (anchor jump, restored scroll) appear at once, without animation. */
const targets = [...document.querySelectorAll<HTMLElement>('.rv, .rv-stagger, .rv-cells, .route, [data-countup], [data-split]:not([data-split="hero"])')];
const pending = new Set(targets);
const TRIGGER = 0.88;
const reveal = (t: HTMLElement, instant = false) => {
  if (!pending.delete(t)) return;
  if (instant) t.classList.add('rv-instant');
  t.classList.add('in');
  if (t.hasAttribute('data-countup')) countUp(t);
};
if (reduce) {
  targets.forEach((t) => reveal(t, true));
} else {
  let queued = false;
  const check = () => {
    queued = false;
    const root = document.documentElement;
    const atBottom = scrollY + innerHeight >= root.scrollHeight - 4;
    const line = atBottom ? innerHeight : innerHeight * TRIGGER;
    // read every position first, then write (no layout recalculation between elements)
    const rects = [...pending].map((t) => [t, t.getBoundingClientRect()] as const);
    rects.forEach(([t, r]) => {
      if (r.bottom < 0) reveal(t, true);   // already passed
      else if (r.top < line) reveal(t);    // crossing the line: animate
    });
    if (!pending.size) { removeEventListener('scroll', queue); removeEventListener('resize', queue); }
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  addEventListener('pageshow', queue);
  addEventListener('load', queue);
  document.addEventListener('visibilitychange', queue);
  queue();
}

/* ---- FAQ: smooth open/close (same technique as the Rasa site) ---- */
const ease = 'cubic-bezier(.22,.61,.36,1)';
document.querySelectorAll<HTMLDetailsElement>('details[data-smooth]').forEach((el) => {
  const summary = el.querySelector('summary')!;
  const answer = summary.nextElementSibling as HTMLElement;
  let grow: Animation | null = null, fade: Animation | null = null;
  const closedHeight = () => {
    const cs = getComputedStyle(el);
    return summary.offsetHeight + (['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'] as const)
      .reduce((h, k) => h + parseFloat(cs[k]), 0);
  };
  summary.addEventListener('click', (e) => {
    if (reduceQuery.matches || !el.animate) return;
    e.preventDefault();
    const from = el.offsetHeight, opening = !el.open || el.classList.contains('is-closing');
    grow?.cancel(); fade?.cancel();
    el.style.overflow = 'hidden';
    el.classList.toggle('is-closing', !opening);
    if (opening) el.open = true;
    const to = opening ? el.offsetHeight : closedHeight();
    const duration = Math.min(440, 240 + Math.abs(to - from) * 0.6);
    grow = el.animate({ height: [`${from}px`, `${to}px`] }, { duration, easing: ease });
    fade = answer.animate(
      opening ? { opacity: [0, 1], transform: ['translateY(-6px)', 'none'] } : { opacity: [1, 0], transform: ['none', 'translateY(-6px)'] },
      { duration: opening ? duration : duration * 0.7, easing: ease, fill: opening ? 'none' : 'forwards' },
    );
    grow.onfinish = () => {
      grow = null; el.style.overflow = '';
      if (!opening) { el.open = false; el.classList.remove('is-closing'); fade?.cancel(); fade = null; }
    };
  });
});
