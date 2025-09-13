import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import {
  setToken,
  loginAsync,
  signupAsync,
  logoutAsync,
  initializeAuth
} from '../store/slices/authSlice';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const saveToken = (newToken: string | null) => {
    dispatch(setToken(newToken));
  };

  const loadUser = useCallback(async () => {
    try {
      await dispatch(initializeAuth()).unwrap();
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  }, [dispatch]);

  const loginHandler = async (credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      await dispatch(loginAsync(credentials)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const signupHandler = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(signupAsync(userData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const logoutHandler = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    token,
    user,
    loading,
    error,
    loadUser,
    saveToken,
    loginHandler,
    signupHandler,
    logoutHandler
  };
};

export default useAuth;
