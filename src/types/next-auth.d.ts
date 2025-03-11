import { User, Company } from './user';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: User;
    companies: Company[];
    currentCompany: Company | null;
  }
}
