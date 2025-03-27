"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { Profiles } from "@/components/profile/Profiles";
import { UserInfo } from "@/components/admin/userInfo/UserInfo";

const EditUserPage = () => {
  const userForEditData = useSelector(
    (state: RootState) => state.userForEdit.user,
  );

  const adminData = useSelector((state: RootState) => state.user.user);

  return (
    <div className={"flex flex-col w-full"}>
      <UserInfo userData={userForEditData} adminName={adminData?.name} />
      <Profiles userData={userForEditData} />
    </div>
  );
};

export default EditUserPage;
