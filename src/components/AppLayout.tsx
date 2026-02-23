import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import AIChatbot from "@/components/AIChatbot";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      <main className="flex-1 ml-64">
        <Outlet />
      </main>
      <AIChatbot />
    </div>
  );
};

export default AppLayout;

