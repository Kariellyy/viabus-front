import { apiService } from "./api.service";

interface Route {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  originStopId: string;
  destinationStopId: string;
  distance: number;
  estimatedDuration: number;
  price: number;
  stops: string[]; // IDs das paradas intermediárias
}

export const RoutesService = {
  async getAll(): Promise<Route[]> {
    try {
      const response = await apiService.get("/routes");

      if (!response.ok) {
        throw new Error("Erro ao buscar rotas");
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar rotas:", error);
      throw new Error("Erro ao buscar rotas");
    }
  },

  async create(routeData: Omit<Route, "id">): Promise<Route> {
    try {
      const response = await apiService.post("/routes", routeData);

      if (!response.ok) {
        throw new Error(`Erro ao criar rota: ${response.data}`);
      }

      return response.data;
    } catch (error) {
      console.error("Erro ao criar rota:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Route> {
    try {
      const response = await apiService.get(`/routes/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao buscar rota");
      }

      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar rota ${id}:`, error);
      throw new Error("Erro ao buscar rota");
    }
  },

  async update(id: string, routeData: Partial<Route>): Promise<Route> {
    try {
      const response = await apiService.put(`/routes/${id}`, routeData);

      if (!response.ok) {
        throw new Error("Erro ao atualizar rota");
      }

      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar rota ${id}:`, error);
      throw new Error("Erro ao atualizar rota");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await apiService.delete(`/routes/${id}`);

      if (!response.ok) {
        throw new Error("Erro ao excluir rota");
      }
    } catch (error) {
      console.error(`Erro ao excluir rota ${id}:`, error);
      throw new Error("Erro ao excluir rota");
    }
  },

  async addStop(
    routeId: string,
    stopId: string,
    position: number
  ): Promise<void> {
    try {
      const response = await apiService.post(`/routes/${routeId}/stops`, {
        stopId,
        position,
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar parada à rota");
      }
    } catch (error) {
      console.error(`Erro ao adicionar parada à rota ${routeId}:`, error);
      throw new Error("Erro ao adicionar parada à rota");
    }
  },

  async removeStop(routeId: string, stopId: string): Promise<void> {
    try {
      const response = await apiService.delete(
        `/routes/${routeId}/stops/${stopId}`
      );

      if (!response.ok) {
        throw new Error("Erro ao remover parada da rota");
      }
    } catch (error) {
      console.error(`Erro ao remover parada da rota ${routeId}:`, error);
      throw new Error("Erro ao remover parada da rota");
    }
  },
};
