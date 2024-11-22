import { Gender, Race, Ranking, Residency_Status } from "./student_structure";

export interface StudentProfile {
    id: string;
    name?: string;
    race?: Race;
    school?: string;
    classRank?: Ranking;
    gender?: Gender;
    birthDate?: string; // ISO date string
    alumni_legacy?: string;  // Format would be like "University 1; University 2", as student's parents might graduate from different colleges
    firstGenerationStudent?: boolean;
    needFinancialAid?: boolean;
    residenceState?: string;
    residency_status?: Residency_Status
  }

