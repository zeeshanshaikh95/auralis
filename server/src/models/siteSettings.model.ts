import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  videoUrl: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
}

export const HERO_SLIDES_DEFAULT: IHeroSlide[] = [
  {
    imageUrl: '/images/hero-ritual.jpg',
    videoUrl: '/video/hero-ritual.mp4',
    eyebrow: 'Skin & Hair · Made Visible',
    headline: 'Your aura,\namplified.',
    subheadline:
      'Doctor-approved, steroid-free skin and hair care — the viral combos people photograph, formulated to be used every day.',
    ctaLabel: 'Shop the collection',
    ctaHref: '/services',
    active: true,
  },
  {
    imageUrl: '/images/hero-gift.jpg',
    videoUrl: '/video/hero-gift.mp4',
    eyebrow: 'Packed in Mumbai',
    headline: 'Every order,\na gift.',
    subheadline:
      'Free shipping and a free gift on every parcel, despatched from our own studio — not a warehouse that has never met the formula.',
    ctaLabel: 'See the combos',
    ctaHref: '/category/combos',
    active: true,
  },
  {
    imageUrl: '/images/hero-serum.jpg',
    videoUrl: '/video/hero-serum.mp4',
    eyebrow: 'Serum · Concentrated',
    headline: 'One drop.\nA different morning.',
    subheadline:
      'One active at a time, at a strength you can keep up with — the serum at the centre of the skin routine.',
    ctaLabel: 'Shop skin',
    ctaHref: '/category/skin',
    active: true,
  },
  {
    imageUrl: '/images/atelier.jpg',
    videoUrl: '/video/hero-botanical.mp4',
    eyebrow: 'The formulation',
    headline: 'Botanical first.\nNever harsh.',
    subheadline:
      'Pure, potent botanicals that strengthen the skin barrier and the scalp — no steroids, no shortcuts, no borrowed claims.',
    ctaLabel: 'Our story',
    ctaHref: '/about',
    active: true,
  },
];

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Hi AURALIS! ✨\n' +
  'I would like to order:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please confirm the price, the shipping and the free gift.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Hi AURALIS! ✨\n' +
  'I would like to order:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please confirm the price and how to pay.';

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  heroSlides: IHeroSlide[];
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  policies: {
    shipping: string;
    returns: string;
  };
  updatedAt: Date;
}

const slideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaLabel: { type: String, default: 'Shop the collection' },
    ctaHref: { type: String, default: '/services' },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'AURALIS' },
    tagline: { type: String, default: 'Skin & hair care, made visible' },
    whatsappNumber: { type: String, default: '' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/_auralis.official_/' },
    instagramHandle: { type: String, default: '_auralis.official_' },
    email: { type: String, default: '' },
    city: { type: String, default: 'Mumbai, Maharashtra' },
    mapsUrl: {
      type: String,
      default: 'https://www.google.com/maps/search/?api=1&query=Mumbai+Maharashtra',
    },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    heroSlides: { type: [slideSchema], default: () => HERO_SLIDES_DEFAULT },
    about: {
      intro: { type: String, default: '' },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '/images/atelier.jpg' },
    },
    announcements: {
      enabled: { type: Boolean, default: true },
      text: {
        type: String,
        default:
          'Free shipping + a free gift on every order · Doctor-approved, steroid-free formulas · DM us for a routine',
      },
    },
    policies: {
      shipping: { type: String, default: '' },
      returns: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);
