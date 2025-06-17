import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxHeight: '100vh', // Limit height to viewport for scrolling
    overflowY: 'auto', // Enable vertical scrolling
  },
  
  section: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
});
