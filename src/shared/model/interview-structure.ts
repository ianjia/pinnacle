export interface ConversationItem {
    role: 'interviewer' | 'interviewee';
    content: string;
  }

export interface Conversation{
    id: number;
    user_id: number;
    college: string;
    major: string;
    messages: ConversationItem[];
    review?: string;
    time: string;  // ISO date string
  }
