import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Essay, EssayWorkshopType } from '../shared';

interface EssayWorkshopState {
    activeWorkshop: EssayWorkshopType;
    college: string;
    major: string;
    essayPrompt: string;
    additionalAsk: string;
    promptAnalysis: string | undefined; 
    selectedIdeaKey: string | undefined;  // Be noticed that it is the key, rather than the idea value itself is stored in this field
    ideaRefinementFeedback: string;
    essayRefinmentFeedback: string;
    liveEssayId: number;  // This is to tempararily save essay id after creating its draft, so that we could identify the id after refining the essay to update db store.
    liveEssay: string; // Yes, this is a bit dup with what is stored in essay record below. :( 
    // Here we make the key in ideas and essay the same, so that we could hook up an idea with essay, namely when using an idea to 
    // draft an essay, the key of the essay in the essay record with be the same key of that idea in ideas record
    ideas: Record<string, string>;   
    essay: Record<string, string>;
    essayHistory: Essay[];
}

const initialState: EssayWorkshopState = {
    activeWorkshop: EssayWorkshopType.IdeaAndDraft,
    college: "",
    major: "No Preference",
    essayPrompt: "",
    additionalAsk: "",
    promptAnalysis: undefined,
    selectedIdeaKey: undefined,
    ideaRefinementFeedback: "",
    essayRefinmentFeedback: "",
    liveEssayId: 0,
    liveEssay: "",
    ideas: {},
    essay: {},
    essayHistory: [],
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

        setPromptAnalysis(state, action: PayloadAction<string|undefined>) {
            state.promptAnalysis = action.payload;
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

        clearIdeas(state) {
            state.ideas = {};
        },

        addEssay(state, action: PayloadAction<{ key: string, value: string }>) {
            const { key, value } = action.payload;
            state.essay[key] = value;
        },

        deleteEssay(state, action: PayloadAction<string>) {
            delete state.essay[action.payload];
        },

        setEssayHistory(state, action: PayloadAction<Essay[]>) {
            state.essayHistory = action.payload;
        },
      
        deleteEssayFromHistory(state, action: PayloadAction<number>) {
            state.essayHistory = state.essayHistory.filter(essay => essay.id !== action.payload);
        },
    
        addEssayToHistory(state, action: PayloadAction<Essay>) {
            state.essayHistory.push(action.payload);
        },       

        setLiveEssayId(state, action: PayloadAction<number>) {
            state.liveEssayId = action.payload;
        },

        setLiveEssay(state, action: PayloadAction<string>) {
            state.liveEssay = action.payload;
        },

        setEssayFieldInHistory(
            state,
            action: PayloadAction<{ id: number; essay: string }>
          ) {
            const { id, essay } = action.payload;
            const existingEssay = state.essayHistory.find((e) => e.id === id);
            if (existingEssay) {
              existingEssay.essay = essay;
            }
        },
    }
});

export const essayWorkshopReducers = essayWorkshopSlice.reducer;
export const essayWorkshopActions = essayWorkshopSlice.actions;
