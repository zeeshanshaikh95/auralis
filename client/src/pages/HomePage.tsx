import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { HeroSlider } from '@/components/HeroSlider';
import { ServiceCard } from '@/components/ServiceCard';
import { SectionIntro } from '@/components/SectionIntro';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { Stars } from '@/components/Stars';
import { ADDRESS_LINE, assetUrl, FOUNDER_IMAGE } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';

/** The two combos the house is known for, named in its own posts. */
const COMBOS = [
  {
    name: 'The Viral Skin Combo',
    note: 'Cleanse · treat · protect',
    text: 'The trio behind the before-and-afters: a brightening wash, an active serum and a barrier cream, built to be used together rather than collected.',
    href: '/category/skin',
    image: '/images/hero-review.jpg',
  },
  {
    name: 'The Viral Hair Combo',
    note: 'Scalp · strand · shine',
    text: 'A scalp-first routine for fall, thinning and dullness — wash, oil and mask, with nothing in it that strips the scalp to make hair look clean.',
    href: '/category/hair',
    image: '/images/hero-products.jpg',
  },
];

const PROMISES = [
  {
    title: 'Doctor-approved, not doctor-branded',
    text: 'Every formula is reviewed before it is sold, and the claims on the label are the claims we will repeat to you in a DM.',
  },
  {
    title: 'No steroids, no harsh synthetics',
    text: 'Pure botanicals at useful percentages — the routine is designed to be kept up, not to give a result for a fortnight.',
  },
  {
    title: 'Answered by a person',
    text: 'Tell us your skin type, your scalp, your budget. We reply with a routine, not a catalogue.',
  },
];

const RITUAL = [
  {
    step: '01',
    title: 'Clean',
    text: 'A wash matched to your skin or scalp — the step most routines get wrong and then try to correct with serums.',
  },
  {
    step: '02',
    title: 'Correct',
    text: 'One active, at a strength you can tolerate. Brightening for tone, oil control for breakouts, rosemary and onion for the scalp.',
  },
  {
    step: '03',
    title: 'Seal',
    text: 'A cream or a mask that keeps the barrier intact, so the results survive the week rather than the morning.',
  },
];

