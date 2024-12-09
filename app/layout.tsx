import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "./theme";
import { IWrapper } from "@/context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBarRoot from "./SideBarRoot";
import { Suspense } from "react";
import Loading from "./loading";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EDS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IWrapper>
            <div className="    font-[family-name:var(--font-geist-sans)]">
              <div className="   w-full mx-auto">
                <SidebarProvider>
                  <SideBarRoot />

                  <div className="relative ">
                    <div className="absolute  -top-[44px] left-[12px]">
                      <SidebarTrigger />
                    </div>
                  </div>
                  {/*  mx-auto  min-h-[100vh]    max-w-[768px]  */}
                  <div className="    font-semibold   w-full  relative  ">
                    {/* <Title /> */}
                    <Header />

                    <Suspense fallback={<Loading />}>
                      <div className="p-4 ">{children}</div>
                    </Suspense>
                  </div>
                </SidebarProvider>
              </div>
            </div>
          </IWrapper>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
