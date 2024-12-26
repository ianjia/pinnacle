import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollegeAdmissionData, CollegeListWorkshopType, CombinedCollegeData } from '../shared';


interface CollegeListWorkshopState {
    activeCollegeListWorkshop: CollegeListWorkshopType;
    collegeList: CollegeAdmissionData[];    
}

const initialState: CollegeListWorkshopState = {
    activeCollegeListWorkshop: CollegeListWorkshopType.Preferences,
    collegeList: [],
};

const collegeListWorkshopSlice = createSlice({
    name: 'collegeListWorkshop',
    initialState,
    reducers: {
        setActiveCollegeListWorkshop(state, action: PayloadAction<CollegeListWorkshopType>) {
            state.activeCollegeListWorkshop = action.payload;
        },

        // (1) Reducer that sets the whole list of collegeList
        setCollegeList(state, action: PayloadAction<CollegeAdmissionData[]>) {
            state.collegeList = action.payload;
        },

        // (2) Reducer that deletes an element in collegeList
        deleteCollege(state, action: PayloadAction<number>) {
            state.collegeList = state.collegeList.filter(college => college.id !== action.payload);
        },

        // (3) Add an element in collegeList only if college field does not exist yet
        addCollege(state, action: PayloadAction<CollegeAdmissionData>) {
            const newCollegeName = action.payload.college.trim().toLowerCase();
            const alreadyExists = state.collegeList.some(
                (c) => c.college.trim().toLowerCase() === newCollegeName
            );
    
            if (!alreadyExists) {
            state.collegeList.push(action.payload);
            } 
        },

    // (4) A function to set the data field of a CollegeAdmissionData in the collegeList,
    //     which CollegeAdmissionData object is determined by matching its id.
    setCollegeData(
        state,
        action: PayloadAction<{ id: number; data: CombinedCollegeData }>
      ) {
        const { id, data } = action.payload;
        const collegeItem = state.collegeList.find((c) => c.id === id);
        if (collegeItem) {
          collegeItem.data = data;
        }
      },
  
      // (5) A function to set the id field of a CollegeAdmissionData in the collegeList,
      //     which CollegeAdmissionData object is determined by matching its college string.
      setCollegeId(
        state,
        action: PayloadAction<{ college: string; newId: number }>
      ) {
        const { college, newId } = action.payload;
        const collegeItem = state.collegeList.find((c) => c.college === college);
        if (collegeItem) {
          collegeItem.id = newId;
        }
      },        

    }
});

export const collegeListWorkshopReducers = collegeListWorkshopSlice.reducer;
export const collegeListWorkshopActions = collegeListWorkshopSlice.actions;
