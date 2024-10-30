"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import useWindowSize from "@/app/windowSize";
import { MenuItems } from "@/app/ComponentsList";

export default function SideBars() {
 
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
    
      {MenuItems.map((item) => (
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
