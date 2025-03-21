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
          Profiles {data?.length}
        </Typography>

        {isHover === user._id && (
          <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between border rounded-3xl ">
            <button
              onClick={() => onUserEdit(user)}
              className="bg-editButtonColor text-formBackground p-2 rounded-l-3xl hover:bg-textWhite transition w-1/2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedUserId(user._id);
                setIsConfirmOpen(true);
              }}
              className="bg-buttonColor text-formBackground p-2 rounded-r-3xl hover:bg-textWhite transition w-1/2"
            >
              Delete
            </button>
          </div>
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
