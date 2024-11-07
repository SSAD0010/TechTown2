"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const secretKey = "xXx";
const key = new TextEncoder().encode(secretKey);
const ExpSec = 1800;
// const ExpSec = 10;

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function encrypt(payload: any) {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${ExpSec} sec from now`)
      .sign(key);
  } catch (error) {
    // console.log({ error });
  }
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    // console.log({ error });
  }
}

export async function login(formData: FormData, x: any) {
  // Verify credentials && get the user
  "use server";
  // console.log({ formData });
  const user = { username: formData.get("Username"), U_NAME: x[0].U_NAME };
  // console.log({ user });
  const expires = new Date(Date.now() + ExpSec * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("userinfo", session, { expires, httpOnly: true });
  return cookies().get("userinfo")?.value;
}
export async function logout() {
  // Destroy the session~
  "use server";
  cookies().set("userinfo", "", { expires: new Date(0) });
  // console.log("nothing here");
  redirect("/");
  // console.log("nothing hereasd");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + ExpSec * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  // const res =cookies().set("userinfo", parsed, { expires , httpOnly: true });
  return res;
}

export async function updateSessionUserInfo() {
  const userinfo = cookies().get("userinfo")?.value;
  if (!userinfo) return;
  const user = await decrypt(userinfo);

  const expires = new Date(Date.now() + ExpSec * 1000);
  const session = await encrypt({ ...user, expires });
  // Save the session in a cookie
  cookies().set("userinfo", session, { expires, httpOnly: true });
  const x = cookies().get("userinfo")?.value;
  if (!userinfo) return;
  const xx = await decrypt(x);
  // console.log({ xx });
}
export async function toDecrypt(data: string) {
  return await decrypt(data);
}
export async function toEnrypt(data: string) {
  return await encryptx({ data });
}
export async function encryptx(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(key);
}

export async function getUserInfo() {
  const userinfo = cookies().get("userinfo")?.value;

  if (!userinfo) {
    await logout();
    return null;
  }

  updateSessionUserInfo();
  return await decrypt(userinfo);
}

// export async function getUserInfo() {
//   const userinfo = cookies().get("userinfo")?.value;
//   if (!userinfo) return null;
//   return await decrypt(userinfo);
// }

// export async function activeFolder(x: any) {
//   // Verify credentials && get the user
//   "use server";
//   const user = { folder: formData.get("Username"), U_NAME: x[0].U_NAME };
//   // console.log({ user });
//   const expires = new Date(Date.now() + ExpSec * 1000);
//   const session = await encrypt({ user, expires });

//   // Save the session in a cookie
//   cookies().set("userinfo", session, { expires, httpOnly: true });
//   return cookies().get("userinfo")?.value;
// }
