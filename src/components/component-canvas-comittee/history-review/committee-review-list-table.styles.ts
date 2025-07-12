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
    /* colour every cell */
    '& .fui-DataGridCell': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    /* 4‑px brand bar */
    '& .fui-DataGridCell:first-child': {
      borderLeft: `4px solid ${tokens.colorBrandStroke1}`,
      paddingLeft: `calc(${tokens.spacingHorizontalM} - 4px)`,
    },
    /* identical shade on hover */
    '&:hover .fui-DataGridCell': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
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
