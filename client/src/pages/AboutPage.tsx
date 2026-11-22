import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { Wordmark } from '@/components/Wordmark';
import { ADDRESS_LINE, assetUrl, FOUNDER_IMAGE } from '@/lib/brand';

const VALUES = [
  {
    title: 'Reviewed before it is sold',
    text: 'Formulas are checked before they reach the shelf, and the claims on the label are the only claims we repeat to you in a DM.',
  },
  {
    title: 'No steroids, no harsh synthetics',
    text: 'Pure botanicals at percentages that do something — built for a routine you can keep up, not a fortnight of results.',
  },
  {
    title: 'A short line, on purpose',
    text: 'Two routines and the combos that pair them. If a product has no job in the routine, it does not get made.',
  },
  {
    title: 'Sold by a person',
    text: 'Every order is packed by hand in Mumbai, with a free gift, and answered by someone who has used the bottle.',
  },
];

export function AboutPage() {
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="Our Story — AURALIS, Mumbai"
        description="AURALIS is a skin and hair care house from Mumbai: doctor-approved, steroid-free formulations, two core routines and a short line sold in DMs and at exhibitions across India."
        canonicalPath="/about"
        image={settings.about.founderImageUrl || FOUNDER_IMAGE}
      />

      <section className="relative overflow-hidden border-b border-gold-400/15 bg-obsidian">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[26rem] w-[26rem] rounded-full bg-gold-400/10 blur-[110px]" />
        <div className="shell relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-gold-500/70" />
              Our story
            </p>
            <h1 className="mt-5 font-display text-4xl font-light leading-[1.02] text-bone sm:text-6xl">
              Old wisdom,
              <br />
              <span className="gold-text italic">current formulation.</span>
            </h1>
            <p className="mt-7 max-w-lg text-sm leading-[1.9] text-muted">
              {settings.about.intro ||
                'AURALIS is a skin and hair care house from Mumbai, built where old wisdom meets current formulation: doctor-approved, steroid-free routines that are gentle enough to keep up and effective enough to photograph.'}
            </p>
            <p className="mt-4 max-w-lg text-sm leading-[1.9] text-muted">
              We began with two routines — one for skin, one for hair — and a stubborn idea: that skin
              and hair care should be sold the way it is prescribed. Someone should ask what you have
              tried, look at what is actually happening, and tell you what to leave alone.
            </p>
            <Link to="/services" className="btn-solid mt-9">
              Shop the collection
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-bone/15 bg-onyx p-2 shadow-panel">
              <img
                src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
                alt="AURALIS formulation still life"
                className="h-full w-full rounded-[20px] object-cover"
              />
              <div className="pointer-events-none absolute inset-2 rounded-[20px] bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-16 w-16 animate-float rounded-full orb-gold sm:h-20 sm:w-20"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-md border border-gold-400/25 bg-night/90 px-5 py-4 shadow-soft backdrop-blur-md sm:block">
              <Wordmark size="sm" asLink={false} withTagline={false} />
            </div>
          </div>
        </div>
      </section>

      {settings.about.story ? (
        <section className="shell py-16 sm:py-20">
          <div className="prose-editorial mx-auto max-w-2xl whitespace-pre-line text-sm text-muted">
            {settings.about.story}
          </div>
        </section>
      ) : null}

      <section className="border-y border-gold-400/15 bg-obsidian py-16 sm:py-24">
        <div className="shell">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-bone sm:text-[2.8rem]">
            Four things we will not compromise on
          </h2>
          <div className="rise mt-12 grid gap-px overflow-hidden rounded-lg border border-gold-400/20 bg-gold-400/15 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <div key={value.title} className="bg-onyx p-7 sm:p-9">
                <p className="gold-text font-display text-2xl">0{index + 1}</p>
                <h3 className="mt-4 font-display text-2xl text-bone">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 text-center sm:py-24">
        <p className="eyebrow justify-center">A routine, not a catalogue</p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-light leading-tight text-bone sm:text-5xl">
          Tell us your skin.
          <br />
          <span className="gold-text italic">We will take it from there.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
          One DM with your concern is enough to start. We answer with a routine, not a cart.
        </p>
        <p className="mx-auto mt-3 text-[10px] uppercase tracking-wide2 text-faint">{ADDRESS_LINE}</p>
        <Link to="/contact" className="btn-solid mt-8">
          Message the house
        </Link>
      </section>
    </>
  );
}
