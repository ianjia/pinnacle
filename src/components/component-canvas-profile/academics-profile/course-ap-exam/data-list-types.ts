import { ApExam, Course, SchoolYear } from "../../../../shared";

export interface CourseListCardProps {
    title: string;
    courseList: Course[];
    onAddCourse: () => void;
    onUpdateCourse: (updatedCourse: Course) => void;
    onDeleteCourse: (courseId: number) => void;
  }
  
export interface ApExamListCardProps {
    title: string;
    apExamList: ApExam[];
    onAddApExam: () => void;
    onUpdateApExam: (updatedApExam: ApExam) => void;
    onDeleteApExam: (apExamId: number) => void;
  }

export interface CourseApExamCombinedCardProps {
    school_year: SchoolYear;
}