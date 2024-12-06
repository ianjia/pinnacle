import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../store';
import { useContext, useState } from 'react';
import { Activity } from '../../../../shared';
import { logError } from '../../../../util';
import { activityService } from '../../../component-service-proxy';
import { AuthContext } from '../../../../auth';

export interface ActivityProfileFormProps {
    title: string;
    activityList: Activity[];
    onAddActivity: () => void;
    onUpdateActivity: (activity: Activity) => void;
    onDeleteActivity: (id: number) => void;
  }  

export const useActivityProfile = () : ActivityProfileFormProps => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const activityList = useSelector(
    (state: RootState) => state.selectedProfile.activityList
  );

  const [title] = useState<string>('Activities');

  const onAddActivity = async () => {
    try {
      const newActivity: Activity = {
        id: Date.now(), // Temporary ID
        user_id: userId as number,
        name: undefined,
        type: undefined,
        startDate: undefined,
        endDate: undefined,
        description: undefined,
        achievement: undefined,
      };
      const id = await activityService.create(newActivity);
      newActivity.id = id;
      dispatch(selectedProfileActions.addActivity(newActivity));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to add activity');
    }
  };

  const onUpdateActivity = async (updatedActivity: Activity) => {
    try {
      await activityService.update(updatedActivity);
      dispatch(
        selectedProfileActions.updateActivity({
          id: updatedActivity.id,
          activity: updatedActivity,
        })
      );
    } catch (error: unknown) {
      logError(error);
      alert('Failed to update activity');
    }
  };

  const onDeleteActivity = async (id: number) => {
    try {
      await activityService.deleteById(id);
      dispatch(selectedProfileActions.deleteActivity(id));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to delete activity');
    }
  };

  return {
    title,
    activityList,
    onAddActivity,
    onUpdateActivity,
    onDeleteActivity,
  };
};
