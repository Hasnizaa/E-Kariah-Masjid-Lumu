import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfile {
  name: string;
  phone: string;
  penempatan: string;
}

interface AuthContextType {
  user: UserProfile | null;
  sendOtp: (phone: string) => Promise<void>;
  verifyOtp: (phone: string, token: string) => Promise<boolean>;
  signupWithPhone: (data: { name: string; phone: string; penempatan: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  sendOtp: async () => {},
  verifyOtp: async () => false,
  signupWithPhone: async () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (supaUser: SupabaseUser) => {
    const { data } = await supabase
      .from("users")
      .select("full_name, phone, penempatan")
      .eq("id", supaUser.id)
      .maybeSingle();

    if (data) {
      setUser({
        name: data.full_name,
        phone: data.phone || "",
        penempatan: data.penempatan || "",
      });
    } else {
      setUser({
        name: supaUser.phone || "User",
        phone: supaUser.phone || "",
        penempatan: "",
      });
    }
  };

  useEffect(() => {
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOtp = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw new Error(error.message);
  };

  const verifyOtp = async (phone: string, token: string): Promise<boolean> => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    if (error) throw new Error(error.message);
    return true;
  };

  const signupWithPhone = async (data: { name: string; phone: string; penempatan: string }) => {
    // First send OTP — the actual profile insert happens after OTP verification
    const { error } = await supabase.auth.signInWithOtp({ phone: data.phone });
    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, signupWithPhone, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
