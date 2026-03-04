import { userProfile } from "@/data/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { Copy, Moon, Sun } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const ProfilePage = () => {
  const { isDark, toggle } = useTheme();

  const copyReferral = () => {
    navigator.clipboard.writeText(userProfile.referralCode);
    toast.success("Kod rujukan disalin!");
  };

  return (
    <AppLayout>
      <h2 className="mb-4 text-2xl font-bold">Profil Saya</h2>

      {/* User Info */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-lg">{userProfile.name}</h3>
            <p className="text-sm text-muted-foreground">Ahli sejak {userProfile.memberSince}</p>
          </div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <span className="font-semibold">Emel:</span>
            <span className="ml-2 text-muted-foreground">{userProfile.email}</span>
          </div>
          <div>
            <span className="font-semibold">Telefon:</span>
            <span className="ml-2 text-muted-foreground">{userProfile.phone}</span>
          </div>
        </div>
      </div>

      {/* Referral */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="font-bold mb-2">Kod Rujukan</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Kongsikan kod ini untuk menjemput ahli baru ke e-Kariah.
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-xl bg-muted px-4 py-3 text-sm font-mono font-semibold">
            {userProfile.referralCode}
          </div>
          <button
            onClick={copyReferral}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold hover:bg-muted transition-colors"
          >
            <Copy size={16} /> Salin
          </button>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Mod Gelap</h3>
            <p className="text-sm text-muted-foreground">Tukar tema paparan</p>
          </div>
          <button
            onClick={toggle}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              isDark
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:bg-muted"
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? "Hidup" : "Mati"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
