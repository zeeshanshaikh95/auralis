/**
 * The starter catalogue for AURALIS.
 *
 * Everything here is grounded in the brand's own public Instagram
 * (@_auralis.official_): the viral skin and hair combos it posts, the
 * brightening skin care, the doctor-approved / no-steroids positioning, the
 * free-gift + free-shipping offer and the exhibitions it sells at. Product
 * names beyond the two combos are descriptive working titles for the
 * routines the house actually sells; rename or remove them in Admin →
 * Products. No price is invented — the house quotes in DMs, so prices stay
 * empty and the site says "price on request".
 *
 * Kept separate from `seed.ts` so the same data can produce the static snapshot
 * the GitHub Pages build ships (see `snapshot.ts`) without a database.
 */
import {
  HERO_SLIDES_DEFAULT,
  WHATSAPP_TEMPLATE_DEFAULT,
  WHATSAPP_TEMPLATE_SINGLE_DEFAULT,
} from '../models/siteSettings.model.js';

const IG = 'https://www.instagram.com/_auralis.official_/';

export const categories = [
  {
    name: 'Skin',
    slug: 'skin',
    description:
      'Brightening, breakouts and barrier care — a short routine built around one active at a time, never a shelf of bottles.',
    image: '/images/serum-texture.jpg',
    displayOrder: 1,
  },
  {
    name: 'Hair',
    slug: 'hair',
    description:
      'Scalp first: fall, thinning and dullness handled with oils, a gentle wash and a mask that does not strip.',
    image: '/images/atelier.jpg',
    displayOrder: 2,
  },
  {
    name: 'The Combos',
    slug: 'combos',
    description:
      'The viral skin and hair combos, priced as a set and packed with a free gift — the way the house is known.',
    image: '/images/products-table.jpg',
    displayOrder: 3,
  },
];

export const formatOptions = (names: Array<string | { name: string; price: number | null }>) =>
  names.map((option) =>
    typeof option === 'string'
      ? { name: option, price: null as number | null, stockStatus: 'in_stock' as const }
      : { ...option, stockStatus: 'in_stock' as const }
  );

