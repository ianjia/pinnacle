import { useDispatch } from 'react-redux';
import { logError } from '../../util';
import { Course, SchoolYear } from '../../shared';
import { courseService } from '../../components/component-service-proxy';
import { selectedProfileActions } from '../../store';

export function useCourseListLoader() {
    const dispatch = useDispatch();

    const loadCourseList = async (userId: number): Promise<void> => {
        try {
            // Step 1: Fetch all courses for the user
            const courses: Course[] = await courseService.getAllByUserId(userId);

            // Step 2: Filter courses based on the year
            const ninthGradeCourses = courses.filter(course => course.year === SchoolYear.NINTH);
            const tenthGradeCourses = courses.filter(course => course.year === SchoolYear.TENTH);
            const eleventhGradeCourses = courses.filter(course => course.year === SchoolYear.ELEVENTH);
            const twelfthGradeCourses = courses.filter(course => course.year === SchoolYear.TWELFTH);

            // Step 3: Dispatch actions to update the Redux store
            dispatch(selectedProfileActions.setNinthGradeCourseList(ninthGradeCourses));
            dispatch(selectedProfileActions.setTenthGradeCourseList(tenthGradeCourses));
            dispatch(selectedProfileActions.setEleventhGradeCourseList(eleventhGradeCourses));
            dispatch(selectedProfileActions.setTwelfthGradeCourseList(twelfthGradeCourses));
        } catch (error: unknown) {
            logError(error);
        }
    };

    return { loadCourseList };
}
