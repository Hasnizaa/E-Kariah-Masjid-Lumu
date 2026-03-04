import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "bm" | "en";

const translations = {
  // Nav
  "nav.home": { bm: "Utama", en: "Home" },
  "nav.events": { bm: "Acara", en: "Events" },
  "nav.donate": { bm: "Derma", en: "Donate" },
  "nav.announcements": { bm: "Berita", en: "Announcements" },
  "nav.profile": { bm: "Profil", en: "Profile" },
  "nav.about": { bm: "Tentang Masjid", en: "About Masjid" },

  // Header
  "header.light": { bm: "Cerah", en: "Light" },
  "header.dark": { bm: "Gelap", en: "Dark" },

  // Home
  "home.welcome": { bm: "Assalamualaikum 👋", en: "Assalamualaikum 👋" },
  "home.welcomeDesc": { bm: "Selamat datang ke e-Kariah Masjid Raja Lumu, Kuala Selangor.", en: "Welcome to e-Kariah Masjid Raja Lumu, Kuala Selangor." },
  "home.prayerTitle": { bm: "Waktu Solat Hari Ini", en: "Today's Prayer Times" },
  "home.eventsTitle": { bm: "Acara Akan Datang", en: "Upcoming Events" },
  "home.announcementsTitle": { bm: "Pengumuman Terkini", en: "Latest Announcements" },
  "home.viewAll": { bm: "Lihat semua", en: "View all" },
  "home.totalRegistered": { bm: "Jumlah Kariah Berdaftar", en: "Total Kariah Registered" },

  // Events
  "events.title": { bm: "Acara & Aktiviti", en: "Events & Activities" },
  "events.moreInfo": { bm: "Maklumat Lanjut", en: "More Info" },
  "events.rsvp": { bm: "RSVP", en: "RSVP" },
  "events.rsvpNow": { bm: "RSVP Sekarang", en: "RSVP Now" },
  "events.rsvpSuccess": { bm: "RSVP berjaya untuk", en: "RSVP successful for" },

  // Donate
  "donate.title": { bm: "Sumbangan", en: "Donations" },
  "donate.makeDonation": { bm: "Buat Sumbangan", en: "Make a Donation" },
  "donate.name": { bm: "Nama (pilihan)", en: "Name (optional)" },
  "donate.namePlaceholder": { bm: "Nama anda", en: "Your name" },
  "donate.amount": { bm: "Jumlah (RM)", en: "Amount (RM)" },
  "donate.otherAmount": { bm: "Atau masukkan jumlah lain", en: "Or enter other amount" },
  "donate.submit": { bm: "Sumbang Sekarang", en: "Donate Now" },
  "donate.thanks": { bm: "Terima kasih! Sumbangan RM{amount} telah direkodkan.", en: "Thank you! RM{amount} donation recorded." },
  "donate.achieved": { bm: "tercapai", en: "achieved" },

  // Announcements
  "announcements.title": { bm: "Pengumuman", en: "Announcements" },

  // Profile
  "profile.title": { bm: "Profil Saya", en: "My Profile" },
  "profile.memberSince": { bm: "Ahli sejak", en: "Member since" },
  "profile.email": { bm: "Emel", en: "Email" },
  "profile.phone": { bm: "Telefon", en: "Phone" },
  "profile.referral": { bm: "Kod Rujukan", en: "Referral Code" },
  "profile.referralDesc": { bm: "Kongsikan kod ini untuk menjemput ahli baru ke e-Kariah.", en: "Share this code to invite new members to e-Kariah." },
  "profile.copy": { bm: "Salin", en: "Copy" },
  "profile.copied": { bm: "Kod rujukan disalin!", en: "Referral code copied!" },
  "profile.darkMode": { bm: "Mod Gelap", en: "Dark Mode" },
  "profile.darkModeDesc": { bm: "Tukar tema paparan", en: "Switch display theme" },
  "profile.on": { bm: "Hidup", en: "On" },
  "profile.off": { bm: "Mati", en: "Off" },
  "profile.logout": { bm: "Log Keluar", en: "Logout" },
  "profile.login": { bm: "Log Masuk", en: "Login" },
  "profile.signup": { bm: "Daftar", en: "Sign Up" },
  "profile.totalUsers": { bm: "Jumlah Ahli Berdaftar", en: "Total Registered Members" },

  // Auth
  "auth.signupTitle": { bm: "Daftar Akaun Baru", en: "Create New Account" },
  "auth.loginTitle": { bm: "Log Masuk", en: "Login" },
  "auth.fullName": { bm: "Nama Penuh", en: "Full Name" },
  "auth.email": { bm: "Emel", en: "Email" },
  "auth.phone": { bm: "Nombor Telefon", en: "Phone Number" },
  "auth.password": { bm: "Kata Laluan", en: "Password" },
  "auth.penempatan": { bm: "Penempatan", en: "Location" },
  "auth.selectPenempatan": { bm: "Pilih penempatan", en: "Select location" },
  "auth.signupBtn": { bm: "Daftar Sekarang", en: "Sign Up Now" },
  "auth.loginBtn": { bm: "Log Masuk", en: "Login" },
  "auth.haveAccount": { bm: "Sudah ada akaun?", en: "Already have an account?" },
  "auth.noAccount": { bm: "Belum ada akaun?", en: "Don't have an account?" },
  "auth.signupSuccess": { bm: "Pendaftaran berjaya! Sila log masuk.", en: "Registration successful! Please login." },
  "auth.loginSuccess": { bm: "Log masuk berjaya!", en: "Login successful!" },
  "auth.loginFail": { bm: "Emel atau kata laluan salah.", en: "Incorrect email or password." },

  // Feedback
  "feedback.title": { bm: "Maklum Balas", en: "Feedback" },
  "feedback.rate": { bm: "Nilai pengalaman anda", en: "Rate your experience" },
  "feedback.improve": { bm: "Apa yang boleh diperbaiki?", en: "What can we improve?" },
  "feedback.weekly": { bm: "Adakah anda akan gunakan ini setiap minggu?", en: "Would you use this weekly?" },
  "feedback.yes": { bm: "Ya", en: "Yes" },
  "feedback.no": { bm: "Tidak", en: "No" },
  "feedback.submitLogout": { bm: "Hantar & Log Keluar", en: "Submit & Logout" },
  "feedback.cancel": { bm: "Batal", en: "Cancel" },
  "feedback.thanks": { bm: "Terima kasih atas maklum balas anda!", en: "Thank you for your feedback!" },

  // About
  "about.heroTitle": { bm: "Masjid Raja Lumu", en: "Masjid Raja Lumu" },
  "about.heroSubtitle": { bm: "Kuala Selangor", en: "Kuala Selangor" },
  "about.architecture": { bm: "Seni Bina", en: "Architecture" },
  "about.architectureDesc": { bm: "Masjid Raja Lumu menampilkan reka bentuk berinspirasikan Islam dengan kubah yang megah dan menara yang menjulang tinggi. Dewan solat yang luas mampu menampung ratusan jemaah dalam suasana yang tenang dan khusyuk.", en: "Masjid Raja Lumu features Islamic-inspired architecture with a majestic dome and towering minaret. The spacious prayer hall accommodates hundreds of worshippers in a serene and peaceful environment." },
  "about.history": { bm: "Sejarah", en: "History" },
  "about.historyDesc": { bm: "Ditubuhkan sebagai pusat ibadat utama di Kuala Selangor, Masjid Raja Lumu telah memainkan peranan penting dalam komuniti Muslim tempatan selama beberapa dekad. Masjid ini menjadi pusat aktiviti keagamaan, pendidikan, dan kemasyarakatan.", en: "Established as the main place of worship in Kuala Selangor, Masjid Raja Lumu has played a vital role in the local Muslim community for decades. It serves as a center for religious, educational, and community activities." },
  "about.facilities": { bm: "Kemudahan", en: "Facilities" },
  "about.prayerHall": { bm: "Dewan Solat", en: "Prayer Hall" },
  "about.prayerHallDesc": { bm: "Dewan solat utama yang luas dan selesa", en: "Spacious and comfortable main prayer hall" },
  "about.ablution": { bm: "Tempat Wuduk", en: "Ablution Area" },
  "about.ablutionDesc": { bm: "Kemudahan wuduk yang bersih dan teratur", en: "Clean and well-maintained ablution facilities" },
  "about.parking": { bm: "Tempat Letak Kereta", en: "Parking" },
  "about.parkingDesc": { bm: "Kawasan letak kereta yang luas untuk jemaah", en: "Ample parking space for worshippers" },
  "about.multipurpose": { bm: "Dewan Serbaguna", en: "Multipurpose Hall" },
  "about.multipurposeDesc": { bm: "Dewan untuk aktiviti komuniti dan majlis", en: "Hall for community activities and events" },

  // Footer
  "footer.powered": { bm: "Powered by KrackedDevs – RC26", en: "Powered by KrackedDevs – RC26" },
  "footer.desc": { bm: "Membina penyelesaian digital untuk komuniti masjid.", en: "Building digital solutions for mosque communities." },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "bm",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("ekariah-lang") as Lang) || "bm";
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("ekariah-lang", newLang);
  };

  const t = (key: TranslationKey, vars?: Record<string, string>): string => {
    let text: string = translations[key]?.[lang] || key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
