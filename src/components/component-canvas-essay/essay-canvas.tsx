import './essay-canvas.css';
import React, { useState } from 'react';
import { EssayPrompt } from './essay-prompt';
import { EssayIdeas } from './essay-ideas';
import { IEssayPrompt } from './essay-model';

export const EssayCanvas: React.FC = () => {
    const [essayResult, setEssayResult] = useState<string>('');

    const handleGenerateEssayIdeas = (essayPrompt: IEssayPrompt) => {
        // Simulating a backend call to generate essay ideas based on the prompt
        // You would replace this with an actual API call
        setTimeout(() => {
            const result = `Here are some ideas for your essay on ${essayPrompt.college} (${essayPrompt.major}): ...`;
            setEssayResult(result);
        }, 1000);
    };

    return (
        <div className="essay-background">
            <EssayPrompt onGenerateEssayIdeas={handleGenerateEssayIdeas} />
            <EssayIdeas essayResult={essayResult} />
        </div>
    );
};
