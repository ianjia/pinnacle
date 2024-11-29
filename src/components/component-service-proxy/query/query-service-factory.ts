import { api } from "../../../auth";

export function createService<T>(endpoint: string) {
  return {
    async create(item: T): Promise<void> {
      try {
        await api.post(endpoint, item);
      } catch (error: any) {
        throw new Error(`Failed to create record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async getById(user_id: number): Promise<T> {
      try {
        const response = await api.get<T>(`${endpoint}/${user_id}`);
        return response.data;
      } catch (error: any) {
        throw error; // Let calling logic handle the original error, mainly to let logic in init load model(useLoadData) to handle, create one if none found, might need to revist
      }
    },

    async update(item: T & { user_id: number }): Promise<void> {
      try {
        await api.put(`${endpoint}/${item.user_id}`, item);
      } catch (error: any) {
        throw new Error(`Failed to update record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async deleteById(user_id: number): Promise<void> {
      try {
        await api.delete(`${endpoint}/${user_id}`);
      } catch (error: any) {
        throw new Error(`Failed to delete record: ${error.response?.data?.detail || error.message}`);
      }
    },

    async getAll(): Promise<T[]> {
      try {
        const response = await api.get<T[]>(endpoint);
        return response.data;
      } catch (error: any) {
        throw new Error(`Failed to fetch records: ${error.response?.data?.detail || error.message}`);
      }
    },
  };
}
