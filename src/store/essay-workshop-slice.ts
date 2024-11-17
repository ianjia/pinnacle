import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EssayWorkshopType } from '../common';

interface EssayWorkshopState {
    activeWorkshop: EssayWorkshopType;
    college: string;
    major: string;
    essayPrompt: string;
    additionalAsk: string;
    selectedIdeaKey: string | undefined;  // Be noticed that it is the key, rather than the idea value itself is stored in this field
    ideaRefinementFeedback: string;
    essayRefinmentFeedback: string;
    // Here we make the key in ideas and essay the same, so that we could hook up an idea with essay, namely when using an idea to 
    // draft an essay, the key of the essay in the essay record with be the same key of that idea in ideas record
    ideas: Record<string, string>;   
    essay: Record<string, string>;
}

const initialState: EssayWorkshopState = {
    activeWorkshop: EssayWorkshopType.Brainstorming,
    college: "",
    major: "No Preference",
    essayPrompt: "",
    additionalAsk: "",
    selectedIdeaKey: undefined,
    ideaRefinementFeedback: "",
    essayRefinmentFeedback: "",
    ideas: {},
    essay: {},
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

        setSelectedIdeaKey(state, action: PayloadAction<string>) {
            state.selectedIdeaKey = action.payload;
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

        addEssay(state, action: PayloadAction<{ key: string, value: string }>) {
            const { key, value } = action.payload;
            state.essay[key] = value;
        },

        deleteEssay(state, action: PayloadAction<string>) {
            delete state.essay[action.payload];
        }
    }
});

export const essayWorkshopReducers = essayWorkshopSlice.reducer;
export const essayWorkshopActions = essayWorkshopSlice.actions;
