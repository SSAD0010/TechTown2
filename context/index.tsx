"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface User {
  code: string;
  uname: string;
}

interface AppContextType {
  authorization_SelectedUser: {
    code: string;
    uname: string;
  };
  setauthorization_SelectedUser: Dispatch<SetStateAction<User>>;
  useInfo: any;
  setuseInfo: any;
  SelectedMenu: any;
  setSelectedMenu: any;
  Loading: any;
  setLoading: any;
  co_license: any;
  setco_license: any;
}

const IContext = createContext<AppContextType | null>(null);

export function IWrapper({ children }: { children: React.ReactNode }) {
  const [useInfo, setuseInfo] = useState("");
  const [SelectedMenu, setSelectedMenu] = useState("");
  const [Loading, setLoading] = useState(false);
  const [co_license, setco_license] = useState([]);
  const [authorization_SelectedUser, setauthorization_SelectedUser] = useState({
    code: "",
    uname: "",
  });

  return (
    <>
      <IContext.Provider
        value={{
          authorization_SelectedUser,
          setauthorization_SelectedUser,
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
