import { AcademicProfile, ExtraCurriculumActivity } from "../common"

export type TaskReturnType = {
    result?: string  // use string for now, as for now it is LLM chat message return, could change in the future
    error?: string
}

export type TaskParameterType = {
    academicProfile?: AcademicProfile;
    activity?: ExtraCurriculumActivity;
}