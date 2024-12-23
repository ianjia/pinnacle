import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  reviewBox: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '30px',
    borderRadius: '5px',
  },

});
