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
  subcard: {
    marginBottom: '10px',
    padding: '12px',
  },
  subcardheader: {
    marginBottom: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    paddingLeft: '0px',
  },
  row: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cell: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    height: '100%',
  },
  headerCell: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    fontSize: '15px',
    height: '100%',
  },
  actionCell: {
    justifyContent: 'left',
    paddingLeft: '50px',
  },
  actionButton: {
    padding: '0',
    height: '28px',
    lineHeight: '1',
  },
  addItemButton: {
    fontSize: '14px',
    color: 'gray',
  },
  addItemContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '-30px',
  },
  input: {
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '2px',
    padding: '0',
    fontSize: '12px',
    height: '34px',
    lineHeight: '1',
  },
});
