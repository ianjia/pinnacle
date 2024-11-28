import { useStudentProfileLoader } from "./use-student-profile-loader";

export function useLoadData() {
    const { loadStudentProfile } = useStudentProfileLoader();

    // Return a callable function
    return async (userId: number): Promise<void> => {
        await loadStudentProfile(userId);
    };
}
