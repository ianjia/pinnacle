import React from 'react';

interface IEssayIdeasProps {
    essayResult: string;
}

export const EssayIdeas: React.FC<IEssayIdeasProps> = ({ essayResult }) => {
    return (
        <div className="essay-ideas">
            <h2>Essay Ideas</h2>
            <p>{essayResult ? essayResult : 'No ideas yet. Submit a prompt to get started.'}</p>
        </div>
    );
};
