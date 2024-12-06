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
            dispatch(selectedProfileActions.setHonorList(honors));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadHonorList };
}
