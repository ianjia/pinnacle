import React from 'react';
import { useLifeStoryProfile } from './hooks/use-life-story-profile';
import { EntityProfileForm } from './entity-profile-form';

export const LifeStoryProfileForm: React.FC = () => {
  const { title, lifeStoryList, onAddEntity, onUpdateEntity, onDeleteEntity } = useLifeStoryProfile();

  return (
    <EntityProfileForm
      title={title}
      entityList={lifeStoryList}
      onAddEntity={onAddEntity}
      onUpdateEntity={onUpdateEntity}
      onDeleteEntity={onDeleteEntity}
    />
  );
};
