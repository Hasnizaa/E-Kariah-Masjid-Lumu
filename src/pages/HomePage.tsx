import { events, announcements } from "@/data/mock-data";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import AppLayout from "@/components/AppLayout";
import PrayerTimes from "../components/PrayerTimes";

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <AppLayout>
      {/* Welcome */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold">
          {user ? `${t("home.welcome").replace("👋", "")}, ${user.name} 👋` : t("home.welcome")}
        </h2>
        <p className="mt-1 text-muted-foreground">{t("home.welcomeDesc")}</p>
      </section>

      {/* Prayer Times */}
      <section className="mb-6">
        <h3 className="mb-3 text-lg font-bold">{t("home.prayerTitle")}</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <PrayerTimes zoneCode="SGR02" />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{t("home.eventsTitle")}</h3>
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-1 text-sm font-medium text-accent-foreground"
          >
            {t("home.viewAll")} <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {events.slice(0, 2).map((e) => (
            <div key={e.id} className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
              <h4 className="font-bold">{e.title}</h4>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar size={14} /> {e.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {e.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Preview */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{t("home.announcementsTitle")}</h3>
          <button
            onClick={() => navigate("/announcements")}
            className="flex items-center gap-1 text-sm font-medium text-accent-foreground"
          >
            {t("home.viewAll")} <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {announcements.slice(0, 2).map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-card p-4">
              <h4 className="font-semibold">{a.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{a.date}</p>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.content}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage;
