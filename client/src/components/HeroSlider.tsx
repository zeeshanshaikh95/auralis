import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { assetUrl } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';
import type { HeroSlide } from '@/types';

const FALLBACK_SLIDES: HeroSlide[] = [
  {
    imageUrl: '/images/hero-products.jpg',
    eyebrow: 'Skin & Hair · Made Visible',
    headline: 'Your aura,\namplified.',
    subheadline:
      'Doctor-approved, steroid-free skin and hair care — the viral combos people photograph, formulated to be used every day.',
    ctaLabel: 'Shop the collection',
    ctaHref: '/services',
    active: true,
  },
  {
    imageUrl: '/images/hero-packing.jpg',
    eyebrow: 'Packed in Mumbai',
    headline: 'Every order,\na gift.',
    subheadline:
      'Free shipping and a free gift on every parcel, despatched from our own studio — not a warehouse that has never met the formula.',
    ctaLabel: 'See the combos',
    ctaHref: '/category/combos',
    active: true,
  },
  {
    imageUrl: '/images/hero-review.jpg',
    eyebrow: '1,00,000+ sold',
    headline: 'Results people\ntext us about.',
    subheadline:
      'Real customers, filmed in daylight, before and after. Browse the walls of reviews from exhibitions across India.',
    ctaLabel: 'Read their words',
    ctaHref: '/reviews',
    active: true,
  },
  {
    imageUrl: '/images/atelier.jpg',
    eyebrow: 'The formulation',
    headline: 'Botanical first.\nNever harsh.',
    subheadline:
      'Pure, potent botanicals that strengthen the skin barrier and the scalp — no steroids, no shortcuts, no borrowed claims.',
    ctaLabel: 'Our story',
    ctaHref: '/about',
    active: true,
  },
];

const AUTOPLAY_MS = 7200;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hero: a photo slider suspended in a CSS 3D diorama.
 *
 * Instead of the light arch-portrait of the house's clinic builds, this stage
 * is a dark lit plinth: the active photograph floats as a frosted card behind
 * a rotating brass aura ring, with glass product chips, a gold globe and
 * refraction shards on separate translateZ planes. The pointer (or a swipe)
 * shifts each plane by a different depth, so the image moves least and the
 * foreground orbits most. The slider controls sit under the copy as a numbered
 * filmstrip, and every transform is disabled under prefers-reduced-motion.
 */
