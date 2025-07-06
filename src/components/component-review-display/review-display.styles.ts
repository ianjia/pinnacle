import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Forces a theme‑aware background for the review panel and
 * strips default white backgrounds from markdown content.
 */
export const useStyles = makeStyles({
  /* wrapper that fills its parent */
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  /* review surface */
  box: {
    backgroundColor: `${tokens.colorNeutralBackground2} !important`, // <- hard stop
    color: tokens.colorNeutralForeground1,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    overflowY: 'auto',
    lineHeight: tokens.lineHeightBase300,
    fontSize: tokens.fontSizeBase300,

    /* ---------- markdown overrides ---------- */
    /**
     * Many markdown renderers apply #ffffff to <p>, <pre> or <code>.
     * We reset those here so dark‑mode isn’t ruined.
     */
    '& p, & blockquote, & table': {
      backgroundColor: 'transparent !important',
    },
    '& pre, & code': {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
});
