import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { AxiosResponse } from 'axios';
import type { User, AuthResponsePayload, AuthResponseData } from '../../types/auth';
import type { BackendError } from '../../types/backend';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const { data }: AxiosResponse<AuthResponseData> = await api.get('/auth/refresh');
      return data;
    } catch {
      return rejectWithValue('');
    }
  }
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (
    credentials: { email: string; password: string; rememberMe: boolean },
    { rejectWithValue }
  ) => {
    try {
      const { data } : AxiosResponse<AuthResponseData> = await api.post('/auth/login', credentials);
      return data;
    } catch (error) {
      const axiosError = error as BackendError;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }

      return rejectWithValue(axiosError.message || 'Login failed');
    }
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data }: AxiosResponse<AuthResponseData> = await api.post('/auth/signup', userData);
      return data;
    } catch (error) {
      const axiosError = error as BackendError;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }

      return rejectWithValue(axiosError.message || 'Signup failed');
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      const axiosError = error as BackendError;
      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }

      return rejectWithValue(axiosError.message || 'Logout failed');
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuth.pending, (state) => {
      console.log('initializeAuth pending');
      state.loading = true;
      state.error = null;
    });
    builder.addCase(initializeAuth.fulfilled, (state, action: AuthResponsePayload) => {
      console.log('initializeAuth fulfilled');
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    });
    builder.addCase(initializeAuth.rejected, (state, action) => {
      console.log('initializeAuth rejected');
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginAsync.fulfilled,
      (state, action: AuthResponsePayload) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      }
    );
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signupAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      signupAsync.fulfilled,
      (state, action: AuthResponsePayload) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
      }
    );
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logoutAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setToken } = AuthSlice.actions;

export default AuthSlice.reducer;
