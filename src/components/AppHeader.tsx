import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface AppHeaderProps {
  themeHook?: ReturnType<typeof useTheme>;
}

const AppHeader = ({ themeHook }: AppHeaderProps) => {
  const defaultTheme = useTheme();
  const { isDark, toggle } = themeHook || defaultTheme;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            🕌
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">e-Kariah Raja Lumu</h1>
            <p className="text-xs text-muted-foreground">Kuala Selangor</p>
          </div>
        </div>
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden sm:inline">{isDark ? "Cerah" : "Gelap"}</span>
        </button>
      </div>
    </header>
  );
};

export default AppHeader;
