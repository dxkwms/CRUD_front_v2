"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { RootState } from "@/types/RootState";
import { useSelector } from "react-redux";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const userData = useSelector((state: RootState) => state.user.user);

  return (
    <div
      className="bg-local bg-cover bg-center h-screen w-full flex"
      style={{ backgroundImage: `url(/img/profileBackground.png)` }}
    >
      <Sidebar
        avatar={userData?.avatar}
        name={userData?.name}
        setIsProfileActive={setIsProfileActive}
        isProfileActive={isProfileActive}
      />
      {children}
    </div>
  );
}
