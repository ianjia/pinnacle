import './essay-canvas.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EssayBrainStormForm } from './essay-idea-draft/essay-idea-draft-main-panel';
import { EssayWorkshopType } from '../../shared';
import { EssayHistory } from './essay-history/essay-history';

export const EssayCanvas: React.FC = () => {
    const activeEssayWorkShop: EssayWorkshopType = useSelector((state: RootState) => state.essayWorkshop.activeWorkshop);

    return (
        <div className="essay-background">
            {activeEssayWorkShop === EssayWorkshopType.IdeaAndDraft && <EssayBrainStormForm/>}
            {activeEssayWorkShop === EssayWorkshopType.History && <EssayHistory/>}
        </div>
    );
};

