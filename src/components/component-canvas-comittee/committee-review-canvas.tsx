import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CommitteeReviewWorkshopType, } from '../../shared';

import { LiveReviewCanvas } from './live-review/live-review-canvas';
import { CommitteeReviewHistoryMainContainer } from './history-review/committee-review-history-main-container';

import './committee-review-canvas.css';

export const CommitteeReviewCanvas: React.FC = () => {
    const activeWorkshop = useSelector((state: RootState) => state.committeeReview.activeCommitteeReviewWorkshop);

    return (
        <div className="review-background">
            {activeWorkshop === CommitteeReviewWorkshopType.CurrentReview && <LiveReviewCanvas/>}
            {activeWorkshop === CommitteeReviewWorkshopType.ReviewHistory && <CommitteeReviewHistoryMainContainer/>}
        </div>
    );
};

