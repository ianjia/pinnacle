import React from 'react';
import { useStyles } from './academics-profile-form.styles';
import { StandardizedTestCard } from './std-test-gpa/standardized-test-card';
import { GpaCard } from './std-test-gpa/gpa-card';
import { SchoolYear } from '../../../shared';
import { CouseApExamCombinedCard } from './course-ap-exam/course-ap-exam-combined-card';

export const AcademicsProfileForm: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
        <StandardizedTestCard/>
        <GpaCard/>
        <CouseApExamCombinedCard school_year = {SchoolYear.NINTH}/>
        <CouseApExamCombinedCard school_year = {SchoolYear.TENTH}/>
        <CouseApExamCombinedCard school_year = {SchoolYear.ELEVENTH}/>
        <CouseApExamCombinedCard school_year = {SchoolYear.TWELFTH}/>
    </div>
  );
};
