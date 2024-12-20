import { ConversationItem } from "../../../shared";

export interface InterviewRequest {
}

export interface InterviewStartRequest extends InterviewRequest {
    college: string;
    major: string
}

export interface InterviewAnswerRequest extends InterviewRequest {
    message: string;
}

export interface InterviewAnalyzeRequest extends InterviewRequest {
    conversation: ConversationItem[];
}