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
    grid: {
      display: 'grid !important', // Force priority
      gridTemplateColumns: 'repeat(4, 1fr) !important',
      gap: '16px !important',
    },
    buttonGenerate: {
      width: '200px', // Adjust as needed
    },
    feedbackLabel: {
      fontWeight: 'bold',
    },
    feedbackTextarea: {
      width: '100%',
      minHeight: '50px',
    },
  });