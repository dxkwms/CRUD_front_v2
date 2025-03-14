"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import { Profiles } from "@/components/profile/Profiles";
import { Typography } from "@/components/common/Typography";

const EditUserPage = () => {
  const userForEditData = useSelector(
    (state: RootState) => state.userForEdit.user,
  );

  return (
    <>
      <Typography variant={"h2"}>Profiles</Typography>
      <Profiles userData={userForEditData} />
    </>
  );
};

export default EditUserPage;
