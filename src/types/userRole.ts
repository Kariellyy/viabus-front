import { RoleEnum } from "@/enums/roleEnum";


export interface UserRole {
  id: number;
  user_id: number;
  role_name: RoleEnum;
}