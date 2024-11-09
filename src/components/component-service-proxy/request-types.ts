// Defintion here would match the definion in request-types.py on server side

import { AcademicProfile, ActivityProfile, LifeStoryGoalProfile, PersonalProfile } from "../../common";

export interface ITaskRequest {
    academicProfile?: AcademicProfile;
    activityProfile?: ActivityProfile;
    lifeStoryGoalProfile?: LifeStoryGoalProfile;
    personalProfile?: PersonalProfile;
}

export interface CollegeListBuildRequest extends ITaskRequest{
    college_preferences: string
}

export interface InterviewRequest extends ITaskRequest{
    message?: string; 
}

export interface DesignIdeaGenerationRequest extends ITaskRequest{
    college_info: string;
    prompt: string;
    additionalCollegeAsk?: string; 
}

export interface DesignIdeaRefinementRequest extends ITaskRequest{
    feedback: string
}

export interface CollegeDataAndChanceRequest extends ITaskRequest{
    college_name: string; 
    major?: string; 
}

