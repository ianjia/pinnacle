import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, committeeReviewActions } from '../../../store';

import { CommitteeReview } from '../../../shared';
import { committeeReviewService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';
import { CommitteeReviewListTable } from './committee-review-list-table';
import { ReviewDisplay } from '../../component-review-display/review-dislay';

export const CommitteeReviewHistoryMainContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const reviewList = useSelector(
    (state: RootState) => state.committeeReview.committeeReviewHistory
  );

  // Keep track of which review is selected
  const [selectedReview, setSelectedReview] = useState<CommitteeReview | null>(null);

  // Deletion of a review from history
  const handleDeleteReview = (reviewId: number) => {
    dispatch(committeeReviewActions.deleteReviewFromHistory(reviewId));
    committeeReviewService.deleteById(reviewId, userId as number);

    // If the deleted review is the one selected, clear the selection
    if (selectedReview?.id === reviewId) {
      setSelectedReview(null);
    }
  };

  // Row selection
  const handleSelectReview = (review: CommitteeReview) => {
    setSelectedReview(review);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Render the table component */}
      <CommitteeReviewListTable
        reviews={reviewList}
        onSelect={handleSelectReview}
        onDelete={handleDeleteReview}
        selectedReviewId={selectedReview?.id}
      />

      {selectedReview && (
         <ReviewDisplay review={selectedReview.review} />
      )}
    </div>
  );
};
