import React from 'react';
import { ReviewDisplayProps } from './review-display.types';
import { useStyles } from './review-display.styles';
import { MarkdownMessageDisplay } from '../../component-mark-down-display';

export const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ review }) => {
  const styles = useStyles();

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewBox}>
        <MarkdownMessageDisplay resultMessage={review} />
      </div>
    </div>
  );
};