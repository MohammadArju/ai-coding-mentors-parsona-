import {
  SidebarInset,
  SidebarProvider,
  
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import ChatTopbar from "@/components/ChatTopbar";


export default function MainLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset className="h-screen w-full mx-4 flex flex-col overflow-hidden">
          <ChatTopbar />
          <main className="flex-1 min-h-0 overflow-hidden">
            <Outlet  />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}


