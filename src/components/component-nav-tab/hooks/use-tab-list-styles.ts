import { makeStyles, tokens } from '@fluentui/react-components';

export const useTabListStyles = makeStyles({
  rail: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    gap: tokens.spacingVerticalL,
  },

  tabList: {
    flexGrow: 1,
    overflowX: 'hidden',            // guarantee no horizontal bar
    overflowY: 'auto',
    minHeight: 0,
    gap: tokens.spacingVerticalL,

    '& .fui-Tab': {
      paddingInlineStart: tokens.spacingHorizontalM,
      paddingInlineEnd:   tokens.spacingHorizontalL,
    },
  },

  logoutButton: {
    alignSelf: 'center',
    width: '80%',
  },
});
