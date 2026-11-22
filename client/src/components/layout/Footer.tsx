import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { normaliseNumber } from '@/lib/whatsapp';
import { ADDRESS_LINE, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/brand';

export function Footer() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);
  const instagram = settings.instagramUrl || INSTAGRAM_URL;

  return (
    <footer className="mt-24 border-t border-gold-400/15 bg-obsidian">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-16">
        <div>
          <Wordmark size="md" asLink={false} className="items-start" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
            {settings.about.intro ||
              'A skin and hair care house from Mumbai — doctor-approved, steroid-free routines, packed by hand with a free gift in every parcel.'}
          </p>
          <p className="mt-5 text-[9px] uppercase tracking-micro text-faint">
            Doctor approved · No steroids · Free shipping
          </p>
        </div>

        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-gold-500/60" />
            Shop
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/services" className="hover:text-gold-200">All products</Link></li>
            <li><Link to="/category/skin" className="hover:text-gold-200">Skin</Link></li>
            <li><Link to="/category/hair" className="hover:text-gold-200">Hair</Link></li>
            <li><Link to="/category/combos" className="hover:text-gold-200">The combos</Link></li>
            <li><Link to="/reviews" className="hover:text-gold-200">Reviews</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-gold-500/60" />
            The house
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link to="/about" className="hover:text-gold-200">Our story</Link></li>
            <li><Link to="/gallery" className="hover:text-gold-200">Journal</Link></li>
            <li><Link to="/contact" className="hover:text-gold-200">Shipping &amp; returns</Link></li>
            <li><Link to="/contact" className="hover:text-gold-200">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-gold-500/60" />
            Reach us
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-200">
                Instagram · @{settings.instagramHandle.replace(/^@/, '') || INSTAGRAM_HANDLE}
              </a>
            </li>
            {whatsapp ? (
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-200"
                >
                  WhatsApp us
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <a href={`mailto:${settings.email}`} className="hover:text-gold-200">
                  {settings.email}
                </a>
              </li>
            ) : null}
            <li className="leading-relaxed">{ADDRESS_LINE}</li>
            <li className="text-[10px] uppercase tracking-wide2 text-faint">
              Orders answered daily · free gift in every parcel
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold-400/15">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 text-[10px] uppercase tracking-wide2 text-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-gold-200">Policies</Link>
            <Link to="/admin" className="hover:text-gold-200">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
