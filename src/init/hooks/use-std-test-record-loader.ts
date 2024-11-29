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
            const data = await stdTestService.getById(userId);
            dispatch(selectedProfileActions.setStdTestRecord(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    dispatch(selectedProfileActions.updateStandardizedTestField({ field: 'id', value: userId }));
                    try {
                        await stdTestService.create(stdTestRecord);
                    } catch (e: unknown) {
                        logError(e);
                    }
                }
            }
            logError(error);
        }
    };

    return { loadStdTestRecordProfile };
}
