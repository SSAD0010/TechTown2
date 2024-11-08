"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);
  const onChangeTheme = () => {
    setIsDark((e) => !e);
  };
  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <div className="  w-full  border-b    px-4  flex h-14 items-center  bg-popover">
      <div className=" flex ">
        {/* <MainMenuSheet /> */}
     <SidebarTrigger/>
        {/* <TechTown /> */}
      </div>
      <div className="   "></div>
      <div className="w-full"></div>
      <nav className="flex ">
        <button
          onClick={onChangeTheme}
          className="border p-1 rounded-md hover:bg-accent"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </nav>
    </div>
  );
}
