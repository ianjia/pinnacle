import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollegeListWorkshopType } from '../common';

// Define the structure for CollegeBasicData and other data types
interface CollegeBasicData {
    admitRate: number;
    undergradEnroll: number;
    annualCost: number;
    nationalRanking: number;
    programRanking?: number;
}

// Define the CollegeCategory type to match the Python Literal
type CollegeCategory = 1 | 2 | 3;  // 1 means reach, 2 is target, 3 means safety

export interface MyChanceOnCollege {
    chance: number;
    category: CollegeCategory;
}

export interface CombinedCollegeData extends CollegeBasicData, MyChanceOnCollege {}

interface CollegeListWorkshopState {
    activeCollegeListWorkshop: CollegeListWorkshopType;
    collegeList: string[];
    collegeDetails: Record<string, CombinedCollegeData>;
}

const initialState: CollegeListWorkshopState = {
    activeCollegeListWorkshop: CollegeListWorkshopType.Preferences,
    collegeList: [],
    collegeDetails: {},
};

const collegeListWorkshopSlice = createSlice({
    name: 'collegeListWorkshop',
    initialState,
    reducers: {
        setActiveCollegeListWorkshop(state, action: PayloadAction<CollegeListWorkshopType>) {
            state.activeCollegeListWorkshop = action.payload;
        },
        // (1) Reducer that sets the whole list of collegeList
        setCollegeList(state, action: PayloadAction<string[]>) {
            state.collegeList = action.payload;
        },
        // (2) Reducer that deletes an element in collegeList
        deleteCollege(state, action: PayloadAction<string>) {
            state.collegeList = state.collegeList.filter(college => college !== action.payload);
        },
        // (3) Reducer that adds an element in collegeList
        addCollege(state, action: PayloadAction<string>) {
            if (!state.collegeList.includes(action.payload)) {
                state.collegeList.push(action.payload);
            }
        },
        // (4) Reducer that sets the whole category
        setCollegeCategory(state, action: PayloadAction<Record<string, CombinedCollegeData>>) {
            state.collegeDetails = action.payload;
        },
        // (5) Reducer that adds an element in the category
        addCollegeDetail(state, action: PayloadAction<{ name: string; detail: CombinedCollegeData }>) {
            const { name, detail } = action.payload;
            state.collegeDetails[name] = detail;
        },
        // (6) Reducer that deletes an element in the category
        deleteCollegeDetail(state, action: PayloadAction<string>) {
            delete state.collegeDetails[action.payload];
        },
        // (7) Reducer that sets the value for an element in the category
        updateCollegeDetail(state, action: PayloadAction<{ name: string; detail: Partial<CombinedCollegeData> }>) {
            const { name, detail } = action.payload;
            if (state.collegeDetails[name]) {
                state.collegeDetails[name] = { ...state.collegeDetails[name], ...detail };
            }
        }
    }
});

export const collegeListWorkshopReducers = collegeListWorkshopSlice.reducer;
export const collegeListWorkshopActions = collegeListWorkshopSlice.actions;
