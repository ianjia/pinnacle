import { makeStyles } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    minWidth: '300px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  input: {
    padding: '8px',
    margin: '5px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  forgotPasswordWrapper: {
    marginTop: '1rem',
  },
});
