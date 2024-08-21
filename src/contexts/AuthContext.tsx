import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProtectedData {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean | Promise<boolean>;
  user: User | null;
  login: (email: string, password: string) => void;
  loginFetch: (credentials: ProtectedData) => Promise<boolean>;
  logout: () => void;
  authenticate: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ({ children }: AuthProviderProps) => React.ReactElement = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | Promise<boolean>>(token != null);
  const [user, setUser] = useState<User | null>(null);
  
  console.log('[Auth Provider Startup] token: ', localStorage.getItem('token'));
  console.log('[Auth Provider Startup] authenticated: ', isAuthenticated);


  const login = (email: string, password: string) => {
    const credentials: ProtectedData = {email, password};
    setIsAuthenticated(loginFetch(credentials));
  };

  const loginFetch: (credentials: ProtectedData) => Promise<boolean> = async (credentials: ProtectedData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const result = await response.json();

      setToken(result.token);
      localStorage.setItem('token', result.token);
      setUser(result.user);

      console.log('Authenticated: ', isAuthenticated);
      console.log('User: ', user);

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    console.log('User logged out');
  };

  const authenticate = () => {
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, user , login, loginFetch, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};