import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EssayBrainStormForm } from './essay-idea-draft/essay-idea-draft-main-panel';
import { EssayWorkshopType } from '../../shared';
import { EssayHistoryMainContainer } from './essay-history/essay-history-main-container';
import { LifeGoalCombinedProfileSections } from './life-goals/combined-profile-section';

export const EssayCanvas: React.FC = () => {
    const activeEssayWorkShop: EssayWorkshopType = useSelector((state: RootState) => state.essayWorkshop.activeWorkshop);
    return (
        <div>
            {activeEssayWorkShop === EssayWorkshopType.IdeaAndDraft && <EssayBrainStormForm/>}
            {activeEssayWorkShop === EssayWorkshopType.History && <EssayHistoryMainContainer/>}
            {activeEssayWorkShop === EssayWorkshopType.LifeGoals && <LifeGoalCombinedProfileSections/>}
        </div>
    );
};

