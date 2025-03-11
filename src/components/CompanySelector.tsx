import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function CompanySelector() {
  const { companies, currentCompany, switchCompany } = useAuth();

  if (!companies.length) {
    return null;
  }

  return (
    <div className="relative">
      <select
        className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={currentCompany?.id || ''}
        onChange={(e) => switchCompany(e.target.value)}
      >
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name} ({company.role})
          </option>
        ))}
      </select>
    </div>
  );
}
