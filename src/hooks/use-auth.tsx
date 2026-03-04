import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  penempatan: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (user: User & { password: string }) => boolean;
  logout: () => void;
  totalUsers: number;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  signup: () => false,
  logout: () => {},
  totalUsers: 0,
});

const USERS_KEY = "ekariah-users";
const CURRENT_USER_KEY = "ekariah-current-user";
const USER_COUNT_KEY = "ekariah-user-count";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [totalUsers, setTotalUsers] = useState(() => {
    return parseInt(localStorage.getItem(USER_COUNT_KEY) || "25", 10);
  });

  useEffect(() => {
    // Initialize with base count if first time
    if (!localStorage.getItem(USER_COUNT_KEY)) {
      localStorage.setItem(USER_COUNT_KEY, "25");
    }
  }, []);

  const signup = (userData: User & { password: string }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const exists = users.find((u: any) => u.email === userData.email);
    if (exists) return false;

    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const newCount = totalUsers + 1;
    setTotalUsers(newCount);
    localStorage.setItem(USER_COUNT_KEY, String(newCount));

    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, totalUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
