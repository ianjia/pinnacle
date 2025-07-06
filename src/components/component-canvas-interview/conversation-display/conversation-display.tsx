import React, { useEffect, useRef } from 'react';
import { ConversationItem } from '../../../shared';
import { ConversationDisplayProps } from './conversation-display.types';
import { useStyles } from './conversation-display.styles';

/**
 * Scrollable chat transcript that auto‑scrolls to the latest message.
 */
export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  conversation,
}) => {
  const styles = useStyles();
  const endRef = useRef<HTMLDivElement>(null);

  /* auto‑scroll on update */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [conversation]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {conversation.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.item} ${
              msg.role === 'interviewer' ? styles.left : styles.right
            }`}
          >
            <strong className={styles.label}>
              {msg.role === 'interviewer' ? 'Interviewer' : 'You'}:
            </strong>
            <p
              className={`${styles.bubble} ${
                msg.role === 'interviewer'
                  ? styles.bubbleInterviewer
                  : styles.bubbleYou
              }`}
            >
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};
