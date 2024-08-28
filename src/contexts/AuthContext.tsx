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
  kycStatus: string | null;
  register: (email: string, paswword: string, firstName: string, lastName: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  kycStatusFetch: () => void;
  initiateKycFetch: () => void;
  createWalletFetch: () => void;
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
  const [kycStatus, setKycStatus] = useState<string | null>(localStorage.getItem('kycStatus'));

  // console.log('[Auth Provider Startup] token: ', token);
  // console.log('[Auth Provider Startup] authenticated: ', isAuthenticated);

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
      
      console.log(result);
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
    }

    return value;
  }

  const kycStatusFetch: () => void = async () => {
    // console.log('[KYC Status Fetch] ', token);

    try {
      const response = await fetch('http://localhost:3000/api/kyc/status', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      const result = await response.json();

      localStorage.setItem('kycStatus', result.status);
      setKycStatus(result.status);
      console.log('[KYC Status Fetch] result: ', result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const initiateKycFetch: () => void = async () => {
    console.log('[Initiate KYC Fetch] KYC status: ', localStorage.getItem('kycStatus'));
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/kyc/initiate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      const result = await response.json();

      localStorage.setItem('kycStatus', result.status);
      setKycStatus(result.status);
      console.log('[KYC Status Fetch] ', result.status);
    } catch (e) {
      console.error(e);
    }
  }

  const createWalletFetch: () => void = async () => {
    console.log('[Create Wallet Fetch] KYC status: ', localStorage.getItem('kycStatus'));

    try {
      const response = await fetch('http://localhost:3000/api/wallet/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({"initialBalance": 1000}),
      })

      const result = await response.json();

      if (response.ok)
        console.log('[Create Wallet Fetch] wallet created');
      else
        console.log('[Create Wallet Fetch] error: ', result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(null);
    setUser(null);
    setKycStatus(null);
    localStorage.removeItem('kycStatus');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, loading, user, kycStatus , register, login, logout, kycStatusFetch, initiateKycFetch, createWalletFetch}}>
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