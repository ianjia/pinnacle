import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationItem, InterviewWorkshopType } from '../shared';

interface ConversationState {
  conversation: ConversationItem[];
  college: string;
  major: string;
  activeInterviewWorkshop: InterviewWorkshopType;
}

const initialState: ConversationState = {
  conversation: [
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
    {
      role: 'interviewer',
      content: 'Hello! I’m here to ask you a few questions about your college preferences.',
    },
    {
      role: 'interviewee',
      content: 'Sure! I’d be glad to discuss my interests and goals.',
    },
  ],
  college: "",
  major: "No Preference",
  activeInterviewWorkshop: InterviewWorkshopType.LiveInterview
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setActiveInterviewWorkshop(state, action: PayloadAction<InterviewWorkshopType>) {
        state.activeInterviewWorkshop = action.payload;
    },
    setCollege: (state, action: PayloadAction<string>) => {
      state.college = action.payload;
    },

    setMajor: (state, action: PayloadAction<string>) => {
        state.major = action.payload;
    },

    addMessage: (state, action: PayloadAction<ConversationItem>) => {
      state.conversation.push(action.payload);
    },
    resetConversation: (state) => {
      state.conversation = [];
    },
  },
});

export const intervieConverstationReducers = conversationSlice.reducer;
export const interviewConversationActions = conversationSlice.actions;