"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import AppShell from "@/components/template/app-shell";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider>
          {pathname !== "/" ? <AppShell>{children}</AppShell> : children}
        </SessionProvider>
      </body>
    </html>
  );
}
