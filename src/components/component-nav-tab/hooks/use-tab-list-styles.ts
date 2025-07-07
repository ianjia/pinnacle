import { makeStyles, tokens } from '@fluentui/react-components';

export const useTabListStyles = makeStyles({
  /* sidebar rail */
  rail: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },

  /* vertical tab list */
  tabList: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: 'auto',
    '& .fui-Tab:not(:last-child)': { marginBottom: tokens.spacingVerticalL },

    '& .fui-Tab': {
      width: '100%',
      justifyContent: 'flex-start',
      paddingInlineStart: tokens.spacingHorizontalM,
      paddingInlineEnd:   tokens.spacingHorizontalL,
      paddingBlock:       tokens.spacingVerticalS,
      '&:hover':  { backgroundColor: tokens.colorSubtleBackgroundHover   },
      '&:active': { backgroundColor: tokens.colorSubtleBackgroundPressed },
      '&[data-selected="true"]': {
        backgroundColor: tokens.colorSubtleBackgroundSelected,
      },
    },
  },

  /* footer cluster */
  bottomArea: {
    marginTop: 'auto',
    marginBottom: tokens.spacingVerticalXL,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    paddingBottom: `calc(${tokens.spacingVerticalXL} + ${tokens.spacingVerticalXL})`,
  },

  avatarBtn: {},

  themeSwitch: { width: '80%' },   // same alignment as buttons
  logoutButton: { width: '80%' },

  /* avatar-picker grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 56px)',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'center',
    paddingTop: tokens.spacingVerticalM,
  },
});
