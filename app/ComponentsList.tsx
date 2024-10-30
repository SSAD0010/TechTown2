"use client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { getUserInfo } from "@/lib";
import { Label } from "@radix-ui/react-label";
import { BookA, Calendar, IdCard, Settings } from "lucide-react";
import { Router } from "next/router";
import { useContext, useEffect } from "react";

export const IToaster = () => {
  const { toast } = useToast();
  toast({
    title: "Scheduled: Catch up",
    description: "Friday, February 10, 2023 at 5:57 PM",
  });
};

type DefInputType = {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
};

export const DefInput = (e: DefInputType) => {
  return (
    <>
      <Label htmlFor={e.name}>{e.label}</Label>
      <Input
        id={e.id}
        name={e.name}
        type={e.type}
        placeholder={e.placeholder}
      />
    </>
  );
};

export const ModalClose = () => {
  const modalCloser = document.getElementsByClassName("modalCloser");
  if (modalCloser.length > 0) {
    (modalCloser[0] as HTMLElement).click();
  }
};

export async function fgetUserInfo() {
  return await getUserInfo();
}

export function Title() {
  const getUser = async () => {
    await getUserInfo();
  };
  useEffect(() => {
    getUser()
  }, [])

  const { SelectedMenu } = useAppContext();
  return (
    <>
      <p className="text-sm font-semibold mb-4">
        {!SelectedMenu ? (
          ""
        ) : (
          <>
            <span className="text-muted-foreground">app </span>
            {" > "}
          </>
        )}

        {SelectedMenu}
      </p>
    </>
  );
}

export default function ComponentsList() {
  return <div></div>;
}

type TypeOfXToast = {
  error?: {
    originalError?: {
      info?: {
        message?: string;
      };
    };
  };
  title?: string;
  sms?: string;
  variant?: string;
};

export const XToast = (x: TypeOfXToast, toast: any) => {
  // const { toast } = useToast();
  if (x.error) {
    toast({
      title: "Error",
      description:
        x.error.originalError?.info?.message || "An unexpected error occurred.",
    });
  } else if (Array.isArray(x) && x.length > 0) {
    toast({
      title: x[0].title,
      description: x[0].sms,
      variant: x[0].variant,
    });
  } else {
    toast({
      title: "Info",
      description: "No error or messages provided.",
    });
  }
};




export const MenuItems = [
  {
    title: "License Group",
    url: "/licensingGroup",
    icon: Calendar,
  },
  {
    title: "License Request",
    url: "/licensing",
    icon: IdCard,
  },

  {
    title: "Authorization",
    url: "/authorization",
    icon: BookA,
  },


  {
    title: "Settings",
    url: "/profile",
    icon: Settings,
  },
];