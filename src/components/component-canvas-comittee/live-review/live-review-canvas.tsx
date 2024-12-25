
import React from 'react';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';

import { useStyles } from './live-review-canvas.styles';
import { CommitteeReviewActionPanel } from '../action-panel/committee-review-action-panel';
import { ReviewDisplay } from '../../component-review-display/review-dislay';

export const LiveReviewCanvas: React.FC = () => {
    const review: string = useSelector((state: RootState) => state.committeeReview.liveReviewResult);
    const styles = useStyles();

    return (
    <div>
        <div className={styles.actionContainer}>
            <CommitteeReviewActionPanel/>
        </div>    
        <div className={styles.contentContainer}>
            <ReviewDisplay review={review} />
        </div>
    </div>
    );
};
