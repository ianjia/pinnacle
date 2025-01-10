import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { Essay } from '../../shared';
import { essayDataService } from '../../components/component-service-proxy';
import { essayWorkshopActions } from '../../store';

export function useEssayRecordLoader() {
    const dispatch = useDispatch();

    const loadEssayRecords = async (userId: number): Promise<void> => {
        try {
            const essays: Essay[] = await essayDataService.getAllByUserId(userId);
            dispatch(essayWorkshopActions.setEssayHistory(essays));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadEssayRecords };
}
