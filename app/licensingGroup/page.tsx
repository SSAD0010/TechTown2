"use client";
import React from "react";
import GroupAssign from "./GroupAssign";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupListManager from "./GroupListManager";

export default function page() {
  return (
    <>
      <Tabs defaultValue="Assign" className="">
        <TabsList>
          <TabsTrigger value="Assign">Assign</TabsTrigger>
          <TabsTrigger value="Groups">Group List</TabsTrigger>
        </TabsList>
        <TabsContent value="Assign">
          <GroupAssign />
        </TabsContent>
        <TabsContent value="Groups">
          <GroupListManager />
        </TabsContent>
      </Tabs>
    </>
  );
}
