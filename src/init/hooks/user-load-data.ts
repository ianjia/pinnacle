import { useCareerGoalListLoader } from "./use-career-goal-record.loader";
import { useActivityListLoader } from "./use-activity-record-loader";
import { useApExamListLoader } from "./use-ap-exam-record-loader";
import { useCourseListLoader } from "./use-course-record-loader";
import { useGpaRecordLoader } from "./use-gpa-record-loader";
import { useHonorListLoader } from "./use-honor-record-loader";
import { useLifeStoryListLoader } from "./use-life-story-record.loader";
import { useStdTestRecordLoader } from "./use-std-test-record-loader";
import { useStudentProfileLoader } from "./use-student-profile-loader";
import { useCollegePrefRecordLoader } from "./use-college-pref-record-loader";
import { useInterviewHistoryRecordLoader } from "./use-interview-history-record-loader";
import { useCommitteeReviewHistoryRecordLoader } from "./use-committee-review-history-record-loader";
import { useCollegeListRecordLoader } from "./use-college-list-record-loader";
import { useEssayRecordLoader } from "./use-essay-record-loader";
import { useApplyDecisionLoader } from "./use-apply-decision-record-loader";

export function useLoadData() {
    const { loadStudentProfile } = useStudentProfileLoader();
    const { loadStdTestRecordProfile } = useStdTestRecordLoader();
    const { loadGpaRecordProfile } = useGpaRecordLoader();
    const { loadCourseList } = useCourseListLoader();
    const { loadApExamList } = useApExamListLoader();
    const { loadActivityList } = useActivityListLoader();
    const { loadHonorList } = useHonorListLoader();
    const { loadLifeStoryList} = useLifeStoryListLoader();
    const { loadCareerGoalList } = useCareerGoalListLoader();
    const { loadCollegePrefRecord } = useCollegePrefRecordLoader();
    const { loadInterviewHisotry } = useInterviewHistoryRecordLoader();
    const { loadCommitteeReviewHisotry } = useCommitteeReviewHistoryRecordLoader();
    const { loadCollegeList } = useCollegeListRecordLoader();
    const { loadEssayRecords } = useEssayRecordLoader();
    const { loadApplyDecision} = useApplyDecisionLoader();

    // Return a callable function
    return async (userId: number): Promise<void> => {
        // Need to load student profile first, as if no student profile, needs to create as other record depends on it (on database side, some other tables user user_id in stduent table as foreign key)
        await loadStudentProfile(userId); 
        await loadGpaRecordProfile(userId);
        await loadStdTestRecordProfile(userId);
        await loadCourseList(userId);
        await loadApExamList(userId);
        await loadActivityList(userId);
        await loadHonorList(userId);
        await loadLifeStoryList(userId);
        await loadCareerGoalList(userId);
        await loadCollegePrefRecord(userId);
        await loadInterviewHisotry(userId);
        await loadCommitteeReviewHisotry(userId);
        await loadCollegeList(userId);
        await loadEssayRecords(userId);
        await loadApplyDecision(userId);
    };
}
