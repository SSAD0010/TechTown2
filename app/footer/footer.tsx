"use client";

import React, { useEffect } from "react";
//import IsAuthorized from "../ComponentsList";
import IsAuthorized from "../ComponentsList";
import { usePathname, useRouter } from "next/navigation";
// import { IMeteorite, ISatellite, ISpacestars } from "../svgs";

export default function Footer() {
  const router = useRouter();

  const pathname = usePathname();
  // this useEffect inssures that no unauthorized personel will go to unauthorized page
  useEffect(() => {
    (async () => {
      console.log({ pathname });
      if (pathname == "/") return;
      if (pathname == "/home") return;
      if (pathname == "/logout") return;
      if (pathname == undefined) return;
      const x = await IsAuthorized(pathname);
      if (typeof x === "string" && x === "-1") router.push("/home");
      //if(x === "-1") router.push("/home");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <>
      {/* <div className="relative  w-[240px] ">
        <div className="absolute right-[100px] top-[30px]">
          <IMeteorite w="40" h="40" />
        </div>
        <div className="absolute right-[170px] top-[10px]">
          <ISatellite w="24" h="24" />
        </div>
        <div className="absolute right-[-0px] top-[10px] rotate-90">
          <ISpacestars w="32" h="32" s="1.5" />
        </div>
        <div className="absolute right-[10px] top-[50px] ">
          <ISpacestars w="64" h="64" s="1" />
        </div>
        <div className="absolute right-[100px] top-[80px]">
          <ISpacestars w="18" h="18" s="3" />
        </div>
        <div className="absolute right-[1px] top-[90px]">
          <ISpacestars w="18" h="18" s="3" />
        </div>
        <div className="absolute right-[50px] top-[20]">
          <ISpacestars w="18" h="18" s="3" />
        </div>
        <div className="absolute right-[110px] rotate-45">
          <ISpacestars w="16" h="16" s="1.5" />
        </div>
      </div> */}
    </>
  );
}
