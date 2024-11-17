import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './essay-brainstorm-prompt.css';

export const EssayDraftFormPrompt: React.FC = () => {
    // Retrieve values from the Redux store
    const college = useSelector((state: RootState) => state.essayWorkshop.college);
    const major = useSelector((state: RootState) => state.essayWorkshop.major);
    const essay_prompt = useSelector((state: RootState) => state.essayWorkshop.essayPrompt);
    const additional_ask = useSelector((state: RootState) => state.essayWorkshop.additionalAsk);

    return (
        <div className="essay-prompt">
            <div className="form-row">
                <div className="form-group">
                    <label>College:</label>
                    <div className="text-display">{college}</div>
                </div>
                <div className="form-group">
                    <label>Major:</label>
                    <div className="text-display">{major}</div>
                </div>
            </div>

            <div className="form-row full-width">
                <div className="form-group">
                    <label>Essay Prompt:</label>
                    <textarea
                        value={essay_prompt}
                        readOnly
                        className="full-width-textarea auto-resize-textarea"
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Additional College Ask (Optional):</label>
                    <textarea
                        value={additional_ask}
                        readOnly
                        className="full-width-textarea auto-resize-textarea"
                    />
                </div>
            </div>
        </div>
    );
};
