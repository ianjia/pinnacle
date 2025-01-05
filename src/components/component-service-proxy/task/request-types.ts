export interface ITaskRequest {
}

export interface CollegeListBuildRequest extends ITaskRequest {
}

export interface InterviewAnalyzeRequest extends ITaskRequest {
    conversation_id: number
}

export interface EssayIdeasGenerationRequest extends ITaskRequest {
    college: string;
    major: string;
    prompt: string;
    additionalCollegeAsk?: string; 
}

export interface EssayIdeaRefinementRequest extends EssayIdeasGenerationRequest {
    idea: string;
    feedback: string
}

export interface EssayDraftRequest extends EssayIdeasGenerationRequest {
    idea: string;
}

export interface EssayRefineRequest extends EssayDraftRequest {
    essay: string;
    feedback: string
}

export interface CollegeDataAndChanceRequest extends ITaskRequest {
    college_name: string; 
    major: string;  // To make it easy, if not chosen major, put it as "No Preference" instead of making it optional
}

export interface CommitteeReviewRequest extends ITaskRequest{
    college_name: string; 
    major: string; 
    my_chance: number;
}
