import React from 'react';
import { useCareerGoalProfile } from './hooks/use-career-goal-profile';
import { EntityProfileForm } from './entity-profile-form';

export const AcademicCareerGoalProfileForm: React.FC = () => {
  const { title, careerGoalList, onAddEntity, onUpdateEntity, onDeleteEntity } = useCareerGoalProfile();

  return (
    <EntityProfileForm
      title={title}
      entityList={careerGoalList}
      onAddEntity={onAddEntity}
      onUpdateEntity={onUpdateEntity}
      onDeleteEntity={onDeleteEntity}
    />
  );
};
