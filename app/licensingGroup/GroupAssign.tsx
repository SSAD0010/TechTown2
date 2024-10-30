"use client";
import React, { useEffect, useState } from "react";
import GroupListPopUp from "./GroupListPopUp";
import EXEC_API from "@/components/funcionts/ServerTriggers";

export default function GroupAssign() {
  const [userList, setuserList] = useState([]);
  const [loading, setloading] = useState(false);
  const [grouList, setgrouList] = useState([]);

  const getGroupList = async () => {
    setgrouList(await EXEC_API({ SQLID: 9 }));
  };
  const getUsers = async () => {
    const x = await EXEC_API({ SQLID: 8 });
    setuserList(x);
  };
  useEffect(() => {
    setloading(true);
    getUsers();
    getGroupList()
    setloading(false);
  }, []);

  return (
    <div>
      {userList.map((e, i) => (
        <div key={i} className=" grid grid-cols-2 my-4 ">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{e.USER_CODE}</p>
            <p className="text-sm text-muted-foreground">{e.U_NAME}</p>
          </div>
          <GroupListPopUp groupList={grouList}   selectedUser={e.USER_CODE} GroupName={e.GroupName} />
        </div>
      ))}
    </div>
  );
}
