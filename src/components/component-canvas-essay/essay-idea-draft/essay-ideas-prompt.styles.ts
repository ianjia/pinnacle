import { makeStyles, tokens } from "@fluentui/react-components";

export const usePromptStyles = makeStyles({
  container: { paddingBottom: tokens.spacingVerticalL },
  cardPreview: { marginBottom: tokens.spacingVerticalL },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalL,
  },

  field: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS },
  fullWidth: { gridColumn: '1 / -1' },

  textarea: { width: '100%', minHeight: '120px' },
  textareaSmall: { width: '100%', minHeight: '80px' },

  buttonField: { marginTop: tokens.spacingVerticalS },
  button: { width: '200px' },

  labelWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
  },
  infoIcon: { marginLeft: tokens.spacingHorizontalXS },
});

