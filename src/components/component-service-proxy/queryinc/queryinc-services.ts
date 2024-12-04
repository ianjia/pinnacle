import { createIncService } from "./queryinc-service-factory";
import { Activity, Course } from "../../../shared";
import { ApExam } from "../../../shared";

const APEXAM_END_POINT_PATH = "/api/v1/queryinc/apexam";
const COURSE_END_POINT_PATH = "/api/v1/queryinc/course";
const ACTIVITY_END_POINT_PATH = "/api/v1/queryinc/activity";

export const apExamService = createIncService<ApExam>(APEXAM_END_POINT_PATH);
export const courseService = createIncService<Course>(COURSE_END_POINT_PATH);
export const activityService = createIncService<Activity>(ACTIVITY_END_POINT_PATH)