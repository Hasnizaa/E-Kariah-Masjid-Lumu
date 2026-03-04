import { useLanguage } from "@/hooks/use-language";

const AppFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/50 px-4 py-6 text-center mb-20">
      <p className="text-sm font-semibold text-muted-foreground">
        {t("footer.powered")}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {t("footer.desc")}
      </p>
    </footer>
  );
};

export default AppFooter;
