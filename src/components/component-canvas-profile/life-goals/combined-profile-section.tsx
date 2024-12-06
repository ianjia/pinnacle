import React from 'react';
import { useStyles } from './profile-section.styles';
import { LifeStoryProfileForm } from './life-story-profile-form';
import { AcademicCareerGoalProfileForm } from './career-goal-profile-form';

export const LifeGoalCombinedProfileSections: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <LifeStoryProfileForm />
      </div>
      <div className={styles.section}>
        <AcademicCareerGoalProfileForm />
      </div>
    </div>
  );
};
