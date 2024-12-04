import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { Activity } from '../../shared';
import { activityService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useActivityListLoader() {
    const dispatch = useDispatch();

    const loadActivityList = async (userId: number): Promise<void> => {
        try {
            const activities: Activity[] = await activityService.getAllByUserId(userId);
            dispatch(selectedProfileActions.setActivityList(activities));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadActivityList };
}
