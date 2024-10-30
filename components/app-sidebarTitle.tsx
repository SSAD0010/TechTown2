import React from "react";
import logo from "../app/image/DolmarLogopng.png";
import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";
export default function AppsidebarTitle() {
  return (
    <div className="flex">
      <div className=" rounded-md p-[3px] ">
        <Image
          src={logo}
          alt="alt"
          className="rounded-md min-w-[32px] max-w-[32px] bg-white border-white mt-2"
        />
      </div>
      <div className="mt-2 text-sm px-2 ">
        <span className="text-foreground font- font-semibold">DolmarLand</span>{" "}
        <br />
        <span className="text-foreground font- ">Venture Inc</span>
      </div>
      <div>
      </div>
    </div>
  );
}
