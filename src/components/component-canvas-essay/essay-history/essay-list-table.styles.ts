import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  headerContainer: {
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

  /* data‑grid */
  row: { cursor: 'pointer' },

  rowSelected: {
    '& .fui-DataGridCell': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    '& .fui-DataGridCell:first-child': {
      borderLeft: `4px solid ${tokens.colorBrandStroke1}`,
      paddingLeft: `calc(${tokens.spacingHorizontalM} - 4px)`,
    },
    '&:hover .fui-DataGridCell': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },

  headerCell: { fontWeight: tokens.fontWeightSemibold },
  cell: {},

  actionCell: { display: 'flex', justifyContent: 'flex-start' },
  actionButton: { padding: 0, height: '28px' },
});
