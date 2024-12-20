import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationItem } from '../shared';

interface ConversationState {
  conversation: ConversationItem[];
  college: string;
  major: string;   
}

const initialState: ConversationState = {
  conversation: [],
  college: "",
  major: "No Preference",
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
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