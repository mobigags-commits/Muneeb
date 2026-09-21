import { PageId } from '../types';

export const VALID_PUBLIC_PAGES: PageId[] = [
  'home',
  'about',
  'courses',
  'teachers',
  'student-portal',
  'parent-portal',
  'admissions',
  'fee-payment',
  'live-classes',
  'certificates',
  'gallery',
  'blog',
  'testimonials',
  'faq',
  'contact',
  'careers',
  'privacy',
  'terms',
  'donations',
  'help-support',
  'admin-portal',
  'growth-hub',
  'zaitoon-traders',
  'marriage-bureau',
  'ad-manager',
  'community',
  'google-ecosystem',
  // 14 Specialized Course & Audience Landing Pages
  'online-quran-classes',
  'noorani-qaida',
  'quran-reading',
  'online-tajweed-classes',
  'online-hifz-quran-classes',
  'quran-translation',
  'quran-tafseer',
  'quran-classes-for-kids',
  'quran-for-beginners',
  'quran-classes-for-adults',
  'quran-classes-for-ladies',
  'online-islamic-studies',
  'quranic-arabic',
  'salah-and-duas',
];

const VALID_PAGES_SET = new Set<string>(VALID_PUBLIC_PAGES);

/**
 * Validates whether a given slug corresponds to a valid existing page.
 */
export function isValidPage(slug: string): boolean {
  return VALID_PAGES_SET.has(slug);
}

/**
 * Determines the appropriate PageId from the browser's current pathname and hash.
 * Returns '404' if the URL does not correspond to any valid page.
 */
export function getPageFromLocation(pathname: string, hash?: string): PageId {
  const cleanPath = pathname.replace(/^\/+/, '').replace(/\/+$/, '');

  if (!cleanPath) {
    // Check if there is a legacy hash route (e.g. #noorani-qaida or #/noorani-qaida)
    if (hash) {
      const cleanHash = hash.replace(/^#+/, '').replace(/^\/+/, '').replace(/\/+$/, '');
      if (cleanHash && isValidPage(cleanHash)) {
        return cleanHash as PageId;
      }
    }
    return 'home';
  }

  if (isValidPage(cleanPath)) {
    return cleanPath as PageId;
  }

  // Not a valid route -> genuine 404
  return '404';
}

/**
 * Returns the canonical URL path for a given PageId.
 */
export function getPageUrl(page: PageId): string {
  if (page === 'home') {
    return '/';
  }
  if (page === '404') {
    return typeof window !== 'undefined' ? window.location.pathname : '/404';
  }
  return `/${page}`;
}
