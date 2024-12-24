import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabList, Tab, SelectTabEvent, SelectTabData, Card } from '@fluentui/react-components';
import { ConversationDisplay } from '../conversation-display/conversation-display';
import { ReviewDisplay } from '../review-display/review-dislay';
import { ConversationDisplayProps } from '../conversation-display/conversation-display.types';
import { ReviewDisplayProps } from '../review-display/review-display.types';
import { interviewConversationActions, RootState } from '../../../store';
import { LiveConversationDisplayType } from '../../../shared';

type CombinedContainerProps = ConversationDisplayProps & ReviewDisplayProps;
  
export const ConversationReviewContainer: React.FC<CombinedContainerProps> = ({
  conversation,
  review
}) => {
  const dispatch = useDispatch();

  // Get the active conversation display from Redux
  const activeConversationDisplay = useSelector(
    (state: RootState) => state.conversation.activeConversationDisplay
  );

  // When a tab is selected, dispatch an action to update Redux state
  const onTabSelect = (event: SelectTabEvent<HTMLElement>, data: SelectTabData) => {
    if (data.value === 'conversation') {
      dispatch(interviewConversationActions.setActiveConversationDisplay(LiveConversationDisplayType.Conversation));
    } else {
      dispatch(interviewConversationActions.setActiveConversationDisplay(LiveConversationDisplayType.Review));
    }
  };

  return (
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TabList
        // map enum to string value for selectedValue
        selectedValue={activeConversationDisplay === LiveConversationDisplayType.Conversation ? 'conversation' : 'review'}
        onTabSelect={onTabSelect}
        style={{ marginBottom: '16px' }}
      >
        <Tab value="conversation">Conversation</Tab>
        <Tab value="review">Review</Tab>
      </TabList>

      {activeConversationDisplay === LiveConversationDisplayType.Conversation && (
        <ConversationDisplay conversation={conversation} />
      )}
      {activeConversationDisplay === LiveConversationDisplayType.Review && (
        <ReviewDisplay review={review} />
      )}
    </Card>
  );
};
