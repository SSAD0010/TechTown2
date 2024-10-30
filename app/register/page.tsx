import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function page() {
  return (
    <div className="grid   items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>License Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input id="name" placeholder="Enter your username" />
                <Label htmlFor="pass">Password</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
