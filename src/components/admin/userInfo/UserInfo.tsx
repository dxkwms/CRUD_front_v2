"use client";
import { IUser, Role } from "@/types/IUser";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUsersQuery,
} from "@/lib/api/usersApi";
import Image from "next/image";
import { Typography } from "@/components/common/Typography";
import { CommonButton } from "@/components/common/CommonButton";
import { useState } from "react";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { EditUserForm } from "@/components/admin/userInfo/EditUserForm";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";

export const UserInfo = ({
  userData,
  adminName,
}: {
  userData: IUser | null;
  adminName?: string;
}) => {
  const [updateUserError, setUpdateUserError] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditUserFormOpen, setIsEditUserFormOpen] = useState(false);
  const { refetch } = useGetAllUsersQuery({
    page: 1,
    limit: 10,
    searchEmail: "",
  });
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [addAvatar] = useAddAvatarMutation();

  const onUserDelete = async () => {
    try {
      await deleteUser(userData?._id).unwrap();
    } catch (error) {
      console.error("Error of add user:", error);
    } finally {
      refetch();
    }
  };

  const onUserEdit = async (updatedValues: {
    avatar?: string | File | null;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    accessToken?: string;
  }) => {
    try {
      if (updatedValues.avatar instanceof File) {
        const response = await addAvatar({
          avatar: updatedValues.avatar,
        }).unwrap();
        updatedValues.avatar = response.url;
      } else {
        updatedValues.avatar = userData?.avatar;
      }

      await editUser({
        adminName: adminName,
        userId: userData?._id,
        updateData: updatedValues,
      });
    } catch (error) {
      console.error("Error of add user:", error);
      setUpdateUserError("Error of update user");
    } finally {
      refetch();
      setIsEditUserFormOpen(false);
    }
  };

  return (
    <section
      className={
        "self-center bg-[#242420] rounded-xl w-1/2 items-center flex justify-center flex-col h-1/2 gap-4 pb-10 pt-10 mt-10"
      }
    >
      <Image
        width={87}
        height={87}
        src={userData?.avatar ? userData?.avatar : "/img/defaultAvatar.png"}
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
          variant={"apply"}
          className={"w-[217]"}
          clickedFn={() => setIsEditUserFormOpen(true)}
        >
          Edit
        </CommonButton>
        <CommonButton
          variant={"cancel"}
          className={"w-[217]"}
          clickedFn={() => {
            setIsConfirmDeleteOpen(true);
          }}
        >
          Delete
        </CommonButton>
      </div>

      {isConfirmDeleteOpen && (
        <ConfirmDelete
          deleteEntityName={"user"}
          selectedId={userData?._id}
          onEntityDelete={onUserDelete}
          setIsConfirmOpen={setIsConfirmDeleteOpen}
        />
      )}
      {isEditUserFormOpen && (
        <EditUserForm
          updateUserError={updateUserError}
          setIsUserEditOpen={setIsEditUserFormOpen}
          userData={userData}
          onUserEdit={onUserEdit}
        />
      )}
    </section>
  );
};
