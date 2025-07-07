import { makeStyles, tokens } from '@fluentui/react-components';

export const useLoginRegisterStyles = makeStyles({
  /* ── modal-body wrapper ─────────────────────────────────── */
  container: {
    backgroundColor: tokens.colorNeutralBackground1,          // adapts to light / dark
    /* old: shorthands.padding(tokens.spacingHorizontalXL, tokens.spacingVerticalXL) */
    paddingBlock: tokens.spacingHorizontalXL,                 // top & bottom
    paddingInline: tokens.spacingVerticalXL,                  // left & right
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow64,
    minWidth: '320px',
    maxWidth: '420px',
    textAlign: 'center',
  },

  /* ── form layout ───────────────────────────────────────── */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },

  /* ── interactive controls ─────────────────────────────── */
  input: {
    /* old: shorthands.padding(tokens.spacingHorizontalM, tokens.spacingVerticalS) */
    paddingBlock: tokens.spacingHorizontalM,                  // top & bottom
    paddingInline: tokens.spacingVerticalS,                   // left & right
    fontSize: tokens.fontSizeBase400,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  button: {
    /* old: shorthands.padding(tokens.spacingHorizontalM, tokens.spacingVerticalS) */
    paddingBlock: tokens.spacingHorizontalM,
    paddingInline: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase400,
    marginTop: tokens.spacingVerticalM,
  },

  /* link-styled button for “forgot password?” */
  linkButton: {
    background: 'none',
    border: 'none',
    color: tokens.colorBrandForegroundLink,
    cursor: 'pointer',
    fontSize: tokens.fontSizeBase300,
    padding: '0',                                             // replaces shorthands.padding(0)
  },

  /* ── status text ───────────────────────────────────────── */
  error:   { color: tokens.colorPaletteRedForeground2 },
  success: { color: tokens.colorPaletteGreenForeground2 },

  forgotPasswordWrapper: { marginTop: tokens.spacingVerticalM },

  /* checkbox extra margin inside dialog */
  checkboxSpacing: { marginTop: tokens.spacingVerticalM },
});
