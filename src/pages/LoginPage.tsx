import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success(t("auth.loginSuccess"));
      navigate("/");
    } else {
      toast.error(t("auth.loginFail"));
    }
  };

  return (
    <AppLayout>
      <h2 className="mb-6 text-2xl font-bold">{t("auth.loginTitle")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.email")}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("auth.loginBtn")}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.noAccount")}{" "}
        <button onClick={() => navigate("/signup")} className="font-semibold text-accent-foreground underline">
          {t("auth.signupBtn")}
        </button>
      </p>
    </AppLayout>
  );
};

export default LoginPage;
