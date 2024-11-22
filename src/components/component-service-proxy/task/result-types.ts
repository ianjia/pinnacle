// See result_types.py on AI python server side

import { CombinedCollegeData, MyChanceOnCollege } from "../../../store";
import { TaskType } from "./basic-types";

// Define a base interface for TaskResult
export interface TaskResult {
    type: TaskType;
    error?: string // @Todo: leverge this field, for example, for essay drafting, if the input essay idea does not make sense, could return this 
                   // instead of still running LLM to generate essay and give one that is nonsense
}

// Specific TaskResult interfaces for each type
export interface CommitteeReviewTaskResult extends TaskResult {
    type: TaskType.CommitteReview;
    review: string;
}

export interface StartInterviewTaskResult extends TaskResult {
    type: TaskType.StartInterview;
    initial_message: string;
}

export interface GenerateEssayIdeasTaskResult extends TaskResult {
    type: TaskType.GenerateEssayIdeas;
    ideas: string[];
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
    college_list: string[];
}

export interface GetCollegeDataChanceTaskResult extends TaskResult {
    type: TaskType.GetCollegeDataChance;
    data_chance: CombinedCollegeData;
}

export interface MyChanceTaskResult extends TaskResult {
    type: TaskType.MyChance;
    myChance: MyChanceOnCollege;
}

