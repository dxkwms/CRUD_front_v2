import { IUser } from "@/types/IUser";
import Image from "next/image";
import { Typography } from "@/components/common/Typography";
import {
  useDeleteUserMutation,
  useGetUserProfilesQuery,
} from "@/lib/api/usersApi";
import { useState } from "react";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUserForEdit } from "@/lib/slice/userForEditSlice";
import { HoveredProfileSection } from "@/components/common/HoveredProfileSection";

export const UserProfile = ({ user }: { user: IUser }) => {
  const [isHover, setIsHover] = useState<string | null>(null);
  const [deleteUser] = useDeleteUserMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserProfilesQuery(user?._id, {
    skip: !user?._id,
  });

  const router = useRouter();

  const onUserEdit = (user: IUser) => {
    dispatch(setUserForEdit(user));
    router.push(`edit/${user._id}`);
  };

  const onUserDelete = async (profileId: string) => {
    try {
      await deleteUser(profileId);
      setIsConfirmOpen(false);
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  const avatarSrc =
    user.avatar && user.avatar.startsWith("http")
      ? user.avatar
      : "/img/profileBackground.png";

  if (isLoading) return <>Loading</>;

  return (
    <>
      <div
        onMouseEnter={() => setIsHover(user._id)}
        onMouseLeave={() => setIsHover(null)}
        className="mb-4 p-2 w-[234px] h-[210px] opacity-95 bg-formBackground rounded-xl text-textWhite flex justify-center items-center flex-col relative"
      >
        <Image
          src={avatarSrc}
          alt={"/"}
          width={"50"}
          height={"50"}
          unoptimized={true}
        />
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography className={"text-buttonColor"}>
          Profiles {data?.profiles.length}
        </Typography>

        {isHover === user._id && (
          <HoveredProfileSection
            entity={user}
            onEntityEdit={onUserEdit}
            onEntityDelete={onUserDelete}
          />
        )}
      </div>
      {isConfirmOpen && (
        <ConfirmDelete
          onEntityDelete={onUserDelete}
          selectedId={selectedUserId}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}
    </>
  );
};
