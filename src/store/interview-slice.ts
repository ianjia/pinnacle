import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, ConversationItem, InterviewWorkshopType, LiveConversationDisplayType } from '../shared';
import { logoutAction } from './auth-slice';

interface ConversationState {
  liveConversationItems: ConversationItem[];
  liveConversationCollege: string;
  liveConversationMajor: string;
  liveConverstationId: number;
  liveConversationReview: string | undefined;
  activeInterviewWorkshop: InterviewWorkshopType;
  activeConversationDisplay: LiveConversationDisplayType;
  interviewHistoryList: Conversation[];
}

const initialState: ConversationState = {
  liveConversationItems: [],
  liveConversationCollege: "",
  liveConversationMajor: "No Preference",
  liveConverstationId: 0, // Place holder, will be updated on inserting converation into backend database
  liveConversationReview: undefined,
  activeInterviewWorkshop: InterviewWorkshopType.LiveInterview,
  activeConversationDisplay: LiveConversationDisplayType.Conversation,
  interviewHistoryList: [] 
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setActiveInterviewWorkshop(state, action: PayloadAction<InterviewWorkshopType>) {
        state.activeInterviewWorkshop = action.payload;
    },

    setActiveConversationDisplay(state, action: PayloadAction<LiveConversationDisplayType>) {
      state.activeConversationDisplay = action.payload;
    },    
    
    setInterviewHistoryList(state, action: PayloadAction<Conversation[]>) {
      state.interviewHistoryList = action.payload;
    },

    deleteInterviewFromHistory(state, action: PayloadAction<number>) {
      state.interviewHistoryList = state.interviewHistoryList.filter(interview => interview.id !== action.payload);
      if (action.payload === state.liveConverstationId) {
        conversationSlice.caseReducers.resetLiveConversation(state);
      }
    },

    addInterviewToHistory(state, action: PayloadAction<Conversation>) {
      state.interviewHistoryList.push(action.payload);
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
    
    setLiveConversationReview: (state, action: PayloadAction<string>) => {
      state.liveConversationReview = action.payload;
    },

    addLiveConversationMessage: (state, action: PayloadAction<ConversationItem>) => {
      state.liveConversationItems.push(action.payload);
    },

    resetLiveConversation: (state) => {
      state.liveConversationItems = [];
      state.liveConversationReview = undefined;
      state.liveConverstationId = 0;
    },

    // This reducer receives an object with { id, review }, finds the conversation
    // with the matching id, and updates its review property.
    updateInterviewReviewInHistory(
      state, 
      action: PayloadAction<{ id: number; review: string | undefined}>
    ) {
      const { id, review } = action.payload;
      const conversation = state.interviewHistoryList.find(conv => conv.id === id);
      if (conversation) {
        conversation.review = review;
      }
    },
  },

  extraReducers: builder => {
  /*  <-‑‑ this single line wipes the whole slice */
      builder.addCase(logoutAction, () => {
          return initialState;
      });
  },
});

export const intervieConverstationReducers = conversationSlice.reducer;
export const interviewConversationActions = conversationSlice.actions;