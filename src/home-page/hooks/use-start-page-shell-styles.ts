import { makeStyles, tokens } from '@fluentui/react-components';

export const useStartPageShellStyles = makeStyles({
  /* Root page shell (scroll container) */
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',                 // fixed to viewport
    overflowY: 'auto',               // enables vertical scrollbar when needed
    WebkitOverflowScrolling: 'touch',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },

  /* ── TOP ── */
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: tokens.spacingHorizontalL,
    minHeight: '120px',
    gap: tokens.spacingHorizontalL,
    flexShrink: 0,                   // do not shrink when viewport is small

    /* gradient background (white → blue, top → bottom) */
    backgroundImage: `linear-gradient(
      to bottom,
      #ffffff 0%,
      #f2f7ff 40%,
      ${tokens.colorBrandBackground} 100%
    )`,
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginLeft: '70px' },
  logo:      { height: '100px' },
  logoText:  { height: '100px' },
  topButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalXXXL,
    marginRight: '70px',
  },

  footer: {
    marginTop: 'auto',               // sticky bottom when there’s extra space
    textAlign: 'center',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBlock: '6px',
    fontSize: tokens.fontSizeBase200,
    lineHeight: 3,
    boxSizing: 'border-box',
    flexShrink: 0,                   // do not shrink
  },
});
