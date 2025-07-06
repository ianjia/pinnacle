import React from 'react';
import { ReviewDisplayProps } from './review-display.types';
import { useStyles } from './review-display.styles';
import { MarkdownMessageDisplay } from '../component-mark-down-display';

/** Shows a markdown review inside a theme‑aware surface. */
export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ review }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        {review && <MarkdownMessageDisplay resultMessage={review} />}
      </div>
    </div>
  );
};
