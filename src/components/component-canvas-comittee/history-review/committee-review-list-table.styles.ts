import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  headerRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalL,
  },

  header: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
  },

  infoIcon: { marginLeft: tokens.spacingHorizontalS },

  row: { cursor: 'pointer' },

  rowSelected: {
    backgroundColor: tokens.colorBrandBackground2,
  },

  headerCell: {
    fontWeight: tokens.fontWeightSemibold,
  },

  cell: {},

  actionCell: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  actionButton: {
    padding: 0,
    height: '28px',
  },
});
