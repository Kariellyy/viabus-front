import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { apiService } from "@/services/api.service";

type Company = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  role: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
};

type AuthContextType = {
  user: User | null;
  companies: Company[];
  currentCompany: Company | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  switchCompany: (companyId: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  companies: [],
  currentCompany: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  switchCompany: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: session, status, update: updateSession } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshAttempts, setRefreshAttempts] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  const MAX_REFRESH_ATTEMPTS = 1; // Apenas uma tentativa para evitar loops
  const REFRESH_COOLDOWN = 60000; // 1 minuto de espera entre tentativas de atualização

  // Log para depuração
  useEffect(() => {
    console.log("AuthContext - Status da sessão:", status);
    console.log("AuthContext - Dados da sessão:", session);
    console.log("AuthContext - isLoading:", isLoading);
  }, [session, status, isLoading]);

  // Verifica se a sessão está incompleta e tenta recarregá-la
  useEffect(() => {
    const checkSessionCompleteness = async () => {
      if (status === "authenticated" && session) {
        // Verifica se a sessão está incompleta
        const isIncomplete =
          !session.companies ||
          session.companies.length === 0 ||
          !session.currentCompany;

        // Obtém o tempo atual
        const now = Date.now();

        // Verifica se estamos dentro do período de cooldown
        const inCooldown = now - lastRefreshTime < REFRESH_COOLDOWN;

        if (
          isIncomplete &&
          !inCooldown &&
          refreshAttempts < MAX_REFRESH_ATTEMPTS
        ) {
          console.warn(
            "AuthContext - Sessão incompleta, tentando atualizar:",
            JSON.stringify({
              tentativa: refreshAttempts + 1,
              hasCompanies: session?.companies
                ? session.companies.length > 0
                : false,
              hasCurrentCompany: !!session?.currentCompany,
            })
          );

          setRefreshAttempts((prev) => prev + 1);
          setLastRefreshTime(now);

          try {
            // Tenta atualizar a sessão via API NextAuth
            console.log("AuthContext - Atualizando sessão via updateSession()");
            await updateSession();

            // Não faremos tentativa de redirecionamento para evitar loops
          } catch (error) {
            console.error("AuthContext - Erro ao atualizar sessão:", error);
          }
        } else if (isIncomplete && inCooldown) {
          console.warn(
            `AuthContext - Esperando cooldown (${Math.round(
              (REFRESH_COOLDOWN - (now - lastRefreshTime)) / 1000
            )}s restantes)`
          );
        } else if (isIncomplete && refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
          console.error(
            "AuthContext - Máximo de tentativas de atualização da sessão atingido"
          );

          // Usar o que temos localmente para não interromper a experiência do usuário
          // Se as empresas estiverem vazias, tentar usar localStorage
          if (
            (!session.companies || session.companies.length === 0) &&
            typeof window !== "undefined"
          ) {
            const savedCompanyId = localStorage.getItem(
              "@ViaBus:currentCompany"
            );

            if (savedCompanyId && user) {
              // Temos um ID de empresa e um usuário, podemos tentar usar o que temos
              console.log(
                "AuthContext - Recuperando de estado parcial com localStorage:",
                savedCompanyId
              );

              // Se temos empresas disponíveis no estado local, podemos usá-las
              if (companies.length > 0) {
                const savedCompany = companies.find(
                  (c) => c.id === savedCompanyId
                );

                if (savedCompany) {
                  console.log(
                    "AuthContext - Usando empresa recuperada do estado local:",
                    savedCompany
                  );
                  // Não atualizamos a sessão, apenas os estados locais
                  // A próxima requisição API tentará usar esta empresa
                }
              }
            }
          }
        } else if (!isIncomplete) {
          // Se a sessão estiver completa, resetamos o contador
          setRefreshAttempts(0);
        }
      }
    };

    checkSessionCompleteness();
  }, [
    session,
    status,
    refreshAttempts,
    updateSession,
    companies,
    lastRefreshTime,
    user,
  ]);

  // Atualiza o estado de loading com base no status da sessão
  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else if (status === "authenticated" || status === "unauthenticated") {
      // Pequeno atraso para garantir que os dados da sessão foram processados
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Atualiza os estados locais quando a sessão muda
  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
      console.log("AuthContext - User definido:", session.user);

      if (session.companies && session.companies.length > 0) {
        setCompanies(session.companies as Company[]);
        console.log("AuthContext - Companies definidas:", session.companies);

        // Se já temos uma empresa atual na sessão, usamos ela
        if (session.currentCompany) {
          setCurrentCompany(session.currentCompany as Company);
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "@ViaBus:currentCompany",
              session.currentCompany.id
            );
          }
          console.log(
            "AuthContext - Usando empresa da sessão:",
            session.currentCompany
          );
          return;
        }

        // Caso a sessão não tenha empresa atual, seguimos a lógica do localStorage
        const companies = session.companies as Company[];

        if (typeof window !== "undefined") {
          const savedCompanyId = localStorage.getItem("@ViaBus:currentCompany");

          if (savedCompanyId) {
            const company = companies.find((c) => c.id === savedCompanyId);
            if (company) {
              setCurrentCompany(company);
              console.log("AuthContext - Empresa salva encontrada:", company);
              return;
            }
          }
        }

        // Se não tiver empresa salva ou não encontrou a empresa salva, usa a primeira
        setCurrentCompany(companies[0]);
        if (typeof window !== "undefined") {
          localStorage.setItem("@ViaBus:currentCompany", companies[0].id);
        }
        console.log("AuthContext - Usando primeira empresa:", companies[0]);
      } else {
        console.warn("AuthContext - Usuário sem empresas!");
        // Não limpar as empresas aqui se já tivermos empresas no estado local
        if (companies.length === 0) {
          setCompanies([]);
          setCurrentCompany(null);
        } else {
          console.log(
            "AuthContext - Mantendo empresas do estado local:",
            companies.length
          );
        }
      }
    } else if (status !== "loading") {
      setUser(null);
      setCompanies([]);
      setCurrentCompany(null);
      console.log("AuthContext - Nenhum usuário na sessão, limpando estados");
    }
  }, [session, status, companies.length]);

  const login = async () => {
    // Limpa qualquer estado anterior
    if (typeof window !== "undefined") {
      localStorage.removeItem("@ViaBus:currentCompany");
    }
    apiService.clearSessionCache();
    apiService.resetAttempts();
    setRefreshAttempts(0);
    setLastRefreshTime(0);
    await signIn("auth0");
  };

  const logout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("@ViaBus:currentCompany");
    }
    await signOut();
  };

  const switchCompany = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
      if (typeof window !== "undefined") {
        localStorage.setItem("@ViaBus:currentCompany", company.id);
      }

      // Limpa o cache da sessão para garantir que a próxima requisição use a nova empresa
      apiService.clearSessionCache();
      apiService.resetAttempts();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        companies,
        currentCompany,
        isLoading,
        login,
        logout,
        switchCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
