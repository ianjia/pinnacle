import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // To support tables, strikethrough, and other GitHub-flavored Markdown features
import './mark-down-message-display.css'

interface PrettyLLMMessageProps {
    errorMessage?: string;
    resultMessage: string;
  }

export const MarkdownMessageDisplay: React.FC<PrettyLLMMessageProps> = ({ errorMessage, resultMessage }) => {
  return (
    <div className="message-container">
      {errorMessage ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="markdown-content">
          <Markdown remarkPlugins={[remarkGfm]}>{resultMessage}</Markdown>
        </div>
      )}
    </div>
  );
};