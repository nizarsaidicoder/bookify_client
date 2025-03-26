import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/SideBar";
import { Toaster } from "@/components/ui/sonner";

export default function Root() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full  flex justify-center h-screen my-2 mr-2 ">
        <Outlet />
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
