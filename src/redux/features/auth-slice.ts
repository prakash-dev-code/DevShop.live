// features/auth-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("authToken");
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
    },
  },
});

export const { setLogin, setLogout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
