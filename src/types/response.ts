import { User } from "./user";

export default interface IResponse {
  success: boolean;
  data?: object | null | User;
  message?: string;
}
