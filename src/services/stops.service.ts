import { Stop } from "@/types/stop";
import { apiService } from "./api.service";

export const StopsService = {
  async getAll(): Promise<Stop[]> {
    try {
      const response = await apiService.get("/stops");

      if (!response.ok) {
        throw new Error("Erro ao buscar paradas");
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar paradas:", error);
      throw new Error("Erro ao buscar paradas");
    }
  },

  async create(stopData: Omit<Stop, "id">): Promise<Stop> {
    try {
      const response = await apiService.post("/stops", stopData);

      if (!response.ok) {
        throw new Error(`Erro ao criar parada: ${response.data}`);
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao criar parada:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Stop> {
    try {
      const response = await apiService.get(`/stops/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar parada");
      }

      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar parada ${id}:`, error);
      throw new Error("Erro ao buscar parada");
    }
  },

  async update(id: string, stopData: Partial<Stop>): Promise<Stop> {
    try {
      const response = await apiService.put(`/stops/${id}`, stopData);

      if (!response.ok) {
        throw new Error("Erro ao atualizar parada");
      }

      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar parada ${id}:`, error);
      throw new Error("Erro ao atualizar parada");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await apiService.delete(`/stops/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao excluir parada");
      }
    } catch (error) {
      console.error(`Erro ao excluir parada ${id}:`, error);
      throw new Error("Erro ao excluir parada");
    }
  },
};
