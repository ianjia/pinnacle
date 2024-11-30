import React from 'react';
import { useStyles } from './academics-profile-form.styles';
import { StandardizedTestCard } from '../standardized-test/standardized-test-card';
import { GpaCard } from '../gpa/gpa-card';
import { CourseListCard } from '../course/course-list-card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../store';
import { Course } from '../../../shared';

export const AcademicsProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();

  //temp hack code
  const courseList = useSelector(
    (state: RootState) => state.selectedProfile.ninthGradeCourseList
  );

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now(),
      user_id: 0,
      name: '',
      type: undefined,
      grade: undefined,
      score: undefined,
    };
    dispatch(selectedProfileActions.addNinthGradeCourse(newCourse));
  };

  const updateCourse = (updatedCourse: Course) => {
    dispatch(
      selectedProfileActions.updateNinthGradeCourse({
        id: updatedCourse.id,
        course: updatedCourse,
      })
    );
  };

  const deleteCourse = (courseId: number) => {
    dispatch(selectedProfileActions.deleteNinthGradeCourse(courseId));
  };

  return (
    <div className={styles.container}>
        <StandardizedTestCard/>
        <GpaCard/>
        <CourseListCard
            courseList={courseList}
            onAddCourse={addCourse}
            onUpdateCourse={updateCourse}
            onDeleteCourse={deleteCourse}
      />
    </div>
  );
};
