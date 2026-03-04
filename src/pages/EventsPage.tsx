import { useState } from "react";
import { events } from "@/data/mock-data";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const handleRSVP = (title: string) => {
    toast.success(`RSVP berjaya untuk "${title}"!`);
  };

  return (
    <AppLayout>
      <h2 className="mb-4 text-2xl font-bold">Acara & Aktiviti</h2>
      <div className="space-y-4">
        {events.map((e) => (
          <div
            key={e.id}
            className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-bold">{e.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Calendar size={14} /> {e.date}</p>
              <p className="flex items-center gap-2"><Clock size={14} /> {e.time}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {e.location}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSelectedEvent(e)}
                className="rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Maklumat Lanjut
              </button>
              <button
                onClick={() => handleRSVP(e.title)}
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                RSVP
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-background border border-border p-6 animate-fade-in">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold pr-4">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg p-1 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Calendar size={14} /> {selectedEvent.date}</p>
              <p className="flex items-center gap-2"><Clock size={14} /> {selectedEvent.time}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {selectedEvent.location}</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{selectedEvent.description}</p>
            <button
              onClick={() => {
                handleRSVP(selectedEvent.title);
                setSelectedEvent(null);
              }}
              className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              RSVP Sekarang
            </button>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default EventsPage;
