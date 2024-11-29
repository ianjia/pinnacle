import { useGpaRecordLoader } from "./use-gpa-record-loader";
import { useStdTestRecordLoader } from "./use-std-test-record-loader";
import { useStudentProfileLoader } from "./use-student-profile-loader";

export function useLoadData() {
    const { loadStudentProfile } = useStudentProfileLoader();
    const { loadStdTestRecordProfile } = useStdTestRecordLoader();
    const { loadGpaRecordProfile } = useGpaRecordLoader();

    // Return a callable function
    return async (userId: number): Promise<void> => {
        await loadGpaRecordProfile(userId);
        await loadStdTestRecordProfile(userId);
        await loadStudentProfile(userId);
    };
}
