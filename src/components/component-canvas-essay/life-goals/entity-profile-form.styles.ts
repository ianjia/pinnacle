import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    padding: '16px',
  },
  header: {
    marginBottom: '16px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  itemContainer: {
    position: 'relative',
    marginBottom: '16px',
  },
  deleteButton: {
    position: 'absolute',
    top: '8px',
    right: '8px',
  },
  addButton: {
    marginTop: '16px',
    fontSize: '14px',
    color: 'gray',
  },
});
