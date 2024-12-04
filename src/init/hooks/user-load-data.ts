import { useActivityListLoader } from "./use-activity-record-loader";
import { useApExamListLoader } from "./use-ap-exam-record-loader";
import { useCourseListLoader } from "./use-course-record-loader";
import { useGpaRecordLoader } from "./use-gpa-record-loader";
import { useStdTestRecordLoader } from "./use-std-test-record-loader";
import { useStudentProfileLoader } from "./use-student-profile-loader";

export function useLoadData() {
    const { loadStudentProfile } = useStudentProfileLoader();
    const { loadStdTestRecordProfile } = useStdTestRecordLoader();
    const { loadGpaRecordProfile } = useGpaRecordLoader();
    const { loadCourseList } = useCourseListLoader();
    const { loadApExamList } = useApExamListLoader();
    const { loadActivityList } = useActivityListLoader();

    // Return a callable function
    return async (userId: number): Promise<void> => {
        await loadGpaRecordProfile(userId);
        await loadStdTestRecordProfile(userId);
        await loadStudentProfile(userId);
        await loadCourseList(userId);
        await loadApExamList(userId);
        await loadActivityList(userId);
    };
}
