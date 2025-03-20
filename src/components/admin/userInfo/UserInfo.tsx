"use client";
import { IUser } from "@/types/IUser";
import { useEditUserMutation } from "@/lib/api/usersApi";
import Image from "next/image";
import { Typography } from "@/components/common/Typography";
import { CommonButton } from "@/components/common/CommonButton";

export const UserInfo = ({ userData }: { userData: IUser | null }) => {
  const [editUser] = useEditUserMutation(userData?._id);
  return (
    <section
      className={
        "self-center bg-[#242420] rounded-xl w-1/2 items-center flex justify-center flex-col h-1/2 gap-4"
      }
    >
      <Image
        width={87}
        height={87}
        src={userData?.avatar}
        alt={""}
        className={"rounded-full object-cover"}
      />
      <Typography variant={"h4"} className={"text-textWhite"}>
        {userData?.name}
      </Typography>
      <Typography variant={"h4"} className={"text-textWhite"}>
        {userData?.email}
      </Typography>
      <Typography variant={"h4"} className={"text-buttonColor"}>
        {userData?.role}
      </Typography>

      <div className={"flex justify-between mt-2 gap-4"}>
        <CommonButton
          width={"[217]"}
          color={"editButtonColor"}
          hoverColor={"[#7cc47a]"}
        >
          Edit
        </CommonButton>
        <CommonButton
          width={"[217]"}
          color={"buttonColor"}
          hoverColor={"red-800"}
        >
          Delete
        </CommonButton>
      </div>
    </section>
  );
};
