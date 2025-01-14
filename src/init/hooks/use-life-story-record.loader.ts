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

            const storiesToDelete = lifeStories.filter(story => !story.name || story.name.trim().length === 0);
            for (const story of storiesToDelete) {
                await lifeStoryService.deleteById(story.id, userId);
            }

            const validStories = lifeStories.filter(story => story.name && story.name.trim().length > 0);

            dispatch(selectedProfileActions.setLifeStoryList(validStories));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadLifeStoryList };
}
