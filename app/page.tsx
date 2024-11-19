/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
// import { Input } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserInfo, login, toEnrypt } from "@/lib";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { useToast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import dolmarlogo from "./image/DolmarLogopng.png";
import Image from "next/image";
import { useAppContext } from "@/context";
export default function Home() {
  const { toast } = useToast();
  const { setuseInfo } = useAppContext();

  // const [name] = useState("x");
  // const [email] = useState("x");
  const [loading, setloading] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    (async () => {
      const data = await getUserInfo();
      console.log({ data });
      setuseInfo(data);
      if (!data?.user?.username) {
        return;
      }
      router.push("/home");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const redirectx = (x: any) => {
    toast({
      title: "",
      description: `WELCOME ${x[0].U_NAME}`,
    });
    redirect("/licensing");
  };

  return (
    <div className=" content  w-fit mx-auto   grid  mt-4  items-center justify-items-center  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* <LoginLayout /> */}
<div className="  p-4 rounded-md bg w-[360px]">
  
<form
        className="max-w-[300px] grid  gap-4  mx-auto  rounded-md "
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
            : setSessionAndRedirect(data, x).then(redirectx(x));
          setloading(false);
        }}
      >
        <div className="flex gap-2 max-w-[320px] px-4">
          <Image
            src={dolmarlogo}
            alt="Picture of the author"
            className="bg-white rounded-md p-1  max-w-[60px] max-h-[60px]"
          />
          <div>
            <h1 className=" flex scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl">
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
          <Button
            className="w-full"
            type="submit"
            disabled={loading}
            onClick={() =>
              toast({
                title: "",
                description: "Logging in ...",
              })
            }
          >
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
</div>
      {/* <Button
        onClick={async () => {
          const Encryp = await toEnrypt("sap");
          console.log({Encryp})
        }}
      >
        Encryp
      </Button>   */}

      <>
      
      </>
    </div>
  );
}
