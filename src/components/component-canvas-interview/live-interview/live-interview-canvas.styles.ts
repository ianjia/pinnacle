import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* full‑height canvas */
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground1,   // theme‑aware
  },

  /* top action panel */
  action: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  /* main scrollable area */
  content: {
    flexGrow: 1,
    overflowX: 'auto',
    overflowY: 'auto',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },
});
