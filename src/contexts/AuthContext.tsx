import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Log para depuração
  useEffect(() => {
    console.log("AuthContext - Status da sessão:", status);
    console.log("AuthContext - Dados da sessão:", session);
    console.log("AuthContext - isLoading:", isLoading);
  }, [session, status, isLoading]);

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

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);
      console.log("AuthContext - User definido:", session.user);

      if (session.companies) {
        setCompanies(session.companies as Company[]);
        console.log("AuthContext - Companies definidas:", session.companies);

        // Recupera empresa salva ou usa a primeira
        const savedCompanyId = localStorage.getItem("@ViaBus:currentCompany");
        if (savedCompanyId) {
          const company = (session.companies as Company[]).find(
            (c) => c.id === savedCompanyId
          );
          if (company) {
            setCurrentCompany(company);
            console.log("AuthContext - Empresa salva encontrada:", company);
          } else {
            setCurrentCompany((session.companies as Company[])[0] || null);
            console.log(
              "AuthContext - Usando primeira empresa:",
              (session.companies as Company[])[0]
            );
          }
        } else {
          setCurrentCompany((session.companies as Company[])[0] || null);
          console.log(
            "AuthContext - Nenhuma empresa salva, usando primeira:",
            (session.companies as Company[])[0]
          );
        }
      }
    } else if (status !== "loading") {
      setUser(null);
      setCompanies([]);
      setCurrentCompany(null);
      console.log("AuthContext - Nenhum usuário na sessão, limpando estados");
    }
  }, [session, status]);

  const login = async () => {
    await signIn("auth0");
  };

  const logout = async () => {
    localStorage.removeItem("@ViaBus:currentCompany");
    await signOut();
  };

  const switchCompany = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
      localStorage.setItem("@ViaBus:currentCompany", company.id);
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
