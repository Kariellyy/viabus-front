import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  withAuth?: boolean;
  forceSessionRefresh?: boolean;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  ok: boolean;
}

// Cache para evitar múltiplas chamadas getSession() durante recarregamentos
let sessionCache: any = null;
let lastSessionFetch = 0;
const SESSION_CACHE_TTL = 15000; // 15 segundos (aumentado para reduzir requisições)
let sessionRefreshAttempts = 0;
const MAX_SESSION_REFRESH_ATTEMPTS = 2; // Reduzido para evitar muitas tentativas
let lastAuthError = 0;
const AUTH_ERROR_COOLDOWN = 30000; // 30 segundos de espera após erro de auth

/**
 * Serviço genérico para requisições à API
 * Adiciona automaticamente os cabeçalhos de autenticação e ID da empresa
 */
export const apiService = {
  /**
   * Limpa o cache da sessão para forçar uma nova obtenção
   */
  clearSessionCache() {
    console.log("[API Service] Limpando cache da sessão");
    sessionCache = null;
    lastSessionFetch = 0;
    // Não reseta sessionRefreshAttempts aqui para evitar loops
  },

  /**
   * Método para resetar o contador de tentativas (deve ser chamado em operações bem-sucedidas)
   */
  resetAttempts() {
    sessionRefreshAttempts = 0;
    console.log("[API Service] Contador de refresh zerado");
  },

  /**
   * Obtém a sessão atual, usando cache para evitar múltiplas requisições
   */
  async getSessionWithCache(forceRefresh = false) {
    const now = Date.now();

    // Verifica se estamos no período de "esfriamento" após erros de autenticação
    const isInCooldown = now - lastAuthError < AUTH_ERROR_COOLDOWN;

    // Se estamos em cooldown e tentando forçar refresh, devemos evitar
    if (isInCooldown && forceRefresh) {
      console.warn(
        "[API Service] Em período de cooldown após erros. Usando cache existente."
      );
      if (sessionCache) return sessionCache;
      // Se não temos cache, continuamos, mas com cautela
    }

    // Se temos um cache válido e não é forçada atualização, retorna-o
    if (
      !forceRefresh &&
      sessionCache &&
      now - lastSessionFetch < SESSION_CACHE_TTL
    ) {
      return sessionCache;
    }

    // Verifica se já tentamos muitas vezes atualizar a sessão
    if (
      forceRefresh &&
      sessionRefreshAttempts >= MAX_SESSION_REFRESH_ATTEMPTS
    ) {
      console.error(
        `[API Service] Limite de ${MAX_SESSION_REFRESH_ATTEMPTS} tentativas de refresh atingido. Usando cache.`
      );
      lastAuthError = now; // Marca o momento do erro para iniciar cooldown
      return sessionCache; // Retorna o que temos, mesmo que incompleto
    }

    // Caso contrário, busca uma nova sessão
    try {
      if (forceRefresh) {
        sessionRefreshAttempts++;
      }

      console.log(
        `[API Service] Buscando nova sessão${
          forceRefresh ? " (forçado)" : ""
        } (tentativa ${sessionRefreshAttempts}/${MAX_SESSION_REFRESH_ATTEMPTS})`
      );
      const session = await getSession();

      // Verifica se a sessão tem as informações necessárias
      if (
        session &&
        (!session.companies ||
          !session.companies.length ||
          !session.currentCompany)
      ) {
        console.warn(
          "[API Service] Sessão incompleta:",
          JSON.stringify({
            hasSession: !!session,
            hasCompanies: session?.companies
              ? session.companies.length > 0
              : false,
            hasCurrentCompany: !!session?.currentCompany,
          })
        );

        // Se a sessão estiver incompleta e não for uma tentativa forçada, não armazenamos em cache
        if (!forceRefresh) {
          console.log(
            "[API Service] Não salvaremos esta sessão incompleta em cache"
          );
          return session; // Retorna a sessão incompleta, mas não a salva em cache
        }

        // Se estamos em uma tentativa forçada, tentamos redirecionar para refresh apenas uma vez
        if (
          forceRefresh &&
          sessionRefreshAttempts === 1 &&
          typeof window !== "undefined"
        ) {
          console.log(
            "[API Service] Tentando redirecionamento para refresh da sessão"
          );
          // Salva o atual URL para voltar para ele depois
          const currentUrl = window.location.href;
          localStorage.setItem("@ViaBus:redirectAfterRefresh", currentUrl);

          // Tenta usar a API de recarregamento suave
          window.location.href =
            "/api/auth/check-session?redirectTo=" +
            encodeURIComponent(currentUrl);
          return session; // Retorna a sessão incompleta antes do redirecionamento
        }
      } else if (session) {
        // Se a sessão estiver completa, reseta o contador
        console.log("[API Service] Sessão completa obtida, resetando contador");
        sessionRefreshAttempts = 0;
      }

      // Salva no cache se não for nulo
      if (session) {
        sessionCache = session;
        lastSessionFetch = now;
      }

      return session;
    } catch (error) {
      console.error("[API Service] Erro ao obter sessão:", error);
      lastAuthError = now; // Marca o momento do erro
      return sessionCache; // Retorna o cache antigo em caso de erro
    }
  },

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
      forceSessionRefresh = false,
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
      const session = await this.getSessionWithCache(forceSessionRefresh);
      if (session?.accessToken) {
        requestHeaders["Authorization"] = `Bearer ${session.accessToken}`;
      }

      let companyId = null;

      // Tenta obter o ID da empresa da sessão
      if (session?.currentCompany?.id) {
        companyId = session.currentCompany.id;
      }
      // Se não encontrou na sessão, mas temos empresas disponíveis
      else if (session?.companies && session.companies.length > 0) {
        // Tenta usar a empresa salva no localStorage
        if (typeof window !== "undefined") {
          const savedCompanyId = localStorage.getItem("@ViaBus:currentCompany");
          if (savedCompanyId) {
            const company = session.companies.find(
              (c: any) => c.id === savedCompanyId
            );
            if (company) {
              companyId = company.id;
              console.log(
                "[API Service] Usando empresa do localStorage:",
                companyId
              );
            }
          }
        }

        // Se ainda não temos um ID, usa a primeira empresa disponível
        if (!companyId) {
          companyId = session.companies[0].id;
          if (typeof window !== "undefined") {
            localStorage.setItem("@ViaBus:currentCompany", companyId);
          }
          console.log(
            "[API Service] Usando primeira empresa disponível:",
            companyId
          );
        }
      }

      // Adiciona o cabeçalho se temos um ID de empresa
      if (companyId) {
        requestHeaders["x-company-id"] = companyId;
        console.log("[API Service] Enviando x-company-id:", companyId);
      } else {
        console.warn(
          "[API Service] Requisição sem x-company-id! Session:",
          JSON.stringify({
            currentCompany: session?.currentCompany,
            hasCompanies: session?.companies
              ? session.companies.length > 0
              : false,
          })
        );
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

      // Se a requisição foi bem-sucedida, reseta o contador de tentativas
      if (response.ok) {
        this.resetAttempts();
      }
      // Se recebemos 401 Unauthorized e não tentamos refresh ainda, tenta novamente com refresh
      else if (response.status === 401 && withAuth && !forceSessionRefresh) {
        // Verifica se não estamos em período de cooldown
        const now = Date.now();
        if (now - lastAuthError < AUTH_ERROR_COOLDOWN) {
          console.warn(
            "[API Service] Em período de cooldown após erros de autenticação. Não tentaremos refresh."
          );
          // Continua normalmente, sem tentar refresh
        } else if (sessionRefreshAttempts < MAX_SESSION_REFRESH_ATTEMPTS) {
          console.warn(
            "[API Service] Recebido 401, tentando com refresh da sessão"
          );
          this.clearSessionCache(); // Limpa o cache para forçar nova obtenção
          return this.request<T>(endpoint, method, {
            ...options,
            forceSessionRefresh: true,
          });
        } else {
          console.error(
            "[API Service] Máximo de tentativas de refresh atingido após 401."
          );
          lastAuthError = now; // Inicia o período de cooldown
        }
      }

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
      console.error(
        `[API Service] Erro na requisição ${method} para ${url}:`,
        error
      );
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
