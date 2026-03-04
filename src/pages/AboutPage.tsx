import { useLanguage } from "@/hooks/use-language";
import AppLayout from "@/components/AppLayout";
import { Landmark, Droplets, Car, Building2 } from "lucide-react";

const AboutPage = () => {
  const { t } = useLanguage();

  const facilities = [
    { icon: Landmark, title: t("about.prayerHall"), desc: t("about.prayerHallDesc") },
    { icon: Droplets, title: t("about.ablution"), desc: t("about.ablutionDesc") },
    { icon: Car, title: t("about.parking"), desc: t("about.parkingDesc") },
    { icon: Building2, title: t("about.multipurpose"), desc: t("about.multipurposeDesc") },
  ];

  return (
    <AppLayout>
      {/* Hero */}
      <section className="mb-8 rounded-2xl bg-primary/15 p-8 text-center">
        <div className="text-5xl mb-4">🕌</div>
        <h2 className="text-3xl font-bold">{t("about.heroTitle")}</h2>
        <p className="mt-1 text-lg text-muted-foreground">{t("about.heroSubtitle")}</p>
      </section>

      {/* Architecture */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-3">{t("about.architecture")}</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{t("about.architectureDesc")}</p>
        </div>
      </section>

      {/* History */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-3">{t("about.history")}</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{t("about.historyDesc")}</p>
        </div>
      </section>

      {/* Facilities */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-3">{t("about.facilities")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {facilities.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-accent-foreground mb-3">
                <Icon size={22} />
              </div>
              <h4 className="font-bold text-sm">{title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default AboutPage;
