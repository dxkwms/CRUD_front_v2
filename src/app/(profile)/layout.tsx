"use client";
import { useGetUserByIdQuery } from "@/lib/api/usersApi";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, error, isLoading } = useGetUserByIdQuery(id);
  if (isLoading) return <div>Loading</div>;

  return (
    <div
      className="bg-local bg-cover bg-center h-screen w-full flex"
      style={{ backgroundImage: `url(/img/profileBackground.png)` }}
    >
      <Sidebar
        avatar={data.avatar}
        name={data.name}
        setIsProfileActive={setIsProfileActive}
        isProfileActive={isProfileActive}
      />
      {children}
    </div>
  );
}
