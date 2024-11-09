import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { EssayPrompt } from './essay-brainstorm-prompt';
import { EssayIdeas } from './essay-brainstorm-ideas';
import { IEssayPrompt } from './essay-model';
import './essay-brainstorm-form.css';
import { SERVER_URL } from '../component-service-proxy';

export const EssayBrainStormForm: React.FC = () => {
    const [essayResult, setEssayResult] = useState<string>('');
    const [sessionId, setSessionId] = useState<string|undefined>(undefined);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const handleGenerateEssayIdeas = async (essayPrompt: IEssayPrompt) => {
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        setIsProcessing(true);
        try {
            const response = await axios.post(`${SERVER_URL}/api/generate-essay-ideas`, {
                collegeInfo: essayPrompt.major !== undefined ? `College: ${essayPrompt.college}, major: ${essayPrompt.major}` :  `College: ${essayPrompt.college}`,
                prompt: essayPrompt.prompt,
                session_id: sessionId,
                additionalCollegeAsk: essayPrompt.additionalCollegeAskOnEssay !== undefined ? essayPrompt.additionalCollegeAskOnEssay : ""
              });

            const aiResponse = response.data.essayIdeas;
            setEssayResult(aiResponse);
      
        } catch(error) {
            console.error('Error communicating with the server:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleRefineEssayIdeas = async (feedback: string) => {
        setIsProcessing(true);
        try {
            const response = await axios.post(`${SERVER_URL}/api/generate-essay-ideas`, {
                feedback: feedback,
                session_id: sessionId,
              });

            const aiResponse = response.data.essayIdeas;
            setEssayResult(aiResponse);
      
        } catch(error) {
            console.error('Error communicating with the server:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <div>
                <EssayPrompt onGenerateEssayIdeas={handleGenerateEssayIdeas} />
                <EssayIdeas essayResult={essayResult} onRefine={handleRefineEssayIdeas} />
            </div>
            {isProcessing && (
                <div className="processing-modal">
                    <div className="processing-dialog">
                        <h2>Processing...</h2>
                        <p>Please wait while we process your response.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
