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
            const examToDelete = apExams.filter(exam => !exam.name || exam.name.trim().length === 0);
            await Promise.all(examToDelete.map(exam => apExamService.deleteById(exam.id, userId))); // Delete all exams whose name is undefined or empty, they are invalid

            // Step 2: Filter exams based on the year
            const validExams = apExams.filter(exam => exam.name && exam.name.trim().length > 0);

            const ninthGradeApExams = validExams.filter(exam => exam.year === SchoolYear.NINTH);
            const tenthGradeApExams = validExams.filter(exam => exam.year === SchoolYear.TENTH);
            const eleventhGradeApExams = validExams.filter(exam => exam.year === SchoolYear.ELEVENTH);
            const twelfthGradeApExams = validExams.filter(exam => exam.year === SchoolYear.TWELFTH);

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
