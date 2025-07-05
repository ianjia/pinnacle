import { makeStyles, tokens } from '@fluentui/react-components';

export const useMainLayoutStyles = makeStyles({
  /* ------------- outer container ------------------------------------ */
  container: {
    display: 'flex',
    width: '100%',

    /* large base padding → spacingHorizontalL = “24px” by default */
    padding: tokens.spacingHorizontalL,
  },

  /* ------------- shared column styles ------------------------------- */
  column: {
    /* internal spacing */
    padding: '8px',

    /* subtle outline that adapts to light / dark theme */
    border: `1px solid ${tokens.colorNeutralStroke2}`,

    /* neutral surface */
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* ------------- specialisations ------------------------------------ */
  leftColumn: {
    flexBasis: '400px',
    flexShrink: 0,
    flexGrow: 0,   // fixed-width sidebar,
  },

  rightColumn: {
    flexGrow: 1,   // fill remaining space
  },
});
