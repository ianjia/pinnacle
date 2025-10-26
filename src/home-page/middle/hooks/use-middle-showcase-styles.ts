import { makeStyles, tokens } from '@fluentui/react-components';

export const useMiddleShowcaseStyles = makeStyles({
  middle: {
    display: 'grid',
    gridAutoRows: 'auto',
    alignContent: 'center',
    rowGap: tokens.spacingVerticalL,

    // Symmetric, responsive padding so gaps feel equal
    paddingBlock: 'clamp(12px, 3vh, 28px)',
    paddingInline: tokens.spacingHorizontalL,

    // Fallback only — the real gradient is applied inline as backgroundImage
    backgroundColor: '#FAF7FF',
    transition: 'background-image 250ms ease-out',

    flex: '1 0 auto',
    minHeight: 0,
  },

  // Single source of truth for content width
  container: {
    maxWidth: '1280px',
    marginInline: 'auto',
    width: '100%',
    boxSizing: 'border-box',
  },

  /* Top: pill bar */
  midTopBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'center',
  },

  pill: {
    position: 'relative',
    borderRadius: '9999px',
    paddingBlock: tokens.spacingVerticalS,
    paddingInline: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition:
      'transform 120ms ease, box-shadow 160ms ease, background-color 160ms ease',
    fontWeight: 600,
    overflow: 'hidden',

    // Ensure text/icons sit above any overlays
    '& .fui-Button__content, & .fui-Button__icon': {
      position: 'relative',
      zIndex: 1,
    },

    /* ✅ Hover effect only for NOT-selected pills */
    '&:not([aria-selected="true"]):hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 10px rgba(0,0,0,.08)',
    },

    ':focus-visible': {
      outline: `3px solid ${tokens.colorBrandBackground}`,
      outlineOffset: '2px',
    },

    /* ✅ Selected state */
    '&&[aria-selected="true"]': {
      // Absolutely keep the selected visuals
      background: 'linear-gradient(90deg, #3BA6FF 0%, #9680e0ff 100%) !important',
      boxShadow: '0 10px 24px rgba(109,66,255,.32), 0 2px 6px rgba(0,0,0,.08)',
      transform: 'translateY(-1px)',

      // 🚫 Kill any pointer-driven hover/focus effects on the selected pill
      // (keyboard focus still works because pointer-events does not affect it)
      pointerEvents: 'none',
      cursor: 'default',
    },

    // Keep the glossy highlight on the selected capsule
    '&&[aria-selected="true"]::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '9999px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.40)',
      pointerEvents: 'none',
      zIndex: 0,
    },

    /* ✅ Force *readable* text on selected — no matter what hovers where */
    // target Button slots
    '&&[aria-selected="true"] .fui-Button__content, &&[aria-selected="true"] .fui-Button__icon': {
      color: `${tokens.colorNeutralForegroundInverted} !important`,
    },
    // also target hovered slot elements (some themes style the slot on :hover)
    '&&[aria-selected="true"] .fui-Button__content:hover, &&[aria-selected="true"] .fui-Button__icon:hover': {
      color: `${tokens.colorNeutralForegroundInverted} !important`,
    },
    // final safety net: enforce white on all descendants (covers nested spans/svg using currentColor)
    '&&[aria-selected="true"] *': {
      color: `${tokens.colorNeutralForegroundInverted} !important`,
      WebkitTextFillColor: `${tokens.colorNeutralForegroundInverted} !important`,
    },
  },

  // Kept for compatibility with your JSX; not used for styling anymore.
  pillActive: {},

  /* Middle: HERO */
  hero: {
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 18px 48px rgba(30, 10, 60, .18)',
    width: '100%',
    boxSizing: 'border-box',
  },

  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 440px',
    alignItems: 'stretch',
    gap: tokens.spacingHorizontalXL,
    padding: '56px 32px',
    minHeight: 'clamp(320px, 22vw, 460px)',
    '@media (max-width: 880px)': {
      gridTemplateColumns: '1fr',
    },
  },

  heroText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '720px',
    color: tokens.colorNeutralForegroundInverted,
  },

  heroTitle: {
    margin: 0,
    fontFamily:
      'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    fontWeight: 800,
    fontSize: '44px',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },

  heroSubtitle: {
    marginTop: tokens.spacingVerticalM,
    fontSize: '19px',
    lineHeight: 1.55,
    opacity: 0.95,
  },

  heroList: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: 0,
    paddingLeft: '1.1rem',
    color: tokens.colorNeutralForegroundInverted,
    fontSize: '19px',
    lineHeight: 1.55,
    opacity: 0.95,
  },

  heroListItem: {
    marginBlock: '4px',
  },

  heroImageWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },

  heroImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 18px 28px rgba(0,0,0,.25))',
    transform: 'translateY(10px)',
  },

  /* Bottom: cards grid */
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: tokens.spacingHorizontalL,
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 1100px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    '@media (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(25, 15, 45, .08)',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  cardImageWrap: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: '4 / 3',
    padding: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: 'border-box',
  },

  // inner container so the image keeps rounded corners inside the gap
  cardImageInner: {
    width: '100%',
    height: '100%',
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 450ms cubic-bezier(.22,.61,.36,1)',
    transform: 'scale(1.0)',
    ':hover': { transform: 'scale(1.06)' },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none',
      ':hover': { transform: 'none' },
    },
  },

  cardBody: {
    padding: tokens.spacingHorizontalL,
  },

  cardTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },

  cardText: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: 0,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase400,
    lineHeight: 1.55,
  },
});
