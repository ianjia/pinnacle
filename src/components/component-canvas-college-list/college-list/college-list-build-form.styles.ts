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
  row: {
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  wideColumn: {
    width: '100px', // Adjust the width as needed
    minWidth: '100px',
    maxWidth: '150px', // Optional to set a max width
  },
  cell: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    height: '100%',
    fontSize: '14px',
  },
  headerCell: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '2px',
    paddingRight: '20px',
    margin: '0',
    fontSize: '15px',
    fontWeight: 'bold',
    height: '100%',
  },
  actionCell: {
    justifyContent: 'left',
    paddingLeft: '20px',
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
    marginTop: '10px',
  },
  modal: {
    position: 'fixed',
    zIndex: 9999,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalInput: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  }
});