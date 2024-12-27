import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    card: {
      padding: '16px',
      margin: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    header: {
      marginBottom: '32px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    tableContainer: {
      // If you want a scrollable area, you can set a max-height and overflow here
      // maxHeight: '400px',
      // overflowY: 'auto',
    },
    headerRow: {
      backgroundColor: '#f3f2f1',
    },
    selectedRow: {
      backgroundColor: '#e0f0ff',
    },
    normalRow: {
      backgroundColor: 'white',
    },
    rowHover: {
      cursor: 'pointer',
    },
    actionsCell: {
      textAlign: 'right',
    },
    buttonRow: {
      // Button row (Add button) below the table
      display: 'flex',
      justifyContent: 'flex-start',
    },
    feedbackContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    feedbackLabel: {
      fontWeight: 'bold',
    },
    feedbackTextarea: {
      width: '100%',
      minHeight: '50px',
    },
    refineButtonContainer: {
      // Container to hold the "Refine" button if needed
      display: 'flex',
      justifyContent: 'flex-start',
      marginTop: '8px',
      gap: '8px',
    },
    modalContainer: {
      // Customize your modal overlay container
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    textAreaInput: {
        width: '100%',
        minHeight: '80px',
        fontSize: '14px',
        padding: '8px',
        resize: 'vertical', // if you want to allow manual resizing
      },
  });
  