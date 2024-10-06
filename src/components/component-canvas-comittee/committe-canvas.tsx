import React from 'react';
import './committe-canvas.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MarkdownMessageDisplay } from '../component-mark-down-display';

export const CommitteCanvas: React.FC = () => {
    const { data, error } = useSelector((state: RootState) => state.committeeReview);

    return (
        <div
            className="committe-background"
        >
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data ? (
                <MarkdownMessageDisplay resultMessage={data} />
            ) : (
                <p>No data received yet.</p>
            )}
        </div>
    );
};
