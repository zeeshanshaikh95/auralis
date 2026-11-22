import { Link } from 'react-router-dom';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
  onDark?: boolean;
  asLink?: boolean;
  className?: string;
}

const MARK: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-9 w-9',
  md: 'h-12 w-12',
  lg: 'h-20 w-20',
};

const NAME: Record<NonNullable<Props['size']>, string> = {
  sm: 'text-[1.02rem] tracking-[0.30em]',
  md: 'text-[1.42rem] tracking-[0.28em]',
  lg: 'text-4xl tracking-[0.22em] sm:text-6xl',
};

/**
 * AURALIS lockup: an aura emblem (three arcs radiating over a serif A inside a
 * slender arch) above the wordmark. Drawn in code from the brand's own idea of
 * an aura rather than tracing the Instagram avatar, so it stays sharp at any
 * size and can be reversed out on the dark ground or the brass one.
 */
export function Wordmark({
  size = 'md',
  withTagline = true,
  asLink = true,
  className = '',
}: Props) {
  const content = (
    <span className={`flex items-center gap-3 leading-none ${className}`}>
      <svg
        viewBox="0 0 72 72"
        className={`${MARK[size]} shrink-0`}
        role="img"
        aria-label="AURALIS aura emblem"
      >
        <defs>
          <linearGradient id="aur-brass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2C293" />
            <stop offset="48%" stopColor="#C08D53" />
            <stop offset="100%" stopColor="#8A5D2E" />
          </linearGradient>
        </defs>
        <path
          d="M14 58V34a22 22 0 0 1 44 0v24"
          fill="none"
          stroke="url(#aur-brass)"
          strokeWidth="1.2"
        />
        <path
          d="M22 58V36a14 14 0 0 1 28 0v22"
          fill="none"
          stroke="url(#aur-brass)"
          strokeWidth="0.6"
          opacity="0.75"
        />
        <path
          d="M30 58V38a6 6 0 0 1 12 0v20"
          fill="none"
          stroke="url(#aur-brass)"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <path d="M36 40l-6.5 18M36 40l6.5 18M32 52h8" stroke="url(#aur-brass)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="36" cy="33" r="1.6" fill="#E2C293" />
      </svg>

      <span className="flex flex-col">
        <span className={`gold-text font-display ${NAME[size]}`}>AURALIS</span>
        {withTagline ? (
          <span className="mt-1.5 text-[7.5px] uppercase tracking-micro text-muted sm:text-[8px]">
            Skin &amp; Hair Care
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label="AURALIS — home" className="shrink-0">
      {content}
    </Link>
  );
}
