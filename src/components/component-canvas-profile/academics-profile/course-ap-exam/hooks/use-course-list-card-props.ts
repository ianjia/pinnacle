import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../../store';
import { Course, SchoolYear } from "../../../../../shared";
import { CourseListCardProps } from "../data-list-types";

export function useCourseListCardProps(grade: SchoolYear): CourseListCardProps {
    const dispatch = useDispatch();
  
    const gradeMapping = {
      [SchoolYear.NINTH]: {
        courseListSelector: (state: RootState) => state.selectedProfile.ninthGradeCourseList,
        addAction: selectedProfileActions.addNinthGradeCourse,
        updateAction: selectedProfileActions.updateNinthGradeCourse,
        deleteAction: selectedProfileActions.deleteNinthGradeCourse,
      },
      [SchoolYear.TENTH]: {
        courseListSelector: (state: RootState) => state.selectedProfile.tenthGradeCourseList,
        addAction: selectedProfileActions.addTenthGradeCourse,
        updateAction: selectedProfileActions.updateTenthGradeCourse,
        deleteAction: selectedProfileActions.deleteTenthGradeCourse,
      },
      [SchoolYear.ELEVENTH]: {
        courseListSelector: (state: RootState) => state.selectedProfile.eleventhGradeCourseList,
        addAction: selectedProfileActions.addEleventhGradeCourse,
        updateAction: selectedProfileActions.updateEleventhGradeCourse,
        deleteAction: selectedProfileActions.deleteEleventhGradeCourse,
      },
      [SchoolYear.TWELFTH]: {
        courseListSelector: (state: RootState) => state.selectedProfile.twelfthGradeCourseList,
        addAction: selectedProfileActions.addTwelfthGradeCourse,
        updateAction: selectedProfileActions.updateTwelfthGradeCourse,
        deleteAction: selectedProfileActions.deleteTwelfthGradeCourse,
      },
    };
  
    const gradeConfig = gradeMapping[grade];
  
    if (!gradeConfig) {
      throw new Error('Unexpected grade in useCourseListCardProps');
    }
  
    return {
      title: 'Course List',
      courseList: useSelector(gradeConfig.courseListSelector),
      onAddCourse: () => {
        const newCourse: Course = {
          id: Date.now(),
          user_id: 0,
          name: '',
          type: undefined,
          grade: undefined,
          score: undefined,
        };
        dispatch(gradeConfig.addAction(newCourse));
      },
      onUpdateCourse: (updatedCourse: Course) => {
        dispatch(
          gradeConfig.updateAction({
            id: updatedCourse.id,
            course: updatedCourse,
          })
        );
      },
      onDeleteCourse: (courseId: number) => {
        dispatch(gradeConfig.deleteAction(courseId));
      },
    };
  }
  
