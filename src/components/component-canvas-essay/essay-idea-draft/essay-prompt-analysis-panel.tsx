import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { MarkdownMessageDisplay } from '../../component-mark-down-display';
import { Card } from '@fluentui/react-components';
import { useStyles } from './essay-draft-panel.styles';

export const EssayPromptAnalysisPanel: React.FC = () => {
    const styles = useStyles();
    const promptAnalysis: string | undefined = useSelector((state: RootState) => state.essayWorkshop.promptAnalysis);

    return (
        <Card className={styles.card}>
            <h2 className={styles.header} style={{ textAlign: 'left' }}>Prompt Analysis</h2>
            { promptAnalysis && <MarkdownMessageDisplay resultMessage={ promptAnalysis } />}
        </Card>
    );
};
