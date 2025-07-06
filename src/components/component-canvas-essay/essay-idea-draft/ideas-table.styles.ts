import { makeStyles, tokens } from '@fluentui/react-components';

export const useTableStyles = makeStyles({
  tableContainer: { overflowX: 'auto' },

  headerRow: { backgroundColor: tokens.colorNeutralBackground3 },
  selectedRow: { backgroundColor: tokens.colorBrandBackground2 },
  rowHover: { cursor: 'pointer' },
  actionsCell: { textAlign: 'right' },

  buttonRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: tokens.spacingVerticalM,
  },

  feedbackBlock: {
    marginTop: tokens.spacingVerticalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  /* ------------ modal overlay ------------ */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  /* modal surface */
  modal: {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
    minWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },

  /* textarea (used in modal & feedback) */
  textarea: {
    width: '100%',
    minHeight: '80px',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingHorizontalS,
  },

  /* -------- buttons inside modal --------- */
  modalButtonRow: {
    display: 'flex',
    justifyContent: 'flex-end',   // ← align buttons to the right
    gap: tokens.spacingHorizontalS,
  },
});
