import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    maxHeight: '100vh',
    overflowY: 'auto',
    padding: tokens.spacingHorizontalXL,
  },

  section: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,
  },
});
