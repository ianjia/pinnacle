import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../../store';
import { Course, SchoolYear } from "../../../../../shared";
import { CourseListCardProps } from "../data-list-types";
import { useContext } from 'react';
import { AuthContext } from '../../../../../auth';
import { courseService } from '../../../../component-service-proxy';

export function useCourseListCardProps(school_year: SchoolYear): CourseListCardProps {
    const dispatch = useDispatch();
    const { userId } = useContext(AuthContext);
  
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
  
    const gradeConfig = gradeMapping[school_year];
  
    if (!gradeConfig) {
      throw new Error('Unexpected grade in useCourseListCardProps');
    }
  
    return {
      title: 'Course List',
      courseList: useSelector(gradeConfig.courseListSelector),
      onAddCourse: async () => {
        const newCourse: Course = {
          id: Date.now(),
          user_id: userId as number,
          name: '',
          year: school_year,
          type: undefined,
          grade: undefined,
          score: undefined,
        };
        const id: number = await courseService.create(newCourse);
        newCourse.id = id;
        dispatch(gradeConfig.addAction(newCourse));
      },
      onUpdateCourse: async (updatedCourse: Course) => {
        dispatch(
          gradeConfig.updateAction({
            id: updatedCourse.id,
            course: updatedCourse,
          })
        );
        await courseService.update(updatedCourse);
      },
      onDeleteCourse: async (courseId: number) => {
        dispatch(gradeConfig.deleteAction(courseId));
        await courseService.deleteById(courseId);
      },
    };
  }
  
