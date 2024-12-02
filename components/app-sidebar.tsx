import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BoxIcon, LayoutDashboardIcon, Users2 } from "lucide-react";
import Logo from "./general/Logo";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Customers",
    url: "#",
    icon: Users2,
  },
  {
    title: "Product",
    url: "#",
    icon: BoxIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-3.5">
          <Logo />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
