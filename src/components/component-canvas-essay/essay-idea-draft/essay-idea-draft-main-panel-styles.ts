import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    padding: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground1,
    height: '100%',
    overflow: 'auto',
  },
});