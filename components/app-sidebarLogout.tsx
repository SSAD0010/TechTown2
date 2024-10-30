"use clinet";
import React from "react";
import { LogOut } from "lucide-react";
 
export default function AppsidebarLogout() {
  
  return (
    <div>
      <div className="text-sm flex items-center  gap-2 px-2">
        <LogOut className="w-5" />
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
}
