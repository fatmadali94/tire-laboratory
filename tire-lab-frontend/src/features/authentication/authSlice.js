// authSlice.js (JS version)
import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, signInUser } from "./authThunk";

const isBrowser = typeof window !== "undefined";
const safeGet = (k) => (isBrowser ? localStorage.getItem(k) : null);
const safeSet = (k, v) => {
  if (isBrowser) localStorage.setItem(k, v);
};
const safeRemove = (k) => {
  if (isBrowser) localStorage.removeItem(k);
};
const parseJson = (s) => {
  try {
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: parseJson(safeGet("user")),
  token: safeGet("token"),
  isLoading: false,
  error: null,
  initialized: true, // ✅ important
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      safeRemove("token");
      safeRemove("user");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        safeSet("token", action.payload.token);
        safeSet("user", JSON.stringify(action.payload.user));
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload && action.payload.message) ||
          (action.error && action.error.message) ||
          "ثبت نام ناموفق.";
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        safeSet("token", action.payload.token);
        safeSet("user", JSON.stringify(action.payload.user));
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload && action.payload.message) ||
          (action.error && action.error.message) ||
          "ورود ناموفق.";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
