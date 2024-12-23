export interface InterviewActionPanelProps {
    /** Optional callback for when the interview is started */
    onStartInterview: () => void;
    /** Optional callback for when the interview is stopped */
    onStopInterview?: () => void;
    /** Required callback for "Interview Review" button */
    onInterviewReview: () => void;
  }