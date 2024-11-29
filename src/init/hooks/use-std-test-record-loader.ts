import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { NO_RECORD_FOUND } from '../../shared';
import { stdTestService } from '../../components/component-service-proxy';

export function useStdTestRecordLoader() {
    const dispatch = useDispatch();
    const stdTestRecord = useSelector((state: RootState) => state.selectedProfile.standardizedTest);

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
                    dispatch(selectedProfileActions.updateStandardizedTestField({ field: 'id', value: userId }));

                    // Retrieve the updated state after dispatch
                    const updatedStdTestRecord = {
                        ...stdTestRecord,
                        id: userId, // Manually ensure the id is up-to-date
                    };

                    try {
                        // Pass the updated record to the create API
                        await stdTestService.create(updatedStdTestRecord);
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
