
import './interview-canvas.css';
import React from 'react';
import { ConversationDisplay } from '../component-conversation-display';

export const InterviewCanvas: React.FC = () => {
    return (
        <div className="interview-background">
            <ConversationDisplay />
        </div>
    );
};
