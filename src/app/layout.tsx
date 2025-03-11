"use client";
import { Open_Sans } from "next/font/google";
import "@/reset.css";
import "@/globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import { PrivateProvider } from "@/components/PrivateProvider/PrivateProvider";
import { PropsWithChildren } from "react";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={` ${openSans.variable} antialiased`}>
        <Provider store={store}>
          <PrivateProvider>{children}</PrivateProvider>
        </Provider>
      </body>
    </html>
  );
}
