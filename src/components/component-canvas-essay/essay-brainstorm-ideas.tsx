import React, { useState } from 'react';
import './essay-brainstorm-ideas.css';  // New CSS file for EssayIdeas component

interface IEssayIdeasProps {
    essayResult: string;
    onRefine: (feedback: string) => void;
}

export const EssayIdeas: React.FC<IEssayIdeasProps> = ({ essayResult, onRefine }) => {
    const [feedback, setFeedback] = useState('');

    const handleRefineClick = () => {
        if (feedback.trim()) {
            onRefine(feedback);
        } else {
            alert("Please enter feedback before refining the essay ideas.");
        }
    };

    return (
        <div className="essay-ideas">
            <h2>Essay Ideas</h2>
            
            {/* Essay result with border */}
            <div className="essay-result">
                <p>{essayResult ? essayResult : 'No ideas yet. Submit a prompt to get started.'}</p>
            </div>

            {/* Feedback section */}
            <div className="form-row full-width">
                <div className="form-group">
                    <label htmlFor="feedback">Refinement feedback:</label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide feedback or suggestions to refine the essay ideas..."
                        className="full-width-textarea"
                        rows={4}
                    />
                </div>
            </div>

            {/* Refine Essay Ideas button */}
            <button onClick={handleRefineClick} className="refine-btn">Refine Essay Ideas</button>
        </div>
    );
};
