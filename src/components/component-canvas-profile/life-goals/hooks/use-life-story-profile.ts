import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../store';
import { useContext, useState } from 'react';
import { LifeStory } from '../../../../shared';
import { logError } from '../../../../util';
import { lifeStoryService } from '../../../component-service-proxy';
import { AuthContext } from '../../../../auth';

export const useLifeStoryProfile = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);

  const lifeStoryList = useSelector((state: RootState) => state.selectedProfile.lifeStoryList);
  const [title] = useState<string>('Life Stories');

  const onAddEntity = async () => {
    try {
      const newItem: LifeStory = {
        id: Date.now(), // temporary ID
        user_id: userId as number,
        name: undefined,
        description: undefined,
      };
      const id = await lifeStoryService.create(newItem);
      newItem.id = id;
      dispatch(selectedProfileActions.addLifeStory(newItem));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to add life story');
    }
  };

  const onUpdateEntity = async (updatedItem: LifeStory) => {
    try {
      await lifeStoryService.update(updatedItem);
      dispatch(
        selectedProfileActions.updateLifeStory({
          id: updatedItem.id,
          lifeStory: updatedItem,
        })
      );
    } catch (error: unknown) {
      logError(error);
      alert('Failed to update life story');
    }
  };

  const onDeleteEntity = async (id: number) => {
    try {
      await lifeStoryService.deleteById(id, userId as number);
      dispatch(selectedProfileActions.deleteLifeStory(id));
    } catch (error: unknown) {
      logError(error);
      alert('Failed to delete life story');
    }
  };

  return {
    title,
    lifeStoryList,
    onAddEntity,
    onUpdateEntity,
    onDeleteEntity,
  };
};
