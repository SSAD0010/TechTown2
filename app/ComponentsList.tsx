"use client";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { getUserInfo } from "@/lib";
import { Label } from "@radix-ui/react-label";
import { BookA, Calendar, IdCard, Settings } from "lucide-react";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { useEffect } from "react";

export const IsAuthorized = async (url: string) => {
  // console.log({ url });
  // console.log({ useInfo });
  // redirect(url);

  const { toast } = useToast();

  const userinfo = await fgetUserInfo();
  const x = await EXEC_API({
    SQLID: 27,
    VAL1: userinfo?.user.username,
    VAL2: url,
  });

  if (x[0]?.Code == "-1")
    toast({
      title: ToastLabels(x, "t"),
      description: ToastLabels(x, "d"),
    });

  return x[0]?.Code;
 
};

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
    getUser();
  }, []);

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ComponentsList(pathname: string) {
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

// interface XItem {
//   title: string;
// }

// interface X {
//   error?: boolean;
//   // You can define other properties of X if needed
// }


export const ToastLabels = (x: TypeOfXToast, type: string) => {
  if (type == "t") {
    const toastTitle: string = x.error
      ? "Error"
      : Array.isArray(x) && x.length > 0
      ? x[0].title
      : "Info";
    return toastTitle;
  }
  let toastDescription: string = "Your description here"; // Adjust based on your logic
  if (x.error) {
    toastDescription =
      x.error.originalError?.info?.message || "An unexpected error occurred.";
  } else if (Array.isArray(x) && x.length > 0) {
    toastDescription = x[0].sms;
  } else toastDescription = "No error or messages provided.";
  return toastDescription;
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
