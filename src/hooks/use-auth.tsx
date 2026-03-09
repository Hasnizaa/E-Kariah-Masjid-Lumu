import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  penempatan: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: UserProfile & { password: string }) => Promise<boolean>;
  logout: () => void;
  totalUsers: number;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  totalUsers: 0,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supaUser: SupabaseUser) => {
    const { data } = await supabase
      .from("users")
      .select("full_name, email, phone, penempatan")
      .eq("id", supaUser.id)
      .single();

    if (data) {
      setUser({
        name: data.full_name,
        email: data.email,
        phone: data.phone || "",
        penempatan: data.penempatan || "",
      });
    } else {
      // Fallback if no profile row yet
      setUser({
        name: supaUser.email?.split("@")[0] || "User",
        email: supaUser.email || "",
        phone: "",
        penempatan: "",
      });
    }
  };

  const fetchTotalUsers = async () => {
    const { count } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });
    setTotalUsers(count || 0);
  };

  useEffect(() => {
    // Listen for auth changes FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      }
      setLoading(false);
    });

    fetchTotalUsers();

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (userData: UserProfile & { password: string }): Promise<boolean> => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("Signup failed");

    const { error: insertError } = await supabase.from("users").insert([{
      id: authData.user.id,
      full_name: userData.name,
      email: userData.email,
      phone: userData.phone,
      penempatan: userData.penempatan,
    }]);

    if (insertError) throw new Error(insertError.message);

    fetchTotalUsers();
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, totalUsers, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
