import * as React from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "tenant" | "landlord" | "agent" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo purposes, set a mock user
    setUser({
      id: "1",
      name: "John Mwanza",
      email,
      role: "tenant"
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo purposes, set a mock user
    setUser({
      id: "1",
      name: data.fullName,
      email: data.email,
      role: data.role
    });
  };

  const value = {
    user,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}