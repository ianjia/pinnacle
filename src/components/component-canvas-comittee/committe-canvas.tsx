import React from 'react';
import './committe-canvas.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MarkdownMessageDisplay } from '../component-mark-down-display';

export const CommitteCanvas: React.FC = () => {
    const { review_result } = useSelector((state: RootState) => state.committeeReview);

    return (
        <div
            className="committe-background"
        >
            <h2>Evaluation</h2>
            {review_result ? (
                    <MarkdownMessageDisplay resultMessage={review_result} />
                ) : ""
            }
        </div>
    );
};
