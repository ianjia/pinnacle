import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  conversationContainer: {
    // Make the container flexible if needed
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // ensure it can expand to a certain height, or set a fixed height if preferred
  },
  conversationBox: {
    backgroundColor: tokens.colorNeutralBackground1, // or another theme token
    padding: '30px',
    borderRadius: '5px',
  },
  conversationItem: {
    marginBottom: '15px',
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  message: {
    display: 'inline-block',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    color: '#212529',
  },
  interviewer: {
    backgroundColor: '#e9ecef',
  },
  you: {
    backgroundColor: '#d1ecf1',
  },
});
