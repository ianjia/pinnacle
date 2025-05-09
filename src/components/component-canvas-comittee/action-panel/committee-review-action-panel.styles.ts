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
    paddingLeft: '0px',
  },
  grid: {
    display: 'grid !important',
    gridTemplateColumns: 'repeat(2, 1fr) !important',
    gap: '16px !important',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  /* NEW – full-width text-area field */
  textAreaField: {
    gridColumn: '1 / -1',              // span both columns
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  textarea: {
    minHeight: '240px',
    width: '100%',
  },
  fieldButton: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-start',
  },
  buttonSmall: {
    width: '200px',
  },
  infoIcon: {
    marginLeft: '8px',
  },
  labelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1px',
  },
});
