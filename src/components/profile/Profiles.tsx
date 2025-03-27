import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import { IProfile, IUser } from "@/types/IUser";
import { AddOrEditProfileForm } from "@/components/profile/AddOrEditProfileForm";
import { ProfileForm } from "@/components/profile/ProfileForm";
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
import { Typography } from "@/components/common/Typography";
import { usePathname } from "next/navigation";
import { usePaginateData } from "@/hooks/common/usePaginateData";
import { useScrollListener } from "@/hooks/dom/useScrollListener";
import { isElementAtBottomOfPage } from "@/utils/isElementAtBottomOfPage";
import { PAGINATION_LIMIT_COUNT } from "@/types/PAGINATION_LIMIT_COUNT";
import { NotificationBar } from "@/components/notifications/NotificationBar";

export const Profiles = ({ userData }: { userData: IUser | null }) => {
  const [isCreateNewProfileFormVisible, setIsCreateNewProfileFormVisible] =
    useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [avatar, setAvatar] = useState<File | null>(null);
  const pathname = usePathname();

  const { data, isLoading, isFetching, refetch } = useGetUserProfilesQuery({
    userId: userData?._id!,
    page,
    limit: PAGINATION_LIMIT_COUNT.profiles_limit,
  });

  const isFetchingRef = useRef(isFetching);
  isFetchingRef.current = isFetching;

  const paginatedData = usePaginateData({
    data: data?.profiles,
    page,
  });

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
      })
        .unwrap()
        .finally(() => refetch());
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
      })
        .unwrap()
        .finally(() => refetch());
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

  const scrollHandler = useCallback(() => {
    if (isElementAtBottomOfPage() && !isFetchingRef.current) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useScrollListener(scrollHandler);

  const paginatedItemsPrepared = useMemo(
    () =>
      paginatedData?.filter(Boolean) as Array<
        NonNullable<(typeof paginatedData)[number]>
      >,
    [paginatedData],
  );

  const filteredProfiles = useFilteredProfiles(
    paginatedItemsPrepared,
    selectedFilter,
    filterQuery,
  );

  if (isLoading) return <>Loading</>;

  return (
    <div className={"ml-5"}>
      <Typography
        variant={"h2"}
        className={`${pathname.split("/")[1] === "user" && " flex justify-self-center"} mb-5`}
      >
        Profiles
      </Typography>

      {pathname.split("/")[1] === "user" && (
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
      )}

      <NotificationBar userId={userData?._id} />

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
                refetch={refetch}
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
              "cursor-pointer border-amber-50 w-56 h-64 bg-formBackground flex flex-col items-center justify-center self-center rounded-2xl opacity-90 text-textWhite"
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
