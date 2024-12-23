import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConversationItem, InterviewWorkshopType } from '../shared';

interface ConversationState {
  liveConversationItems: ConversationItem[];
  liveConversationCollege: string;
  liveConversationMajor: string;
  liveConverstationId: number;
  activeInterviewWorkshop: InterviewWorkshopType;
}

const initialState: ConversationState = {
  liveConversationItems: [],
  liveConversationCollege: "",
  liveConversationMajor: "No Preference",
  liveConverstationId: 0, // Place holder, will be updated on inserting converation into backend database
  activeInterviewWorkshop: InterviewWorkshopType.LiveInterview
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setActiveInterviewWorkshop(state, action: PayloadAction<InterviewWorkshopType>) {
        state.activeInterviewWorkshop = action.payload;
    },
    setLiveConversationCollege: (state, action: PayloadAction<string>) => {
      state.liveConversationCollege = action.payload;
    },

    setLiveConversationMajor: (state, action: PayloadAction<string>) => {
        state.liveConversationMajor = action.payload;
    },

    setLiveConversationId: (state, action: PayloadAction<number>) => {
      state.liveConverstationId = action.payload;
    },
    
    addLiveConversationMessage: (state, action: PayloadAction<ConversationItem>) => {
      state.liveConversationItems.push(action.payload);
    },

    resetLiveConversation: (state) => {
      state.liveConversationItems = [];
    },
  },
});

export const intervieConverstationReducers = conversationSlice.reducer;
export const interviewConversationActions = conversationSlice.actions;