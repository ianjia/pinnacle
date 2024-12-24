import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, interviewConversationActions } from '../../../store';

import { Conversation } from '../../../shared';
import { ConversationListTable } from './conversation-list-table';
import { ConversationReviewContainer } from '../display-combined-container/converstation-review-container';
import { conversationService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';

/**
 * Container component that renders both the ConversationListTable (left/upper portion)
 * and the ConversationReviewContainer (right/lower portion or whichever layout you prefer).
 */
export const ConversationHistoryMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  // Retrieve the conversation list from Redux store
  const conversationList = useSelector(
    (state: RootState) => state.conversation.interviewHistoryList
  );

  // Keep track of which conversation is selected
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Deletion of a conversation from interview history
  const handleDeleteConversation = (conversationId: number) => {
    dispatch(interviewConversationActions.deleteInterviewFromHistory(conversationId));

    conversationService.deleteById(conversationId, userId as number);
    
    // If the deleted conversation is the one selected, clear the selection
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null);
    }
  };

  // Row selection
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Render the table component */}
      <ConversationListTable
        conversations={conversationList}
        onSelect={handleSelectConversation}
        onDelete={handleDeleteConversation}
        selectedConversationId={selectedConversation?.id}
      />

      {/* Render the ConversationReviewContainer based on selection */}
      {selectedConversation && (
        <ConversationReviewContainer
          conversation={selectedConversation.messages}
          review={selectedConversation.review}
        />
      )}
    </div>
  );
};
