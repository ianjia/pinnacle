import { useSelector } from 'react-redux';
import { RootState } from './';

export function useBasicInfoFilled(): boolean {
  const student      = useSelector((s: RootState) => s.selectedProfile.studentData);
  const gpa          = useSelector((s: RootState) => s.selectedProfile.gpa);
  const courses9     = useSelector((s: RootState) => s.selectedProfile.ninthGradeCourseList);
  const courses10    = useSelector((s: RootState) => s.selectedProfile.tenthGradeCourseList);
  const courses11    = useSelector((s: RootState) => s.selectedProfile.eleventhGradeCourseList);

  /** basic student fields */
  if (
    !student?.name ||
    !student?.residency_status ||
    !student?.residenceState ||
    !student?.school
  ) {
    return false;
  }

  /** GPA for 9-11 */
  if (
    gpa?.ninth   === undefined ||
    gpa?.tenth   === undefined ||
    gpa?.eleventh=== undefined
  ) {
    return false;
  }

  /** at least 5 courses in each of 9-11 */
  if (courses9.length < 5 || courses10.length < 5 || courses11.length < 5) {
    return false;
  }

  return true;
}
