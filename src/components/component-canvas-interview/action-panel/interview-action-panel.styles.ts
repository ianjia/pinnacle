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
    display: 'grid !important', // Force priority
    gridTemplateColumns: 'repeat(2, 1fr) !important',
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
  fieldButton: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'flex-start',
  },
  buttonSmall: {
    width: '200px', // Adjust as needed
  },
  buttonGreen: {
    backgroundColor: 'green',
    color: 'white', 
  },
  buttonRed: {
    backgroundColor: 'red',
    color: 'white',
  },

  // Additional overlay styling for "isProcessing"
  processingModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingDialog: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
  },

  // New additions for popover label
  infoIcon: {
    marginLeft: '8px',
  },
  labelContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1px', // spacing between "College" text and the info button
  },
});
