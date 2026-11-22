import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { normaliseNumber, buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';
import { ADDRESS_LINE, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY } from '@/lib/brand';

export function ContactPage() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);
  const instagram = settings.instagramUrl || INSTAGRAM_URL;
  const handle = settings.instagramHandle.replace(/^@/, '') || INSTAGRAM_HANDLE;

  const link = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'a routine for my skin and hair',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  return (
    <>
      <Seo
        title="Contact & Orders — AURALIS"
        description="Order AURALIS in Instagram DMs or on WhatsApp. Packed by hand in Mumbai, shipped across India with a free gift, and answered by a person."
        canonicalPath="/contact"
      />

      <section className="relative overflow-hidden border-b border-gold-400/15 bg-obsidian">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blush-400/10 blur-[100px]" />
        <div className="shell relative py-16 sm:py-20">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-7 bg-gold-500/70" />
            Contact
          </p>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.02] text-bone sm:text-6xl">
            Tell us the concern.
            <br />
            <span className="gold-text italic">We will send the routine.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
            The house takes orders in Instagram DMs — that is where every question is answered, every
            price is quoted, and every routine is put together. No call centre, no chatbot.
          </p>
        </div>
      </section>

      <section className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-gold-400/20 bg-gold-400/15 sm:grid-cols-2">
            <div className="bg-onyx p-6 transition-colors duration-500 hover:bg-graphite">
              <p className="text-[9px] uppercase tracking-micro text-gold-300">Orders & questions</p>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-display text-2xl text-bone hover:text-gold-200"
              >
                @{handle}
              </a>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                Send a photo of your skin or scalp if it helps. We reply with the three products that
                matter, in the order to use them.
              </p>
            </div>

            <div className="bg-onyx p-6 transition-colors duration-500 hover:bg-graphite">
              <p className="text-[9px] uppercase tracking-micro text-gold-300">
                {whatsapp ? 'Call & WhatsApp' : 'Where we ship'}
              </p>
              {whatsapp ? (
                <>
                  <a
                    href={`tel:+${whatsapp}`}
                    className="mt-3 block font-display text-2xl text-bone hover:text-gold-200"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wide2 text-gold-200"
                  >
                    Message on WhatsApp
                  </a>
                </>
              ) : (
                <>
                  <p className="mt-3 font-display text-xl text-bone">Across India</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted">
                    Packed by hand in Mumbai, despatched in 2–4 working days. Shipping and a gift are
                    included on every order.
                  </p>
                </>
              )}
            </div>

            <div className="bg-onyx p-6 transition-colors duration-500 hover:bg-graphite">
              <p className="text-[9px] uppercase tracking-micro text-gold-300">The studio</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/85">
                AURALIS
                <br />
                Mumbai, Maharashtra
                <br />
                India
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                Visits are by appointment at exhibitions only — message us for the next counter near you.
              </p>
            </div>

            <div className="bg-onyx p-6 transition-colors duration-500 hover:bg-graphite">
              <p className="text-[9px] uppercase tracking-micro text-gold-300">Hours</p>
              <p className="mt-3 text-sm leading-relaxed text-bone/85">Messages, every day</p>
              <p className="font-display text-xl text-bone">10:00 am – 9:00 pm</p>
              <p className="mt-2 text-[11px] leading-relaxed text-muted">
                Orders placed after hours are packed the next working day.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-gold-400/20 bg-onyx p-6 shadow-soft">
            <p className="eyebrow">Before you order</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>Tell us your skin type or scalp concern — the routine changes with it.</li>
              <li>Patch test a new active on the inner arm for two nights before the face.</li>
              <li>Prices are quoted in the DM and confirmed before the parcel is sent.</li>
              <li>Sealed, unopened products can be returned within 7 days of delivery.</li>
            </ul>
          </div>
        </div>

        <div>
          {settings.policies.shipping || settings.policies.returns ? (
            <div className="space-y-8">
              {settings.policies.shipping ? (
                <div>
                  <p className="eyebrow">Shipping &amp; payment</p>
                  <div className="prose-editorial mt-4 whitespace-pre-line text-sm text-muted">
                    {settings.policies.shipping}
                  </div>
                </div>
              ) : null}
              {settings.policies.returns ? (
                <div>
                  <p className="eyebrow">Returns</p>
                  <div className="prose-editorial mt-4 whitespace-pre-line text-sm text-muted">
                    {settings.policies.returns}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="relative mt-8 overflow-hidden rounded-lg border border-gold-400/30 bg-ink p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-gold-300/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-gold-300/10" />
            <p className="text-[10px] uppercase tracking-micro text-gold-200">Order in one message</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-tight text-bone">
              A routine, quoted before you pay
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-bone/60">
              Send a DM with what you want to fix and what you have already tried. You will get the
              products, the price, the shipping time and the gift — all in one reply.
            </p>
            {link ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid mt-7 w-full"
              >
                {link.channel === 'whatsapp' ? 'Message on WhatsApp' : 'Message us on Instagram'}
              </a>
            ) : null}
            <p className="mt-4 text-[10px] uppercase tracking-wide2 text-bone/40">{ADDRESS_LINE}</p>
          </div>
        </div>
      </section>
    </>
  );
}