export function HeroSlider() {
  const { settings } = useSettings();

  const slides = useMemo(() => {
    const configured = (settings.heroSlides ?? []).filter(
      (slide) => slide.active && (slide.imageUrl || slide.headline)
    );
    return configured.length ? configured : FALLBACK_SLIDES;
  }, [settings.heroSlides]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const touchStart = useRef<number | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  const total = slides.length;
  const slide = slides[Math.min(index, total - 1)] ?? FALLBACK_SLIDES[0];

  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);

  useEffect(() => {
    reduced.current = prefersReducedMotion();
  }, []);

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  useEffect(() => {
    setProgress(0);
    if (total < 2 || paused || reduced.current) return;
    const started = Date.now();
    const tick = window.setInterval(() => {
      setProgress(Math.min(1, (Date.now() - started) / AUTOPLAY_MS));
    }, 80);
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(timer);
    };
  }, [index, total, paused]);

  useEffect(() => {
    if (reduced.current) return;
    const onMove = (event: PointerEvent) => {
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: Math.max(-0.5, Math.min(0.5, px)), y: Math.max(-0.5, Math.min(0.5, py)) });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    const el = sceneRef.current;
    el?.addEventListener('pointermove', onMove);
    el?.addEventListener('pointerleave', onLeave);
    return () => {
      el?.removeEventListener('pointermove', onMove);
      el?.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const shift = (depth: number) =>
    `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0) rotateY(${tilt.x * 6}deg) rotateX(${-tilt.y * 6}deg)`;

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a routine for my skin and hair',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label="AURALIS highlights"
      className="relative isolate overflow-hidden bg-night"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        if (event.key === 'ArrowLeft') go(index - 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {/* aurora wash + grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 aurora opacity-90" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(226,194,147,0.35) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(65% 60% at 55% 35%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(65% 60% at 55% 35%, #000 0%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      />

      <div className="shell relative grid items-center gap-14 pb-10 pt-14 sm:pt-16 lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-20">
        {/* ── Copy ──────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 lg:col-span-6 lg:pr-8">
          <div key={index} className="max-w-xl">
            <span
              className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-gold-400/30 bg-bone/[0.04] px-3.5 py-1.5 backdrop-blur-sm"
              style={{ animationDelay: '30ms' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              <span className="text-[9px] uppercase tracking-micro text-gold-200">
                {slide.eyebrow || 'Mumbai · ships across India'}
              </span>
            </span>

            <h1
              className="animate-fade-up mt-6 whitespace-pre-line font-display text-[2.9rem] font-light leading-[0.98] text-bone sm:text-[4rem] lg:text-[4.8rem]"
              style={{ animationDelay: '110ms' }}
            >
              {slide.headline || 'Your aura,\namplified.'}
            </h1>

            {slide.subheadline ? (
              <p
                className="animate-fade-up mt-6 max-w-md text-[15px] leading-relaxed text-muted"
                style={{ animationDelay: '200ms' }}
              >
                {slide.subheadline}
              </p>
            ) : null}

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '300ms' }}
            >
              <Link to={slide.ctaHref || '/services'} className="btn-solid group">
                {slide.ctaLabel || 'Shop the collection'}
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {orderLink ? (
                <a
                  href={orderLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-line"
                >
                  {orderLink.channel === 'whatsapp' ? 'Order on WhatsApp' : 'Order on Instagram'}
                </a>
              ) : null}
            </div>

            <dl
              className="animate-fade-up mt-10 grid max-w-md grid-cols-3 divide-x divide-gold-400/15 border-y border-gold-400/15"
              style={{ animationDelay: '400ms' }}
            >
              {[
                ['1L+', 'products sold'],
                ['Doctor', 'approved'],
                ['0%', 'steroids'],
              ].map(([value, label]) => (
                <div key={label} className="px-3 py-4 first:pl-0">
                  <dt className="font-display text-xl text-gold-200 sm:text-2xl">{value}</dt>
                  <dd className="mt-1 text-[8px] uppercase tracking-wide2 text-faint">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── 3D stage ──────────────────────────────────────────── */}
        <div ref={sceneRef} className="scene relative order-1 mx-auto w-full max-w-[430px] lg:order-2 lg:col-span-6 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] lg:max-w-[460px]">
            {/* floor light */}
            <div
              aria-hidden="true"
              className="absolute -bottom-10 left-1/2 h-24 w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(226,194,147,0.22),transparent)] blur-xl"
            />

            {/* rotating aura rings */}
            <div
              aria-hidden="true"
              className="absolute inset-2 animate-spin-slow"
              style={{ transform: 'translateZ(-90px)' }}
            >
              <div className="halo h-full w-full opacity-60" />
            </div>
            <div
              aria-hidden="true"
              className="layer-3d absolute inset-4 rounded-full border border-gold-300/25 transition-transform duration-500 ease-out"
              style={{ transform: `${shift(10)} translateZ(-40px)` }}
            />
            <div
              aria-hidden="true"
              className="layer-3d absolute inset-10 rounded-full border border-gold-300/15 transition-transform duration-500 ease-out"
              style={{ transform: `${shift(16)} translateZ(-20px)` }}
            />

            {/* photographic card */}
            <div
              className="layer-3d absolute inset-x-6 bottom-8 top-4 transition-transform duration-300 ease-out"
              style={{ transform: `${shift(12)} translateZ(40px)` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-bone/15 bg-onyx p-1.5 shadow-panel">
                <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-graphite">
                  {slides.map((item, itemIndex) => {
                    const isActive = itemIndex === index % total;
                    const src = item.imageUrl
                      ? item.imageUrl.startsWith('http')
                        ? item.imageUrl
                        : assetUrl(item.imageUrl)
                      : '';
                    return (
                      <div
                        key={`${item.imageUrl}-${itemIndex}`}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-editorial ${
                          isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                        }`}
                      >
                        {src ? (
                          <img
                            src={src}
                            alt={item.headline?.replace(/\n/g, ' ') || 'AURALIS'}
                            loading={itemIndex === 0 ? 'eager' : 'lazy'}
                            className={`h-full w-full object-cover object-[center_40%] ${
                              isActive ? 'animate-ken-burns' : ''
                            }`}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <div>
                      <p className="text-[8px] uppercase tracking-micro text-gold-200/80">
                        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                      </p>
                      <p className="mt-1.5 font-display text-lg leading-tight text-bone sm:text-xl">
                        {slide.eyebrow || 'AURALIS'}
                      </p>
                    </div>
                    <span className="rounded-full border border-gold-300/40 px-2.5 py-1 text-[8px] uppercase tracking-wide2 text-gold-100">
                      Aura {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* brass globe */}
            <div
              aria-hidden="true"
              className="layer-3d absolute -right-3 top-6 sm:-right-6"
              style={{ transform: `${shift(34)} translateZ(170px)` }}
            >
              <div className="relative h-16 w-16 animate-float sm:h-20 sm:w-20">
                <div className="orb-gold h-full w-full" />
                <div className="absolute -inset-3 animate-pulse-ring rounded-full border border-gold-300/40" />
              </div>
            </div>

            {/* glass chips */}
            <div
              className="layer-3d absolute -left-3 top-[24%] sm:-left-8"
              style={{ transform: `${shift(36)} translateZ(150px)` }}
            >
              <div className="animate-float-slow rounded-full border border-bone/15 bg-bone/[0.06] px-3.5 py-2 shadow-soft backdrop-blur-md">
                <span className="text-[9px] uppercase tracking-wide2 text-bone/80">Skin</span>
              </div>
            </div>

            <div
              className="layer-3d absolute -right-2 bottom-[24%] sm:-right-6"
              style={{ transform: `${shift(30)} translateZ(140px)` }}
            >
              <div className="animate-float flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.06] px-3.5 py-2 shadow-soft backdrop-blur-md">
                <span className="h-1 w-1 rounded-full bg-blush-300" />
                <span className="text-[9px] uppercase tracking-wide2 text-bone/80">Hair</span>
              </div>
            </div>

            <div
              className="layer-3d absolute bottom-[6%] left-[4%]"
              style={{ transform: `${shift(46)} translateZ(200px)` }}
            >
              <div className="h-9 w-9 animate-float-slow rounded-full orb sm:h-12 sm:w-12" />
            </div>

            <div
              aria-hidden="true"
              className="layer-3d absolute -left-7 bottom-[34%] h-20 w-1.5 rounded-full shard"
              style={{ transform: `${shift(22)} translateZ(90px) rotate(-12deg)` }}
            />
            <div
              aria-hidden="true"
              className="layer-3d absolute -right-5 top-[46%] h-14 w-1 rounded-full shard opacity-70"
              style={{ transform: `${shift(18)} translateZ(70px) rotate(10deg)` }}
            />
          </div>
        </div>
      </div>

      {/* ── Slider filmstrip ────────────────────────────────────── */}
      <div className="shell relative border-t border-gold-400/15">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1 sm:gap-3">
            {slides.map((item, itemIndex) => {
              const src = item.imageUrl
                ? item.imageUrl.startsWith('http')
                  ? item.imageUrl
                  : assetUrl(item.imageUrl)
                : '';
              const active = itemIndex === index;
              return (
                <button
                  key={`thumb-${itemIndex}`}
                  type="button"
                  onClick={() => go(itemIndex)}
                  aria-label={`Go to slide ${itemIndex + 1}${item.eyebrow ? `: ${item.eyebrow}` : ''}`}
                  aria-current={active}
                  className={`group flex shrink-0 items-center gap-3 rounded-sm border px-2 py-1.5 text-left transition-colors ${
                    active
                      ? 'border-gold-300/60 bg-bone/[0.06]'
                      : 'border-transparent hover:border-gold-400/25'
                  }`}
                >
                  <span className="relative block h-11 w-9 overflow-hidden rounded-sm bg-graphite">
                    {src ? (
                      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : null}
                    <span
                      className={`absolute inset-0 transition-colors ${
                        active ? 'bg-transparent' : 'bg-ink/50 group-hover:bg-ink/20'
                      }`}
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-micro text-gold-300/80">
                      {String(itemIndex + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`block max-w-[9rem] truncate text-[10px] uppercase tracking-wide2 ${
                        active ? 'text-bone' : 'text-muted'
                      }`}
                    >
                      {(item.eyebrow || 'AURALIS').split('·')[0].trim()}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-bone/15 sm:w-32">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-gold-300 transition-[width] duration-100 ease-linear"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => go(index - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-bone transition-colors hover:border-gold-300 hover:bg-gold-300 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => go(index + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/30 text-bone transition-colors hover:border-gold-300 hover:bg-gold-300 hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
