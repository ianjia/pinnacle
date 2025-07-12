import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ---------- shared container for main component ---------- */
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
  },

  /* ---------- card ---------- */
  card: {
    width: '100%',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* ---------- header row ---------- */
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
  infoIcon: { marginLeft: tokens.spacingHorizontalXS },

  /* ---------- datagrid ---------- */
  headerCell: { fontWeight: tokens.fontWeightSemibold },
  cell: { fontSize: tokens.fontSizeBase300 },

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

  /* ---------- delete button ---------- */
  actionCell: { justifyContent: 'flex-start' },
  actionButton: {
    height: '28px',
    lineHeight: 1,
    padding: 0,
  },
});
