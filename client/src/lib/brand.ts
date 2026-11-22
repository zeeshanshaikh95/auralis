const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Fallback hero image when no slide is configured. */
export const HERO_IMAGE = `${BASE}/images/hero-products.jpg`;

/** Editorial visual used when settings hold no custom image. */
export const FOUNDER_IMAGE = `${BASE}/images/atelier.jpg`;

export const OG_IMAGE = `${BASE}/images/hero-products.jpg`;

export const SITE_URL =
  (import.meta.env.VITE_PUBLIC_SITE_URL ?? '').trim() || 'http://localhost:5173';

/** The brand's own Instagram — the source of every brand fact on this site. */
export const INSTAGRAM_URL = 'https://www.instagram.com/_auralis.official_/';
export const INSTAGRAM_HANDLE = '_auralis.official_';

/**
 * Public contact details. The house takes orders in Instagram DMs (that is how
 * every "price please" comment on its posts is answered), so there is no phone
 * number on the site until the owner adds one in Admin → Settings.
 */
export const PHONE_DISPLAY = '@_auralis.official_';
export const ADDRESS_LINE = 'Mumbai, Maharashtra · shipping across India';

/**
 * Absolute asset URL that respects Vite's BASE_URL — and is safe to call on a
 * value that was already resolved (project sites are served from /<repo>/, so
 * double-prefixing would 404).
 */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (!path.startsWith('/')) return `${BASE}/${path}`;
  if (!BASE || path === BASE || path.startsWith(`${BASE}/`)) return path;
  return `${BASE}${path}`;
}
