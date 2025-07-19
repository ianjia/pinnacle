import { useDispatch } from 'react-redux';
import { studentService } from "../../components/component-service-proxy";
import { selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';
import { NO_RECORD_FOUND, StudentProfile } from '../../shared';

export function useStudentProfileLoader() {
    const dispatch = useDispatch();

    const loadStudentProfile = async (userId: number): Promise<void> => {
        try {
            const data = await studentService.getById(userId);
            dispatch(selectedProfileActions.setStudentData(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === NO_RECORD_FOUND) {
                    dispatch(selectedProfileActions.updateStudentField({ field: 'user_id', value: userId }));

                    const blankStudent: StudentProfile = {user_id: userId}

                    try {
                        await studentService.create(blankStudent);
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
