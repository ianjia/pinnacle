import { api } from "../../../auth";
import { CollegePreferences } from "../../../shared";
import { transformNullToUndefined } from "../util/transformNullToUndefined";

const COLLEGE_PREFERENCES_ENDPOINT = "/api/v1/query/college-preferences";

export const collegePreferenceService = {
  /**
   * Create a new CollegePreferences record
   */
  async create(preferences: CollegePreferences): Promise<void> {
    try {
      await api.post(COLLEGE_PREFERENCES_ENDPOINT, preferences );
    } catch (error: any) {
      throw new Error(
        `Failed to create CollegePreferences record: ${error.response?.data?.detail || error.message}`
      );
    }
  },

  /**
   * Get a CollegePreferences record by user_id
   */
  async getById(user_id: number): Promise<CollegePreferences> {
    try {
      const response = await api.get<CollegePreferences>(`${COLLEGE_PREFERENCES_ENDPOINT}/${user_id}`);
      return transformNullToUndefined(response.data); // Apply transformation to handle null values
    } catch (error: any) {
        throw error; // Attention: Let calling logic handle the original error, different from other APIs in this file, so that it could be
        // checked as axios error and create the record since it was never created before
    }
  },

  /**
   * Update the `value` property of a specific field in CollegePreferences
   */
  async updateFieldValue(user_id: number, field: keyof CollegePreferences, value: any): Promise<void> {
    try {
      await api.put(`${COLLEGE_PREFERENCES_ENDPOINT}/${user_id}/${field}/value`, { value: value });
    } catch (error: any) {
      throw new Error(
        `Failed to update value for field '${field}' in CollegePreferences: ${error.response?.data?.detail || error.message}`
      );
    }
  },

  /**
   * Update the `importance` property of a specific field in CollegePreferences
   */
  async updateFieldImportance(user_id: number, field: keyof CollegePreferences, importance: string): Promise<void> {
    try {
      await api.put(`${COLLEGE_PREFERENCES_ENDPOINT}/${user_id}/${field}/importance`, { value: importance});
    } catch (error: any) {
      throw new Error(
        `Failed to update importance for field '${field}' in CollegePreferences: ${error.response?.data?.detail || error.message}`
      );
    }
  },

  /**
   * Delete a CollegePreferences record by user_id
   */
  async deleteById(user_id: number): Promise<void> {
    try {
      await api.delete(`${COLLEGE_PREFERENCES_ENDPOINT}/${user_id}`);
    } catch (error: any) {
      throw new Error(
        `Failed to delete CollegePreferences record: ${error.response?.data?.detail || error.message}`
      );
    }
  },

  /**
   * Get all CollegePreferences records
   */
  async getAll(): Promise<CollegePreferences[]> {
    try {
      const response = await api.get<CollegePreferences[]>(COLLEGE_PREFERENCES_ENDPOINT);
      return response.data.map(transformNullToUndefined); // Apply transformation to all records
    } catch (error: any) {
      throw new Error(
        `Failed to fetch all CollegePreferences records: ${error.response?.data?.detail || error.message}`
      );
    }
  },
};
