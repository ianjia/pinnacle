import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { EssayPrompt } from './essay-brainstorm-prompt';
import './essay-brainstorm-form.css';
import { SERVER_URL } from '../component-service-proxy';
import { IdeasTable } from './ideas-table';

export const EssayBrainStormForm: React.FC = () => {

    const handleGenerateEssayIdeas = async () => {
        // const newSessionId = uuidv4();
        // setSessionId(newSessionId);
        // setIsProcessing(true);
        // try {
        //     const response = await axios.post(`${SERVER_URL}/api/generate-essay-ideas`, {
        //         collegeInfo: essayPrompt.major !== undefined ? `College: ${essayPrompt.college}, major: ${essayPrompt.major}` :  `College: ${essayPrompt.college}`,
        //         prompt: essayPrompt.prompt,
        //         session_id: sessionId,
        //         additionalCollegeAsk: essayPrompt.additionalCollegeAskOnEssay !== undefined ? essayPrompt.additionalCollegeAskOnEssay : ""
        //       });

        //     const aiResponse = response.data.essayIdeas;
        //     setEssayResult(aiResponse);
      
        // } catch(error) {
        //     console.error('Error communicating with the server:', error);
        //     alert('An error occurred. Please try again.');
        // } finally {
        //     setIsProcessing(false);
        // }
    };

    const handleRefineEssayIdeas = async (_feedback: string) => {
        // setIsProcessing(true);
        // try {
        //     const response = await axios.post(`${SERVER_URL}/api/generate-essay-ideas`, {
        //         feedback: feedback,
        //         session_id: sessionId,
        //       });

        //     const aiResponse = response.data.essayIdeas;
        //     setEssayResult(aiResponse);
      
        // } catch(error) {
        //     console.error('Error communicating with the server:', error);
        //     alert('An error occurred. Please try again.');
        // } finally {
        //     setIsProcessing(false);
        // }
    };

    return (
        <div>
            <div>
                <EssayPrompt />
                <IdeasTable editable = {true} />
            </div>
        </div>
    );
};
