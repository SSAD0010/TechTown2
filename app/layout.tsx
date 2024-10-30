import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "./theme";
import MainMenu from "./MainMenu";
import { IWrapper } from "@/context";
import { Title } from "./ComponentsList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <IWrapper>
            <div className=" w-full font-[family-name:var(--font-geist-sans)]">
              <Header />
              <div className="   w-full mx-auto  ">
                <SidebarProvider>
                  <SideBarRoot />
                  {/*  mx-auto  min-h-[100vh]    max-w-[768px]  */}
                  <div className="   px-4 font-semibold mt-4 w-full   max-w-[768px] ">
                    <Title />
                    <br />
                    <Suspense fallback={<Loading />}>{children}</Suspense>
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
