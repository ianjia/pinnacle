import { makeStyles, tokens } from '@fluentui/react-components';

export const useLeftPaneStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    minHeight: 0,
  },

  /* rail wrapper ­– owns the full height and never scrolls itself */
  railWrapper: {
    display: 'flex',                 // <─ NEW (makes children stretch)
    flexDirection: 'column',
    flexShrink: 0,
    width: '148px',                  // wider → no horizontal scroll
    height: '100%',                  // <─ NEW
    overflow: 'hidden',              // <─ replaces previous overflowY:auto
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    /* keep only a small top gap */
    padding: `${tokens.spacingHorizontalL} ${tokens.spacingHorizontalS} 0`,
  },

  content: {
    flexGrow: 1,
    overflow: 'hidden',
    overscrollBehaviorY: 'contain',
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: 0,
  },
});
