import React, { useEffect, useRef } from 'react';
import { useStyles } from './conversation-display.styles';
import { ConversationItem } from '../../../shared';
import { ConversationDisplayProps } from './conversation-display.types';

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({ conversation }) => {
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const styles = useStyles();

  // Auto-scroll to bottom whenever the conversation updates
  useEffect(() => {
    if (conversationEndRef.current) {
        conversationEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',  // <- prevents the document from jumping
      });    
    }
  }, [conversation]);

  return (
    <div className={styles.conversationContainer}>
      <div className={styles.conversationBox}>
        {conversation.map((item: ConversationItem, index: number) => (
          <div
            key={index}
            className={`${styles.conversationItem} ${
              item.role === 'interviewer' ? styles.left : styles.right
            }`}
          >
            <strong>{item.role === 'interviewer' ? 'Interviewer' : 'You'}:</strong>
            <p
              className={`${styles.message} ${
                item.role === 'interviewer' ? styles.interviewer : styles.you
              }`}
            >
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