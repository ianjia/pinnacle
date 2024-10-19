import './essay-canvas.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { EssayBrainStormForm } from './essay-brainstorm-form';
import { EssayWorkshopType } from '../../common';
import { EssayDraftForm } from './essay-draft-form';
import { EssayReviewForm } from './essay-review-form';

export const EssayCanvas: React.FC = () => {
    const activeEssayWorkShop: EssayWorkshopType = useSelector((state: RootState) => state.essayWorkshop.activeWorkshop);

    return (
        <div className="essay-background">
            {activeEssayWorkShop === EssayWorkshopType.Brainstorming && <EssayBrainStormForm/>}
            {activeEssayWorkShop === EssayWorkshopType.Draft && <EssayDraftForm/>}
            {activeEssayWorkShop === EssayWorkshopType.Review && <EssayReviewForm/>}
        </div>
    );
};

