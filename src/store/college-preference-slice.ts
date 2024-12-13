import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SchoolSize,
  LocationRegion,
  Urbanization,
  Prestige,
  AcademicFocus,
  AcademicFields,
  Major,
  MajorReputation,
  SocialEnviroment,
  Diversity,
  ExtracurricularScene,
  TuitionRange,
  FinancialSupport,
  Housing,
  Facilities,
  ClimatePreference,
  Athletics,
  Arts,
  ResearchInternship,
  DistanceFromHome,
  ClassSizes,
  StatePreference,
  ImportanceLevel,
  CollegePreferences,
  PreferenceItem,
  CollegePreferenceKeys,
} from '../shared';

// CollegePreferencesState with strong types
export interface CollegePreferencesState {
  collegePreferences: CollegePreferences;
}

// Helper to create initial preference items
const createInitialPreferenceItem = <T>(value: T): PreferenceItem<T> => ({
  value,
  importance: ImportanceLevel.NiceToHave,
});

// Initial state with updated strong types
const initialState: CollegePreferencesState = {
  collegePreferences: {
    user_id: 0, 
    schoolSize: createInitialPreferenceItem(SchoolSize.NO_PREFERENCE),
    locationRegion: createInitialPreferenceItem(LocationRegion.NO_PREFERENCE),
    locationState: createInitialPreferenceItem(StatePreference.NO_PREFERENCE),
    urbanization: createInitialPreferenceItem(Urbanization.NO_PREFERENCE),
    prestige: createInitialPreferenceItem(Prestige.NO_PREFERENCE),
    academicGeneral: createInitialPreferenceItem(AcademicFocus.NO_PREFERENCE),
    academicFields: createInitialPreferenceItem(AcademicFields.NO_PREFERENCE),
    specializedProgram: createInitialPreferenceItem(Major.NO_PREFERENCE),
    programReputation: createInitialPreferenceItem(MajorReputation.NO_PREFERENCE),
    campusSocialEnvironment: createInitialPreferenceItem(SocialEnviroment.NO_PREFERENCE),
    campusDiversity: createInitialPreferenceItem(Diversity.NO_PREFERENCE),
    extracurricularScene: createInitialPreferenceItem(ExtracurricularScene.NO_PREFERENCE),
    tuitionRange: createInitialPreferenceItem(TuitionRange.NO_PREFERENCE),
    financialSupport: createInitialPreferenceItem(FinancialSupport.NO_PREFERENCE),
    housing: createInitialPreferenceItem(Housing.NO_PREFERENCE),
    facilities: createInitialPreferenceItem(Facilities.NO_PREFERENCE),
    climatePreference: createInitialPreferenceItem(ClimatePreference.NO_PREFERENCE),
    athletics: createInitialPreferenceItem(Athletics.NO_PREFERENCE),
    artsPrograms: createInitialPreferenceItem(Arts.NO_PREFERENCE),
    researchInternships: createInitialPreferenceItem(ResearchInternship.NO_PREFERENCE),
    distanceFromHome: createInitialPreferenceItem(DistanceFromHome.NO_PREFERENCE),
    averageClassSize: createInitialPreferenceItem(ClassSizes.NO_PREFERENCE),
  },
};

const collegePreferencesSlice = createSlice({
  name: 'collegePreferences',
  initialState,
  reducers: {
    updateUserId(state, action: PayloadAction<number>)  {
      state.collegePreferences.user_id = action.payload;
    },

    updatePreference<T>(
      state: { key?: keyof CollegePreferenceKeys; value?: string; collegePreferences?: any; },
      action: PayloadAction<{ key: CollegePreferenceKeys; value: T }>
    ) {
      const { key, value } = action.payload;
      state.collegePreferences[key].value = value;

      if (value === "No Preference") {
        state.collegePreferences[key].importance = ImportanceLevel.NiceToHave;
      }
    },

    updateImportance(
      state,
      action: PayloadAction<{
        key: CollegePreferenceKeys;
        importance: ImportanceLevel;
      }>
    ) {
      const { key, importance } = action.payload;
      state.collegePreferences[key].importance = importance;
    },

    /**
     * Set the entire CollegePreferences object
     */
    setCollegePreferences(
      state,
      action: PayloadAction<CollegePreferences>
    ) {
      state.collegePreferences = action.payload;
    },
  },
});

export const collegePreferencesReducers = collegePreferencesSlice.reducer;
export const collegePreferencesActions = collegePreferencesSlice.actions;
