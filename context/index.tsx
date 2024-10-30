"use client";
import { createContext, useContext, useState } from "react";

const IContext = createContext<unknown>(undefined);

export function IWrapper({ children }: { children: React.ReactNode }) {
  const [useInfo, setuseInfo] = useState("");
  const [SelectedMenu, setSelectedMenu] = useState("");
  const [Loading, setLoading] = useState(false);
  const [co_license, setco_license] = useState([]);

  return (
    <>
      <IContext.Provider
        value={{
          useInfo,
          setuseInfo,
          SelectedMenu,
          setSelectedMenu,
          Loading,
          setLoading,
          co_license,
          setco_license,
        }}
      >
        {children}
      </IContext.Provider>
    </>
  );
}

export function useAppContext() {
  return useContext(IContext);
}
