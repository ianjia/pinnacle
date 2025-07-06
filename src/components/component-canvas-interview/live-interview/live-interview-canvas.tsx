import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import { useStyles } from './live-interview-canvas.styles';
import { InterviewActionPanel } from '../action-panel/interview-action-panel';
import { ConversationReviewContainer } from '../display-combined-container/conversation-review-container';

export const LiveInterviewCanvas: React.FC = () => {
  const styles = useStyles();

  /* live conversation + review pulled from Redux */
  const conversation = useSelector(
    (s: RootState) => s.conversation.liveConversationItems
  );
  const review = useSelector(
    (s: RootState) => s.conversation.liveConversationReview
  );

  return (
    <div className={styles.root}>
      {/* Action panel (start / stop / review) */}
      <div className={styles.action}>
        <InterviewActionPanel />
      </div>

      {/* Conversation ‑or‑ Review tabs */}
      <div className={styles.content}>
        <ConversationReviewContainer
          conversation={conversation}
          review={review}
        />
      </div>
    </div>
  );
};
