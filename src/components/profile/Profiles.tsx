import { ChangeEvent, useState } from "react";
import { IProfile, IUser } from "@/types/IUser";
import { AddOrEditProfileForm } from "@/components/profile/AddOrEditProfileForm";
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
import { FilterInput } from "@/common/FilterInput";
import { ProfileFilter } from "@/components/admin/profile/ProfileFIlter";
import { useFilteredProfiles } from "@/hooks/useFiltredProfiles";
import { FILTERS } from "@/types/filtersEnum";

export const Profiles = ({ userData }: { userData: IUser | null }) => {
  const [isCreateNewProfileFormVisible, setIsCreateNewProfileFormVisible] =
    useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);
  const [filterQuery, setFilterQuery] = useState("");

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const [avatar, setAvatar] = useState<File | null>(null);

  const { data, isLoading } = useGetUserProfilesQuery(userData?._id);

  const filteredProfiles = useFilteredProfiles(
    data,
    selectedFilter,
    filterQuery,
  );

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

  const onFilterSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
  };

  const onFilterChange = (filterType: string) => {
    setSelectedFilter(filterType);
    setFilterQuery("");
  };
  if (isLoading) return <>Loading</>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-4 justify-between mr-20">
        {selectedFilter && selectedFilter !== FILTERS.AGE && (
          <FilterInput
            filterText={`Search by ${selectedFilter}`}
            filter={filterQuery}
            filterUsers={onFilterSearch}
          />
        )}
        <ProfileFilter onFilterChange={onFilterChange} />
      </div>
      <div className={"flex self-center"}>
        {isCreateNewProfileFormVisible && (
          <AddOrEditProfileForm
            avatar={avatar}
            setAvatar={setAvatar}
            profileFunction={onAddProfile}
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
