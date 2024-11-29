import { Gender, Race, Ranking, Resident_State, Residency_Status } from "./student_structure";

export interface StudentProfile {
    user_id: number; // the user_id retrieved during log-in
    name?: string;
    race?: Race;
    school?: string;
    classRank?: Ranking;
    gender?: Gender;
    birthDate?: string; // ISO date string
    alumni_legacy?: string;  // Format would be like "University 1; University 2", as student's parents might graduate from different colleges
    firstGenerationStudent?: boolean;
    needFinancialAid?: boolean;
    residenceState?: Resident_State;
    residency_status?: Residency_Status
  }

