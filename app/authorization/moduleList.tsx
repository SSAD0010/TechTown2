/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { MenuItems, ToastLabels } from "../ComponentsList";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/context";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { useToast } from "@/hooks/use-toast";

export default function ModuleList() { //FOR AUTHORIZATION
  const { toast } = useToast();
  const {
    useInfo,
    authorization_SelectedUser,
  } = useAppContext();
  const [authdModules, setauthdModules] = useState([]);
  const [loading, setloading] = useState(false);
  const onClickAuth = async (
    module: string,
    value: string,
    global: string = ""
  ) => {
    setloading(true);
    if (authorization_SelectedUser.code == "") {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Select a user first",
      });
      return;
    }
    // console.log({ global });
    const x = await EXEC_API({
      SQLID: 25,
      VAL1: authorization_SelectedUser.code,
      VAL2: module,
      VAL3: useInfo?.user.username.toUpperCase(),
      VAL4: value,
      VAL5: global == "" ? "false" : "true",
    });
    getAuthdModules();

    toast({
      title:ToastLabels(x, "t"),
      description: ToastLabels(x, "d"),
    });
    setloading(false);
  };

  const getAuthdModules = async () => {
    if (authorization_SelectedUser.code == "") return;
    setloading(true);
    setauthdModules(
      await EXEC_API({ SQLID: 26, VAL1: authorization_SelectedUser.code })
    );
    setloading(false);
  };

  useEffect(() => {
    getAuthdModules();
  }, [authorization_SelectedUser]);

  function isChecked(url: string, type: string) {
    let isCkh = false;
    const typex = type == "global" ? "true" : "false";
    authdModules
      .filter((ee) => ee.module == url && ee.global == typex)
      .map(() => {
        isCkh = true;
      });
    return isCkh;
  }

  function disableIfglobal(url: string) {
    let isCkh = false;
    authdModules
      .filter((ee) => ee.module == url && ee.global == "true")
      .map(() => {
        isCkh = true;
      });
    return loading == false
      ? authorization_SelectedUser.code == ""
        ? true
        : isCkh
      : loading;
  }

  return (
    <>
      {MenuItems.map((e, i) => (
        <TableRow key={i}>
          <TableCell className="font-medium">{e.title}</TableCell>
          <TableCell className="font-medium ">
            <div className="relative w-8 mx-4 ">
              <Checkbox
                className=" absolute  "
                disabled={
                  // loading
                  // ? true
                  // : authorization_SelectedUser.code == ""
                  // ? true
                  // :
                  disableIfglobal(e.url)
                }
                checked={isChecked(e.url, "auth")}
                onCheckedChange={(ee) =>
                  onClickAuth(e.url, ee ? "true" : "false", "")
                }
              />
              <p className="invisible">x</p>
            </div>
          </TableCell>
          <TableCell className="font-medium ">
            <div className="relative w-8 mx-4 ">
              <Checkbox
                disabled={
                  loading ? true : authorization_SelectedUser.code == ""
                }
                className=" absolute  "
                checked={isChecked(e.url, "global")}
                onCheckedChange={(ee) =>
                  onClickAuth(e.url, ee ? "true" : "false", "global")
                }
              />
              <p className="invisible">x</p>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
