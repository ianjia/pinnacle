import { makeStyles, tokens } from '@fluentui/react-components';

/* ---------- styles --------------------------------------------------- */
export const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    backgroundColor: 'transparent',
  },

  /* error banner */
  error: {
    color: tokens.colorPaletteRedForeground3,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* rendered markdown root */
  mdRoot: {
    flexGrow: 1,
    overflowY: 'auto',
    wordBreak: 'break-word',

    /* ——— global typography & spacing ——— */
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,             // <‑‑ taller lines
    color: tokens.colorNeutralForeground1,

    '& > *:first-child': { marginTop: 0 },
    '& > *:last-child' : { marginBottom: 0 },

    /* ——— paragraphs & lists ——— */
    '& p': { margin: `${tokens.spacingVerticalM} 0` },
    '& ul, & ol': { paddingLeft: tokens.spacingHorizontalXL },
    '& li': { margin: `${tokens.spacingVerticalXS} 0` },

    /* ——— headings ——— */
    '& h3': {
      fontSize: tokens.fontSizeBase500,
      margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalS}`,
      color: tokens.colorNeutralForeground2,
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
      paddingBottom: tokens.spacingVerticalXS,
    },
    '& h4': {
      fontSize: tokens.fontSizeBase400,
      margin: `${tokens.spacingVerticalL} 0 ${tokens.spacingVerticalXS}`,
      color: tokens.colorNeutralForeground2,
    },

    /* ——— links ——— */
    '& a': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'none',
    },
    '& a:hover': { textDecoration: 'underline' },

    /* ——— blockquote ——— */
    '& blockquote': {
      borderLeft: `3px solid ${tokens.colorNeutralStroke2}`,
      paddingLeft: tokens.spacingHorizontalM,
      color: tokens.colorNeutralForeground2,
      margin: `${tokens.spacingVerticalL} 0`,
      fontStyle: 'italic',
    },

    /* ——— tables ——— */
    '& table': {
      width: '100%',
      borderCollapse: 'collapse',
      margin: `${tokens.spacingVerticalL} 0`,
    },
    '& th, & td': {
      border: `1px solid ${tokens.colorNeutralStroke2}`,
      padding: tokens.spacingHorizontalM,
    },
    '& th': {
      backgroundColor: tokens.colorNeutralBackground3,
      textAlign: 'left',
    },

    /* ——— code blocks / inlines ——— */
    '& pre, & code': {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
      borderRadius: tokens.borderRadiusSmall,
      fontFamily: tokens.fontFamilyMonospace,
    },
    '& pre': {
      padding: tokens.spacingHorizontalM,
      overflowX: 'auto',
      margin: `${tokens.spacingVerticalL} 0`,
    },
    '& code': {
      padding: `0 ${tokens.spacingHorizontalXS}`,
    },
  },
});

