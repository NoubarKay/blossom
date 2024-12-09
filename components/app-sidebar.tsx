"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "./general/Logo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const [sections, setSections] = useState<{ id: number; title: string }[]>([]);

  const router = useRouter();

  const fetchSections = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (!token?.access_token) return;

    // Check for cached sections in localStorage
    const cachedSections = JSON.parse(localStorage.getItem("sections") || "[]");

    if (cachedSections && cachedSections.length > 0) {
      setSections(cachedSections); // Use cached data
    } else {
      try {
        // Fetch from API if not in cache
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/section/GetSections`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );

        const fetchedSections = response.data;
        setSections(fetchedSections);

        // Cache the sections in localStorage
        localStorage.setItem("sections", JSON.stringify(fetchedSections));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-3.5">
          <Logo />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      className="hover:cursor-pointer"
                      onClick={() => {
                        router.push(`/${item.title.toLowerCase()}`);
                      }}
                    >
                      {/* <item.icon /> */}
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
