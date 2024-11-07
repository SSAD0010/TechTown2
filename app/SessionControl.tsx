import { getUserInfo, logout, updateSessionUserInfo } from "@/lib";

export const SessionController = async () => {

  const data = await getUserInfo();
  if (!data?.user?.username) {
    await logout();
  } else {
    await updateSessionUserInfo();
  }

};
