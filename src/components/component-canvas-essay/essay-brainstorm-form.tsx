import React from 'react';
import { EssayPrompt } from './essay-brainstorm-prompt';
import './essay-brainstorm-form.css';
import { IdeasTable } from './ideas-table';

export const EssayBrainStormForm: React.FC = () => {
    return (
        <div>
            <div>
                <EssayPrompt />
                <IdeasTable editable = {true} />
            </div>
        </div>
    );
};
