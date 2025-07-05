import { makeStyles, tokens } from '@fluentui/react-components';

export const useLeftContentPaneStyles = makeStyles({
  container: {
    margin: 0,
    padding: tokens.spacingHorizontalM,  // consistent internal gap
    height: '100%',
    // overflowY: 'auto',
  },
});