export const products = [
  {
    name: 'Viral Skin Combo',
    slug: 'viral-skin-combo',
    description:
      'The trio behind the before-and-afters the house is known for: a brightening wash, an active serum and a barrier cream, chosen so the steps work in order. Formulated without steroids or harsh synthetics, and reviewed before it is sold.\n\nTell us your skin type in a DM and we will confirm whether this is the right starting set for you.',
    price: null,
    compareAtPrice: null,
    fabric: '3-step set · wash, serum, cream',
    care: 'Wash morning and night, serum at night only, cream to seal. Introduce one new step at a time.',
    colour: 'Dullness, uneven tone and early pigmentation',
    categorySlug: 'combos',
    images: ['/images/products-table.jpg', '/images/review-mumbai.jpg'],
    variants: formatOptions(['Full 3-step set', 'Refill duo']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 1,
  },
  {
    name: 'Viral Hair Combo',
    slug: 'viral-hair-combo',
    description:
      'A scalp-first routine for fall, thinning and dullness: a gentle wash, a rosemary and onion oil and a deep mask. Nothing in it strips the scalp to make the hair look clean for a day.\n\nThis is the set the house takes to exhibitions, and the one most often reordered.',
    price: null,
    compareAtPrice: null,
    fabric: '3-step set · wash, oil, mask',
    care: 'Oil the scalp an hour before washing, twice a week. Mask once a week, mid-length to ends.',
    colour: 'Hair fall, a dry or flaky scalp, and dull mid-lengths',
    categorySlug: 'combos',
    images: ['/images/products-table.jpg', '/images/atelier.jpg'],
    variants: formatOptions(['Full 3-step set', 'Oil + wash duo']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 2,
  },
  {
    name: 'Glow + Grow Duo',
    slug: 'glow-and-grow-duo',
    description:
      'For the customer who wants both: the brightening serum for the face and the scalp oil for the hair, paired because they share the same logic — feed the barrier, do not attack it.',
    price: null,
    compareAtPrice: null,
    fabric: '2-piece set · serum + scalp oil',
    care: 'Serum at night; oil on the scalp twice a week before washing.',
    colour: 'Dull skin and a scalp that needs feeding',
    categorySlug: 'combos',
    images: ['/images/serum-texture.jpg'],
    variants: [],
    bestseller: false,
    featured: true,
    newArrival: true,
    displayOrder: 3,
  },
  {
    name: 'Vitamin C Brightening Face Wash',
    slug: 'vitamin-c-brightening-face-wash',
    description:
      'A low-foam daily wash for dull, uneven skin. Cleans without the tight feeling that sends most people reaching for a heavier cream an hour later.',
    price: null,
    compareAtPrice: null,
    fabric: '100 ml · daily use',
    care: 'Massage onto damp skin for thirty seconds, rinse with cool water, follow with serum.',
    colour: 'Dullness, tan and uneven tone',
    categorySlug: 'skin',
    images: ['/images/serum-texture.jpg'],
    variants: formatOptions(['100 ml', '200 ml']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 4,
  },
  {
    name: 'Kojic + Niacinamide Serum',
    slug: 'kojic-niacinamide-serum',
    description:
      'The active in the skin combo: a light serum aimed at dark spots, post-blemish marks and the kind of unevenness that shows up in every photograph.',
    price: null,
    compareAtPrice: null,
    fabric: '30 ml · night use',
    care: 'Three drops on clean skin at night. Sunscreen every morning without exception.',
    colour: 'Dark spots, blemish marks and patchy tone',
    categorySlug: 'skin',
    images: ['/images/serum-texture.jpg', '/images/products-table.jpg'],
    variants: [],
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 5,
  },
  {
    name: 'Barrier Repair Day Cream',
    slug: 'barrier-repair-day-cream',
    description:
      'A quiet, unscented cream that holds the routine together — comfortable under make-up, rich enough for air-conditioned days, light enough for Mumbai.',
    price: null,
    compareAtPrice: null,
    fabric: '50 g · morning and night',
    care: 'Press into damp skin after serum. Layer more on dry patches rather than switching products.',
    colour: 'Dehydrated, reactive or combination skin',
    categorySlug: 'skin',
    images: ['/images/atelier.jpg'],
    variants: [],
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 6,
  },
  {
    name: 'Acne Control Cleanser',
    slug: 'acne-control-cleanser',
    description:
      'For skin that breaks out along the jaw and the back — a cleanser that clears oil without leaving the barrier raw. Best used as the only active step until the skin settles.',
    price: null,
    compareAtPrice: null,
    fabric: '100 ml · daily use',
    care: 'Once a day to start. If the skin feels tight, alternate mornings.',
    colour: 'Oily, congested and breakout-prone skin',
    categorySlug: 'skin',
    images: ['/images/serum-texture.jpg'],
    variants: formatOptions(['100 ml', '200 ml']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 7,
  },
  {
    name: 'De-Tan & Polish Scrub',
    slug: 'de-tan-polish-scrub',
    description:
      'A fine-grain polish for the face and body after a week in the sun — gentle enough for twice a week, and the step that makes the brightening routine look like it is working.',
    price: null,
    compareAtPrice: null,
    fabric: '100 g · twice weekly',
    care: 'Use on damp skin, never on active breakouts, and follow with the day cream.',
    colour: 'Sun tan and rough texture',
    categorySlug: 'skin',
    images: ['/images/atelier.jpg'],
    variants: [],
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 8,
  },
  {
    name: 'Under-Eye Caffeine Gel',
    slug: 'under-eye-caffeine-gel',
    description:
      'A cooling gel for the mornings after a late dispatch night — de-puffs, and sits well under concealer without rolling.',
    price: null,
    compareAtPrice: null,
    fabric: '15 ml · morning',
    care: 'Tap a grain of rice under each eye, pat — do not rub.',
    colour: 'Puffiness and tired-looking eyes',
    categorySlug: 'skin',
    images: ['/images/serum-texture.jpg'],
    variants: [],
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 9,
  },
  {
    name: 'Rosemary & Onion Hair Oil',
    slug: 'rosemary-onion-hair-oil',
    description:
      'The oil in the hair combo: rosemary and onion, light enough to wash out in one go, made for the scalp rather than the ends. The step people skip and then wonder why the shampoo did nothing.',
    price: null,
    compareAtPrice: null,
    fabric: '100 ml · twice weekly',
    care: 'Section the hair, oil the scalp, leave an hour, wash with the anti-hairfall shampoo.',
    colour: 'Hair fall, thinning partings and a dry scalp',
    categorySlug: 'hair',
    images: ['/images/products-table.jpg', '/images/atelier.jpg'],
    variants: formatOptions(['100 ml', '200 ml']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 10,
  },
  {
    name: 'Anti-Hairfall Shampoo',
    slug: 'anti-hairfall-shampoo',
    description:
      'A sulphate-free wash that cleans an oiled scalp properly without the squeak. The pair to the rosemary oil, and the reason the routine is worth following in order.',
    price: null,
    compareAtPrice: null,
    fabric: '200 ml · two washes a week',
    care: 'Double cleanse when the scalp is oiled. Rinse cool, and do not pile the hair on top of the head.',
    colour: 'Hair fall and an oily scalp',
    categorySlug: 'hair',
    images: ['/images/atelier.jpg'],
    variants: formatOptions(['200 ml', '300 ml']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 11,
  },
  {
    name: 'Silk Repair Conditioner',
    slug: 'silk-repair-conditioner',
    description:
      'For mid-lengths and ends that have been coloured, straightened or simply lived in — slip without weight, so hair air-dries instead of being fought with.',
    price: null,
    compareAtPrice: null,
    fabric: '200 ml · every wash',
    care: 'Mid-length to ends only. Rinse with cooler water than you washed with.',
    colour: 'Dry, coloured or heat-styled hair',
    categorySlug: 'hair',
    images: ['/images/atelier.jpg'],
    variants: [],
    bestseller: false,
    featured: false,
    newArrival: false,
    displayOrder: 12,
  },
  {
    name: 'Scalp Detox Serum',
    slug: 'scalp-detox-serum',
    description:
      'A light leave-in for a scalp that flakes or itches under the oil — applied at the partings, night before wash day.',
    price: null,
    compareAtPrice: null,
    fabric: '50 ml · night before washing',
    care: 'Apply to partings, massage for a minute, wash the next morning.',
    colour: 'Flaking, itching and a congested scalp',
    categorySlug: 'hair',
    images: ['/images/serum-texture.jpg'],
    variants: [],
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 13,
  },
  {
    name: 'Deep Repair Hair Mask',
    slug: 'deep-repair-hair-mask',
    description:
      'The mask in the hair combo: ten minutes, once a week, and the difference is in how the hair dries rather than how it feels in the shower.',
    price: null,
    compareAtPrice: null,
    fabric: '200 g · weekly',
    care: 'After conditioner, mid-length to ends, ten minutes, rinse cool.',
    colour: 'Frizz, breakage and dull ends',
    categorySlug: 'hair',
    images: ['/images/atelier.jpg', '/images/products-table.jpg'],
    variants: [],
    bestseller: false,
    featured: true,
    newArrival: false,
    displayOrder: 14,
  },
];

export const gallery = [
  {
    image: '/images/products-table.jpg',
    caption: 'The skin and hair combos, packed and ready for the Surat exhibition',
    externalUrl: IG,
    displayOrder: 1,
  },
  {
    image: '/images/parcels.jpg',
    caption: 'Every order leaves with a free gift and free shipping',
    externalUrl: IG,
    displayOrder: 2,
  },
  {
    image: '/images/review-mumbai.jpg',
    caption: 'Mumbai customers, before and after',
    externalUrl: IG,
    displayOrder: 3,
  },
  {
    image: '/images/exhibition-pune.jpg',
    caption: 'Pune exhibition — 31 October and 1 November',
    externalUrl: IG,
    displayOrder: 4,
  },
  {
    image: '/images/exhibition-mumbai.jpg',
    caption: 'Exhibition day in Mumbai',
    externalUrl: IG,
    displayOrder: 5,
  },
  {
    image: '/images/serum-texture.jpg',
    caption: 'The serum, close up',
    externalUrl: IG,
    displayOrder: 6,
  },
  {
    image: '/images/atelier.jpg',
    caption: 'Formulated with botanicals, never with steroids',
    externalUrl: IG,
    displayOrder: 7,
  },
  {
    image: '/images/offer-diwali.jpg',
    caption: 'Diwali dispatch — free gifts on every order',
    externalUrl: IG,
    displayOrder: 8,
  },
];

/** Mirrors the defaults in `siteSettings.model.ts`, for the static snapshot. */
export const publicSettings = {
  businessName: 'AURALIS',
  tagline: 'Skin & hair care, made visible',
  whatsappNumber: '',
  instagramUrl: IG,
  instagramHandle: '_auralis.official_',
  email: '',
  city: 'Mumbai, Maharashtra',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mumbai+Maharashtra',
  whatsappTemplate: WHATSAPP_TEMPLATE_DEFAULT,
  whatsappSingleProductTemplate: WHATSAPP_TEMPLATE_SINGLE_DEFAULT,
  heroSlides: HERO_SLIDES_DEFAULT,
  about: {
    intro:
      'AURALIS is a skin and hair care house from Mumbai, built where old wisdom meets current formulation: doctor-approved, steroid-free routines that are gentle enough to keep up and effective enough to photograph.',
    story:
      'AURALIS began with two routines and a stubborn idea: that skin and hair care should be sold the way it is prescribed — after someone has actually looked at your skin, asked what you have tried, and told you what to leave alone.\n\nWe are a skin and hair care house, not a pharmacy and not a salon. The line stays short: a brightening routine, a scalp-first hair routine, and the combos that pair them. Everything is formulated without steroids or harsh synthetics, reviewed before it is sold, and packed by hand in Mumbai with a free gift in every parcel.\n\nMore than a lakh products have gone out — online, and from the exhibition tables we set up across Maharashtra and Gujarat, where you can meet the team, see the bottles and ask the questions you would ask a friend.\n\nWe do not believe in masking problems. We believe in solving them by honouring your skin and your scalp as they are.',
    founderImageUrl: '/images/atelier.jpg',
  },
  announcements: {
    enabled: true,
    text: 'Free shipping + a free gift on every order · Doctor-approved, steroid-free formulas · DM us for a routine',
  },
  policies: {
    shipping:
      'Orders are packed by hand in Mumbai and despatched within 2–4 working days; shipping and a gift are included on every order. Prices are shared in a DM or at the exhibition counter, and are confirmed before a parcel is sent. Payment is by UPI or bank transfer.',
    returns:
      'Sealed, unopened products can be returned within 7 days of delivery; opened products cannot be resold, so please ask us before buying if you are unsure a formula suits you. If a parcel arrives damaged, message us with a photograph and we will replace it.',
  },
};
