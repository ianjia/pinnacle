import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
    width: '100%', // Ensuring full width of container
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    alignItems: 'center',
  },
  nameFieldContainer: {
    width: '33%', // 1/3 of the card width
    minWidth: '200px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    width: '100%',
    height: '36px',
  },
  textarea: {
    width: '100%',
    minHeight: '180px',
  },
});
