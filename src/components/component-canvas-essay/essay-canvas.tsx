import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EssayBrainStormForm } from './essay-idea-draft/essay-idea-draft-main-panel';
import { EssayWorkshopType } from '../../shared';
import { EssayHistoryMainContainer } from './essay-history/essay-history-main-container';
import { LifeGoalCombinedProfileSections } from './life-goals/combined-profile-section';
import { useCanvasStyles } from './essay-canvas.styles';

export const EssayCanvas: React.FC = () => {
  const styles = useCanvasStyles();
  const active = useSelector(
    (s: RootState) => s.essayWorkshop.activeWorkshop
  );

  return (
    <div className={styles.root}>
      {active === EssayWorkshopType.IdeaAndDraft && <EssayBrainStormForm />}
      {active === EssayWorkshopType.History && <EssayHistoryMainContainer />}
      {active === EssayWorkshopType.LifeGoals && (
        <LifeGoalCombinedProfileSections />
      )}
    </div>
  );
};
