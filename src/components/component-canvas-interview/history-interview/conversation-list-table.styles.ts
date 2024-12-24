import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  card: {
    marginBottom: '16px',
    padding: '24px',
    width: '100%',
  },
  /**
   * Flex container for the header text ("Conversation History")
   * and the info icon button on the right
   */
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  header: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  /**
   * Styling for the info icon that appears to the immediate right
   * of the "Conversation History" label.
   */
  infoIcon: {
    marginLeft: '8px', // add a little spacing from the header text
  },
  row: {
    cursor: 'pointer',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  cell: {
    // Customize as needed
  },
  actionCell: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  actionButton: {
    padding: '0',
    height: '28px',
    lineHeight: '1',
  },
});
