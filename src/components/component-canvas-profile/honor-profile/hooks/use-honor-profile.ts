import { useDispatch, useSelector } from 'react-redux';
import { alertDialogActions, RootState, selectedProfileActions } from '../../../../store';
import { useContext, useState } from 'react';
import { Honor } from '../../../../shared';
import { logError } from '../../../../util';
import { honorService } from '../../../component-service-proxy';
import { AuthContext } from '../../../../auth';

interface HonorProfileFormProps {
  honorList: Honor[];
  onAddHonor: () => void;
  onUpdateHonor: (honor: Honor) => void;
  onDeleteHonor: (id: number) => void;
}

export const useHonorProfile = (): HonorProfileFormProps => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const honorList = useSelector((state: RootState) => state.selectedProfile.honorList);


  const onAddHonor = async () => {
    try {
      const newHonor: Honor = {
        id: Date.now(), // Temporary ID
        user_id: userId as number,
        name: undefined,
        type: undefined,
        year: undefined,
        description: undefined,
      };
      const id = await honorService.create(newHonor);
      newHonor.id = id;
      dispatch(selectedProfileActions.addHonor(newHonor));
    } catch (error: unknown) {
      logError(error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Saving Error',
          message: 'Failed to save new honor record to backend.',
        })
      );
    }
  };

  const onUpdateHonor = async (updatedHonor: Honor) => {
    try {
      await honorService.update(updatedHonor);
      dispatch(
        selectedProfileActions.updateHonor({
          id: updatedHonor.id,
          honor: updatedHonor,
        })
      );
    } catch (error: unknown) {
      logError(error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Saving Error',
          message: 'Failed to save honor record update to backend.',
        })
      );
    }
  };

  const onDeleteHonor = async (id: number) => {
    try {
      await honorService.deleteById(id, userId as number);
      dispatch(selectedProfileActions.deleteHonor(id));
    } catch (error: unknown) {
      logError(error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Saving Error',
          message: 'Failed to delete honor record on backend.',
        })
      );
    }
  };

  return {
    honorList,
    onAddHonor,
    onUpdateHonor,
    onDeleteHonor,
  };
};
