import { IProfile } from "@/types/IUser";
import { useState } from "react";
import { useDeleteProfileMutation } from "@/lib/api/usersApi";
import Image from "next/image";

interface Props {
  profile: IProfile;
  userToken: string | undefined;
  onProfileEdit: (profile: IProfile) => void;
}

export const ProfileForm = ({ profile, userToken, onProfileEdit }: Props) => {
  const [isHover, setIsHover] = useState<string | null>(null);
  const [deleteProfile] = useDeleteProfileMutation();

  const onProfileDelete = async (profileId: string) => {
    try {
      await deleteProfile({ userToken, profileId });
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  return (
    <div
      key={profile._id}
      className="mr-10 relative rounded-3xl border p-1 bg-formBackground text-textWhite"
      onMouseEnter={() => setIsHover(profile._id)}
      onMouseLeave={() => setIsHover(null)}
    >
      <div className={"flex items-center "}>
        <Image
          src={`${profile.avatar && profile.avatar}`}
          alt={"avatar"}
          className={"rounded-full object-cover"}
          width={64}
          height={64}
        />
        <h3>{profile.name}</h3>
      </div>

      <p>
        <span className="text-buttonColor">Phone: </span> {profile.phoneNumber}
      </p>
      <p>
        <span className="text-buttonColor">Location: </span> {profile.location}
      </p>
      <p>
        <span className="text-buttonColor">Country: </span> {profile.country}
      </p>
      <p>
        <span className="text-buttonColor">Birthdate: </span>{" "}
        {profile.birthdate}
      </p>
      <p>
        <span className="text-buttonColor">Gender: </span> {profile.gender}
      </p>

      {isHover === profile._id && (
        <div className="absolute top-0 bottom-0 left-0 w-full flex justify-between border rounded-3xl ">
          <button
            onClick={() => onProfileEdit(profile)}
            className="bg-editButtonColor text-formBackground p-2 rounded-l-3xl hover:bg-textWhite transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => onProfileDelete(profile._id)}
            className="bg-buttonColor text-formBackground p-2 rounded-r-3xl hover:bg-textWhite transition"
          >
            Delete Profile
          </button>
        </div>
      )}
    </div>
  );
};
