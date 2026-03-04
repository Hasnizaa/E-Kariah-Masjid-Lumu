import { Home, Calendar, Heart, Bell, User, Landmark } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: t("nav.home"), icon: Home },
    { path: "/events", label: t("nav.events"), icon: Calendar },
    { path: "/donate", label: t("nav.donate"), icon: Heart },
    { path: "/announcements", label: t("nav.announcements"), icon: Bell },
    { path: "/profile", label: t("nav.profile"), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors ${
                active
                  ? "bg-primary/15 text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>
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
