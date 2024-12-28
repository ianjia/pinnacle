import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CommitteeReviewWorkshopType, } from '../../shared';

import { LiveReviewCanvas } from './live-review/live-review-canvas';
import { CommitteeReviewHistoryMainContainer } from './history-review/committee-review-history-main-container';

import { useCanvasBackgroundStyles } from '../component-util';

export const CommitteeReviewCanvas: React.FC = () => {
    const activeWorkshop = useSelector((state: RootState) => state.committeeReview.activeCommitteeReviewWorkshop);

    const styles = useCanvasBackgroundStyles();

    return (
        <div className = {styles.container}>
            {activeWorkshop === CommitteeReviewWorkshopType.CurrentReview && <LiveReviewCanvas/>}
            {activeWorkshop === CommitteeReviewWorkshopType.ReviewHistory && <CommitteeReviewHistoryMainContainer/>}
        </div>
    );
};

