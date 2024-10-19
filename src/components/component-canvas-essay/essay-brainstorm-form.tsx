import './essay-canvas.css';
import React, { useState } from 'react';
import { EssayPrompt } from './essay-brainstorm-prompt';
import { EssayIdeas } from './essay-brianstorm-ideas';
import { IEssayPrompt } from './essay-model';

export const EssayBrainStormForm: React.FC = () => {
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
        <div>
            <EssayPrompt onGenerateEssayIdeas={handleGenerateEssayIdeas} />
            <EssayIdeas essayResult={essayResult} />
        </div>
    );
};
