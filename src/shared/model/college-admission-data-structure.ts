
// Define the CollegeCategory type to match the Python Literal
export type CollegeCategory = 1 | 2 | 3;  // 1 means reach, 2 is target, 3 means safety

export interface CombinedCollegeData {
    admitRate: number;
    undergradEnroll: number;
    annualCost: number;
    nationalRanking: number;
    programRanking?: number;
    chance: number;
    category: CollegeCategory;
    reason: string;
}

export interface CollegeElementLLMOutputSchema {
    college: string;
    admitRate: number;
    undergradEnroll: number;
    annualCost: number;
    nationalRanking: number;
    programRanking?: number;
    chance: number;
    category: CollegeCategory;
    reason: string;
}

export interface CollegeAdmissionData {
    id: number;
    user_id: number;
    college: string;
    data?: CombinedCollegeData;
  }

