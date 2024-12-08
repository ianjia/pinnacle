import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
  },
  header: {
    marginBottom: '32px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    paddingLeft: '0px',
  },
  grid: {
    display: 'grid !important', // Force priority
    gridTemplateColumns: 'repeat(1, 1fr) !important',
    gap: '16px !important',
  },
  row: {
    display: 'flex', // Use flexbox for horizontal alignment
    alignItems: 'center',
    gap: '48px', // Add spacing between elements
    marginBottom: '16px', // Add spacing between rows
  },
  label: {
    minWidth: '200px', // Set a minimum width for labels for alignment
    fontWeight: 'bold',
  },
});
