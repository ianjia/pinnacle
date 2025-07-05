import { makeStyles, tokens } from '@fluentui/react-components';

export const useLeftPaneStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    minHeight: 0,
  },

  railWrapper: {
    flexShrink: 0,
    width: '148px',                 // wider → no horizontal scroll
    overflowX: 'hidden',            // hide any sideways overflow
    overflowY: 'auto',
    overscrollBehaviorY: 'contain',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  content: {
    flexGrow: 1,
    overflowX: 'hidden',            // no horizontal bar here either
    overflowY: 'hidden',              // shows only when needed
    overscrollBehaviorY: 'contain',
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: 0,
  },
});
