import { useDispatch } from 'react-redux';
import { selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { GPA, NO_RECORD_FOUND } from '../../shared';
import { gpaService } from '../../components/component-service-proxy';

export function useGpaRecordLoader() {
    const dispatch = useDispatch();

    const loadGpaRecordProfile = async (userId: number): Promise<void> => {
        try {
            const data = await gpaService.getById(userId);
            dispatch(selectedProfileActions.setGpaRecord(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    dispatch(selectedProfileActions.updateGpaField({ field: 'user_id', value: userId }));

                    const blankGpaRecord: GPA = {user_id: userId}

                    try {
                        await gpaService.create(blankGpaRecord);
                    } catch (e: unknown) {
                        logError(e);
                    }
                }
            }
            logError(error);
        }
    };

    return { loadGpaRecordProfile };
}
