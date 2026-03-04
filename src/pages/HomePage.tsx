import { prayerTimes, events, announcements } from "@/data/mock-data";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      {/* Welcome */}
      <section className="mb-6">
        <h2 className="text-2xl font-bold">Assalamualaikum 👋</h2>
        <p className="mt-1 text-muted-foreground">
          Selamat datang ke e-Kariah Masjid Raja Lumu, Kuala Selangor.
        </p>
      </section>

      {/* Prayer Times */}
      <section className="mb-6">
        <h3 className="mb-3 text-lg font-bold">Waktu Solat Hari Ini</h3>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="grid grid-cols-5 gap-2 text-center">
            {prayerTimes.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-muted-foreground">{p.name}</span>
                <span className="text-sm font-bold">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">Acara Akan Datang</h3>
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-1 text-sm font-medium text-accent-foreground"
          >
            Lihat semua <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {events.slice(0, 2).map((e) => (
            <div
              key={e.id}
              className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <h4 className="font-bold">{e.title}</h4>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {e.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {e.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Preview */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">Pengumuman Terkini</h3>
          <button
            onClick={() => navigate("/announcements")}
            className="flex items-center gap-1 text-sm font-medium text-accent-foreground"
          >
            Lihat semua <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-3">
          {announcements.slice(0, 2).map((a) => (
            <div
              key={a.id}
              className="rounded-xl border border-border bg-card p-4"
            >
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
