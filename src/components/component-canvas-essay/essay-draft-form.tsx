import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, essayWorkshopActions } from '../../store';
import { EssayDraftFormPrompt } from './essay-draft-form-prompt';
import { IdeasTable } from './ideas-table';
import { EssayDraftPanel } from './essay-draft-panel';

export const EssayDraftForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleSelectIdea = (selectedIdeaKey: string) => {
        dispatch(essayWorkshopActions.setSelectedIdeaKey(selectedIdeaKey));
    };

    return (
        <div>
            <EssayDraftFormPrompt />
            <IdeasTable editable = {false} selectCallback={handleSelectIdea} />
            <EssayDraftPanel />
        </div>
    );
};
