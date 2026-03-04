import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const penempatanOptions = ["Kuala Selangor", "Ijok", "Bestari Jaya", "Bukit Rotan", "Others"];

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", penempatan: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.penempatan) return;

    const success = signup(form);
    if (success) {
      toast.success(t("auth.signupSuccess"));
      navigate("/login");
    } else {
      toast.error("Emel sudah didaftarkan.");
    }
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <AppLayout>
      <h2 className="mb-6 text-2xl font-bold">{t("auth.signupTitle")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.fullName")}</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.email")}</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.phone")}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.password")}</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">{t("auth.penempatan")}</label>
          <select
            value={form.penempatan}
            onChange={(e) => update("penempatan", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">{t("auth.selectPenempatan")}</option>
            {penempatanOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("auth.signupBtn")}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("auth.haveAccount")}{" "}
        <button onClick={() => navigate("/login")} className="font-semibold text-accent-foreground underline">
          {t("auth.loginBtn")}
        </button>
      </p>
    </AppLayout>
  );
};

export default SignUpPage;
