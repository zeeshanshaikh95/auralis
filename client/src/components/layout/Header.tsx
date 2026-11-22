import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/brand';

const NAV_ITEMS = [
  { to: '/services', label: 'Shop all' },
  { to: '/category/skin', label: 'Skin' },
  { to: '/category/hair', label: 'Hair' },
  { to: '/category/combos', label: 'The Combos' },
  { to: '/gallery', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      setScrolled(top > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, top / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const instagram = settings.instagramUrl || INSTAGRAM_URL;
  const handle = settings.instagramHandle.replace(/^@/, '') || INSTAGRAM_HANDLE;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled || menuOpen
          ? 'border-b border-gold-400/20 bg-night/92 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-night/90 to-transparent'
      }`}
    >
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="border-b border-gold-400/15 bg-ink px-4 py-2 text-center text-[9px] uppercase tracking-wide2 text-gold-100/90">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="shell flex h-[76px] items-center justify-between gap-4 sm:h-20">
        <nav className="hidden flex-1 items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link text-[10px] font-semibold uppercase tracking-wide2 transition-colors ${
                  isActive ? 'text-gold-200' : 'text-bone/60 hover:text-bone'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 justify-start lg:justify-center">
          <Wordmark size="sm" withTagline={false} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-3">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Secondary">
            {NAV_ITEMS.slice(3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[10px] font-semibold uppercase tracking-wide2 transition-colors ${
                    isActive ? 'text-gold-200' : 'text-bone/60 hover:text-bone'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram — @${handle}`}
            className="hidden p-2 text-bone/55 transition-colors hover:text-gold-200 sm:block"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-sm border border-gold-400/35 px-4 py-2 text-[10px] font-semibold uppercase tracking-wide2 text-bone/85 transition-colors hover:border-gold-300 hover:bg-gold-300 hover:text-ink md:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 4L3 11l6 2.5L11.5 20l3-6.5L21 4z" strokeLinejoin="round" />
            </svg>
            Order in DMs
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-bone transition-opacity hover:opacity-60"
            aria-label={`Open my bag (${count} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-gold-300 px-1 text-[9px] font-semibold text-ink">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 text-bone lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Reading progress: a hairline that fills as the page is scrolled. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400 transition-opacity duration-500"
        style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
      />

      {menuOpen ? (
        <nav className="border-t border-gold-400/15 bg-night px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-bone/5 py-3.5 font-display text-xl ${
                  isActive ? 'text-gold-200' : 'text-bone/80'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold uppercase tracking-wide2 text-gold-200">
              DM @{handle}
            </a>
            <Link to="/about" className="text-[10px] font-semibold uppercase tracking-wide2 text-bone/60">
              The House
            </Link>
            <Link to="/reviews" className="text-[10px] font-semibold uppercase tracking-wide2 text-bone/60">
              Reviews
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
