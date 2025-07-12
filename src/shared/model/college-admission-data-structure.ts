
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

export interface SimlifiedCollegeData {
    college: string;
    admidRate: number;
    chance: number;
}

export interface ApplyDecision {
    user_id: number
    decision: string
}

export function toSimplifiedCollegeData(
  admissions: CollegeAdmissionData[]
): SimlifiedCollegeData[] {
  return admissions
    .filter((item): item is Required<CollegeAdmissionData> => !!item.data)
    .map(({ college, data }) => ({
      college,
      admidRate: data.admitRate,
      chance: data.chance,
    }));
}

/**
 * Converts a list of colleges into a readable multiline summary.
 *
 * Example output:
 * 1. MIT | Admit Rate: 4.0 % | Your Chance: 12.0 %
 * 2. UCLA | Admit Rate: 11.5 % | Your Chance: 28.0 %
 */
export function formatCollegeData(list: SimlifiedCollegeData[]): string {
  return list
    .map(
      (c, idx) =>
        `${idx + 1}. ${c.college} | Admit Rate: ${c.admidRate.toFixed(1)} % | Your Chance: ${c.chance.toFixed(1)} %`
    )
    .join('\n');
}