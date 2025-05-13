import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { getCurrentUser, logoutUser } from '../services/authService';

interface AuthContextProps {
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false
};

const AuthContext = createContext<AuthContextProps>({
  auth: defaultAuthState,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      setAuth({
        user,
        isAuthenticated: true,
        isAdmin: user.isAdmin
      });
    }
  }, []);

  const login = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
      isAdmin: user.isAdmin
    });
  };

  const logout = () => {
    logoutUser();
    setAuth(defaultAuthState);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};