import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  box: {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    /* wider padding for comfort */
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    overflowY: 'auto',
  },
  
  /* one message row (label + bubble on SAME line) */
  item: { marginBottom: tokens.spacingVerticalM },
  left: { textAlign: 'left' },
  right: { textAlign: 'right' },

  /* label in each row */
  label: {
    marginRight: tokens.spacingHorizontalS,   // ← gap between label & bubble
    fontWeight: tokens.fontWeightSemibold,
  },

  /* chat bubbles */
  bubble: {
    display: 'inline-block',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusXLarge,
    maxWidth: '70%',
    wordBreak: 'break-word',
    fontSize: tokens.fontSizeBase300,
  },

  bubbleInterviewer: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
  },

  bubbleYou: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForegroundOnBrand,
  },
});


