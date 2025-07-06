import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * Generic card layout reused by the Essay Prompt, Prompt Analysis,
 * Ideas Table and Essay Draft panels.
 *
 * `flexShrink: 0` guarantees each card keeps its natural height
 * inside the surrounding `flex‑column` container, so none of them
 * get squeezed when another card grows.
 */
export const useCardStyles = makeStyles({
  card: {
    flexShrink: 0,                                 // ← prevents squeezing
    /* flex: '0 0 auto' would have the same effect */

    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    marginBottom: tokens.spacingVerticalL,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  header: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
    textAlign: 'left',
    marginBottom: tokens.spacingVerticalXL,
  },
});
