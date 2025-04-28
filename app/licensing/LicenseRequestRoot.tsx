/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import LicenseRequest from "./licenseRequest";
import { Separator } from "@radix-ui/react-separator";
import TrasnferLicense from "./trasnferLicense";
import { Skeleton } from "@/components/ui/skeleton";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { getUserInfo } from "@/lib";
import { useAppContext } from "@/context";
//import GroupListPopUp from "./GroupListPopUp";
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export default async function LicenseRequestRoot() {
  type TypeOfUser = {
      user: {
        username: string;
        U_NAME: string;
      };
      expires: string;
      iat: number;
      exp: number;
  };
  

  const [user, setuser] = useState<TypeOfUser | null>(null);

  const { Loading, setLoading,  setco_license } = useAppContext();
 


  const getGroupInfo = async () => {
    setLoading(true);
    if (user?.user?.username )
            setco_license(await EXEC_API({ SQLID: 19, VAL1: user?.user?.username.toUpperCase() }));
    setLoading(false);
  };

  const getSession = async () => {
    setuser(await getUserInfo());
  };
  useEffect(() => {
    getSession();
  }, []);
  useEffect(() => {
    // console.log({ user });
    getGroupInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const LoadingTemplte = () => {
    return (
      <>
        <div className="flex justify-between mb-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className=" flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      </>
    );
  };
  const [sqlResult, setSqlResult] = useState<any[]>([]);
 
  return (
    <div>
      <Suspense fallback={<Loading />}>
        {Loading ? (
          <LoadingTemplte />
        ) : (
          <LicenseRequest
            user={user}
            // Mark as loaded when LicenseRequest finishes
            // Pass a callback to handle loading
            onLoad={async () => {
           
            const result = await EXEC_API({ SQLID: 31, VAL1: user?.user?.username.toUpperCase() });
             setSqlResult(result); // Fetch and update sqlResult after TrasnferLicense finishes
            }}
           
          />
        )}
      </Suspense>
      <Separator className="my-4" />
      <p className="text-muted-foreground text-sm">
        Available licenses:{" "}
        {sqlResult.length > 0
          ? sqlResult.map((row) => Object.values(row).join(" / "))
          : "Loading..."}
          
      </p>

      <br />
      <Separator className="my-4" />
      <p className="font-medium">License co-user</p>
      <p className="text-muted-foreground text-xs">
        You can also transfer your license to other user on the list <br />
        Note: that this will kick your SAP B1 Session so please save your work
        first
      </p>
      <Suspense fallback={<Loading />}>
        {Loading ? (
          <>
            <LoadingTemplte />
            <LoadingTemplte />
            <LoadingTemplte />
          </>
        ) : (
          <TrasnferLicense user={user} 
           
          />
        )}
      </Suspense>
         
          </div>
  );
}
