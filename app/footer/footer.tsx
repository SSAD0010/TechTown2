"use client";

import React, { useEffect } from "react";
import { IsAuthorized } from "../ComponentsList";
import { usePathname, useRouter } from "next/navigation";

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
      if (x == -1) router.push("/home");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <div> </div>;
}
