import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
  },
  gridFourColumns: {
    display: 'grid !important',
    gridTemplateColumns: 'repeat(4, 1fr) !important',
    gap: '16px !important',
  },
  gridTwoColumns: {
    display: 'grid !important',
    gridTemplateColumns: 'repeat(2, 1fr) !important',
    gap: '16px !important',
    marginTop: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    height: '36px',
    width: '100%',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
  },
});
