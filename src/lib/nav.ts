/** True when `href` is the current page or one of its sub-pages (e.g. /research/ai under /research). */
export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean === href || clean.startsWith(`${href}/`);
}
