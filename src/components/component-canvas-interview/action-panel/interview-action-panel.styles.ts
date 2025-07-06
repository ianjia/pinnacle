import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* outer wrapper */
  container: {
    padding: tokens.spacingHorizontalXL,
    overflowY: 'auto',
  },

  /* card */
  card: {
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* ---------- 2×2 grid (forced) ---------- */
  grid: {
    display: 'grid !important',                         // override CardPreview flex
    gridTemplateColumns: '1fr 1fr !important',          // two equal columns
    rowGap: tokens.spacingVerticalL,
    columnGap: tokens.spacingHorizontalXL,
  },

  /* shared field styling */
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  buttonWide: { width: '200px' },

  /* label additions */
  infoIcon: { marginLeft: tokens.spacingHorizontalXXS },
  labelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
  },

  /* processing overlay */
  processingModal: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.45)',
  },
  processingDialog: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    textAlign: 'center',
  },
});
