
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileType, StudentProfile } from '../shared';

interface selectedProfileState {
    activeProfile: ProfileType;
    studentData: StudentProfile;
}

const initialState: selectedProfileState = {
    activeProfile: ProfileType.Student,
    studentData: {
        id: '',
        name: '',
        race: undefined,
        school: '',
        classRank: undefined,
        gender: undefined,
        birthDate: '',
        alumni_legacy: '',
        firstGenerationStudent: false,
        needFinancialAid: false,
        residenceState: undefined,
        residency_status: undefined,
      },
};

const selectedProfileSlice = createSlice({
    name: 'selectedProfile',
    initialState,
    reducers: {
        setSelectedProfile(state, action: PayloadAction<ProfileType>) {
            state.activeProfile = action.payload;
        },
        setStudentData(state, action: PayloadAction<StudentProfile>) {
            state.studentData = action.payload;
        },
        updateStudentField<K extends keyof StudentProfile>(
            state: selectedProfileState,
            action: PayloadAction<{ field: K; value: StudentProfile[K] }>
        ) {
            state.studentData[action.payload.field] = action.payload.value;
        }
    }
});

export const selectedProfileReducers = selectedProfileSlice.reducer;
export const selectedProfileActions = selectedProfileSlice.actions;