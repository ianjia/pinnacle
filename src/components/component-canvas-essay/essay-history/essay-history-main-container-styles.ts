import { makeStyles, tokens } from "@fluentui/react-components";

export const useContainerStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    width: '100%',
  },
});
