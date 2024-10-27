import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ImportanceLevel =
  | 'Very important'
  | 'Somewhat important'
  | 'Nice to have';

export interface PreferenceItem {
  value: string;
  importance: ImportanceLevel;
}

export interface CollegePreferencesState {
  // 1. School Size
  schoolSize: PreferenceItem;

  // 2. Location
  locationRegion: PreferenceItem;
  locationState: PreferenceItem;
  urbanization: PreferenceItem;

  // 3. Prestige
  prestige: PreferenceItem;

  // 4. Academic Focus
  academicGeneral: PreferenceItem;
  academicFields: PreferenceItem;
  specializedProgram: PreferenceItem;
  programReputation: PreferenceItem;

  // 5. Campus Culture
  campusSocialEnvironment: PreferenceItem;
  campusDiversity: PreferenceItem;
  extracurricularScene: PreferenceItem;

  // 6. Cost and Financial Aid
  tuitionRange: PreferenceItem;
  financialSupport: PreferenceItem;

  // 7. Housing and Student Life
  housing: PreferenceItem;
  facilities: PreferenceItem;

  // 8. Climate Preference
  climatePreference: PreferenceItem;

  // 9. Extracurricular Opportunities
  athletics: PreferenceItem;
  artsPrograms: PreferenceItem;
  researchInternships: PreferenceItem;

  // 10. Distance from Home
  distanceFromHome: PreferenceItem;

  // 11. Class Sizes
  averageClassSize: PreferenceItem;
}

const initialPreferenceItem: PreferenceItem = {
  value: 'No Preference',
  importance: 'Nice to have',
};

const initialState: CollegePreferencesState = {
  // Initialize all preferences with default values
  schoolSize: { ...initialPreferenceItem },
  locationRegion: { ...initialPreferenceItem },
  locationState: { ...initialPreferenceItem },
  urbanization: { ...initialPreferenceItem },
  prestige: { ...initialPreferenceItem },
  academicGeneral: { ...initialPreferenceItem },
  academicFields: { ...initialPreferenceItem },
  specializedProgram: { ...initialPreferenceItem },
  programReputation: { ...initialPreferenceItem },
  campusSocialEnvironment: { ...initialPreferenceItem },
  campusDiversity: { ...initialPreferenceItem },
  extracurricularScene: { ...initialPreferenceItem },
  tuitionRange: { ...initialPreferenceItem },
  financialSupport: { ...initialPreferenceItem },
  housing: { ...initialPreferenceItem },
  facilities: { ...initialPreferenceItem },
  climatePreference: { ...initialPreferenceItem },
  athletics: { ...initialPreferenceItem },
  artsPrograms: { ...initialPreferenceItem },
  researchInternships: { ...initialPreferenceItem },
  distanceFromHome: { ...initialPreferenceItem },
  averageClassSize: { ...initialPreferenceItem },
};

const collegePreferencesSlice = createSlice({
  name: 'collegePreferences',
  initialState,
  reducers: {
    setPreference(
      state,
      action: PayloadAction<{ key: keyof CollegePreferencesState; value: string }>
    ) {
      const { key, value } = action.payload;
      state[key].value = value;

      // Reset importance to 'Nice to have' if value is 'No Preference'
      if (value === 'No Preference') {
        state[key].importance = 'Nice to have';
      }
    },
    setImportance(
      state,
      action: PayloadAction<{
        key: keyof CollegePreferencesState;
        importance: ImportanceLevel;
      }>
    ) {
      const { key, importance } = action.payload;
      state[key].importance = importance;
    },
  },
});

export const collegePreferencesReducers = collegePreferencesSlice.reducer;
export const collegePreferencesActions = collegePreferencesSlice.actions;
