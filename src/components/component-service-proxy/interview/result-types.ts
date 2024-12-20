export interface InterviewResult {
    message: string;
}

export interface InterviewStartResult extends InterviewResult {
}

export interface InterviewAnswerResult extends InterviewResult {
}

export interface InterviewAnalyzeResult extends InterviewResult {
}