import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    overflowX: 'auto',
    overflowY: 'auto',
    padding: '16px',
  },
  card: {
    marginBottom: '16px',
    padding: '24px',
  },
  header: {
    marginBottom: '32px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: '8px',
  },
  grid: {
    display: 'grid !important', // Force priority
    gridTemplateColumns: 'repeat(3, 1fr) !important',
    gap: '16px !important',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    height: '36px',
    width: '80%',
  },
});
