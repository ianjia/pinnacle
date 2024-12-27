import { makeStyles } from "@fluentui/react-components";

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
    },
    cardPreview: {
      marginBottom: '16px',
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
    fullWidth: {
      // Spans both columns to take the full width
      gridColumn: '1 / 3',
    },
    input: {
      height: '36px',
      width: '100%',
    },
    textarea: {
      width: '100%',
      height: '120px',
    },
    buttonField: {
      // Reduced spacing above the button
      marginTop: '8px',
    },
    buttonGenerate: {
      width: '200px', // Adjust as needed
    },
  });