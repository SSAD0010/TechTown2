"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import TechTown from "./TechTown";
import MainMenu from "./MainMenu";
import MainMenuSheet from "./MainMenuSheet";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState(true);
  const onChangeTheme = () => {
    setIsDark((e) => !e);
  };
  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className=" border-b    px-4 container flex h-14 max-w-screen-2xl items-center  bg-popover">
      <div className=" flex ">
        {/* <MainMenuSheet /> */}
     
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
