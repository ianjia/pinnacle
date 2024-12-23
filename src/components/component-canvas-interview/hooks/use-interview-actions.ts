import * as React from 'react';
import { InterviewActionPanelProps } from '../action-panel/interview-action-panel.types';

export const useInterviewActions = (): InterviewActionPanelProps =>  {
    // For now, these are simple no-op (empty) callbacks
    const onStartInterview = React.useCallback(() => {
    }, []);
  
    const onStopInterview = React.useCallback(() => {
      // no-op
    }, []);
  
    const onInterviewReview = React.useCallback(() => {
      // no-op
    }, []);
  
    // Return the functions to be used by consuming components
    return {
        onStartInterview,
        onStopInterview,
        onInterviewReview,
    };
  }