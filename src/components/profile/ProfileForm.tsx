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
        <div className={"flex items-center "}>
          <Image
            src={`${profile.avatar}`}
            alt={"avatar"}
            className={"rounded-full object-cover"}
            width={64}
            height={64}
            unoptimized={true}
          />
          <h3>{profile.name}</h3>
        </div>
        <hr className="border-t-2 border-[#F2EDE721]" />
        <div className="space-y-2">
          <div className="flex ">
            <span className="text-buttonColor">Phone: </span>
            <span>{profile.phoneNumber}</span>
          </div>

          <div className="flex ">
            <span className="text-buttonColor">Location: </span>
            <span>{profile.location}</span>
          </div>

          <div className="flex ">
            <span className="text-buttonColor">Country: </span>
            <span>{profile.country}</span>
          </div>

          <div className="flex ">
            <span className="text-buttonColor">Birthdate: </span>
            <span>{profile.birthdate}</span>
          </div>

          <div className="flex ">
            <span className="text-buttonColor">Gender: </span>
            <span>{profile.gender}</span>
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
