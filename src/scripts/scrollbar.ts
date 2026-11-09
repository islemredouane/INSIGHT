// Page scrollbar with the same thumb height on every page.
// A native thumb shrinks as the page gets longer, so each page had a different one.
// This draws the 2px periwinkle line at the height the home page has, on every page.
// Mouse and trackpad devices only: touch devices keep their own scroll indicator (see base.css).

/** Height of the home page in px (measured). The thumb is viewport² / this, i.e. exactly home's thumb. */
const HOME_PAGE_HEIGHT = 10400;
const MIN_THUMB = 40;

const bar = document.getElementById('scrollbar');
const thumb = document.getElementById('scrollbar-thumb');
const fine = matchMedia('(hover: hover) and (pointer: fine)');

if (bar && thumb) {
  const root = document.documentElement;
  let thumbH = 0;
  let queued = false;

  const maxScroll = () => root.scrollHeight - innerHeight;
  const travel = () => innerHeight - thumbH;

  function render() {
    queued = false;
    const max = maxScroll();
    const active = fine.matches && max > 1 && !root.classList.contains('menu-open');
    bar!.hidden = !active;
    if (!active) return;
    thumbH = Math.max(MIN_THUMB, Math.round((innerHeight * innerHeight) / HOME_PAGE_HEIGHT));
    thumb!.style.height = `${thumbH}px`;
    thumb!.style.transform = `translateY(${(scrollY / max) * travel()}px)`;
  }
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  fine.addEventListener('change', queue);
  new ResizeObserver(queue).observe(document.body); // FAQ opening, images loading…
  new MutationObserver(queue).observe(root, { attributes: true, attributeFilter: ['class'] }); // menu open/close
  render();

  // Drag the thumb
  let startY = 0;
  let startScroll = 0;
  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    startY = e.clientY;
    startScroll = scrollY;
    thumb.setPointerCapture(e.pointerId);
    bar.classList.add('dragging');
  });
  thumb.addEventListener('pointermove', (e) => {
    if (!thumb.hasPointerCapture(e.pointerId)) return;
    const t = travel();
    if (t > 0) scrollTo({ top: startScroll + ((e.clientY - startY) / t) * maxScroll(), behavior: 'instant' });
  });
  const stop = (e: PointerEvent) => {
    if (thumb.hasPointerCapture(e.pointerId)) thumb.releasePointerCapture(e.pointerId);
    bar.classList.remove('dragging');
  };
  thumb.addEventListener('pointerup', stop);
  thumb.addEventListener('pointercancel', stop);

  // Click on the track: jump there, centring the thumb on the pointer
  bar.addEventListener('pointerdown', (e) => {
    if (e.target !== bar) return;
    const t = travel();
    if (t > 0) scrollTo({ top: ((e.clientY - thumbH / 2) / t) * maxScroll(), behavior: 'instant' });
  });
}
