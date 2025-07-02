import { makeStyles, shorthands } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* ---------- outer wrapper ---------- */
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  /* ---------- card ---------- */
  card: {
    padding: '24px',
    ...shorthands.margin('0', '0', '16px', '0'),
  },

  header: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '24px',
  },
  resultHeader: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '12px',
  },

  /* ---------- first row: selects ---------- */
  selectRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '70px',
    alignItems: 'end',
    marginBottom: '20px',
  },
  selectField: {
    minWidth: '220px',
    flexGrow: 1,
  },

  /* ---------- second row: button ---------- */
  buttonRow: {
    display: 'flex',
  },
  compareButton: {
    width: '220px',
    height: '32px',
  },
});
