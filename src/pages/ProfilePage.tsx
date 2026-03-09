import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { Copy, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import FeedbackModal from "@/components/FeedbackModal";
import { toast } from "sonner";

const ProfilePage = () => {
  const { isDark, toggle } = useTheme();
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);

  const copyReferral = () => {
    const code = user ? `EKARIAH-${user.name.split(" ")[0].toUpperCase()}` : "EKARIAH-GUEST";
    navigator.clipboard.writeText(code);
    toast.success(t("profile.copied"));
  };

  const handleLogout = () => {
    setShowFeedback(true);
  };

  const confirmLogout = () => {
    toast.success(t("feedback.thanks"));
    logout();
    setShowFeedback(false);
    navigate("/");
  };

  if (!user) {
    return (
      <AppLayout>
        <h2 className="mb-4 text-2xl font-bold">{t("profile.title")}</h2>
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground mb-4">{t("auth.noAccount")}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground"
            >
              {t("profile.login")}
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 rounded-xl border border-border py-3.5 text-sm font-bold hover:bg-muted transition-colors"
            >
              {t("profile.signup")}
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{t("profile.darkMode")}</h3>
              <p className="text-sm text-muted-foreground">{t("profile.darkModeDesc")}</p>
            </div>
            <button
              onClick={toggle}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                isDark ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
              }`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? t("profile.on") : t("profile.off")}
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h2 className="mb-4 text-2xl font-bold">{t("profile.title")}</h2>

      {/* User Info */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.penempatan}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <span className="font-semibold">{t("profile.phone")}:</span>
            <span className="ml-2 text-muted-foreground">{user.phone}</span>
          </div>
        </div>
      </div>

      {/* Referral */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="font-bold mb-2">{t("profile.referral")}</h3>
        <p className="text-sm text-muted-foreground mb-3">{t("profile.referralDesc")}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl bg-muted px-4 py-3 text-sm font-mono font-semibold">
            EKARIAH-{user.name.split(" ")[0].toUpperCase()}
          </div>
          <button
            onClick={copyReferral}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted transition-colors"
          >
            <Copy size={16} /> {t("profile.copy")}
          </button>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">{t("profile.darkMode")}</h3>
            <p className="text-sm text-muted-foreground">{t("profile.darkModeDesc")}</p>
          </div>
          <button
            onClick={toggle}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              isDark ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? t("profile.on") : t("profile.off")}
          </button>
        </div>
      </div>

      {/* About Masjid Link */}
      <button
        onClick={() => navigate("/about")}
        className="w-full rounded-xl border border-border bg-card p-4 mb-4 text-left font-bold hover:bg-muted transition-colors"
      >
        {t("nav.about")} →
      </button>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full rounded-xl border border-destructive/30 bg-destructive/5 py-3.5 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut size={16} /> {t("profile.logout")}
      </button>

      {showFeedback && (
        <FeedbackModal
          onSubmit={confirmLogout}
          onCancel={() => setShowFeedback(false)}
        />
      )}
    </AppLayout>
  );
};

export default ProfilePage;
