import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ImportanceLevel {
    VeryImportant = "Very important",
    SomewhatImportant = "Somewhat important",
    NiceToHave = "Nice to have",
}

export interface PreferenceItem {
  value: string;
  importance: ImportanceLevel;
}

export interface CollegePreferences {
  schoolSize: PreferenceItem;
  locationRegion: PreferenceItem;
  locationState: PreferenceItem;
  urbanization: PreferenceItem;
  prestige: PreferenceItem;
  academicGeneral: PreferenceItem;
  academicFields: PreferenceItem;
  specializedProgram: PreferenceItem;
  programReputation: PreferenceItem;
  campusSocialEnvironment: PreferenceItem;
  campusDiversity: PreferenceItem;
  extracurricularScene: PreferenceItem;
  tuitionRange: PreferenceItem;
  financialSupport: PreferenceItem;
  housing: PreferenceItem;
  facilities: PreferenceItem;
  climatePreference: PreferenceItem;
  athletics: PreferenceItem;
  artsPrograms: PreferenceItem;
  researchInternships: PreferenceItem;
  distanceFromHome: PreferenceItem;
  averageClassSize: PreferenceItem;
}

// New CollegePreferencesState with collegePreferences property
export interface CollegePreferencesState {
  collegePreferences: CollegePreferences;
}

const initialPreferenceItem: PreferenceItem = {
  value: 'No Preference',
  importance: ImportanceLevel.NiceToHave,
};

// Initial state with updated prestige values
const initialState: CollegePreferencesState = {
  collegePreferences: {
    schoolSize: { ...initialPreferenceItem },
    locationRegion: { ...initialPreferenceItem },
    locationState: { ...initialPreferenceItem },
    urbanization: { ...initialPreferenceItem },
    prestige: {
      value: 'Very Prestigious: Acceptance rate 10–20%',
      importance: ImportanceLevel.VeryImportant,
    },
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
  },
};

const collegePreferencesSlice = createSlice({
  name: 'collegePreferences',
  initialState,
  reducers: {
    setPreference(
      state,
      action: PayloadAction<{ key: keyof CollegePreferences; value: string }>
    ) {
      const { key, value } = action.payload;
      state.collegePreferences[key].value = value;

      // Reset importance to 'Nice to have' if value is 'No Preference'
      if (value === 'No Preference') {
        state.collegePreferences[key].importance = ImportanceLevel.NiceToHave;
      }
    },
    setImportance(
      state,
      action: PayloadAction<{
        key: keyof CollegePreferences;
        importance: ImportanceLevel;
      }>
    ) {
      const { key, importance } = action.payload;
      state.collegePreferences[key].importance = importance;
    },
  },
});

export const collegePreferencesReducers = collegePreferencesSlice.reducer;
export const collegePreferencesActions = collegePreferencesSlice.actions;
