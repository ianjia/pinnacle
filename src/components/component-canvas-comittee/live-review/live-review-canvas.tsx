import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import { useStyles } from './live-review-canvas.styles';
import { CommitteeReviewActionPanel } from '../action-panel/committee-review-action-panel';
import { ReviewDisplay } from '../../component-review-display/review-dislay';

export const LiveReviewCanvas: React.FC = () => {
  const styles = useStyles();
  const review = useSelector(
    (s: RootState) => s.committeeReview.liveReviewResult
  );

  return (
    <div className={styles.root}>
      {/* top action panel */}
      <div className={styles.action}>
        <CommitteeReviewActionPanel />
      </div>

      {/* review result */}
      <div className={styles.content}>
        <ReviewDisplay review={review} />
      </div>
    </div>
  );
};
