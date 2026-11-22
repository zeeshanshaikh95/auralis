# AURALIS — Website

Mobile-first storefront for **AURALIS** (@_auralis.official_) — a Mumbai skin and hair care house.
Primary conversion: browse → bag → **order in Instagram DMs** (no payment gateway, by design).

**Live preview:** https://zeeshanshaikh95.github.io/auralis/ (GitHub Pages — static catalogue
snapshot, no admin; see [Hosting](#hosting--live-url)).

Built to the same architecture as the house's other client sites (React SPA + Express API + MongoDB,
protected admin panel, DM/WhatsApp ordering), with a completely different design system: **aurum
noir** — a dark bottle-green ground, molten champagne metal and a dusty rose aura — a 3D animated
hero with a filmstrip slider, and a skin/hair product model.

> **Data policy:** product names, collections, combos, the doctor-approved / no-steroids positioning,
> the free-gift and free-shipping offer, and the exhibition cities come from the brand's own public
> Instagram posts. Prices are **never invented** — the house quotes in DMs, so everything defaults to
> "price on request". The two combos and the product categories are real; individual product titles
> beyond them are descriptive working titles for the routines the house sells. Rename or remove them
> in Admin → Products before launch.

## Hosting / live URL

| Environment | URL | What works |
| GitHub Pages (live) | https://zeeshanshaikh95.github.io/auralis/ | Browsing, collections, product pages, bag, Instagram ordering |
| Local (`npm run dev`) | http://localhost:5173 | Everything, including `/admin` and analytics |

Pages is static, so it cannot run the Express API. The Pages build reads a committed snapshot of the
catalogue (`client/public/demo/catalogue.json`, enabled by `VITE_DEMO_CATALOGUE=true`) instead of
showing empty states. Regenerate it after changing catalogue content:

```shell
npm run demo:snapshot        # builds the snapshot from server/src/seed/catalogueData.ts
```

Consequences of the preview build: the admin panel has no API behind it, review/analytics writes are
skipped, and ordering always goes to Instagram DMs. To run it as a real shop, host the API and set the
`VITE_API_URL` repository variable plus `VITE_DEMO_CATALOGUE=false` — see
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

Push to `main` and `.github/workflows/deploy-pages.yml` rebuilds and redeploys automatically.

## Tech stack

| Layer | Technology |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas in production; a bundled local mongod for dev) |
| Auth | JWT bearer tokens + bcrypt (12 rounds), protected `/api/admin/*` |
| Security | Helmet, CORS allow-list, rate limiting, Zod validation, secrets via env |
| Media | Multer uploads served from `/uploads` (swap in Cloudinary/S3 when the volume grows) |
| Hosting | Static SPA build + Node API + MongoDB Atlas |

## Structure

```
├── client/                  React SPA
│   ├── public/              brand imagery, favicon, robots, sitemap
│   │   └── demo/            catalogue.json — the snapshot the Pages build serves
│   └── src/
│       ├── admin/           Protected admin panel (lazy-loaded bundle)
│       ├── api/             Typed API client + endpoint map
│       ├── components/      HeroSlider (3D), ProductCard, MiniCart, Wordmark, layout…
│       ├── context/         Cart / Settings / Toast providers
│       ├── hooks/           useApi, usePageView
│       ├── lib/             DM link builder, analytics, formatting, brand assets
│       └── pages/           Public pages
├── server/
│   └── src/
│       ├── config/          Env config + Mongo connection
│       ├── controllers/     Public + admin handlers
│       ├── middleware/      Auth, errors, rate limits, uploads
│       ├── models/          Mongoose schemas
│       ├── routes/          /api and /api/admin routers
│       ├── seed/            Bootstrap (admin + settings) and starter catalogue
│       ├── services/        Settings singleton
│       ├── utils/           asyncHandler, slugify
│       └── validation/      Zod schemas for every write
```

## Quick start

Prerequisites: Node 20+.

