import { Home, Calendar, Heart, Bell, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { path: "/", label: "Utama", icon: Home },
  { path: "/events", label: "Acara", icon: Calendar },
  { path: "/donate", label: "Derma", icon: Heart },
  { path: "/announcements", label: "Berita", icon: Bell },
  { path: "/profile", label: "Profil", icon: User },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition-colors ${
                active
                  ? "bg-primary/15 text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-xs ${active ? "font-semibold" : "font-medium"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
