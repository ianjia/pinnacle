import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../store';
import { useContext, useState } from 'react';
import { AcademicCareerGoal } from '../../../../shared';
import { logError } from '../../../../util';
import { careerGoalService } from '../../../component-service-proxy';
import { AuthContext } from '../../../../auth';

export const useCareerGoalProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const careerGoalList = useSelector((state: RootState) => state.selectedProfile.careerGoalList);
  const [title] = useState<string>('Academic Career Goals');

  const onAddEntity = async () => {
    try {
      const newItem: AcademicCareerGoal = {
        id: Date.now(), // temporary ID
        user_id: userId as number,
        name: undefined,
        description: undefined,
      };
      const id = await careerGoalService.create(newItem);
      newItem.id = id;
      dispatch(selectedProfileActions.addCareerGoal(newItem));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to add career goal');
    }
  };

  const onUpdateEntity = async (updatedItem: AcademicCareerGoal) => {
    try {
      await careerGoalService.update(updatedItem);
      dispatch(
        selectedProfileActions.updateCareerGoal({
          id: updatedItem.id,
          careerGoal: updatedItem,
        })
      );
    } catch (error: unknown) {
      logError(error);
      alert('Failed to update career goal');
    }
  };

  const onDeleteEntity = async (id: number) => {
    try {
      await careerGoalService.deleteById(id);
      dispatch(selectedProfileActions.deleteCareerGoal(id));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to delete career goal');
    }
  };

  return {
    title,
    careerGoalList,
    onAddEntity,
    onUpdateEntity,
    onDeleteEntity,
  };
};
