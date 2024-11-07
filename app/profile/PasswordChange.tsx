"use client";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { toEnrypt } from "@/lib";
import { Label } from "@radix-ui/react-label";
import { Pencil } from "lucide-react";
import React, { useState } from "react";

export default function PasswordChange() {
  const { useInfo } = useAppContext();
  const { toast } = useToast();

  const changePasswordcomponents = [
    { type: "password", text: "Old Password", id: "oldPass" },
    { type: "password", text: "New Password", id: "newPass" },
    { type: "password", text: "Confirm Password", id: "ConfPass" },
  ];
  type TypeOfPasswords = {
    oldPass: string;
    newPass: string;
    ConfPass: string;
  };
  // type TypeOfChangePasswordApiReturn = {
  //   sms: string;
  //   code: string;
  // };

  // const [PassApiReturn, setPassApiReturn] = useState(<TypeOfChangePasswordApiReturn>([]));
  // const [PassApiReturn, setPassApiReturn] =useState<any>([]);

  const [passwords, setPasswords] = useState<TypeOfPasswords>({
    oldPass: "",
    newPass: "",
    ConfPass: "",
  });
  const [ShowChange, setShowChange] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    console.log({ value, id });
    setPasswords((e) => ({ ...e, [id]: value }));
  };

  const save = async () => {
    const pass = await toEnrypt(passwords.oldPass);
    const newpass = await toEnrypt(passwords.newPass);
    console.log({...passwords})
    console.log(pass);
    const x = await EXEC_API({
      SQLID: 7,
      VAL1: (useInfo.user.username as string) || "",
      VAL2: pass || "",
      VAL3: newpass || "",
    });
    console.log({ x });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    x.error
      ? toast({
          title: "Error",
          description:
            x.error.originalError?.info?.message ||
            "An unexpected error occurred.",
        })
      :  toast({
          title: x[0].title,
          description:  x[0].sms,
          variant: x[0].variant,
        })
  };

  // const handleLogout = async () => {
  //   await logout();
  // };
 

  return (
    <div className="">
      <p className="text-sm text-muted-foreground">Passowrd</p>
   
      <div className="flex pb-2">
        <Button
          onClick={() => {
            setShowChange(!ShowChange);
            setPasswords({
              oldPass: "",
              newPass: "",
              ConfPass: "",
            });
          }}
          className="p-1 m-0 h-fit bg-background text-foreground hover:text-foreground hover:bg-muted"
        >
          <h1>*********** </h1>
          <Pencil className="w-[15px] -mt-1 mx-1" />
        </Button>
      </div>

      {ShowChange && (
        <>
          {changePasswordcomponents.map((e, i) => (
            <div
              key={i}
              className="grid w-full max-w-sm items-center gap-1.5 text-sm"
            >
              <Label htmlFor="email">{e.text}</Label>
              <Input
                type={e.type}
                id={e.id}
                placeholder={e.text}
                onChange={onChangeHandler}
              />
            </div>
          ))}
          <div className="grid w-fit grid-cols-2 gap-2 mt-2">
            <Button variant="secondary">Cancel</Button>
            <Button onClick={save}>Save</Button>
          </div>
        </>
      )}
 
    </div>
  );
}
 
