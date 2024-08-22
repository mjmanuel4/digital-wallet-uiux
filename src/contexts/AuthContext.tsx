import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RegistrationData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface Credentials {
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
  register: (email: string, paswword: string, firstName: string, lastName: string) => void;
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

  const register = (email: string, password: string, firstName: string, lastName: string) => {
    const data: RegistrationData = {email, password, firstName, lastName};
    console.log(email);
    registerFetch(data)
      .then((message: string) => {
        alert(message);
      })
  }

  const registerFetch: (data: RegistrationData) => Promise<string> = async (data: RegistrationData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json();

      if(response.statusText !== 'created') {
        console.log(result.error);
      } else {
        console.log(result.message);
      }

      return result.message;
    } catch (e) {
      console.error(e);
    }
  }

  const login = (email: string, password: string) => {
    const credentials: Credentials = {email, password};
    loginFetch(credentials)
      .then((result: boolean) => {
        setIsAuthenticated(result);
      })
  };

  const loginFetch: (credentials: Credentials) => Promise<boolean> = async (credentials: Credentials) => {
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
    <AuthContext.Provider value={{ token, isAuthenticated, loading, user , register, login, logout}}>
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