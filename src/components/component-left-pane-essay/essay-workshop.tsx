
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './essay-workshop.css';
import { essayWorkshopActions, RootState, AppDispatch } from '../../store';
import { EssayWorkshopType } from '../../common';

export const EssayWorkshopPane: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const activeWorkshop = useSelector((state: RootState) => state.essayWorkshop.activeWorkshop);

    const handleProfileSelection = (workshop: EssayWorkshopType) => {
        dispatch(essayWorkshopActions.setEssayWorkshop(workshop));
    };

    const isActive = (workshop: EssayWorkshopType) => activeWorkshop === workshop;

    return (
        <div className="interaction-container">
            <h2 className="interaction-header">AI Powered Essay Workshop</h2>
            <div className="interaction-header">
                <button
                    className={`review-button ${isActive(EssayWorkshopType.Brainstorming) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(EssayWorkshopType.Brainstorming)}
                >
                    Ideas Brain Storming
                </button>
                <button
                    className={`review-button ${isActive(EssayWorkshopType.Draft) ? 'active' : ''}`}
                    onClick={() => handleProfileSelection(EssayWorkshopType.Draft)}
                >
                    Drafting & Refine
                </button>
            </div>
        </div>
    );
};


