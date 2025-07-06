import { makeStyles, tokens } from "@fluentui/react-components";

export const useDraftStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: tokens.spacingHorizontalL,
  },

  button: { width: '200px' },

  feedbackBlock: {
    marginTop: tokens.spacingVerticalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  textarea: {
    width: '100%',
    minHeight: '80px',
  },
});
