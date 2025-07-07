import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* outer scrollable wrapper */
  container: {
    overflow: 'auto',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },

  /* card */
  card: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
  },

  header: {
    marginBottom: tokens.spacingVerticalXL,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* CSS grid: 2 columns */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacingHorizontalL,
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalL,
  },

  /* textarea field spans both columns */
  textAreaField: {
    gridColumn: '1 / -1',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    marginBottom: tokens.spacingVerticalL,
  },

  textarea: {
    minHeight: '240px',
    width: '100%',
  },

  fieldButton: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    alignItems: 'flex-start',
  },

  buttonSmall: {
    width: '200px',
  },

  /* label & info icon */
  labelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXXS,
  },

  infoIcon: { marginLeft: tokens.spacingHorizontalXS },
});
