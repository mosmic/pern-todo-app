import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../shared/api";

interface AuthState {
  token: string | null;
  user: { id: number; username: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      return response.data; // { token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    credentials: { username: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/auth/register", credentials);
      localStorage.setItem("token", response.data.token);
      return response.data; // {token, id, username, email }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
