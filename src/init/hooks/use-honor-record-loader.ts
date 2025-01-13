import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { Honor } from '../../shared';
import { honorService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useHonorListLoader() {
    const dispatch = useDispatch();

    const loadHonorList = async (userId: number): Promise<void> => {
        try {
            const honors: Honor[] = await honorService.getAllByUserId(userId);

            const honorsToDelete = honors.filter(honor => !honor.name || honor.name.trim().length == 0);
            for (const honor of honorsToDelete) {
                await honorService.deleteById(honor.id, userId);
            }

            const validHonors = honors.filter(honor => honor.name && honor.name.trim().length > 0);            


            dispatch(selectedProfileActions.setHonorList(validHonors));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadHonorList };
}