```shell
npm install

# 1 — configure the API
cp .env.example server/.env        # then edit JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD

# 2 — local database (downloads a mongod binary on first run, persists in server/.data/mongo)
npm run dev:db

# 3 — in a second terminal: bootstrap admin + settings + starter catalogue
npm run seed

# 4 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the database, API and client together.

**Admin panel:** http://localhost:5173/admin — sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`server/.env`. A freshly bootstrapped account must choose a new password before the panel opens.

## Admin panel

* **Overview** — 7/30/90-day page views, product views, cart adds, order-message clicks, top products,
  referrers, plus a warning while no WhatsApp number is configured (ordering falls back to DMs).
* **Products** — full CRUD, multi-image upload/reorder, size options with per-option price and stock,
  new-in / bestseller / featured flags, archive & restore, SEO fields, display order.
* **Collections** — CRUD, reordering, live product counts. Deleting a collection keeps its products.
* **Reviews** — add, edit, approve, hide, delete. Only approved reviews reach the shop.
* **Journal (gallery)** — images for the homepage strip and lookbook, with captions and links.
* **Settings** — identity, WhatsApp number, **hero slider slides**, announcements, house story,
  order message templates, shipping and returns copy.
* **Security** — forced first-login password change, 10 login attempts / 15 min, JWT re-validated
  against the database on every request, Zod validation on all writes.

## Ordering behaviour

* If a WhatsApp number is set in Settings, every order button builds a `wa.me` link with a
  pre-filled message (items, options, quantities, estimated total).
* If no number is set, order buttons open the brand's Instagram DMs instead, so the shop is never a
  dead end — the admin dashboard flags this until the number is added. **This is the current state:**
  the house quotes in DMs.
* Prices are nullable end to end: blank means "Price on request", never ₹0.

## Brand assets

* **Wordmark** — a typographic lockup with an aura emblem (three brass arcs over a serif A in a
  slender arch), drawn in `client/src/components/Wordmark.tsx`. No stretched or recoloured artwork.
* **Photography** — the six real photographs in `client/public/images/` come from the brand's own
  Instagram posts (product table, parcels, customer review, exhibitions, Diwali dispatch).
  `atelier.jpg` and `serum-texture.jpg` are editorial still-life placeholders generated for this
  build because Instagram does not serve its media to logged-out requests; replace them with the
  brand's own product photography (or upload through Admin → Products) before launch.
* **Palette** — bottle-green ground `#070C0A`, bone type `#F1E9DA`, molten brass `#C08D53`, dusty
  rose aura `#BC7A70`. Sharp 2–6px radii, brass hairlines, editorial serif (Fraunces) with geometric
  sans (Jost); the light porcelain system, arch frames and gold-on-white surfaces of the clinic builds
  are deliberately not used here.

## Scripts

| Command | Purpose |
| `npm run dev` | API + client together |
| `npm run dev:all` | Database + API + client in one terminal |
| `npm run dev:db` | Local dev MongoDB (persists in `server/.data/mongo`) |
| `npm run seed` | Bootstrap admin + settings, add the starter catalogue if empty |
| `npm run seed:reset` | Wipe catalogue records and re-create them |
| `npm run demo:snapshot` | Build the Pages catalogue snapshot from the seed data |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |

## Environment variables

| Variable | Purpose |
| `PORT` | API port (4000) |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Long random string for signing admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (12h) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `PUBLIC_SITE_URL` / `PUBLIC_API_URL` | Canonical URLs |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account (seed only) |
| `UPLOAD_MAX_BYTES` / `UPLOAD_MAX_FILES` | Upload limits |

Client (optional): `VITE_API_URL`, `VITE_PUBLIC_SITE_URL`.

## Roadmap to production

1. Replace the two placeholder stills with the brand's own product photography.
2. Add the WhatsApp number (or keep DMs) and review the message templates in Admin → Settings.
3. Load the real catalogue with prices, sizes and stock; approve the first reviews.
4. Set `JWT_SECRET`, a strong admin password and `CORS_ORIGINS` on the host; deploy the SPA build
   and API, and point MongoDB at Atlas.
