import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ── card & table styles (unchanged from previous refactor) ───────── */
  card: {
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    marginBottom: tokens.spacingVerticalXL,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },
  reviewHeader: {
    marginTop: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalXS,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },
  row: {
    height: '64px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  rowSelected: { backgroundColor: tokens.colorBrandBackground2 },
  wideColumn: { width: '120px', minWidth: '100px', maxWidth: '150px' },
  cell: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
  },
  headerCell: { composes: '$cell', fontWeight: tokens.fontWeightSemibold },
  actionCell: { justifyContent: 'flex-start', paddingLeft: tokens.spacingHorizontalM },
  actionButton: { height: '28px', padding: 0},
  addItemContainer: { display: 'flex', justifyContent: 'flex-start', marginTop: tokens.spacingVerticalS },
  addItemButton: { fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3, height: '28px' },
  actionPanelButton: { fontSize: tokens.fontSizeBase300, width: '180px', height: '32px' },
  buttonWithInfo: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS },
  infoIcon: { marginLeft: tokens.spacingHorizontalXXS },

  /* ───────────────────── modal styles (NEW) ─────────────────────── */
  modalOverlay: {
    position: 'fixed',
    zIndex: 9999,
    inset: 0,                                              // top/right/bottom/left = 0
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',                   // translucent mask – fine for dark/light
  },

  modalContent: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    width: '420px',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },

  modalInput: {
    width: '100%',
    padding: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase300,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },

  modalButtonRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: tokens.spacingHorizontalM,
  },

  textAreaField: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalL,
  },

  textarea: {
    minHeight: '60px',
    width: '100%',
  },

  /* label & info icon */
  labelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
  },

  content: {
    flexGrow: 1,
    overflow: 'auto',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },
});
