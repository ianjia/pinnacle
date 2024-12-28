import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  header: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  infoIcon: {
    marginLeft: '8px',
  },
  row: {
    cursor: 'pointer',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  cell: {
    // Customize as needed
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  actionButton: {
    padding: '0',
    height: '28px',
    lineHeight: '1',
  },
});
