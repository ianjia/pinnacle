import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // To support tables, strikethrough, and other GitHub-flavored Markdown features
import './mark-down-message-display-styles.ts'
import { useStyles } from './mark-down-message-display-styles';
import { MarkdownMessageDisplayProps } from './mark-down-message-display.types.js';


export const MarkdownMessageDisplay: React.FC<MarkdownMessageDisplayProps> = ({
  errorMessage,
  resultMessage,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {errorMessage ? (
        <div className={styles.error}>{errorMessage}</div>
      ) : (
        <div className={styles.mdRoot}>
          <Markdown remarkPlugins={[remarkGfm]}>{resultMessage}</Markdown>
        </div>
      )}
    </div>
  );
};