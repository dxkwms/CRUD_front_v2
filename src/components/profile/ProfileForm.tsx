import { IProfile } from "@/types/IUser";
import { useState } from "react";
import {
  useAddProfileMutation,
  useDeleteProfileMutation,
} from "@/lib/api/usersApi";
import Image from "next/image";
import { CommonButton } from "@/components/common/CommonButton";
import { ConfirmDelete } from "@/components/common/ConfirmDelete";
import { errorsText } from "@/common/errorsText";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";
import { Typography } from "@/components/common/Typography";

interface Props {
  profile: IProfile;
  userToken: string | undefined;
  onProfileEdit: (profile: IProfile) => void;
}

export const ProfileForm = ({ profile, userToken, onProfileEdit }: Props) => {
  const [isHover, setIsHover] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null,
  );

  const [deleteProfile] = useDeleteProfileMutation();

  const onProfileDelete = async (profileId: string) => {
    try {
      await deleteProfile({ userToken, profileId });
      setIsConfirmOpen(false);
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  return (
    <>
      <div
        key={profile._id}
        className="mr-10 relative rounded-3xl border p-1 bg-formBackground text-textWhite w-56 opacity-95 shadow-[1px_4px_6px_0px_rgba(0,_0,_0,_0.1)]"
        onMouseEnter={() => setIsHover(profile._id)}
        onMouseLeave={() => setIsHover(null)}
      >
        <div className={"flex items-center ml-2 mb-2 mt-2"}>
          <Image
            src={`${profile.avatar}`}
            alt={"avatar"}
            className={"rounded-full object-cover"}
            width={50}
            height={50}
            unoptimized={true}
          />
          <Typography className={"ml-3"}>{profile.name}</Typography>
        </div>
        <hr className="border-t-2 border-[#F2EDE721]" />
        <div className="space-y-2 mt-2 ml-2 mb-2">
          <div className="flex ">
            <Typography className="text-buttonColor">Phone: </Typography>
            <Typography>{profile.phoneNumber}</Typography>
          </div>

          <div className="flex ">
            <Typography className="text-buttonColor">Location: </Typography>
            <Typography>{profile.location}</Typography>
          </div>

          <div className="flex ">
            <Typography className="text-buttonColor">Country: </Typography>
            <Typography>{profile.country}</Typography>
          </div>

          <div className="flex ">
            <Typography className="text-buttonColor">Birthdate: </Typography>
            <Typography>{profile.birthdate}</Typography>
          </div>

          <div className="flex ">
            <Typography className="text-buttonColor">Gender: </Typography>
            <Typography>{profile.gender}</Typography>
          </div>
        </div>

        {isHover === profile._id && (
          <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between border rounded-3xl ">
            <button
              onClick={() => onProfileEdit(profile)}
              className="bg-editButtonColor text-formBackground p-2 rounded-l-3xl hover:bg-textWhite transition w-1/2"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setSelectedProfileId(profile._id);
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
          onEntityDelete={onProfileDelete}
          selectedId={selectedProfileId}
          setIsConfirmOpen={setIsConfirmOpen}
        />
      )}
    </>
  );
};
