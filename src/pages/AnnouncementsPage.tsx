import { announcements } from "@/data/mock-data";
import AppLayout from "@/components/AppLayout";

const AnnouncementsPage = () => (
  <AppLayout>
    <h2 className="mb-4 text-2xl font-bold">Pengumuman</h2>
    <div className="space-y-4">
      {announcements.map((a) => (
        <div key={a.id} className="rounded-xl border border-border bg-card p-4">
          <h3 className="font-bold">{a.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{a.date}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.content}</p>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default AnnouncementsPage;
