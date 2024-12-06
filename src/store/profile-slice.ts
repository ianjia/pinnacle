import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GPA, LifeStory, ProfileType, StandardizedTest, StudentProfile, Course, ApExam, Activity, Honor, AcademicCareerGoal } from '../shared';

interface selectedProfileState {
    activeProfile: ProfileType;
    studentData: StudentProfile;
    standardizedTest: StandardizedTest;
    gpa: GPA;
    ninthGradeCourseList: Course[];
    tenthGradeCourseList: Course[];
    eleventhGradeCourseList: Course[];
    twelfthGradeCourseList: Course[];
    ninthGradeApExamList: ApExam[];
    tenthGradeApExamList: ApExam[];
    eleventhGradeApExamList: ApExam[];
    twelfthGradeApExamList: ApExam[];
    activityList: Activity[];
    honorList: Honor[];
    lifeStoryList: LifeStory[];
    careerGoalList: AcademicCareerGoal[];
}

const initialState: selectedProfileState = {
    activeProfile: ProfileType.Student,
    studentData: {
        user_id: 0,
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
        user_id: 0,
        act: undefined,
        sat: undefined,
    },
    gpa: {
        user_id: 0,
        ninth: undefined,
        tenth: undefined,
        eleventh: undefined,
        twelfth: undefined,
        overall: undefined,
    },
    ninthGradeCourseList: [],
    tenthGradeCourseList: [],
    eleventhGradeCourseList: [],
    twelfthGradeCourseList: [],
    ninthGradeApExamList: [],
    tenthGradeApExamList: [],
    eleventhGradeApExamList: [],
    twelfthGradeApExamList: [],
    activityList: [],
    honorList: [],
    lifeStoryList: [],
    careerGoalList: [],
};

