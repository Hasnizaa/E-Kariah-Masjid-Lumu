import { useEffect, useState } from "react";

// Mock fallback times
const MOCK_TIMES = {
  Tarikh: new Date().toISOString().slice(0, 10),
  Subuh: "05:50",
  Syuruk: "07:05",
  Zohor: "13:00",
  Asar: "16:20",
  Maghrib: "19:10",
  Isyak: "20:25",
};

interface PrayerTime {
  Tarikh: string;
  Subuh: string;
  Syuruk: string;
  Zohor: string;
  Asar: string;
  Maghrib: string;
  Isyak: string;
}

interface PrayerTimesProps {
  zoneCode: string; // unused here but kept for consistency
}

const PrayerTimes = ({ zoneCode }: PrayerTimesProps) => {
  const [todayTime, setTodayTime] = useState<PrayerTime | null>(null);

  // Coordinates for Masjid Raja Lumu
  const lat = 3.4420;
  const lon = 101.2450;

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
        );

        const result = await response.json();

        if (!result.data?.timings) throw new Error("Invalid API response");

        const timings = result.data.timings;

        setTodayTime({
          Tarikh: new Date().toISOString().slice(0, 10),
          Subuh: timings.Fajr,
          Syuruk: timings.Sunrise,
          Zohor: timings.Dhuhr,
          Asar: timings.Asr,
          Maghrib: timings.Maghrib,
          Isyak: timings.Isha,
        });
      } catch (error) {
        console.error("Prayer API error, using fallback:", error);
        setTodayTime(MOCK_TIMES); // fallback
      }
    };

    fetchPrayerTimes();

    // Refresh at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const timeout = setTimeout(() => {
      fetchPrayerTimes();
      setInterval(fetchPrayerTimes, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [zoneCode]);

  if (!todayTime) return <p>Loading prayer times...</p>;

  return (
    <div className="grid grid-cols-5 gap-2 text-center">
      {["Subuh", "Syuruk", "Zohor", "Asar", "Maghrib", "Isyak"].map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold text-muted-foreground">{name}</span>
          <span className="text-sm font-bold">{(todayTime as any)[name]}</span>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimes;