import React from 'react';
import { Card } from '@fluentui/react-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { MarkdownMessageDisplay } from '../../component-mark-down-display';
import { useCardStyles } from './essay-common-card.styles';

export const EssayPromptAnalysisPanel: React.FC = () => {
  const cardCommon = useCardStyles();
  const analysis = useSelector(
    (s: RootState) => s.essayWorkshop.promptAnalysis
  );

  return (
    <Card className={cardCommon.card}>
      <h2 className={cardCommon.header}>Prompt Analysis</h2>
      {analysis && <MarkdownMessageDisplay resultMessage={analysis} />}
    </Card>
  );
};
