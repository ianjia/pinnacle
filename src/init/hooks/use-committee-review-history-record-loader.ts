import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { CommitteeReview } from '../../shared';
import { committeeReviewService } from '../../components/component-service-proxy';
import { committeeReviewActions } from '../../store';

export function useCommitteeReviewHistoryRecordLoader() {
    const dispatch = useDispatch();

    const loadCommitteeReviewHisotry = async (userId: number): Promise<void> => {
        try {
            const committeeReviewHistory: CommitteeReview[] = await committeeReviewService.getAllByUserId(userId);
            dispatch(committeeReviewActions.setCommitteeReviewHistory(committeeReviewHistory));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadCommitteeReviewHisotry };
}
