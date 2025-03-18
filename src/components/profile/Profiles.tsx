import { useState } from "react";
import { IProfile, IUser } from "@/types/IUser";
import { AddOrEditProfileForm } from "@/components/profile/AddOrEditProfileForm";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { calculateAge } from "@/fitch/calculateAge";
import Image from "next/image";
import { errorsText } from "@/common/errorsText";
import {
  useAddProfileMutation,
  useGetUserProfilesQuery,
  useUpdateProfileMutation,
} from "@/lib/api/usersApi";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";

export const Profiles = ({ userData }: { userData: IUser | null }) => {
  const [isCreateNewProfileFormVisible, setIsCreateNewProfileFormVisible] =
    useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);
  const [nameFilter, setNameFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState(false);
  const [sortByCity, setSortByCity] = useState<"asc" | "desc" | null>(null);
  const [sortByCountry, setSortByCountry] = useState<"asc" | "desc" | null>(
    null,
  );
  const [isSortByCountryActive, setIsSortByCountryActive] = useState(false);
  const [isSortByCityActive, setIsSortByCityActive] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { data, isLoading } = useGetUserProfilesQuery(userData?._id);

  const [addProfile] = useAddProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [addAvatar] = useAddAvatarMutation();

  const onProfileEdit = (profile: IProfile) => {
    setCurrentProfile(profile);
    setIsEditFormVisible(true);
  };

  const onAddProfile = async (
    values: IProfile,
    setFieldError: (field: string, message?: string) => void,
  ) => {
    if (!userData?.accessToken) return;
    try {
      const response = await addAvatar({ values, avatar }).unwrap();

      if (!response.url) {
        setFieldError("avatar", errorsText.avatarUpload);
        return;
      }

      values.avatar = response.url;
      await addProfile({
        profile: values,
        userToken: userData.accessToken,
      }).unwrap();
      alert("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const onUpdateProfile = async (
    values,
    setFieldError: (field: string, message?: string) => void,
  ) => {
    if (!userData?.accessToken) return;
    try {
      const response = await addAvatar({ values, avatar }).unwrap();

      if (!response.url) {
        setFieldError("avatar", errorsText.avatarUpload);
        return;
      }

      values.avatar = response.url;
      await updateProfile({
        profileId: currentProfile?._id,
        profile: values,
        userToken: userData.accessToken,
      }).unwrap();
      alert("Profile updated successfully!");
      setIsEditFormVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onEditCancel = () => {
    setCurrentProfile(null);
  };

  const filteredProfiles = Array.isArray(data)
    ? data.filter((profile) => {
        const isNameMatch = profile.name
          .toLowerCase()
          .startsWith(nameFilter.toLowerCase());
        const isCityMatch = profile.location
          .toLowerCase()
          .startsWith(cityFilter.toLowerCase());
        const isCountryMatch = profile.country
          .toLowerCase()
          .startsWith(countryFilter.toLowerCase());
        const isAgeMatch = ageFilter
          ? calculateAge(profile.birthdate) >= 18
          : true;

        return isNameMatch && isCityMatch && isCountryMatch && isAgeMatch;
      })
    : [];

  if (isLoading) return <>Loading</>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border px-4 py-2 rounded ml-2 bg-${}"
        />
        <input
          type="text"
          placeholder="Filter by country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="border px-4 py-2 rounded ml-2"
        />
        <div className="mb-4">
          <button
            onClick={() => {
              setSortByCity(sortByCity === "asc" ? "desc" : "asc");
              setIsSortByCityActive(true);
              setIsSortByCountryActive(false);
            }}
            className={`border px-4 py-2 rounded mr-2 bg-${isSortByCityActive ? "buttonColor" : ""}`}
          >
            Sort by City {sortByCity === "asc" ? "↓" : "↑"}
          </button>
          <button
            onClick={() => {
              setSortByCountry(sortByCountry === "asc" ? "desc" : "asc");
              setIsSortByCountryActive(true);
              setIsSortByCityActive(false);
            }}
            className={`border px-4 py-2 rounded bg-${isSortByCountryActive ? "buttonColor" : ""}`}
          >
            Sort by Country {sortByCountry === "asc" ? "↓" : "↑"}
          </button>
        </div>
        <label className="ml-2 text-gray-600">
          18+ only
          <input
            type="checkbox"
            checked={ageFilter}
            onChange={() => setAgeFilter(!ageFilter)}
            className="ml-2"
          />
        </label>
      </div>
      <div className={"flex self-center"}>
        {isCreateNewProfileFormVisible && (
          <AddOrEditProfileForm
            avatar={avatar}
            setAvatar={setAvatar}
            profileFunction={onAddProfile}
            avatarValue={""}
            birthdateValue={""}
            countryValue={""}
            genderValue={""}
            locationValue={""}
            nameValue={""}
            phoneNumberValue={""}
            formName={"Add new profile"}
            setIsCreateNewProfileFormVisible={setIsCreateNewProfileFormVisible}
          />
        )}

        {isEditFormVisible && currentProfile && (
          <AddOrEditProfileForm
            profileFunction={onUpdateProfile}
            setAvatar={setAvatar}
            avatar={avatar}
            nameValue={currentProfile.name}
            phoneNumberValue={currentProfile?.phoneNumber}
            locationValue={currentProfile?.location}
            countryValue={currentProfile?.country}
            birthdateValue={currentProfile?.birthdate}
            avatarValue={currentProfile?.avatar}
            genderValue={currentProfile?.gender}
            onEditCancel={onEditCancel}
            setIsCreateNewProfileFormVisible={setIsEditFormVisible}
            formName={"Edit"}
          />
        )}

        <div className={"flex flex-wrap gap-2"}>
          {filteredProfiles ? (
            filteredProfiles.map((profile: IProfile) => (
              <ProfileForm
                key={profile._id}
                profile={profile}
                userToken={userData?.accessToken}
                onProfileEdit={onProfileEdit}
              />
            ))
          ) : (
            <div>No profiles</div>
          )}

          <div
            onClick={() =>
              setIsCreateNewProfileFormVisible((prevState) => !prevState)
            }
            className={
              "cursor-pointer border-amber-50 border-2 w-56 h-64 bg-formBackground flex flex-col items-center justify-center self-center rounded-2xl opacity-90 text-textWhite"
            }
          >
            <Image
              src={"/img/profileIcon.svg"}
              alt={""}
              width={84}
              height={84}
            />
            Create new profile
          </div>
        </div>
      </div>
    </div>
  );
};
