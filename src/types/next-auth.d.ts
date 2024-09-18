
import { RoleEnum } from "@/enums/roleEnum";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string | null;
      role: RoleEnum;
    };
    jwt?: string; // Adiciona a propriedade `jwt` à sessão
  }
  interface Account {
    role: RoleEnum;
  }
}
