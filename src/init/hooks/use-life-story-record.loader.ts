import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { LifeStory } from '../../shared';
import { lifeStoryService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useLifeStoryListLoader() {
    const dispatch = useDispatch();

    const loadLifeStoryList = async (userId: number): Promise<void> => {
        try {
            const lifeStories: LifeStory[] = await lifeStoryService.getAllByUserId(userId);
            dispatch(selectedProfileActions.setLifeStoryList(lifeStories));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadLifeStoryList };
}
