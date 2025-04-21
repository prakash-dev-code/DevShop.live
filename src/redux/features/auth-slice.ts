// features/auth-slice.ts
import { AuthState } from "@/types/auth";
import { User } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("authUser");
    
      if (token && user) {
        state.isLoggedIn = true;
        state.token = token;
        try {
          state.user = JSON.parse(user);
        } catch (err) {
          console.error("Failed to parse authUser from localStorage:", err);
          state.user = null;
        }
      }
    },
    
  },
});

export const { setLogin, setLogout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
