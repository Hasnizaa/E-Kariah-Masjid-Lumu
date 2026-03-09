import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  penempatan: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (user: User & { password: string }) => Promise<boolean>;
  logout: () => void;
  totalUsers: number;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  totalUsers: 0,
});

// Google Apps Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbxb98X2FtIHkz0RYxUIHxfPk2nel08_TIYYCc68K_FOLsBwtFOdb9ghdnbGIrJZG0t-sQ/exec";

const CURRENT_USER_KEY = "ekariah-current-user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch total users from Apps Script
  const fetchTotalUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTotalUsers(data.totalUsers);
    } catch (err) {
      console.error("Error fetching total users:", err);
      setTotalUsers(0);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  // Signup
  const signup = async (userData: User & { password: string }) => {
    try {
      const formBody = new URLSearchParams(userData as any).toString();
      const res = await fetch(API_URL, {
        redirect: "follow",
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });

      const data = await res.json();
      if (data.status === "success") {
        // Update total users
        fetchTotalUsers();
        return true;
      } else {
        console.warn("Signup failed:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Signup failed:", err);
      return false;
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const data = await res.json();

      if (data.status === "success" && data.user) {
        setUser(data.user);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
        return true;
      } else {
        console.warn("Login failed:", data.message);
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
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