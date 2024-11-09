// See result_types.py on AI python server side

import { CollegeDetails } from "../../store";

export type ResultType_CollegeList = string[];
export type ResultType_CommitteeReview = string;
export type ResultType_StartInterview = string;
export type ResultType_EssayIdeas = string;
export type ResultType_CollegeDataChance = CollegeDetails;

export type TaskResultType = string | ResultType_CollegeList | ResultType_CollegeDataChance;

