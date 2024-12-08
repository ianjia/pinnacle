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
} from '../shared'; // Import the enums

// Generic PreferenceItem with strong typing for `value`
export interface PreferenceItem<T> {
  value: T;
  importance: ImportanceLevel;
}

// Updated CollegePreferences interface with strong types
export interface CollegePreferences {
  schoolSize: PreferenceItem<SchoolSize>;
  locationRegion: PreferenceItem<LocationRegion>;
  locationState: PreferenceItem<StatePreference>; 
  urbanization: PreferenceItem<Urbanization>;
  prestige: PreferenceItem<Prestige>;
  academicGeneral: PreferenceItem<AcademicFocus>;
  academicFields: PreferenceItem<AcademicFields>;
  specializedProgram: PreferenceItem<Major>;
  programReputation: PreferenceItem<MajorReputation>;
  campusSocialEnvironment: PreferenceItem<SocialEnviroment>;
  campusDiversity: PreferenceItem<Diversity>;
  extracurricularScene: PreferenceItem<ExtracurricularScene>;
  tuitionRange: PreferenceItem<TuitionRange>;
  financialSupport: PreferenceItem<FinancialSupport>;
  housing: PreferenceItem<Housing>;
  facilities: PreferenceItem<Facilities>;
  climatePreference: PreferenceItem<ClimatePreference>;
  athletics: PreferenceItem<Athletics>;
  artsPrograms: PreferenceItem<Arts>;
  researchInternships: PreferenceItem<ResearchInternship>;
  distanceFromHome: PreferenceItem<DistanceFromHome>;
  averageClassSize: PreferenceItem<ClassSizes>;
}

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
    setPreference<T>(
      state: { key?: keyof CollegePreferences; value?: string; collegePreferences?: any; },
      action: PayloadAction<{ key: keyof CollegePreferences; value: T }>
    ) {
      const { key, value } = action.payload;
      state.collegePreferences[key].value = value;

      // Reset importance to 'Nice to have' if value is 'No Preference'
      if (value === "No Preference") {
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
