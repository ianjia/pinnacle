import { useSelector, useDispatch } from 'react-redux';
import { collegePreferencesActions, RootState } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { NO_RECORD_FOUND } from '../../shared';
import { collegePreferenceService } from '../../components/component-service-proxy';

export function useCollegePrefRecordLoader() {
    const dispatch = useDispatch();
    const collegePreferences = useSelector((state: RootState) => state.collegePreferences.collegePreferences);

    const loadCollegePrefRecord= async (userId: number): Promise<void> => {
        try {
            const data = await collegePreferenceService.getById(userId);
            dispatch(collegePreferencesActions.setCollegePreferences(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    dispatch(collegePreferencesActions.updateUserId(userId));
                    const updatedCollegePrefRecord = {
                        ...collegePreferences,
                        user_id: userId // Manually ensure the id is up-to-date
                    }
                    try {
                        await collegePreferenceService.create(updatedCollegePrefRecord);
                    } catch (e: unknown) {
                        logError(e);
                    }
                }
            }
            logError(error);
        }
    };

    return { loadCollegePrefRecord };
}
