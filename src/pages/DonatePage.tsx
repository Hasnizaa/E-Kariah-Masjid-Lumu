import { useState } from "react";
import { donationCampaigns } from "@/data/mock-data";
import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const DonatePage = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const { t } = useLanguage();

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    toast.success(t("donate.thanks", { amount }));
    setAmount("");
    setName("");
  };

  const presetAmounts = ["10", "20", "50", "100"];

  return (
    <AppLayout>
      <h2 className="mb-4 text-2xl font-bold">{t("donate.title")}</h2>

      <div className="space-y-4 mb-6">
        {donationCampaigns.map((c) => {
          const pct = Math.round((c.raised / c.target) * 100);
          return (
            <div key={c.id} className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>RM {c.raised.toLocaleString()}</span>
                  <span className="text-muted-foreground">RM {c.target.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground text-right">{pct}% {t("donate.achieved")}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-bold mb-4">{t("donate.makeDonation")}</h3>
        <form onSubmit={handleDonate} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">{t("donate.name")}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("donate.namePlaceholder")}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">{t("donate.amount")}</label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {presetAmounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                    amount === a ? "border-primary bg-primary/15 text-accent-foreground" : "border-border hover:bg-muted"
                  }`}
                >
                  RM {a}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={t("donate.otherAmount")}
              min="1"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("donate.submit")}
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default DonatePage;
