"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
 
export default function SideBarRoot() {
  const [islogged, setislogged] = useState("");
  const pathname = usePathname()
 
  useEffect(() => {
    setislogged(window.location.pathname)
  }, [pathname]);

  return (
    <div>
      {/* <Button onClick={() => console.log()}>
        Get apathname
      </Button>
      <Button onClick={() => console.log(window.location.href)}>
        Get apathname
      </Button> */}
    
      {islogged !="/" && (
        <>

          <AppSidebar />
        </>
      )}
    </div>
  );
}
