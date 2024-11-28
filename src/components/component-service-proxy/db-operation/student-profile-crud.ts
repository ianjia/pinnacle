import { api } from "../../../auth";
import { StudentProfile } from "../../../shared";

const STUDENT_END_POINT_PATH: string = "/api/v1/query/student";

// Create a new student
export async function createStudent(student: StudentProfile): Promise<void> {
  try {
    await api.post(STUDENT_END_POINT_PATH, student);
  } catch (error: any) {
    throw new Error(`Failed to create student: ${error.response?.data?.detail || error.message}`);
  }
}

// Get a student by ID
export async function getStudent(userId: number): Promise<StudentProfile> {
  try {
    const response = await api.get<StudentProfile>(`${STUDENT_END_POINT_PATH}/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error; // Keep the original error, to let logic in student_profile_form to handle, might need to revisit
    // throw new Error(`Failed to fetch student: ${error.response?.data?.detail || error.message}`);
  }
}

// Update a student
export async function updateStudent(student: StudentProfile): Promise<void> {
  try {
    await api.put(`${STUDENT_END_POINT_PATH}/${student.id}`, student);
  } catch (error: any) {
    throw new Error(`Failed to update student: ${error.response?.data?.detail || error.message}`);
  }
}

// Delete a student
export async function deleteStudent(userId: number): Promise<void> {
  try {
    await api.delete(`${STUDENT_END_POINT_PATH}/${userId}`);
  } catch (error: any) {
    throw new Error(`Failed to delete student: ${error.response?.data?.detail || error.message}`);
  }
}

// Get all students
export async function getAllStudents(): Promise<StudentProfile[]> {
  try {
    const response = await api.get<StudentProfile[]>(STUDENT_END_POINT_PATH);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch students: ${error.response?.data?.detail || error.message}`);
  }
}
