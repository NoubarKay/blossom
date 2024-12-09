import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ">
        <div className=" p-4 bg-sidebar border-b  w-full flex flex-row items-center gap-10 justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} className="relative">
                <div className="h-2 w-2 bg-purple-500 text-white rounded-full absolute text-xs top-2 right-3"></div>
                <Bell />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Here are important notifications you have missed.
                  </p>
                </div>
                <div className="grid gap-2"></div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
