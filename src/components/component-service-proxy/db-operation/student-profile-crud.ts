import { api } from "../../../auth";
import { StudentProfile } from "../../../shared";

// Create a new student
export async function createStudent(student: StudentProfile): Promise<void> {
  try {
    await api.post('/students', student);
  } catch (error: any) {
    throw new Error(`Failed to create student: ${error.response?.data?.detail || error.message}`);
  }
}

// Get a student by ID
export async function getStudent(userId: string): Promise<StudentProfile> {
  try {
    const response = await api.get<StudentProfile>(`/students/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch student: ${error.response?.data?.detail || error.message}`);
  }
}

// Update a student
export async function updateStudent(student: StudentProfile): Promise<void> {
  try {
    await api.put(`/students/${student.id}`, student);
  } catch (error: any) {
    throw new Error(`Failed to update student: ${error.response?.data?.detail || error.message}`);
  }
}

// Delete a student
export async function deleteStudent(userId: string): Promise<void> {
  try {
    await api.delete(`/students/${userId}`);
  } catch (error: any) {
    throw new Error(`Failed to delete student: ${error.response?.data?.detail || error.message}`);
  }
}

// Get all students
export async function getAllStudents(): Promise<StudentProfile[]> {
  try {
    const response = await api.get<StudentProfile[]>('/students');
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch students: ${error.response?.data?.detail || error.message}`);
  }
}
