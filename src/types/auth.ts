import { User } from "./common";

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
  }

  export type ForgotPasswordResponse = {
    status: "success" | "error"; // or just "success" if you expect only that
    message: string;
  };