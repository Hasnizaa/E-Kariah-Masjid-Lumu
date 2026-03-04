import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import BottomNav from "./BottomNav";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <AppHeader />
      <main className="mx-auto max-w-lg px-4 py-6 animate-fade-in">
        {children}
      </main>
      <AppFooter />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
