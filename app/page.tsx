/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
// import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserInfo, login, toEnrypt } from "@/lib";
// import { useRouter } from "next/compat/router";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
// import { useRouter } from "next/router";
import dolmarlogo from "./image/DolmarLogopng.png";
import Image from "next/image";
export default function Home() {
  const { toast } = useToast();

  // const [name] = useState("x");
  // const [email] = useState("x");
  const [loading, setloading] = useState(false);

  // const selectusers = async () => {
  //   // "use server";
  //   const response = await fetch("../api/api", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email }),
  //   });
  //   const data = await response.json();
  //   // console.log({ ...data });
  //   // console.log(data);
  // };
  const setSessionAndRedirect = async (data: FormData, x: unknown) => {
    await login(data, x);
  };

  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      if (!data?.user?.username === true) {
        return;
      }
      const modalCloser = document.getElementsByClassName("GoLogin");
      if (modalCloser.length > 0) {
        (modalCloser[0] as HTMLElement).click();
      }
    })();
  }, []);

  return (
    <div className=" content  w-fit mx-auto   grid  mt-4  items-center justify-items-center  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <LoginLayout /> */}

      <form
        className="max-w-[416px] grid  gap-4  mx-auto w-fit  "
        action={async (data) => {
          setloading(true);
          const pass = await toEnrypt((data.get("Password") as string) || "");
          // console.log(pass);
          const x = await EXEC_API({
            SQLID: 6,
            VAL1: (data.get("Username") as string) || "",
            VAL2: pass || "",
          });
          // console.log({ x });
          x.error
            ? toast({
                title: "Error",
                description:
                  x.error.originalError?.info?.message ||
                  "An unexpected error occurred.",
              })
            : x.length == 0
            ? toast({
                title: "",
                description: "Your account or password is incorrect.",
              })
            : setSessionAndRedirect(data, x).then(redirect("/licensing"));
          setloading(false);
        }}
      >
        <div className="flex gap-2">
          <Image
            src={dolmarlogo}
            alt="Picture of the author"
            className="bg-white rounded-md p-1 min-w-[70px] max-w-[70px]"
          />
          <div>
            <h1 className=" flex scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              DolmarLand
              <br />
            </h1>
            <p className="text-sm"> Building and Serving for your Tomorrow</p>
          </div>
        </div>
        <Input
          type="text"
          id="Username"
          name="Username"
          placeholder="Enter Username"
          className="w-full"
        />
        <Input
          type="password"
          id="Password"
          name="Password"
          placeholder="Enter Password"
          className="w-full"
        />
        <Separator />
        <div className="flex justify-between">
          {/* <Button variant="secondary" type="submit">
            Register
          </Button> */}
          <Button className="" type="submit" disabled={loading}>
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
      <Button
        onClick={async () => {
          const Encryp = await toEnrypt("sap");
          console.log({Encryp})
        }}
      >
        Encryp
      </Button>  
    </div>
  );
}
