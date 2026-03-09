import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import Logo from "@/components/Logo";

interface AppHeaderProps {
  themeHook?: ReturnType<typeof useTheme>;
}

const AppHeader = ({ themeHook }: AppHeaderProps) => {
  const defaultTheme = useTheme();
  const { isDark, toggle } = themeHook || defaultTheme;
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Logo className="text-primary h-8 w-auto" />
          <div>
            <h1 className="text-base font-bold leading-tight">e-Kariah Raja Lumu</h1>
            <p className="text-xs text-muted-foreground">Kuala Selangor</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex rounded-xl border border-border overflow-hidden text-sm font-medium">
            <button
              onClick={() => setLang("bm")}
              className={`px-2.5 py-2 transition-colors ${
                lang === "bm" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              BM
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-2 transition-colors ${
                lang === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              EN
            </button>
          </div>
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-xl border border-border px-2.5 py-2 text-sm font-medium transition-colors hover:bg-muted"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
