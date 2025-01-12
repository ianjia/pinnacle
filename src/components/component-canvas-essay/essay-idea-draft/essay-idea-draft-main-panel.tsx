import React from 'react';
import { EssayPrompt } from './essay-ideas-prompt';
import { IdeasTable } from './ideas-table';
import { EssayDraftPanel } from './essay-draft-panel';
import { AppDispatch, essayWorkshopActions } from '../../../store';
import { useDispatch } from 'react-redux';
import { EssayPromptAnalysisPanel } from './essay-prompt-analysis-panel';

export const EssayBrainStormForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleSelectIdea = (selectedIdeaKey: string) => {
        dispatch(essayWorkshopActions.setSelectedIdeaKey(selectedIdeaKey));
    };

    return (
        <div>
            <div>
                <div id = "essay-prompt-card">
                    <EssayPrompt />
                </div>
                <div id = "essay-prompt-analysis">
                    <EssayPromptAnalysisPanel />
                </div>                
                <div id = "essay-ideas-card">
                    <IdeasTable editable = {true} selectCallback={handleSelectIdea}/>
                </div>
                <div id = "essay-draft-card">               
                    <EssayDraftPanel />
                </div>
            </div>
        </div>
    );
};
