import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConversationItem {
  role: 'interviewer' | 'interviewee';
  content: string;
}

interface ConversationState {
  conversation: ConversationItem[];
}

const initialState: ConversationState = {
  conversation: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
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