/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import useWindowSize from "@/app/windowSize";
import { MenuItems, ToastLabels } from "@/app/ComponentsList";
import { useToast } from "@/hooks/use-toast";
import EXEC_API from "./funcionts/ServerTriggers";
import { useAppContext } from "@/context";
import { getUserInfo } from "@/lib";
import { useRouter } from "next/navigation";

export default function SideBars() {
  const { useInfo, setuseInfo } = useAppContext();
  const router = useRouter();

  const { toast } = useToast();
  const { width } = useWindowSize();
  const getuser = async () => {
    setuseInfo(await getUserInfo());
  };
  const modalClose = async (url: string) => {
    console.log({ url });
    console.log({ useInfo });
    // redirect(url);

    const x = await EXEC_API({
      SQLID: 27,
      VAL1: useInfo?.user.username,
      VAL2: url,
    });
    console.log({ x });
    if (x[0]?.Code == "-1")
      toast({
        title: ToastLabels(x, "t"),
        description: ToastLabels(x, "d"),
      });
    if (x[0]?.Code == "-1") return;

    const modalCloser = document.getElementsByClassName("sidebartrigger");
    router.push(url);

    if (width > 760) return;
    console.log("asd");
    if (modalCloser.length > 0) {
      (modalCloser[0] as HTMLElement).click();
    }
  };
  useEffect(() => {
    getuser();
  }, []);

  return (
    <div>
      {MenuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            {/* <Link href={item.url} onClick={() => modalClose(item.url)}>
              <item.icon />
              <span>{item.title}</span>
            </Link> */}
            <button
              id={item.url}
              value="asd"
              onClick={() => modalClose(item.url)}
            >
              <item.icon />
              <span>{item.title}</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </div>
  );
}
