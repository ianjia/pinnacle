import { useDispatch } from 'react-redux';
import { selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { NO_RECORD_FOUND, StandardizedTest } from '../../shared';
import { stdTestService } from '../../components/component-service-proxy';

export function useStdTestRecordLoader() {
    const dispatch = useDispatch();
    const loadStdTestRecordProfile = async (userId: number): Promise<void> => {
        try {
            // Attempt to fetch the record by userId
            const data = await stdTestService.getById(userId);
            dispatch(selectedProfileActions.setStdTestRecord(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle the case where no record is found
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    // Update the Redux store with the new userId
                    dispatch(selectedProfileActions.updateStandardizedTestField({ field: 'user_id', value: userId }));

                    const blankStdTestRecord: StandardizedTest = {user_id: userId}

                    try {
                        // Pass the updated record to the create API
                        await stdTestService.create(blankStdTestRecord);
                    } catch (e: unknown) {
                        logError(e);
                    }
                }
            }
            // Log the error for other cases
            logError(error);
        }
    };

    return { loadStdTestRecordProfile };
}
