import { makeStyles, tokens } from "@fluentui/react-components";

export const useCanvasBackgroundStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground2,
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
