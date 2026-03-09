import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { supabase } from "@/lib/supabase";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const penempatanOptions = ["Kuala Selangor", "Ijok", "Bestari Jaya", "Bukit Rotan", "Others"];

const SignUpPage = () => {
  const navigate = useNavigate();
  const { sendOtp } = useAuth();
  const { t } = useLanguage();

  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    penempatan: "",
  });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!form.name || !form.phone || !form.penempatan) {
      toast.error("Sila lengkapkan semua maklumat wajib.");
      return;
    }
    setLoading(true);
    try {
      await sendOtp(form.phone);
      toast.success("OTP telah dihantar ke telefon anda.");
      setStep("otp");
    } catch (err: any) {
      toast.error(err.message || "Ralat menghantar OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (loading || otpCode.length < 6) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: form.phone,
        token: otpCode,
        type: "sms",
      });
      if (error) throw new Error(error.message);

      // Get the newly authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Insert profile into users table
        await supabase.from("users").upsert([{
          id: user.id,
          full_name: form.name,
          phone: form.phone,
          penempatan: form.penempatan,
        }]);
      }

      toast.success("Pendaftaran berjaya!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "OTP tidak sah.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <AppLayout>
      <h2 className="mb-6 text-2xl font-bold">{t("auth.signupTitle")}</h2>

      {step === "form" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">{t("auth.fullName")}</label>
            <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">{t("auth.phone")}</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
              placeholder="+60123456789"
              className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring" required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">{t("auth.penempatan")}</label>
            <select value={form.penempatan} onChange={(e) => update("penempatan", e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring" required>
              <option value="">{t("auth.selectPenempatan")}</option>
              {penempatanOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "..." : t("auth.sendOtp")}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {t("auth.otpSent")} <strong>{form.phone}</strong>
          </p>
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button onClick={handleVerifyOtp} disabled={loading || otpCode.length < 6}
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "..." : t("auth.verifyOtp")}
          </button>
          <button onClick={() => setStep("form")} className="w-full text-sm text-muted-foreground underline">
            {t("auth.back")}
          </button>
        </div>
      )}

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
