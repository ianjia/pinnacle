import { AcademicProfile, ActivityProfile, PersonalProfile } from "../common"

export enum TaskType {
    ComitteeReview = 1
}

export interface ITaskParameter {
    taskType: TaskType;
}

export interface ITaskParameterWithFullRecords extends ITaskParameter {
    personalProfile?: PersonalProfile;
    academicProfile?: AcademicProfile;
    activity?: ActivityProfile;
}

export interface ITaskParameterWithCollegeAndMajor extends ITaskParameterWithFullRecords{
    college_name: string;
    major: string;
}

