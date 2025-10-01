import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/auth`;

export const signUpUser = createAsyncThunk("auth/signUp", async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    return rejectWithValue({
      message: err.response?.data?.message || "ثبت‌نام ناموفق",
    });
  }
});

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (credentials) => {
    try {
      const res = await axios.post(`${BASE_URL}/signin`, credentials);
      return res.data;
    } catch (err) {
      const status = err.response?.status;
      let message = "خطا در ورود. لطفا دوباره تلاش کنید.";

      if (status === 401) message = "نام کاربری یا رمز عبور اشتباه است.";
      else if (status === 429) message = "درخواست‌های زیاد. لطفا کمی صبر کنید.";
      else if (status >= 500) message = "خطای سرور. بعدا تلاش کنید.";

      return rejectWithValue({ message });
    }
  }
);
