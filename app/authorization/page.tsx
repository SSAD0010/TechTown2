import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModuleList from "./moduleList";
import UserList from "./UserList";

export default function page() {
  return (
    <div className="sm:flex gap-4">
      <div className="  sm:h-[80vh] h-[40vh]  overflow-auto border p-4 rounded-md">
        <Table className="">
          <TableCaption>User list</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>User List</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>

          <UserList />
        </Table>
      </div>

      <div className=" mt-4 sm:h-[80vh] h-[40vh]  overflow-auto border p-4 rounded-md">
        <Table className=" ">
          <TableCaption>Module list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Module</TableHead>
              <TableHead>Auth</TableHead>
              <TableHead>Global</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ModuleList />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
