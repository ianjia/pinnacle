import { GPA, StandardizedTest, StudentProfile } from "../../../shared";
import { createService } from "./query-service-factory";

const GPA_END_POINT_PATH: string = "/api/v1/query/gpa";
const STANDARDIZED_TEST_END_POINT_PATH = "/api/v1/query/stdtest";
const STUDENT_END_POINT_PATH = "/api/v1/query/student";

export const gpaService = createService<GPA>(GPA_END_POINT_PATH);
export const stdTestService = createService<StandardizedTest>(STANDARDIZED_TEST_END_POINT_PATH);
export const studentService = createService<StudentProfile>(STUDENT_END_POINT_PATH);