const selectedProfileSlice = createSlice({
    name: 'selectedProfile',
    initialState,
    reducers: {
        setSelectedProfile(state: selectedProfileState, action: PayloadAction<ProfileType>) {
            state.activeProfile = action.payload;
        },
        setStudentData(state: selectedProfileState, action: PayloadAction<StudentProfile>) {
            state.studentData = action.payload;
        },
        updateStudentField<K extends keyof StudentProfile>(
            state: selectedProfileState,
            action: PayloadAction<{ field: K; value: StudentProfile[K] }>
        ) {
            state.studentData[action.payload.field] = action.payload.value;
        },
        setStdTestRecord(state: selectedProfileState, action: PayloadAction<StandardizedTest>) {
            state.standardizedTest = action.payload;
        },
        updateStandardizedTestField<K extends keyof StandardizedTest>(
            state: selectedProfileState,
            action: PayloadAction<{ field: K; value: StandardizedTest[K] }>
        ) {
            state.standardizedTest[action.payload.field] = action.payload.value;
        },
        setGpaRecord(state: selectedProfileState, action: PayloadAction<GPA>) {
            state.gpa = action.payload;
        },
        updateGpaField<K extends keyof GPA>(
            state: selectedProfileState,
            action: PayloadAction<{ field: K; value: GPA[K] }>
        ) {
            state.gpa[action.payload.field] = action.payload.value;
        },

        // 9th Course List Reducers
        setNinthGradeCourseList(state, action: PayloadAction<Course[]>) {
            state.ninthGradeCourseList = action.payload;
        },
        addNinthGradeCourse(state, action: PayloadAction<Course>) {
            state.ninthGradeCourseList.push(action.payload);
        },
        updateNinthGradeCourse(state, action: PayloadAction<{ id: number; course: Partial<Course> }>) {
            const index = state.ninthGradeCourseList.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                state.ninthGradeCourseList[index] = { ...state.ninthGradeCourseList[index], ...action.payload.course };
            }
        },
        deleteNinthGradeCourse(state, action: PayloadAction<number>) {
            state.ninthGradeCourseList = state.ninthGradeCourseList.filter(course => course.id !== action.payload);
        },

        //  9th AP Exam List
        setNinthGradeApExamList(state, action: PayloadAction<ApExam[]>) {
            state.ninthGradeApExamList = action.payload;
        },
        addNinthGradeApExam(state, action: PayloadAction<ApExam>) {
            state.ninthGradeApExamList.push(action.payload);
        },
        updateNinthGradeApExam(state, action: PayloadAction<{ id: number; exam: Partial<ApExam> }>) {
            const index = state.ninthGradeApExamList.findIndex(exam => exam.id === action.payload.id);
            if (index !== -1) {
                state.ninthGradeApExamList[index] = { ...state.ninthGradeApExamList[index], ...action.payload.exam };
            }
        },
        deleteNinthGradeApExam(state, action: PayloadAction<number>) {
            state.ninthGradeApExamList = state.ninthGradeApExamList.filter(exam => exam.id !== action.payload);
        },

        // Tenth Grade Course List Reducers
        setTenthGradeCourseList(state, action: PayloadAction<Course[]>) {
            state.tenthGradeCourseList = action.payload;
        },
        addTenthGradeCourse(state, action: PayloadAction<Course>) {
            state.tenthGradeCourseList.push(action.payload);
        },
        updateTenthGradeCourse(state, action: PayloadAction<{ id: number; course: Partial<Course> }>) {
            const index = state.tenthGradeCourseList.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                state.tenthGradeCourseList[index] = { ...state.tenthGradeCourseList[index], ...action.payload.course };
            }
        },
        deleteTenthGradeCourse(state, action: PayloadAction<number>) {
            state.tenthGradeCourseList = state.tenthGradeCourseList.filter(course => course.id !== action.payload);
        },

        // Tenth Grade AP Exam List Reducers
        setTenthGradeApExamList(state, action: PayloadAction<ApExam[]>) {
            state.tenthGradeApExamList = action.payload;
        },
        addTenthGradeApExam(state, action: PayloadAction<ApExam>) {
            state.tenthGradeApExamList.push(action.payload);
        },
        updateTenthGradeApExam(state, action: PayloadAction<{ id: number; exam: Partial<ApExam> }>) {
            const index = state.tenthGradeApExamList.findIndex(exam => exam.id === action.payload.id);
            if (index !== -1) {
                state.tenthGradeApExamList[index] = { ...state.tenthGradeApExamList[index], ...action.payload.exam };
            }
        },
        deleteTenthGradeApExam(state, action: PayloadAction<number>) {
            state.tenthGradeApExamList = state.tenthGradeApExamList.filter(exam => exam.id !== action.payload);
        },

        // Eleventh Grade Course List Reducers
        setEleventhGradeCourseList(state, action: PayloadAction<Course[]>) {
            state.eleventhGradeCourseList = action.payload;
        },
        addEleventhGradeCourse(state, action: PayloadAction<Course>) {
            state.eleventhGradeCourseList.push(action.payload);
        },
        updateEleventhGradeCourse(state, action: PayloadAction<{ id: number; course: Partial<Course> }>) {
            const index = state.eleventhGradeCourseList.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                state.eleventhGradeCourseList[index] = { ...state.eleventhGradeCourseList[index], ...action.payload.course };
            }
        },
        deleteEleventhGradeCourse(state, action: PayloadAction<number>) {
            state.eleventhGradeCourseList = state.eleventhGradeCourseList.filter(course => course.id !== action.payload);
        },

        // Eleventh Grade AP Exam List Reducers
        setEleventhGradeApExamList(state, action: PayloadAction<ApExam[]>) {
            state.eleventhGradeApExamList = action.payload;
        },
        addEleventhGradeApExam(state, action: PayloadAction<ApExam>) {
            state.eleventhGradeApExamList.push(action.payload);
        },
        updateEleventhGradeApExam(state, action: PayloadAction<{ id: number; exam: Partial<ApExam> }>) {
            const index = state.eleventhGradeApExamList.findIndex(exam => exam.id === action.payload.id);
            if (index !== -1) {
                state.eleventhGradeApExamList[index] = { ...state.eleventhGradeApExamList[index], ...action.payload.exam };
            }
        },
        deleteEleventhGradeApExam(state, action: PayloadAction<number>) {
            state.eleventhGradeApExamList = state.eleventhGradeApExamList.filter(exam => exam.id !== action.payload);
        },

        // Twelfth Grade Course List Reducers
        setTwelfthGradeCourseList(state, action: PayloadAction<Course[]>) {
            state.twelfthGradeCourseList = action.payload;
        },
        addTwelfthGradeCourse(state, action: PayloadAction<Course>) {
            state.twelfthGradeCourseList.push(action.payload);
        },
        updateTwelfthGradeCourse(state, action: PayloadAction<{ id: number; course: Partial<Course> }>) {
            const index = state.twelfthGradeCourseList.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                state.twelfthGradeCourseList[index] = { ...state.twelfthGradeCourseList[index], ...action.payload.course };
            }
        },
        deleteTwelfthGradeCourse(state, action: PayloadAction<number>) {
            state.twelfthGradeCourseList = state.twelfthGradeCourseList.filter(course => course.id !== action.payload);
        },

        // Twelfth Grade AP Exam List Reducers
        setTwelfthGradeApExamList(state, action: PayloadAction<ApExam[]>) {
            state.twelfthGradeApExamList = action.payload;
        },
        addTwelfthGradeApExam(state, action: PayloadAction<ApExam>) {
            state.twelfthGradeApExamList.push(action.payload);
        },
        updateTwelfthGradeApExam(state, action: PayloadAction<{ id: number; exam: Partial<ApExam> }>) {
            const index = state.twelfthGradeApExamList.findIndex(exam => exam.id === action.payload.id);
            if (index !== -1) {
                state.twelfthGradeApExamList[index] = { ...state.twelfthGradeApExamList[index], ...action.payload.exam };
            }
        },
        deleteTwelfthGradeApExam(state, action: PayloadAction<number>) {
            state.twelfthGradeApExamList = state.twelfthGradeApExamList.filter(exam => exam.id !== action.payload);
        },

        // Activity List reducers
        setActivityList(state, action: PayloadAction<Activity[]>) {
            state.activityList = action.payload;
        },
        addActivity(state, action: PayloadAction<Activity>) {
            state.activityList.push(action.payload);
        },
        updateActivity(state, action: PayloadAction<{id: number; activity: Partial<Activity>}>) {
            const index = state.activityList.findIndex(activity => activity.id === action.payload.id);
            if (index !== -1) {
                state.activityList[index] = {...state.activityList[index], ...action.payload.activity};
            }
        },
        deleteActivity(state, action: PayloadAction<number>) {
            state.activityList = state.activityList.filter(activity => activity.id != action.payload);
        },

        // Honor List reducers
        setHonorList(state, action: PayloadAction<Honor[]>) {
            state.honorList = action.payload;
        },
        addHonor(state, action: PayloadAction<Honor>) {
            state.honorList.push(action.payload);
        },
        updateHonor(state, action: PayloadAction<{id: number; honor: Partial<Honor>}>) {
            const index = state.honorList.findIndex(honor => honor.id === action.payload.id);
            if (index !== -1) {
                state.honorList[index] = {...state.honorList[index], ...action.payload.honor};
            }
        },
        deleteHonor(state, action: PayloadAction<number>) {
            state.honorList = state.honorList.filter(honor => honor.id != action.payload);
        },

        // Life story List reducers
        setLifeStoryList(state, action: PayloadAction<LifeStory[]>) {
            state.lifeStoryList = action.payload;
        },
        addLifeStory(state, action: PayloadAction<LifeStory>) {
            state.lifeStoryList.push(action.payload);
        },
        updateLifeStory(state, action: PayloadAction<{id: number; lifeStory: Partial<Honor>}>) {
            const index = state.lifeStoryList.findIndex(lifeStory => lifeStory.id === action.payload.id);
            if (index !== -1) {
                state.lifeStoryList[index] = {...state.lifeStoryList[index], ...action.payload.lifeStory};
            }
        },
        deleteLifeStory(state, action: PayloadAction<number>) {
            state.lifeStoryList = state.lifeStoryList.filter(lifeStory => lifeStory.id != action.payload);
        },

        // Career goal  List reducers
        setCareerGoalList(state, action: PayloadAction<AcademicCareerGoal[]>) {
            state.careerGoalList = action.payload;
        },
        addCareerGoal(state, action: PayloadAction<AcademicCareerGoal>) {
            state.careerGoalList.push(action.payload);
        },
        updateCareerGoal(state, action: PayloadAction<{id: number; careerGoal: Partial<AcademicCareerGoal>}>) {
            const index = state.careerGoalList.findIndex(careerGoal => careerGoal.id === action.payload.id);
            if (index !== -1) {
                state.careerGoalList[index] = {...state.careerGoalList[index], ...action.payload.careerGoal};
            }
        },
        deleteCareerGoal(state, action: PayloadAction<number>) {
            state.careerGoalList = state.careerGoalList.filter(careerGoal => careerGoal.id != action.payload);
        }
    }
});

export const selectedProfileReducers = selectedProfileSlice.reducer;
export const selectedProfileActions = selectedProfileSlice.actions;
