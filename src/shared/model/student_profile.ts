import { Resident_State } from "./resident-state";
import { Gender, Race, Ranking, Residency_Status } from "./student_structure";

export interface StudentProfile {
    user_id: number; // the user_id retrieved during log-in
    name?: string;
    race?: Race;
    school?: string;
    classRank?: Ranking;
    gender?: Gender;
    birthDate?: string; // ISO date string
    alumni_legacy?: string;  // University name which the student's parents graduated from, currently only support one name
    firstGenerationStudent?: boolean;
    needFinancialAid?: boolean;
    residenceState?: Resident_State;
    residency_status?: Residency_Status
  }

