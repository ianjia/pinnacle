// import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

// export const useLeftPaneStyles = makeStyles({
//   root: {
//     display: 'flex',
//     height: '100%',
//   },

//   railWrapper: {
//     flexShrink: 0,
//     width: '120px',                                    
//     backgroundColor: tokens.colorNeutralBackground2,   // panel tint
//     borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
//   },

//   content: {
//     flexGrow: 1,
//     backgroundColor: tokens.colorNeutralBackground1,   // main surface
//   },
// });


// hooks/use-left-pane-styles.ts
import { makeStyles, tokens } from '@fluentui/react-components';

export const useLeftPaneStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
  },

  railWrapper: {
    flexShrink: 0,
    width: '132px',                           // was 120 px → gives 12 px extra
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  content: {
    flexGrow: 1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});
