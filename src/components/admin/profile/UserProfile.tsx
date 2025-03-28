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

export const UserProfile = ({
  user,
  refetch,
}: {
  user: IUser;
  refetch: () => void;
}) => {
  const [isHover, setIsHover] = useState<string | null>(null);
  const [deleteUser] = useDeleteUserMutation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserProfilesQuery(
    {
      userId: user?._id,
      page: 1,
      limit: 10,
      searchFilter: "",
      filterType: null,
    },
    {
      skip: !user?._id,
    },
  );

  const router = useRouter();

  const onUserEdit = (user: IUser) => {
    dispatch(setUserForEdit(user));
    router.push(`edit/${user._id}`);
  };

  const onUserDelete = async (profileId: string) => {
    try {
      await deleteUser(profileId).finally(() => {
        refetch();
      });
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
        onMouseEnter={() => setIsHover(user._id ? user._id : null)}
        onMouseLeave={() => setIsHover(null)}
        className="mb-4 p-2 w-[234px] h-[210px] opacity-95 bg-formBackground rounded-xl text-textWhite flex justify-center items-center flex-col relative"
      >
        <Image
          src={avatarSrc}
          alt={"/"}
          width={"50"}
          height={"50"}
          className={"rounded-full object-cover"}
        />
        <Typography>{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography className={"text-buttonColor"}>
          Profiles {data?.totalProfiles}
        </Typography>

        {isHover === user._id && (
          <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between border rounded-xl ">
            <button
              onClick={() => onUserEdit(user)}
              className="bg-editButtonColor text-formBackground p-2 rounded-l-xl hover:bg-textWhite transition w-1/2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setIsConfirmOpen(true);
              }}
              className="bg-buttonColor text-formBackground p-2 rounded-r-xl hover:bg-textWhite transition w-1/2"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isConfirmOpen && (
        <ConfirmDelete
          deleteEntityName={"user"}
          onEntityDelete={onUserDelete}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}
    </>
  );
};
