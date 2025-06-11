import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  /* Outer wrapper – fills the space the parent gives it */
  conversationContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',          // ▶ keeps any extra scrollbars out of sight
  },

  /* Scrollable message area */
  conversationBox: {
    flex: 1,                     // ▶ take up remaining height
    overflowY: 'auto',           // ▶ **makes this div scroll instead of page**
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '30px',
    borderRadius: '5px',
  },

  /* Message bubbles -------------------------------------------------- */
  conversationItem: { marginBottom: '15px' },
  left:            { textAlign: 'left'  },
  right:           { textAlign: 'right' },

  message: {
    display: 'inline-block',
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '70%',
    wordWrap: 'break-word',
    color: '#212529',
  },
  interviewer: { backgroundColor: '#e9ecef' },
  you:         { backgroundColor: '#d1ecf1' },
});
