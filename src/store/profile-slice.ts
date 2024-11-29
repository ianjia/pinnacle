
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GPA, ProfileType, StudentProfile } from '../shared';
import { StandardizedTest } from '../shared/model/standardized-test';

interface selectedProfileState {
    activeProfile: ProfileType;
    studentData: StudentProfile;
    standardizedTest: StandardizedTest;
    gpa: GPA;
}

const initialState: selectedProfileState = {
    activeProfile: ProfileType.Student,
    studentData: {
        id: 0,
        name: '',
        race: undefined,
        school: '',
        classRank: undefined,
        gender: undefined,
        birthDate: undefined,
        alumni_legacy: '',
        firstGenerationStudent: false,
        needFinancialAid: false,
        residenceState: undefined,
        residency_status: undefined,
      },
    standardizedTest: {
        id: 0,
        act: undefined,
        sat: undefined,
    },
    gpa: {
        id: 0,
        ninth: undefined,
        tenth: undefined,
        eleventh: undefined,
        twelfth: undefined,
        overall: undefined,
    }
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
        },
        setStdTestRecord(state, action: PayloadAction<StandardizedTest>) {
            state.standardizedTest = action.payload;
        },
        updateStandardizedTestField<K extends keyof StandardizedTest>(
            state: selectedProfileState, 
            action: PayloadAction<{field: K, value: StandardizedTest[K]}>
        ) {
            state.standardizedTest[action.payload.field] = action.payload.value;
        },
        setGpaRecord(state, action: PayloadAction<GPA>) {
            state.gpa = action.payload;
        },
        updateGpaField<K extends keyof GPA>(
            state: selectedProfileState, 
            action: PayloadAction<{field: K, value: GPA[K]}>
        ) {
            state.gpa[action.payload.field] = action.payload.value;
        },
    }
});

export const selectedProfileReducers = selectedProfileSlice.reducer;
export const selectedProfileActions = selectedProfileSlice.actions;