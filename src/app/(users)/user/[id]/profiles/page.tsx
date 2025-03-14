"use client";
import { Profiles } from "@/components/profile/Profiles";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";

export const ProfilePage = () => {
  const userData = useSelector((state: RootState) => state.user.user);

  return <Profiles userData={userData} />;
};

export default ProfilePage;
