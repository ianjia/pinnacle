import React from 'react';
import { EssayPrompt } from './essay-ideas-prompt';
import { IdeasTable } from './ideas-table';
import { EssayDraftPanel } from './essay-draft-panel';
import { AppDispatch, essayWorkshopActions } from '../../../store';
import { useDispatch } from 'react-redux';
import { EssayPromptAnalysisPanel } from './essay-prompt-analysis-panel';
import { useStyles } from './essay-idea-draft-main-panel-styles';

export const EssayBrainStormForm: React.FC = () => {
  const styles = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const handleSelectIdea = (k: string) =>
    dispatch(essayWorkshopActions.setSelectedIdeaKey(k));

  return (
    <div className={styles.root}>
      <EssayPrompt />
      <EssayPromptAnalysisPanel />
      <IdeasTable editable selectCallback={handleSelectIdea} />
      <EssayDraftPanel />
    </div>
  );
};