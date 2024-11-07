"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
// import { useRouter } from "next/navigation";
export default function LoginLayout() {
  // const router = useRouter();

  // const Register = () => {
  //   router.push("/register");
  // };`
  //  const getSession  =  async() => {
  //   const session = await getSession();
  //   const ses = JSON.stringify(session, null, 2)
  //   if(ses != null)router.push("/licenserequest");
  //   if(ses === null)router.push("/");
  // };
  // useEffect(()  => {
  //   getSession();
  // }, [])

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>DolmarLand</CardTitle>
          <CardDescription>
            Building and Serving for your Tomorrow
          </CardDescription>
        </CardHeader>
        <form
          // action={async (data) => {
          action={async () => {
            "use client";
            // // console.log({ data });
            // const x = await login(data);
            // // const session = await getSession();
            // // console.log({ x });
          }}
        >
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                />
                <Label htmlFor="pass">Password</Label>
                <Input
                  id="pass"
                  name="pass"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            {/* <Button onClick={Register} variant="outline">
              Register
            </Button> */}
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
