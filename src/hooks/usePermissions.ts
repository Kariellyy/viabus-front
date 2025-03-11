import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';

export function usePermissions() {
  const { currentCompany } = useAuth();

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!currentCompany) return false;
    return currentCompany.role === requiredRole;
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    if (!currentCompany) return false;
    return requiredRoles.includes(currentCompany.role as UserRole);
  };

  return {
    hasRole,
    hasAnyRole,
    isAdmin: currentCompany?.role === 'admin',
    isOwner: currentCompany?.role === 'owner',
    isEmployee: currentCompany?.role === 'employee',
    isClient: currentCompany?.role === 'client',
  };
} 