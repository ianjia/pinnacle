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

            const activitiesToDelete = activities.filter(activity => !activity.name || activity.name.trim().length === 0);
            for (const activity of activitiesToDelete) {
                await activityService.deleteById(activity.id, userId);
            }

            const validActivities = activities.filter(activity => activity.name && activity.name.trim().length > 0);

            dispatch(selectedProfileActions.setActivityList(validActivities));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadActivityList };
}
