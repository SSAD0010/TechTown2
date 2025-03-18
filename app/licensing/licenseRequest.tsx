"use client";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { Button } from "@/components/ui/button";
import React from "react";
import { ToastLabels } from "../ComponentsList";
import { useToast } from "@/hooks/use-toast";
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

export default function LicenseRequest({ user }: TypeOfUser) {
  // const [userData, setuserData] = useState([]);
  const { setLoading, co_license, setco_license } = useAppContext();

  // const [userDataLicense, setuserDataLicense] = useState([]);
  const { toast } = useToast();
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
  const onClicklicenseRqst = async (e: string, i: string) => {
    // console.log({ e, i });

    if (i == "Y") {
      toast({
        title: "Note!",
        description: `${e} license Already allocated`,
      });
      return;
    }

    setLoading(true);

    const x = await EXEC_API({
      SQLID: 23,
      VAL1: user.user.username.toUpperCase(),
      VAL2: e,
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
    setco_license(
      await EXEC_API({
        SQLID: 1,
        VAL1: "A",
        VAL2: user.user.username.toUpperCase(),
        VAL3: "",
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
  };

  function Buttons() {
    if (Array.isArray(co_license) == false) return;
    return (
      <>
        {co_license
          .filter((e) => e.onlineusercode == user?.user?.username.toUpperCase())
          .map((ee) => (
            <>
              {listOfLicense.map((e) => (
                <>
                  {ee[e.GroupS] == "1" && (
                    <>
                      <Button
                        className="relative "
                        onClick={() =>
                          onClicklicenseRqst(e.name, ee[e.onlineS])
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
            </>
          ))}
      </>
    );
  }

  return (
    <div className="flex w-full justify-between">
      <div>
        <div>Request a License</div>
        <div className="text-sm ">
          {user?.user?.username}{" "}
          <span className="text-muted-foreground">{user?.user?.U_NAME} </span>
        </div>
      </div>
      <div className="flex gap-2 mt-2">{Buttons()}</div>
    </div>
  );
}
