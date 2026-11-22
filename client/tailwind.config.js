/**
 * AURALIS design system — "aurum noir".
 *
 * A dark, botanical-luxe system: deep bottle-green ground, warm bone type,
 * molten champagne metal and a dusty rose accent that stands in for the
 * "aura" in the brand name. It is deliberately the opposite of the light
 * porcelain house builds: here the page is a dim room, imagery is lit like a
 * product still, hairlines are brass rather than paper, and the monogram is a
 * halo of concentric arcs instead of a circle.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070C0A', // page ground
        obsidian: '#0A1210', // section ground
        onyx: '#101A16', // raised surfaces, cards
        graphite: '#16231D', // fills, inert blocks
        'graphite-light': '#1B2A23',

        gold: {
          50: '#F6EBD7',
          100: '#EEDBB9',
          200: '#E2C293',
          300: '#D3A96F',
          400: '#C08D53', // the molten foil
          500: '#A9763F',
          600: '#8A5D2E',
          700: '#684521',
        },

        // The "aura" — a dusty rose used sparingly for accents and focus.
        blush: {
          50: '#F7E9E6',
          100: '#EFD3CD',
          200: '#E0B3AB',
          300: '#CF958B',
          400: '#BC7A70',
          500: '#9E5E57',
          600: '#7C4641',
          700: '#5C322E',
        },

        ink: '#040807', // the darkest ground, for CTA bands and buttons
        bone: '#F1E9DA', // primary type
        cream: '#F1E9DA',
        muted: '#A5B0A6', // secondary type
        faint: '#6F7C73', // tertiary type

        wine: {
          500: '#B4574E',
          600: '#8E3B34',
          700: '#682520',
        },

        // Aliases so inherited surfaces resolve on the dark ground.
        plum: '#0A1210',
        ivory: '#F1E9DA',
        sand: '#16231D',
        clay: '#1B2A23',
        sage: {
          50: '#10201A',
          100: '#16281F',
          200: '#1E3529',
          400: '#4E7A62',
          500: '#6E9C81',
          600: '#E2C293',
          700: '#C08D53',
          900: '#070C0A',
        },
        taupe: {
          100: '#101A16',
          300: '#16231D',
          500: '#A9763F',
          700: '#C08D53',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Jost', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        micro: '0.34em',
        wide2: '0.18em',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        arch: '999px 999px 8px 8px',
      },
      backgroundImage: {
        'gold-foil':
          'linear-gradient(112deg, #684521 0%, #C08D53 18%, #F6EBD7 34%, #D3A96F 50%, #A9763F 64%, #EEDBB9 80%, #C08D53 94%, #684521 100%)',
        'gold-sheen':
          'linear-gradient(180deg, rgba(192,141,83,0.16) 0%, rgba(192,141,83,0) 62%)',
        'room-glow':
          'radial-gradient(120% 70% at 50% -10%, rgba(192,141,83,0.18) 0%, rgba(7,12,10,0) 62%)',
        'blush-glow':
          'radial-gradient(80% 70% at 72% 28%, rgba(188,122,112,0.16) 0%, rgba(7,12,10,0) 70%)',
      },
      boxShadow: {
        lift: '0 30px 70px -46px rgba(0,0,0,0.9)',
        panel: '0 50px 110px -70px rgba(0,0,0,0.95)',
        gold: '0 0 0 1px rgba(192,141,83,0.35), 0 30px 70px -42px rgba(192,141,83,0.4)',
        'gold-lift': '0 20px 60px -30px rgba(192,141,83,0.5)',
        soft: '0 24px 60px -44px rgba(0,0,0,0.9)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        silk: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.02) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.1) translate3d(0,-1.5%,0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-slow': {
          '0%': { transform: 'rotateY(0deg) rotateX(10deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(10deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0,-18px,0) rotate(2.5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,20px,0)' },
        },
        'sheen-sweep': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.45' },
          '70%': { transform: 'scale(1.32)', opacity: '0' },
          '100%': { transform: 'scale(1.32)', opacity: '0' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)' },
        },
        'marquee-left': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        'aura-breathe': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        'drift': {
          '0%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
          '33%': { transform: 'translate3d(18px,-22px,0) rotate(4deg)' },
          '66%': { transform: 'translate3d(-14px,14px,0) rotate(-3deg)' },
          '100%': { transform: 'translate3d(0,0,0) rotate(0deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.75s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.34s cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'ken-burns': 'ken-burns 11s ease-out both',
        'spin-slow': 'spin-slow 30s linear infinite',
        'orbit-slow': 'orbit-slow 26s linear infinite',
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        sheen: 'sheen-sweep 7s linear infinite',
        'pulse-ring': 'pulse-ring 5s ease-out infinite',
        'reveal-up': 'reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 3.6s ease-in-out infinite',
        marquee: 'marquee-left 48s linear infinite',
        aura: 'aura-breathe 9s ease-in-out infinite',
        drift: 'drift 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
