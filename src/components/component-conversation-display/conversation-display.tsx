import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './conversation-display.css';

interface ConversationItem {
  role: string;
  content: string;
}

export const ConversationDisplay: React.FC = () => {
  const conversation = useSelector((state: RootState) => state.conversation.conversation);

  const conversationEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever the conversation updates
  useEffect(() => {
    if (conversationEndRef.current) {
      // Using 'smooth' scroll behavior for a nicer user experience
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  return (
    <div className="conversation-container">
      <h2>Conversation:</h2>
      <div className="conversation-box">
        {conversation.map((item: ConversationItem, index: number) => (
          <div
            key={index}
            className={`conversation-item ${item.role === 'interviewer' ? 'left' : 'right'}`}
          >
            <strong>{item.role === 'interviewer' ? 'Interviewer' : 'You'}:</strong>
            <p className={`message ${item.role === 'interviewer' ? 'interviewer' : 'you'}`}>
              {item.content}
            </p>
          </div>
        ))}
        {/* Invisible div to anchor scrolling */}
        <div ref={conversationEndRef} />
      </div>
    </div>
  );
};
