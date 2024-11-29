import React from 'react';
import { useStyles } from './academics-profile-form.styles';
import { StandardizedTestCard } from '../standardized-test/standardized-test-card';
import { GpaCard } from '../gpa/gpa-card';

export const AcademicsProfileForm: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
        <StandardizedTestCard/>
        <GpaCard/>
    </div>
  );
};
