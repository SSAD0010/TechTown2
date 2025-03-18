"use client";

import EXEC_API from "@/components/funcionts/ServerTriggers";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { ToastLabels } from "../ComponentsList";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context";

type TypeOfUser = {
  user: {
    user: {
      username: string;
      U_NAME: string;
    };
    expires: string;
    iat: number;
    exp: number;
  };
};

export default function TrasnferLicense({ user }: TypeOfUser) {
  const { toast } = useToast();
  const { setLoading, co_license, setco_license } = useAppContext();

  const onClicklicenseRqst = async (e: string, i: string) => {

    
    setLoading(true);

    const x = await EXEC_API({
      SQLID: 22,
      VAL1: user.user.username.toUpperCase(),
      VAL2: i,
      VAL3: e,
      
    });
    toast({
      title:ToastLabels(x, "t"),
      description: ToastLabels(x, "d"),
    });
    // console.log(x[0].Code);
    if (x[0].Code == "-1") {
      setLoading(false);
      return;
    }

    // console.log({ e, i });
    setLoading(true);
    setco_license(
      await EXEC_API({
        SQLID: 1,
        VAL1: "B",
        VAL2: user?.user?.username.toUpperCase(),
        VAL3: i || "",
        VAL4:
          e == "crm"
            ? "2"
            : e == "finance"
            ? "3"
            : e == "logistics"
            ? "4"
            : e == "professional"
            ? "5"
            : "",
      })
    );
    setLoading(false);

    // XToast(x, toast);
    getGroupInfo();
  };

  const getGroupInfo = async () => {
    setLoading(true);
    if (user?.user?.username)
      setco_license(await EXEC_API({ SQLID: 19, VAL1: user?.user?.username.toUpperCase() }));
    setLoading(false);
  };

  // useEffect(() => {
  //   getUserLicense();
  // }, [user]);

  const listOfLicense = [
    { GroupS: "Group_crm", name: "crm", onlineS: "online_crm" },
    { GroupS: "Group_finance", name: "finance", onlineS: "online_finance" },
    {
      GroupS: "Group_logistics",
      name: "logistics",
      onlineS: "online_logistics",
    },
    {
      GroupS: "Group_professional",
      name: "professional",
      onlineS: "online_professional",
    },
  ];

  // function Buttons(ee: string, classname: string , ucode : string) {
  //   return (
  //     <>
  //       <Button
  //         disabled={loading}
  //         className={classname}
  //         onClick={() => onClicklicenseRqst(ee, ucode)}
  //       >
  //         {loading ? <Loader2 className="animate-spin" /> : ee}
  //       </Button>
  //     </>
  //   );
  // }

  function Buttons() {
    if (Array.isArray(co_license) == false) return;
    return (
      <>
        {co_license
          .filter((e) => e.onlineusercode != user?.user?.username.toUpperCase())
          .map((ee) => (
            <>
              <div className="flex justify-between mt-2">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {ee.onlineusercode} - {ee.status}
                  </p>
                  <p className="text-sm text-muted-foreground"> {ee.U_NAME}</p>
                </div>

                <div className="flex  gap-2">
                  {listOfLicense.map((e) => (
                    <>
                      {ee[e.GroupS] == "1" && (
                        <>
                          <Button
                            className="relative "
                            onClick={() =>
                              // // console.log(ee.onlineusercode)
                              onClicklicenseRqst(
                                e.name,
                                ee.onlineusercode
                                // ee[e.onlineS]
                              )
                            }
                          >
                            {ee[e.onlineS] == "Y" && (
                              <Badge className="absolute -top-1 -right-1 h-3 w-3 p-0 m-0 bg-foreground"></Badge>
                            )}
                            {e.name}
                          </Button>
                        </>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </>
          ))}
      </>
    );
  }

  return (
    <div>
      {/* 
      {Colicense?.map((e) => (
        <>
          <div className=" flex my-4 gap-2 ">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{e.USER_CODE}</p>
              <p className="text-sm text-muted-foreground">{e.U_NAME}</p>
            </div>
            {Colicense?.length >= 0 && (
              <>
                {listOfLicense.map((ee) => (
                  <>
                    {Buttons(ee.name, e[ee.name]== 1 ? "" : "hidden" , e.USER_CODE)}
                  </>
                ))}
              </>
            )}
          </div>
        </>
      ))} */}
      <br />
      {Buttons()}
    </div>
  );
}
