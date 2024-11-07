import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React from "react";
import TechTown from "./TechTown";
import MainMenu from "./MainMenu";

export default function MainMenuSheet() {
  return (
    <div>
      <Sheet>
        <SheetTrigger><MenuIcon/> </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle><TechTown/></SheetTitle>
            <SheetDescription>
              <MainMenu/>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
