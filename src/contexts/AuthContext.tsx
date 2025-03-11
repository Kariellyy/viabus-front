import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

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
  const isLoading = status === 'loading';

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as User);

      if (session.companies) {
        setCompanies(session.companies as Company[]);

        // Recupera empresa salva ou usa a primeira
        const savedCompanyId = localStorage.getItem('@ViaBus:currentCompany');
        if (savedCompanyId) {
          const company = (session.companies as Company[]).find(
            (c) => c.id === savedCompanyId
          );
          if (company) {
            setCurrentCompany(company);
          } else {
            setCurrentCompany((session.companies as Company[])[0] || null);
          }
        } else {
          setCurrentCompany((session.companies as Company[])[0] || null);
        }
      }
    } else {
      setUser(null);
      setCompanies([]);
      setCurrentCompany(null);
    }
  }, [session]);

  const login = async () => {
    await signIn('auth0');
  };

  const logout = async () => {
    localStorage.removeItem('@ViaBus:currentCompany');
    await signOut();
  };

  const switchCompany = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
      localStorage.setItem('@ViaBus:currentCompany', company.id);
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
