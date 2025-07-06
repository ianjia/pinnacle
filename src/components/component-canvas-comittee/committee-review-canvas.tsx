/**
 * Switches between “Live review” and “History” canvases
 * depending on the active workshop set in Redux.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CommitteeReviewWorkshopType } from '../../shared';

import { LiveReviewCanvas } from './live-review/live-review-canvas';
import { CommitteeReviewHistoryMainContainer } from './history-review/committee-review-history-main-container';

export const CommitteeReviewCanvas: React.FC = () => {
  const active = useSelector(
    (s: RootState) => s.committeeReview.activeCommitteeReviewWorkshop
  );

  return active === CommitteeReviewWorkshopType.CurrentReview ? (
    <LiveReviewCanvas />
  ) : (
    <CommitteeReviewHistoryMainContainer />
  );
};
