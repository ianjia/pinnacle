import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: tokens.spacingVerticalM,
  },

  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
  },

  nameFieldContainer: {
    width: '33%',
    minWidth: '200px',
  },

  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },

  textarea: {
    minHeight: '180px',
  },
});