export function HomePage() {
  const { settings } = useSettings();
  const catalogue = useApi(() => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products), []);

  const all = catalogue.data ?? [];
  const featured = all.filter((item) => item.featured).slice(0, 4);
  const rest = all.filter((item) => !item.featured).slice(0, 4);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a routine for my skin and hair',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: settings.businessName,
    description:
      settings.about.intro ||
      'AURALIS is a skin and hair care house built on doctor-approved, steroid-free formulations, shipping across India.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    ...(settings.whatsappNumber
      ? { telephone: `+91${settings.whatsappNumber.replace(/\D/g, '').slice(-10)}` }
      : {}),
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="AURALIS — Skin & Hair Care, Made Visible"
        description="Doctor-approved, steroid-free skin and hair care from AURALIS. Shop the viral skin and hair combos, brightening serums and scalp-first hair care, with free shipping across India."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      <HeroSlider />

      {/* ── Brand ticker ─────────────────────────────────────────── */}
      <section className="marquee overflow-hidden border-y border-gold-400/20 bg-obsidian py-4">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap px-5">
          {[
            ...['Skin Care', 'Hair Care', 'The Combos', 'Doctor Approved', 'No Steroids', 'Free Gifts'],
            ...['Skin Care', 'Hair Care', 'The Combos', 'Doctor Approved', 'No Steroids', 'Free Gifts'],
          ].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-10">
              <span className="font-display text-lg text-bone/85">{item}</span>
              <span className="h-1 w-1 rotate-45 bg-gold-400/70" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Featured products ────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <SectionIntro
          eyebrow="The collection"
          title="Formulas worth the shelf space"
          description="A short line, on purpose. Each one earns its place in a routine we would recommend to a friend."
          linkTo="/services"
          linkLabel="Shop everything"
        />

        {catalogue.loading ? (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[3/4]" />
            ))}
          </div>
        ) : catalogue.error ? (
          <div className="mt-12">
            <EmptyState
              tone="error"
              title="The collection could not load"
              description={catalogue.error}
              action={
                <button type="button" className="btn-line" onClick={catalogue.refetch}>
                  Try again
                </button>
              }
            />
          </div>
        ) : !featured.length ? (
          <div className="mt-12">
            <EmptyState
              title="The collection is being photographed"
              description="Products appear here the moment they are published in Admin → Products. Until then, our Instagram has the newest line."
            />
          </div>
        ) : (
          <div className="rise mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((product, index) => (
              <ServiceCard key={product._id} product={product} priority={index < 2} />
            ))}
          </div>
        )}
      </section>

      {/* ── Combos ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-gold-400/15 bg-obsidian py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-gold-400/10 blur-[120px]" />
        <div className="shell relative">
          <SectionIntro
            eyebrow="Two routines, one house"
            title="The combos that started it"
            description="Built to be bought together, because the order you use them in matters as much as what is in them."
          />

          <div className="rise mt-12 grid gap-4 lg:grid-cols-2">
            {COMBOS.map((combo, index) => (
              <Link
                key={combo.name}
                to={combo.href}
                className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-lg border border-gold-400/20 bg-onyx p-6 sm:p-8"
              >
                <img
                  src={assetUrl(combo.image)}
                  alt={combo.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-[1400ms] ease-silk group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
                <div className="relative">
                  <p className="text-[9px] uppercase tracking-micro text-gold-200/90">
                    {String(index + 1).padStart(2, '0')} — {combo.note}
                  </p>
                  <h3 className="mt-3 max-w-sm font-display text-3xl leading-tight text-bone sm:text-4xl">
                    {combo.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/70">{combo.text}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wide2 text-gold-200">
                    Shop the ritual
                    <span className="h-px w-6 bg-gold-300/70 transition-all duration-500 group-hover:w-12" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections ─────────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <SectionIntro
          eyebrow="Shop by concern"
          title="Find your shelf"
          description="Skin, hair and the combos that pair them — three doors, no maze."
          linkTo="/services"
          linkLabel="All formulas"
        />

        {categories.loading ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="skeleton aspect-[4/3]" />
            ))}
          </div>
        ) : !categories.data?.length ? (
          <div className="mt-12">
            <EmptyState
              title="Collections are on the way"
              description="They appear here once published in Admin → Collections."
            />
          </div>
        ) : (
          <div className="rise mt-12 grid gap-4 sm:grid-cols-3">
            {categories.data.slice(0, 3).map((category, index) => (
              <Link
                key={category._id}
                to={`/category/${category.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg border border-gold-400/20 bg-onyx"
              >
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 transition-all duration-[1200ms] ease-silk group-hover:scale-110 group-hover:opacity-90"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] uppercase tracking-micro text-gold-200/80">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl leading-tight text-bone">{category.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[9px] uppercase tracking-wide2 text-bone/70">
                    Explore
                    <span className="h-px w-5 bg-gold-300/70 transition-all duration-300 group-hover:w-9" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── The ritual ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-gold-400/15 bg-obsidian py-16 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blush-400/10 blur-[110px]" />
        <div className="shell relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How to use it</p>
            <h2 className="mt-4 font-display text-3xl leading-[1.06] text-bone sm:text-[2.8rem]">
              Three steps.
              <br />
              <span className="gold-text italic">Nothing spare.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A routine you will actually finish beats a shelf of half-used bottles. Start here, then add
              only what your skin asks for.
            </p>
            <div
              aria-hidden="true"
              className="mt-10 hidden h-24 w-24 animate-float-slow sm:block"
            >
              <div className="orb h-full w-full" />
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-gold-400/15 border-y border-gold-400/15">
              {RITUAL.map((item) => (
                <div key={item.step} className="group grid gap-3 py-7 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <p className="gold-text font-display text-2xl">{item.step}</p>
                  <div>
                    <h3 className="font-display text-2xl text-bone">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Promise ─────────────────────────────────────────────── */}
      <section className="shell py-16 sm:py-24">
        <div className="rise grid gap-px overflow-hidden rounded-lg border border-gold-400/20 bg-gold-400/15 sm:grid-cols-3">
          {PROMISES.map((promise, index) => (
            <div key={promise.title} className="bg-onyx p-6 sm:p-8">
              <p className="gold-text font-display text-2xl">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight text-bone">{promise.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{promise.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rest of the line ───────────────────────────────────── */}
      {rest.length ? (
        <section className="shell pb-16 sm:pb-24">
          <SectionIntro eyebrow="Also on the shelf" title="More from the house" linkTo="/services" linkLabel="See everything" />
          <div className="rise mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {rest.map((product) => (
              <ServiceCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── From Instagram ──────────────────────────────────────── */}
      {gallery.data?.length ? (
        <section className="shell pb-16 sm:pb-24">
          <SectionIntro
            eyebrow={`@${settings.instagramHandle.replace(/^@/, '')}`}
            title="From the studio floor"
            linkTo="/gallery"
            linkLabel="Open the journal"
          />
          <div className="rise mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.data.slice(0, 8).map((item) => (
              <a
                key={item._id}
                href={item.externalUrl || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] overflow-hidden rounded-md border border-gold-400/15 bg-graphite"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || 'AURALIS on Instagram'}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-85 transition-all duration-700 ease-silk group-hover:scale-110 group-hover:opacity-100"
                  />
                ) : null}
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/30" />
                <span className="absolute inset-2 border border-bone/0 transition-colors duration-300 group-hover:border-gold-200/60" />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Reviews ────────────────────────────────────────────── */}
      {reviews.data?.length ? (
        <section className="shell pb-16 sm:pb-24">
          <SectionIntro eyebrow="In their words" title="After the parcel" linkTo="/reviews" linkLabel="All reviews" />
          <div className="rise mt-12 grid gap-4 md:grid-cols-3">
            {reviews.data.slice(0, 3).map((review) => (
              <figure key={review._id} className="panel flex flex-col p-6">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-bone/90">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-5 text-[9px] uppercase tracking-wide2 text-faint">
                  {review.customerName}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-gold-400/20 bg-ink py-20 sm:py-28">
        <img
          src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,rgba(192,141,83,0.22)_0%,rgba(4,8,7,0.9)_70%)]" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full border border-gold-300/20"
        />

        <div className="shell relative flex flex-col items-center text-center">
          <div className="mb-9 flex h-16 w-16 animate-float items-center justify-center rounded-full medallion" aria-hidden="true">
            <span className="font-display text-2xl text-ink/80">A</span>
          </div>
          <p className="text-[10px] uppercase tracking-micro text-gold-200">Not sure where to start?</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.02] text-bone sm:text-6xl">
            Tell us your skin.
            <br />
            <span className="gold-text italic">We will send the routine.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/60">
            A DM with your concern, your skin type and your budget is enough. We answer with three
            products, the order to use them, and nothing you do not need.
          </p>
          {orderLink ? (
            <a
              href={orderLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid mt-9"
            >
              {orderLink.channel === 'whatsapp' ? 'Order on WhatsApp' : 'Message us on Instagram'}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : null}
          <p className="mt-5 text-[10px] uppercase tracking-wide2 text-bone/40">{ADDRESS_LINE}</p>
        </div>
      </section>
    </>
  );
}
