import { site } from '../data/site';

/**
 * Resolves an asset path to its high-speed Cloudflare R2 CDN URL if configured,
 * or falls back to the local relative path in public/.
 *
 * Example:
 *   assetUrl('/events/spark-2026/cover.webp')
 *   -> 'https://pub-554f8a45acb54090af55ec98805e7e60.r2.dev/events/spark-2026/cover.webp'
 */
export function assetUrl(path: string | null | undefined): string {
  if (!path) return '';
  // Already an absolute external URL
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }

  const cdnBase = import.meta.env.PUBLIC_CDN_URL || site.cdnUrl;
  if (!cdnBase) return path;

  const cleanBase = cdnBase.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}
