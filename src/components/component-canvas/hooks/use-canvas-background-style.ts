import { makeStyles, tokens } from '@fluentui/react-components';

export const useCanvasBackgroundStyles = makeStyles({
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',                    // canvas scrolls independently
    overscrollBehaviorY: 'contain',
    minHeight: 0,
    backgroundColor: tokens.colorNeutralBackground2,
    backgroundPosition: 'center',
  },
});
