"use client";
import { Open_Sans } from "next/font/google";
import "@/reset.css";
import "@/globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${openSans.variable} antialiased`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
