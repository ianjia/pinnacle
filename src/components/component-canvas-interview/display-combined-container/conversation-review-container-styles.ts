import { makeStyles, tokens } from '@fluentui/react-components';

export const useConversationReviewStyles = makeStyles({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,   // default Card surface
    padding: tokens.spacingHorizontalL,
  },
  tabList: { marginBottom: tokens.spacingVerticalL },
});


