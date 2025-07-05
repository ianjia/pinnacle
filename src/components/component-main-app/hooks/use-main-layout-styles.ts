import { makeStyles, tokens } from '@fluentui/react-components';

export const useMainLayoutStyles = makeStyles({
  /* ---------- outer container ---------- */
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',                      // fills the viewport
    padding: tokens.spacingHorizontalL,
  },

  /* ---------- shared column styles ----- */
  column: {
    display: 'flex',                      // let children stack vertically
    flexDirection: 'column',
    minHeight: 0,                         // enable scrolling inside children
    padding: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  /* ---------- specialisations ---------- */
  leftColumn: {
    flexBasis: '400px',
    flexShrink: 0,
    flexGrow: 0,                          // fixed-width sidebar
  },

  rightColumn: {
    flexGrow: 1,                          // fills remaining space
  },
});
