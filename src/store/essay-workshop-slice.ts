import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EssayWorkshopType } from '../common';

interface EssayWorkshopState {
    activeWorkshop: EssayWorkshopType;
    college: string;
    major: string;
    essayPrompt: string;
    additionalAsk: string;
    ideaRefinementFeedback: string;
    essayRefinmentFeedback: string;
    ideas: Record<string, string>;
    draft: Record<string, string>;
}

const initialState: EssayWorkshopState = {
    activeWorkshop: EssayWorkshopType.Brainstorming,
    college: "",
    major: "No Preference",
    essayPrompt: "",
    additionalAsk: "",
    ideaRefinementFeedback: "",
    essayRefinmentFeedback: "",
    ideas: {},
    draft: {},
};

const essayWorkshopSlice = createSlice({
    name: 'essayWorkshop',
    initialState,
    reducers: {
        setEssayWorkshop(state, action: PayloadAction<EssayWorkshopType>) {
            state.activeWorkshop = action.payload;
        },

        setCollege(state, action: PayloadAction<string>) {
            state.college = action.payload;
        },
        
        setMajor(state, action: PayloadAction<string>) {
            state.major = action.payload;
        },

        setEssayPrompt(state, action: PayloadAction<string>) {
            state.essayPrompt = action.payload;
        },        

        setAdditionalAsk(state, action: PayloadAction<string>) {
            state.additionalAsk = action.payload;
        },     

        setIdeaRefinementFeedback(state, action: PayloadAction<string>) {
            state.ideaRefinementFeedback = action.payload;
        },

        setIdeaEssayRefinmentFeedback(state, action: PayloadAction<string>) {
            state.essayRefinmentFeedback = action.payload;
        },

        addIdea(state, action: PayloadAction<{ key: string, value: string }>) {
            const { key, value } = action.payload;
            state.ideas[key] = value;
        },

        deleteIdea(state, action: PayloadAction<string>) {
            delete state.ideas[action.payload];
        },

        addDraft(state, action: PayloadAction<{ key: string, value: string }>) {
            const { key, value } = action.payload;
            state.draft[key] = value;
        },

        deleteDraft(state, action: PayloadAction<string>) {
            delete state.draft[action.payload];
        }
    }
});

export const essayWorkshopReducers = essayWorkshopSlice.reducer;
export const essayWorkshopActions = essayWorkshopSlice.actions;
