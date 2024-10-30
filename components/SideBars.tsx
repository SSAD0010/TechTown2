"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { Calendar, IdCard, Settings } from "lucide-react";
import useWindowSize from "@/app/windowSize";

export default function SideBars() {
  const items = [
    {
      title: "License Group",
      url: "/licensingGroup",
      icon: Calendar,
    },
    {
      title: "License Request",
      url: "/licensing",
      icon: IdCard,
    },
    {
      title: "Settings",
      url: "/profile",
      icon: Settings,
    },
  ];
  const { width } = useWindowSize();

  const modalClose = () => {
    const modalCloser = document.getElementsByClassName("sidebartrigger");
    if (width > 760) return;
    if (modalCloser.length > 0) {
      (modalCloser[0] as HTMLElement).click();
    }
  };
  return (
    <div>
    
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item.url} onClick={modalClose}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </div>
  );
}
