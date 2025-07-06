import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ── card shells ─────────────────────────────────────────────── */
  card: {
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },

  header: {
    marginBottom: tokens.spacingVerticalXL,
    fontSize: tokens.fontSizeHero700,          // hero size that exists
    fontWeight: tokens.fontWeightSemibold,
  },

  subcard: {
    marginBottom: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  subcardheader: {
    marginBottom: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* ── DataGrid rows / cells ───────────────────────────────────── */
  row: {
    height: '48px',
  },

  cell: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
  },

  headerCell: {
    composes: '$cell',                         // reuse base cell styles
    fontWeight: tokens.fontWeightSemibold,
  },

  /* ── actions column ──────────────────────────────────────────── */
  actionCell: { justifyContent: 'flex-start' },

  actionButton: {
    height: '28px',
    padding: 0,
  },

  /* ── add-item UI ─────────────────────────────────────────────── */
  addItemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: tokens.spacingVerticalS,
  },

  addItemButton: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },

  /* ── width helper for <Input> fields ─────────────────────────── */
  input: { width: '200px' },
});
