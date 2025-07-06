import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  Card,
} from '@fluentui/react-components';

import { ConversationDisplay } from '../conversation-display/conversation-display';
import { ReviewDisplay } from '../../component-review-display/review-dislay';
import { ConversationDisplayProps } from '../conversation-display/conversation-display.types';
import { ReviewDisplayProps } from '../../component-review-display/review-display.types';
import { interviewConversationActions, RootState } from '../../../store';
import { LiveConversationDisplayType } from '../../../shared';
import { useConversationReviewStyles } from './conversation-review-container-styles';

type CombinedProps = ConversationDisplayProps & ReviewDisplayProps;

export const ConversationReviewContainer: React.FC<CombinedProps> = ({
  conversation,
  review,
}) => {
  const styles = useConversationReviewStyles();
  const dispatch = useDispatch();

  const active = useSelector(
    (s: RootState) => s.conversation.activeConversationDisplay
  );

  const onTabSelect = (
    _e: SelectTabEvent<HTMLElement>,
    d: SelectTabData
  ) => {
    dispatch(
      interviewConversationActions.setActiveConversationDisplay(
        d.value === 'conversation'
          ? LiveConversationDisplayType.Conversation
          : LiveConversationDisplayType.Review
      )
    );
  };

  return (
    <Card className={styles.card}>
      <TabList
        selectedValue={
          active === LiveConversationDisplayType.Conversation
            ? 'conversation'
            : 'review'
        }
        onTabSelect={onTabSelect}
        className={styles.tabList}
      >
        <Tab value="conversation">Conversation</Tab>
        <Tab value="review">Review</Tab>
      </TabList>

      {active === LiveConversationDisplayType.Conversation ? (
        <ConversationDisplay conversation={conversation} />
      ) : (
        <ReviewDisplay review={review} />
      )}
    </Card>
  );
};
