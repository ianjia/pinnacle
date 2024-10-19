import './essay-canvas.css';
import React, { useState } from 'react';
import { EssayPrompt } from './essay-brainstorm-prompt';
import { EssayIdeas } from './essay-brainstorm-ideas';
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

    const handleRefineEssayIdeas = (feedback: string) => {
        // Simulating a backend call to refine essay ideas based on feedback
        // You would replace this with an actual API call
        setTimeout(() => {
            const refinedResult = `${essayResult}\nRefined based on your feedback: ${feedback}`;
            setEssayResult(refinedResult);
        }, 1000);
    };

    return (
        <div>
            <EssayPrompt onGenerateEssayIdeas={handleGenerateEssayIdeas} />
            <EssayIdeas essayResult={essayResult} onRefine={handleRefineEssayIdeas} />
        </div>
    );
};
