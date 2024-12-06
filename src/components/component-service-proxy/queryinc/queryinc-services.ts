import { createIncService } from "./queryinc-service-factory";
import { Activity, Course, Honor } from "../../../shared";
import { ApExam } from "../../../shared";

const APEXAM_END_POINT_PATH = "/api/v1/queryinc/apexam";
const COURSE_END_POINT_PATH = "/api/v1/queryinc/course";
const ACTIVITY_END_POINT_PATH = "/api/v1/queryinc/activity";
const HONOR_END_POINT_PATH = "/api/v1/queryinc/activity";
const LIFE_STORY_END_POINT_PATH = "/api/v1/queryinc/lifestory";
const ACADEMIC_CAREER_GOAL_END_POINT_PATH = "/api/v1/queryinc/careergoal";

export const apExamService = createIncService<ApExam>(APEXAM_END_POINT_PATH);
export const courseService = createIncService<Course>(COURSE_END_POINT_PATH);
export const activityService = createIncService<Activity>(ACTIVITY_END_POINT_PATH);
export const honorService = createIncService<Honor>(HONOR_END_POINT_PATH);
export const lifeStoryService = createIncService<Honor>(LIFE_STORY_END_POINT_PATH);
export const careerGoalService = createIncService<Honor>(ACADEMIC_CAREER_GOAL_END_POINT_PATH);