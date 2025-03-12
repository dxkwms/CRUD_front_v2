"use client";
import { useState } from "react";
import { IProfile } from "@/types/IUser";
import { AddProfileForm } from "@/components/profile/AddProfileForm";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { calculateAge } from "@/fitch/calculateAge";
import { useSelector } from "react-redux";
import { RootState } from "@/types/RootState";
import Image from "next/image";

export const Profiles = () => {
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

  const userData = useSelector((state: RootState) => state.user.user);

  const onProfileEdit = (profile: IProfile) => {
    setCurrentProfile(profile);
    setIsEditFormVisible(true);
  };
  console.log(userData);
  const filteredProfiles = Array.isArray(userData?.profiles)
    ? userData?.profiles.filter((profile) => {
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
          <AddProfileForm
            userToken={userData?.accessToken}
            setIsCreateNewProfileFormVisible={setIsCreateNewProfileFormVisible}
          />
        )}

        {isEditFormVisible && currentProfile && (
          <EditProfileForm
            setCurrentProfile={setCurrentProfile}
            setIsEditFormVisible={setIsEditFormVisible}
            currentProfile={currentProfile}
            userToken={userData?.accessToken}
          />
        )}

        <div className={"flex "}>
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
        </div>

        <div
          onClick={() =>
            setIsCreateNewProfileFormVisible((prevState) => !prevState)
          }
          className={
            "cursor-pointer border-amber-50 border-2 w-56 h-64 bg-formBackground flex flex-col items-center justify-center self-center rounded-2xl opacity-90 text-textWhite"
          }
        >
          <Image src={"/img/profileIcon.svg"} alt={""} width={84} height={84} />
          Create new profile
        </div>
      </div>
    </div>
  );
};
