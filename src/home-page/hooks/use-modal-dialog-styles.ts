// hooks/use-modal-dialog-styles.ts
import { makeStyles, tokens } from '@fluentui/react-components';

export const useModalDialogStyles = makeStyles({
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: tokens.colorTransparentBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },

  content: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,

    /* wider dialog + bigger internal gap */
    minWidth: '480px',
    maxWidth: '640px',
    padding: `${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXXL}`,

    border: 'none',              // ← removes faint border
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow64,
    position: 'relative',
  },

  closeBtn: {
    position: 'absolute',
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },
});
