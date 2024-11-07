"use client";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAppContext } from "@/context";
import { getUserInfo } from "@/lib";
import React, { useEffect, useState } from "react";

export default function UserList() {
  const {
    setauthorization_SelectedUser,
    authorization_SelectedUser,
    setuseInfo,
  } = useAppContext();
  const [userlist, setuserlist] = useState([]);

  const getUserList = async () => {
    setuserlist(await EXEC_API({ SQLID: 24 }));
  };
  const getUserinfox = async () => {
    setuseInfo(await getUserInfo());
  };
  const onclickRowHandler = (e: string, i: string) => {
    setauthorization_SelectedUser({ code: e, uname: i });
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getUserinfox();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userlist.map((e, i) => (
        <TableRow
          key={i}
          className={
            authorization_SelectedUser.code == e.USER_CODE && "bg-accent"
          }
          onClick={() => onclickRowHandler(e.USER_CODE, e.U_NAME)}
        >
          <TableCell className="font-medium ">{e.USER_CODE}</TableCell>
          <TableCell>{e.U_NAME}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
