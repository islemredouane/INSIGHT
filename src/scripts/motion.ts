// Motion (from home-v3): split headlines, reveal on scroll, count-up, smooth FAQ.
// Everything is a no-op when the page has none of the hooks, so it is safe to load on every page.

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
  [...g.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i))),
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

/* ---- Reveal on scroll (once) ---- */
const targets = document.querySelectorAll<HTMLElement>('.rv, .rv-stagger, .rv-cells, .route, [data-countup], [data-split]:not([data-split="hero"])');
if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach((t) => t.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const t = e.target as HTMLElement;
    t.classList.add('in');
    if (t.hasAttribute('data-countup')) countUp(t);
    io.unobserve(t);
  }), { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  targets.forEach((t) => io.observe(t));
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
