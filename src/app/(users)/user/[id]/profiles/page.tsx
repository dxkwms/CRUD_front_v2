"use client";
import { Profiles } from "@/components/profile/Profiles";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { Typography } from "@/components/common/Typography";

export const ProfilePage = () => {
  const userData = useSelector((state: RootState) => state.user.user);

  return (
    <div className={"flex flex-col ml-2 w-full"}>
      <Profiles userData={userData} />;
    </div>
  );
};

export default ProfilePage;
