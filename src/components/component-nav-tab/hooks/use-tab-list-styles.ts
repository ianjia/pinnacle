/*  src/components/component-nav-tab/hooks/use-tab-list-styles.ts
    ───────────────────────────────────────────────────────────── */

import { makeStyles, tokens } from '@fluentui/react-components';

export const useTabListStyles = makeStyles({
  /* ── sidebar rail ───────────────────────────────────────────── */
  rail: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },

  /* ── vertical TabList (scrolls if needed) ───────────────────── */
  tabList: {
    flexGrow: 1,
    minHeight: 0,
    overflowX: 'hidden',
    overflowY: 'auto',

    /* spacing between items via margin, not gap, to keep overlay wide */
    '& .fui-Tab:not(:last-child)': {
      marginBottom: tokens.spacingVerticalL,
    },

    /* ---------- tab root ---------- */
    '& .fui-Tab': {
      /* make the overlay span the full rail width */
      width: '100%',
      justifyContent: 'flex-start',

      paddingInlineStart: tokens.spacingHorizontalM,
      paddingInlineEnd:   tokens.spacingHorizontalL,
      paddingBlock:       tokens.spacingVerticalS,

      /* ---------- interactive states ---------- */
      /* hover */
      '&:hover': {
        backgroundColor: tokens.colorSubtleBackgroundHover,
      },
      /* pressed / active */
      '&:active': {
        backgroundColor: tokens.colorSubtleBackgroundPressed,
      },
      /* selected */
      '&[data-selected="true"]': {
        backgroundColor: tokens.colorSubtleBackgroundSelected,
      },
    },
  },

  /* ── footer (avatar + logout) ───────────────────────────────── */
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

  logoutButton: {
    width: '80%',
  },

  /* grid used inside the avatar-picker dialog */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 56px)',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'center',
    paddingTop: tokens.spacingVerticalM,
  },
});
