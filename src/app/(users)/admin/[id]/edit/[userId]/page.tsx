"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { Profiles } from "@/components/profile/Profiles";
import { Typography } from "@/components/common/Typography";
import { UserInfo } from "@/components/admin/userInfo/UserInfo";

const EditUserPage = () => {
  const userForEditData = useSelector(
    (state: RootState) => state.userForEdit.user,
  );

  return (
    <div className={"flex flex-col w-full"}>
      <UserInfo userData={userForEditData} />
      <Typography variant={"h2"}>Profiles</Typography>
      <Profiles userData={userForEditData} />
    </div>
  );
};

export default EditUserPage;
