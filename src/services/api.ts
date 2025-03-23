import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor para adicionar o token e o companyId em todas as requisições
api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (session?.currentCompany?.id) {
    config.headers["x-company-id"] = session.currentCompany.id;
  }

  return config;
});

export default api;
