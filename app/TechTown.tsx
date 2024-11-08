import { useAppContext } from "@/context";
import React from "react";

export default function TechTown() {
  const { useInfo } = useAppContext();
  return (
    <div className="mx-2">
      <p className="font-mono font-black whitespace-nowrap">
        {useInfo?.user?.U_NAME}
      </p>
    </div>
  );
}
