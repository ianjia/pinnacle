import { useSelector, useDispatch } from 'react-redux';
import { studentService } from "../../components/component-service-proxy";
import { RootState, selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { NO_RECORD_FOUND } from '../../shared';

export function useStudentProfileLoader() {
    const dispatch = useDispatch();
    const student = useSelector((state: RootState) => state.selectedProfile.studentData);

    const loadStudentProfile = async (userId: number): Promise<void> => {
        try {
            const data = await studentService.getById(userId);
            dispatch(selectedProfileActions.setStudentData(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    dispatch(selectedProfileActions.updateStudentField({ field: 'id', value: userId }));

                    // Retrieve the updated state after dispatch
                    const updatedStudentRecord = {
                        ...student,
                        id: userId, // Manually ensure the id is up-to-date
                    };

                    try {
                        await studentService.create(updatedStudentRecord);
                    } catch (e: unknown) {
                        logError(e);
                    }
                }
            }
            logError(error);
        }
    };

    return { loadStudentProfile };
}
