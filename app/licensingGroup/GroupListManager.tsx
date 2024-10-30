"use client";
import EXEC_API from "@/components/funcionts/ServerTriggers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { XToast } from "../ComponentsList";

export default function GroupListManager() {
  const [groupList, setgroupList] = useState([]);
  const [groupNameToAdd, setgroupNameToAdd] = useState("");
  const getGroup = async () => {
    setgroupList(await EXEC_API({ SQLID: 9 }));
  };
  const { toast } = useToast();
  const addGroupToDB = async () => {
    const x = await EXEC_API({ SQLID: 10, VAL1: groupNameToAdd });
    XToast(x, toast);
    getGroup();
  };
  const checkboxHandler = async (e, id ,xx) => {
    let xxx = xx?"1":"0" 
    const x = await EXEC_API({ SQLID: 13, VAL1: e, VAL2: id ,VAL3:xxx});
    XToast(x, toast);
    getGroup();
  };
  useEffect(() => {
    getGroup();
  }, []);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="">Group</TableHead>
            <TableHead className="">CRM</TableHead>
            <TableHead className="">Finance</TableHead>
            <TableHead className="">Logistics</TableHead>
            <TableHead className="">Professional</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupList.map((e) => (
            <TableRow key={e.invoice}>
              <TableCell>{e.DocEntry}</TableCell>
              <TableCell>{e.GroupName}</TableCell>
              <TableCell>
                <Checkbox  checked={e.crm==1 ?true:false} onCheckedChange={(x) => checkboxHandler("crm", e.DocEntry,x)}/>
              </TableCell>
              <TableCell>
                <Checkbox  checked={e.finance==1 ?true:false} onCheckedChange={(x) => checkboxHandler("finance", e.DocEntry,x)}/>
              </TableCell>
              <TableCell>
                <Checkbox  checked={e.logistics==1 ?true:false} onCheckedChange={(x) => checkboxHandler("logistics", e.DocEntry,x)}/>
              </TableCell>
              <TableCell>
                <Checkbox  checked={e.professional==1 ?true:false} onCheckedChange={(x) => checkboxHandler("professional", e.DocEntry,x) }/>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>{""}</TableCell>
            <TableCell colSpan={4}>
              <Input onChange={(e) => setgroupNameToAdd(e.target.value)} />
            </TableCell>
            <TableCell className="">
              <Button onClick={addGroupToDB}>+</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
