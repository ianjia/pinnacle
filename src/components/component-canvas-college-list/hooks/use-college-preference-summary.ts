import { useSelector } from 'react-redux';
import { CollegePreferences, RootState, ImportanceLevel } from '../../../store';

const preferenceLabelMap: Record<keyof CollegePreferences, string> = {
  schoolSize: "School Size",
  locationRegion: "Location Region",
  locationState: "Location State",
  urbanization: "Urbanization",
  prestige: "Prestige",
  academicGeneral: "Academic General",
  academicFields: "Academic Fields",
  specializedProgram: "Specialized Program",
  programReputation: "Program Reputation",
  campusSocialEnvironment: "Campus Social Environment",
  campusDiversity: "Campus Diversity",
  extracurricularScene: "Extracurricular Scene",
  tuitionRange: "Tuition Range",
  financialSupport: "Financial Support",
  housing: "Housing",
  facilities: "Facilities",
  climatePreference: "Climate Preference",
  athletics: "Athletics",
  artsPrograms: "Arts Programs",
  researchInternships: "Research and Internships",
  distanceFromHome: "Distance from Home",
  averageClassSize: "Average Class Size",
};

export function useCollegePreferenceSummary(): string {
  const preferences: CollegePreferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );

  // Helper function to filter preferences by importance level
  const getPreferencesByImportance = (importance: ImportanceLevel) => {
    return Object.entries(preferences)
      .filter(([, preference]) => preference.importance === importance && preference.value !== 'No Preference')
      .map(([key, preference]) => `${preferenceLabelMap[key as keyof CollegePreferences]}: ${preference.value}`);
  };

  // Collect summaries based on importance with labels
  const veryImportantPreferences = getPreferencesByImportance(ImportanceLevel.VeryImportant);
  const somewhatImportantPreferences = getPreferencesByImportance(ImportanceLevel.SomewhatImportant);
  const niceToHavePreferences = getPreferencesByImportance(ImportanceLevel.NiceToHave);

  // Combine all summaries with labels for each section
  const summary = [
    veryImportantPreferences.length > 0 ? `Very Important: ${veryImportantPreferences.join('; ')}` : '',
    somewhatImportantPreferences.length > 0 ? `Somewhat Important: ${somewhatImportantPreferences.join('; ')}` : '',
    niceToHavePreferences.length > 0 ? `Nice to Have: ${niceToHavePreferences.join('; ')}` : '',
  ]
    .filter(Boolean) // Remove any empty strings
    .join(' | ');

  return `College Preferences Summary: ${summary}`;
}
