"use client";
import { getUserInfo } from "@/lib";
import React, { useEffect, useState } from "react";
// Define the expected shape of the user info object
interface UserInfo {
  user: {
    U_NAME: string;
    username: string;
  };
}
export default function AccountDetails() {
  const [userinfo, setUserinfo] = useState<UserInfo | null>(null); // Use null for no initial data
  const igetUserInfo = async () => {
    const data = await getUserInfo();
    // console.log('data:', data)
    setUserinfo(data);
  };
  useEffect(() => {
    igetUserInfo();
  }, []);
  useEffect(() => {
    // console.log({userinfo})
  }, [userinfo]);
  return (
    <div>
      <p className="text-sm text-muted-foreground">Account Code</p>
      <h1> {userinfo ? userinfo.user.username : ""}</h1>

      <p className="text-sm text-muted-foreground">Account Name</p>
      <h1> {userinfo ? userinfo.user.U_NAME : ""}</h1>
    </div>
  );
}
