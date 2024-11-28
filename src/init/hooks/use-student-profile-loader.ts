import { useSelector, useDispatch } from 'react-redux';
import { createStudent, getStudent } from "../../components/component-service-proxy";
import { RootState, selectedProfileActions } from "../../store";
import axios from 'axios';
import { logError } from '../../util';

export function useStudentProfileLoader() {
    const dispatch = useDispatch();
    const student = useSelector((state: RootState) => state.selectedProfile.studentData);

    const loadStudentProfile = async (userId: number): Promise<void> => {
        try {
            const data = await getStudent(userId);
            dispatch(selectedProfileActions.setStudentData(data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 404 && error.response.data.detail === "Student not found") {
                    dispatch(selectedProfileActions.updateStudentField({ field: 'id', value: userId }));
                    try {
                        await createStudent(student);
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
