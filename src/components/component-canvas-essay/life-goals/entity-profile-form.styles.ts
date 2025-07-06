import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },

  header: {
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'left',
  },

  itemContainer: {
    position: 'relative',
    marginBottom: tokens.spacingVerticalL,
  },

  deleteButton: {
    position: 'absolute',
    top: tokens.spacingVerticalXS,
    right: tokens.spacingHorizontalXS,
  },

  addButton: {
    marginTop: tokens.spacingVerticalL,
    width: '160px',
  },
});
