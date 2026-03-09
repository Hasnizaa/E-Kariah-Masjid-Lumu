import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const LoginPage = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp } = useAuth();
  const { t } = useLanguage();

  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !phone) return;
    setLoading(true);
    try {
      await sendOtp(phone);
      toast.success("OTP telah dihantar.");
      setStep("otp");
    } catch (err: any) {
      toast.error(err.message || "Ralat menghantar OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (loading || otpCode.length < 6) return;
    setLoading(true);
    try {
      await verifyOtp(phone, otpCode);
      toast.success(t("auth.loginSuccess"));
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "OTP tidak sah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h2 className="mb-6 text-2xl font-bold">{t("auth.loginTitle")}</h2>

      {step === "phone" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">{t("auth.phone")}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+60123456789"
              className="w-full rounded-xl border border-input bg-background px-4 py-3.5 text-base outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "..." : t("auth.sendOtp")}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            {t("auth.otpSent")} <strong>{phone}</strong>
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
          <button onClick={handleVerify} disabled={loading || otpCode.length < 6}
            className="w-full rounded-xl bg-primary py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "..." : t("auth.verifyOtp")}
          </button>
          <button onClick={() => setStep("phone")} className="w-full text-sm text-muted-foreground underline">
            {t("auth.back")}
          </button>
        </div>
      )}

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
