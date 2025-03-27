import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export default function Root() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex justify-center h-screen my-2 mr-2 gap ">
          <Outlet />
        </main>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}
