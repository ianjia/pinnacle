import { makeStyles, tokens } from "@fluentui/react-components";

export const useCanvasStyles = makeStyles({
  root: {
    height: '100%',
    overflow: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalXL,
  },
});