// See result_types.py on AI python server side

import { CollegeElementLLMOutputSchema, CombinedCollegeData } from "../../../shared";
import { TaskType } from "./basic-types";

// Define a base interface for TaskResult
export interface TaskResult {
    type: TaskType;
}

export interface InterviewAnalyzeResult extends TaskResult {
    type: TaskType.AnalyzeInterview;
    message: string;
}

// Specific TaskResult interfaces for each type
export interface CommitteeReviewTaskResult extends TaskResult {
    type: TaskType.CommitteReview;
    review: string;
}

export interface GenerateEssayIdeasTaskResult extends TaskResult {
    type: TaskType.GenerateEssayIdeas;
    ideas: string[];
}

export interface PromptAnalysisTaskResult extends TaskResult {
    type: TaskType.EssayPromptAnalysis;
    analysis: string;
}

export interface RefineEssayIdeaTaskResult extends TaskResult {
    type: TaskType.RefineEssayIdea;
    idea: string;
}

export interface EssayDraftTaskResult extends TaskResult {
    type: TaskType.DraftEssay;
    essay: string;
}

export interface EssayRefineTaskResult extends TaskResult {
    type: TaskType.RefineEssay;
    essay: string;
}

export interface BuildCollegeListTaskResult extends TaskResult {
    type: TaskType.BuildCollegeList;
    college_list: CollegeElementLLMOutputSchema[];
}

export interface GetCollegeDataChanceTaskResult extends TaskResult {
    type: TaskType.GetCollegeDataChance;
    data_chance: CollegeElementLLMOutputSchema;
}

export function toCombinedCollegeData(data_chance: CollegeElementLLMOutputSchema): CombinedCollegeData {
    return { 
            admitRate: data_chance.admitRate,
            undergradEnroll: data_chance.undergradEnroll,
            annualCost: data_chance.annualCost,
            nationalRanking: data_chance.nationalRanking,
            programRanking: data_chance.programRanking,
            chance: data_chance.chance,
            category: data_chance.category,
            reason: data_chance.reason,
        }
}
