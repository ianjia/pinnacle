import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { handleAcademicReviewTask, ITaskParameterWithCollegeAndMajor } from '../proxy';

interface CommitteeReviewState {
    data: string | undefined;
    isLoading: boolean;
    error: string | undefined;
    college_to_evaluate: string | undefined;
    major_to_evalute: string; 
}

const initialState: CommitteeReviewState = {
    data: undefined,
    isLoading: false,
    error: undefined,
    college_to_evaluate: undefined,
    major_to_evalute: "No Preference",
};

export const fetchCommitteeReviewData = createAsyncThunk(
    'committeeReview/fetchData',
    async (taskParams: ITaskParameterWithCollegeAndMajor, { rejectWithValue }) => {
        try {
            const response = await handleAcademicReviewTask(taskParams);
            return response.result;
        } catch (error) {
            return rejectWithValue('Error sending data.');
        }
    }
);

const committeeReviewSlice = createSlice({
    name: 'committeeReview',
    initialState,
    reducers: {
        setCollegeToEvaluate: (state, action: PayloadAction<string | undefined>) => {
            state.college_to_evaluate = action.payload;
        },
        setMajorToEvaluate: (state, action: PayloadAction<string>) => {
            state.major_to_evalute = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommitteeReviewData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchCommitteeReviewData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchCommitteeReviewData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setCollegeToEvaluate,
    setMajorToEvaluate,
} = committeeReviewSlice.actions;

export const committeeReviewReducers = committeeReviewSlice.reducer;
export const committeeReviewActions = committeeReviewSlice.actions;
