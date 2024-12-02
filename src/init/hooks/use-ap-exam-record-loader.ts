import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { ApExam, SchoolYear } from '../../shared';
import { apExamService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useApExamListLoader() {
    const dispatch = useDispatch();

    const loadApExamList = async (userId: number): Promise<void> => {
        try {
            // Step 1: Fetch all AP exams for the user
            const apExams: ApExam[] = await apExamService.getAllByUserId(userId);

            // Step 2: Filter exams based on the year
            const ninthGradeApExams = apExams.filter(exam => exam.year === SchoolYear.NINTH);
            const tenthGradeApExams = apExams.filter(exam => exam.year === SchoolYear.TENTH);
            const eleventhGradeApExams = apExams.filter(exam => exam.year === SchoolYear.ELEVENTH);
            const twelfthGradeApExams = apExams.filter(exam => exam.year === SchoolYear.TWELFTH);

            // Step 3: Dispatch actions to update the Redux store
            dispatch(selectedProfileActions.setNinthGradeApExamList(ninthGradeApExams));
            dispatch(selectedProfileActions.setTenthGradeApExamList(tenthGradeApExams));
            dispatch(selectedProfileActions.setEleventhGradeApExamList(eleventhGradeApExams));
            dispatch(selectedProfileActions.setTwelfthGradeApExamList(twelfthGradeApExams));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadApExamList };
}
