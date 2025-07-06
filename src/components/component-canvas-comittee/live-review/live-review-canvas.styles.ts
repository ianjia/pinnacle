import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
  },

  action: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  content: {
    flexGrow: 1,
    overflow: 'auto',
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
  },
});
