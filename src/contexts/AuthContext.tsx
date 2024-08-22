import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  isAuthenticated: boolean | null;
  loading: boolean | null;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: ({ children }: AuthProviderProps) => React.ReactElement = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>((token !== null) && (token !== 'undefined') ? true : null);
  const [loading, setLoading] = useState<boolean | null>(null);

  console.log('[Auth Provider Startup] token: ', token);
  console.log('[Auth Provider Startup] authenticated: ', isAuthenticated);


  const login = (email: string, password: string) => {
    const credentials: ProtectedData = {email, password};
    loginFetch(credentials)
      .then((result: boolean) => {
        setIsAuthenticated(result);
      })
  };

  const loginFetch: (credentials: ProtectedData) => Promise<boolean> = async (credentials: ProtectedData) => {
    let value: boolean = false;
    setLoading(true);

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

      value = (result.token != null) ? true : false;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    return value;
  }
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(null);
    setUser(null);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, loading, user , login, logout}}>
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