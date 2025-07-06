// compare-college-main-container.styles.ts
import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ───────────────── outer wrapper ───────────────── */
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,                            // ~16 px in light theme
  },

  /* ───────────────── cards ───────────────────────── */
  card: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  header: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalL,
  },

  resultHeader: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM,
  },

  /* ───────────────── first row: selects ─────────── */
  selectRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXL,                        // was “70px”
    alignItems: 'flex-end',
    marginBottom: tokens.spacingVerticalM,
  },

  selectField: {
    minWidth: '220px',
    flexGrow: 1,
  },

  /* ───────────────── second row: button ─────────── */
  buttonRow: {
    display: 'flex',
  },

  compareButton: {
    width: '220px',                                         // keep explicit width
    height: '32px',                                         // default Medium button height
  },
});
