import { Stop } from "@/types/stop";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const StopsService = {
  async getAll(): Promise<Stop[]> {
    const session = await getSession();

    console.log("Session in getAll:", session);
    console.log("Current company:", session?.currentCompany);

    const response = await fetch(`${API_URL}/stops`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "x-company-id": `${session?.currentCompany?.id}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar paradas");
    }

    return response.json();
  },

  async create(stopData: Omit<Stop, "id">): Promise<Stop> {
    const session = await getSession();

    console.log("Session in create:", session);
    console.log("Current company:", session?.currentCompany);
    console.log("Company ID being sent:", session?.currentCompany?.id);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
      "x-company-id": `${session?.currentCompany?.id}`,
    };

    console.log("Headers being sent:", headers);

    const response = await fetch(`${API_URL}/stops`, {
      method: "POST",
      headers,
      body: JSON.stringify(stopData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`Erro ao criar parada: ${errorText}`);
    }

    return response.json();
  },

  async getById(id: string): Promise<Stop> {
    const session = await getSession();

    const response = await fetch(`${API_URL}/stops/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "x-company-id": `${session?.currentCompany?.id}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar parada");
    }

    return response.json();
  },

  async update(id: string, stopData: Partial<Stop>): Promise<Stop> {
    const session = await getSession();

    const response = await fetch(`${API_URL}/stops/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
        "x-company-id": `${session?.currentCompany?.id}`,
      },
      body: JSON.stringify(stopData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar parada");
    }

    return response.json();
  },

  async delete(id: string): Promise<void> {
    const session = await getSession();

    const response = await fetch(`${API_URL}/stops/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "x-company-id": `${session?.currentCompany?.id}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir parada");
    }
  },
};
