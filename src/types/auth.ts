import { User } from "./common";

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
  }