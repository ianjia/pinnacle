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

  addItemContainer: { display: 'flex', justifyContent: 'flex-start', marginTop: tokens.spacingVerticalS },
  addItemButton: { fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3, height: '28px' },
});
