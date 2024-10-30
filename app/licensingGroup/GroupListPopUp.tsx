"use client";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { XToast } from "../ComponentsList";

type GroupListPopUpType = {
  DocEntry: number;
  GroupName: string;
  void: string;
};
type GroupListPopUpProps = {
  groupList: GroupListPopUpType[];
  selectedUser: string;
  GroupName: string;
};
export default function GroupListPopUp({
  groupList,
  selectedUser,
  GroupName,
}: GroupListPopUpProps) {
  const [selectedGroup, setSelectedGroup] = useState("");
  const { toast } = useToast();
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"> {selectedGroup?selectedGroup:GroupName ? GroupName : "..."}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid gap-2">
            <div>
              <p className="text-sm text-muted-foreground">Set group</p>
            </div>
            {/* Map through the groupList prop */}
            {groupList?.map((e, i) => (
              <div key={i}>
                <Button
                  className="w-fit "
                  size="sm"
                  onClick={async () => {
                    const x = await EXEC_API({
                      SQLID: 11,
                      VAL1: selectedUser,
                      VAL2: e.DocEntry.toString(),
                    });
                    XToast(x, toast);
                    setSelectedGroup( e.GroupName)
                  }}
                >
                  {e.GroupName}
                </Button>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
