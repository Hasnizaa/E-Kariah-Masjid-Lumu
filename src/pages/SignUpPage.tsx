import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const penempatanOptions = ["Kuala Selangor", "Ijok", "Bestari Jaya", "Bukit Rotan", "Others"];

const SignUpPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    penempatan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // prevent double click
    setLoading(true);

    if (!form.name || !form.email || !form.password || !form.penempatan) {
      toast.error("Sila lengkapkan semua maklumat wajib.");
      return;
    }

    try {
      // 1️⃣ Create user in Supabase Auth (password auto hashed)
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      const user = authData.user;

      if (!user) {
        toast.error("Gagal mencipta akaun.");
        return;
      }

      // 2️⃣ Insert extra user info into public.users table
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id, // link to auth user id
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          penempatan: form.penempatan,
          role: "user",
        },
      ]);

      if (insertError) {
        toast.error(insertError.message);
        return;
      }

      toast.success("Pendaftaran berjaya! Sila semak emel anda.");
      navigate("/login");

    } catch (err) {
      toast.error("Ralat berlaku. Cuba lagi.");
    }
  };

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <AppLayout>
      <h2 className="mb-6 text-2xl font-bold">{t("auth.signupTitle")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("auth.fullName")}
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("auth.email")}
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("auth.phone")}
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("auth.password")}
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            {t("auth.penempatan")}
          </label>
          <select
            value={form.penempatan}
            onChange={(e) => update("penempatan", e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">{t("auth.selectPenempatan")}</option>
            {penempatanOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
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
        <button
          onClick={() => navigate("/login")}
          className="font-semibold text-accent-foreground underline"
        >
          {t("auth.loginBtn")}
        </button>
      </p>
    </AppLayout>
  );
};

export default SignUpPage;