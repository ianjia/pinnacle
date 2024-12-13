import { api } from "../../../auth";
import { transformNullToUndefined } from "../util/transformNullToUndefined";

export function createIncService<T>(endpoint: string) {
  return {
    async create(item: T): Promise<number> {
      try {
        const response = await api.post(endpoint, item);
        return response.data.id;
      } catch (error: any) {
        throw new Error(`Failed to create record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async getById(id: number): Promise<T> {
      try {
        const response = await api.get<T>(`${endpoint}/${id}`);
        return transformNullToUndefined(response.data); // Apply transformation
      } catch (error: any) {
        throw error; // Attention: Let calling logic handle the original error, different from other APIs in this file, so that it could be
        // checked as axios error and create the record since it was never created before
      }
    },

    async update(item: T & { id: number }): Promise<void> {
      try {
        await api.put(`${endpoint}/${item.id}`, item);
      } catch (error: any) {
        throw new Error(`Failed to update record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async deleteById(id: number): Promise<void> {
      try {
        await api.delete(`${endpoint}/${id}`);
      } catch (error: any) {
        throw new Error(`Failed to delete record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async getAllByUserId(user_id: number): Promise<T[]> {
      try {
        const response = await api.get<T[]>(`${endpoint}/user/${user_id}`);
        return response.data.map(transformNullToUndefined); // Apply transformation to all items
      } catch (error: any) {
        throw new Error(`Failed to fetch records: ${error.response?.data?.detail || error.message}`);
      }
    },
  };
}
