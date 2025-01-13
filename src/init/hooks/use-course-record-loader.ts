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

            // Delete in the background any course that has no valid `name`
            const coursesToDelete = courses.filter(course => !course.name || course.name.trim().length === 0);
            // Wait for all delete operations to complete
            await Promise.all(
                coursesToDelete.map(course => courseService.deleteById(course.id, userId))
            );

            // STEP 2: Filter out those invalid courses
            const validCourses = courses.filter(course => course.name && course.name.trim().length > 0);

            // Step 2: Filter courses based on the year (but now from validCourses!)
            const ninthGradeCourses = validCourses.filter(course => course.year === SchoolYear.NINTH);
            const tenthGradeCourses = validCourses.filter(course => course.year === SchoolYear.TENTH);
            const eleventhGradeCourses = validCourses.filter(course => course.year === SchoolYear.ELEVENTH);
            const twelfthGradeCourses = validCourses.filter(course => course.year === SchoolYear.TWELFTH);

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
