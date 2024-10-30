"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserInfo, logout } from "@/lib";
import { useAppContext } from "@/context";
import { SessionController } from "./SessionControl";
import { ModalClose } from "./ComponentsList";
import { Separator } from "@/components/ui/separator";
export default function MainMenu() {
  const { setSelectedMenu, setuseInfo } = useAppContext();
  const [loged, setloged] = useState(true);
  const [activebtnId, setactivebtnId] = useState("");
  const router = useRouter();
  // const adminModule = [
  //   { name: "System Initialization", code: "SystemInitialization" },
  //   { name: "Authorizations", code: "Authorizations" },
  //   { name: "Utilities", code: "Utilities" },
  //   { name: "Setup", code: "Setup" },
  // ];

  const routes = [
    { name: "Profile", code: "profile", path: "/profile" },
    {
      name: "License Request",
      code: "licenserequest",
      path: "/licensing",
    },
    {
      name: "License Group",
      code: "licensegroup",
      path: "/licensingGroup",
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      setuseInfo(data);
      if (!data?.user?.username === false) {
        setloged(true);
        return;
      }
      setloged(false);
      router.push("/");
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     await SessionController();
  //   })();
  // }, []);

  const handleLogout = async () => {
    console.log("logout");
    await logout();
    ModalClose();
    setSelectedMenu("");
    router.push("/");
  };

  return (
    <div>
      {loged && (
        <>
          {routes.map((e, i) => (
            <div className="w-fit mx-2" key={i}>
              <Button
                variant="ghost"
                id={e.code}
                className={
                  activebtnId == e.code
                    ? "activeMenu text-white"
                    : "text-muted-foreground"
                }
                onClick={async () => {
                  await SessionController();
                  router.push(`${e.path}`);
                  ModalClose();
                  setSelectedMenu(e.name);
                }}
              >
                {e.name}
              </Button>
            </div>
          ))}
          <div className="w-fit mx-2">
            <Button
              variant="ghost"
              className="px-3 py-1 mx-1 h-7"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
          {/* 
          <div className="w-fit">
            <Button
              variant="ghost"
              className="px-3 py-1 mx-1 h-7"
              onClick={() => {
                router.push("/profile");
                ModalClose();
                setSelectedMenu("Profile");
              }}
            >
              Profile
            </Button>
          </div>
          <Separator />
          <div className="w-fit mx-4 font-black"> Administration</div>
          {adminModule.map((e) => (
            <div className="w-fit mx-4" key={e.code}>
              <Button
                variant="ghost"
                id={e.code}
                className={activebtnId == e.code? "activeMenu text-white" : "text-muted-foreground"} 
                onClick={async () => {
                  router.push(`/adm/${e.code}`);
                  await SessionController();
                  ModalClose();
                  setSelectedMenu(e.name);
                }}
              >
                {e.name} 
              </Button>
            </div>
          ))}
         <MenubarMenu>
              <MenubarTrigger className="hover:bg-muted">
                Administrative
              </MenubarTrigger>
              <MenubarContent className="-mt-2 mx-1">
                {adminModule.map((e) => (
                  <MenubarItem
                    key={e.code}
                    onClick={() => {
                      router.push(`/adm/${e.code}`);
                      ModalClose();
                    }}
                  >
                    {e.name}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          <Separator />

          <div className="w-fit">
            <Button
              variant="ghost"
              className="px-3 py-1 mx-1 h-7"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
}
