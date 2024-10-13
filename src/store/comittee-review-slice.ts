import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleAcademicReviewTask, TaskParameterType } from '../proxy';

interface CommitteeReviewState {
    data: string | undefined;
    isLoading: boolean;
    error: string | undefined;
}

const initialState: CommitteeReviewState = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const fetchCommitteeReviewData = createAsyncThunk(
    'committeeReview/fetchData',
    async (taskParams: TaskParameterType, { rejectWithValue }) => {
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
        // Add any synchronous reducers if needed
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


export const committeeReviewReducers = committeeReviewSlice.reducer;
export const committeeReviewActions = committeeReviewSlice.actions;
