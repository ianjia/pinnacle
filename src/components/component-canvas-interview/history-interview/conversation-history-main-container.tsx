import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, interviewConversationActions } from '../../../store';

import { Conversation } from '../../../shared';
import { ConversationListTable } from './conversation-list-table';
import { ConversationReviewContainer } from '../display-combined-container/conversation-review-container';
import { conversationService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';
import { useStyles } from './conversation-list-table.styles';   // <— same style hook

export const ConversationHistoryMainContainer: React.FC = () => {
  const styles   = useStyles();
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const conversationList = useSelector(
    (s: RootState) => s.conversation.interviewHistoryList
  );

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  /* ── delete from server + store ── */
  const handleDeleteConversation = (id: number) => {
    dispatch(interviewConversationActions.deleteInterviewFromHistory(id));
    conversationService.deleteById(id, userId as number);
    if (selectedConversation?.id === id) setSelectedConversation(null);
  };

  /* ── row select ── */
  const handleSelectConversation = (conv: Conversation) => setSelectedConversation(conv);

  return (
    <div className={styles.container}>
      <ConversationListTable
        conversations={conversationList}
        onSelect={handleSelectConversation}
        onDelete={handleDeleteConversation}
        selectedConversationId={selectedConversation?.id}
      />

      {selectedConversation && (
        <ConversationReviewContainer
          conversation={selectedConversation.messages}
          review={selectedConversation.review}
        />
      )}
    </div>
  );
};
