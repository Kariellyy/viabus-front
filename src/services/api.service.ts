import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  withAuth?: boolean;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  ok: boolean;
}

/**
 * Serviço genérico para requisições à API
 * Adiciona automaticamente os cabeçalhos de autenticação e ID da empresa
 */
export const apiService = {
  /**
   * Método genérico para fazer requisições HTTP
   */
  async request<T = any>(
    endpoint: string,
    method: HttpMethod = "GET",
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      params,
      body,
      headers = {},
      withAuth = true,
      ...restOptions
    } = options;

    // Adiciona parâmetros de query à URL se necessário
    let url = `${API_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      url += `?${searchParams.toString()}`;
    }

    // Prepara os cabeçalhos básicos
    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    };

    // Adiciona cabeçalhos de autenticação e ID da empresa se necessário
    if (withAuth) {
      const session = await getSession();
      if (session?.accessToken) {
        requestHeaders["Authorization"] = `Bearer ${session.accessToken}`;
      }
      if (session?.currentCompany?.id) {
        requestHeaders["x-company-id"] = session.currentCompany.id;
      }
    }

    try {
      // Faz a requisição
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        ...restOptions,
      });

      // Tenta converter a resposta para JSON
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Se não for JSON, retorna o texto da resposta
        data = await response.text();
      }

      return {
        data,
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      console.error(`Erro na requisição ${method} para ${url}:`, error);
      throw error;
    }
  },

  /**
   * Métodos específicos para cada verbo HTTP
   */
  async get<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "GET", options);
  },

  async post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "POST", { ...options, body: data });
  },

  async put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PUT", { ...options, body: data });
  },

  async patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "PATCH", { ...options, body: data });
  },

  async delete<T = any>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, "DELETE", options);
  },
};
