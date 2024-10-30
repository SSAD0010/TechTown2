"use client";
import { logout } from "@/lib";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

export default function Lgout() {
  useEffect(() => {
    (async () => {
      await logout();
    })();
  }, []);

  return (
    <div className="flex gap-2">
      Logging out
      <Loader2 className="animate-spin" />
    </div>
  );
}
