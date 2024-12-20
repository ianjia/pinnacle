// See result_types.py on AI python server side

import { CombinedCollegeData, MyChanceOnCollege } from "../../../store";
import { TaskType } from "./basic-types";

// Define a base interface for TaskResult
export interface TaskResult {
    type: TaskType;
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

