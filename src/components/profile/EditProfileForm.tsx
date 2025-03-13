import { Formik } from "formik";

import { IProfile } from "@/types/IUser";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useUpdateProfileMutation } from "@/lib/api/usersApi";
import { Avatar } from "@/components/common/Avatar";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";
import { errorsText } from "@/common/errorsText";

interface Props {
  currentProfile: IProfile | null;
  userToken: string | undefined;
  setCurrentProfile: Dispatch<SetStateAction<null | IProfile>>;
  setIsEditFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const EditProfileForm = ({
  setCurrentProfile,
  setIsEditFormVisible,
  currentProfile,
  userToken,
}: Props) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [updateProfile] = useUpdateProfileMutation();
  const [addAvatar] = useAddAvatarMutation();

  const onUpdateProfile = async (
    values,
    setFieldError: (field: string, message?: string) => void,
  ) => {
    try {
      const response = await addAvatar({ values, avatar }).unwrap();

      if (!response.url) {
        setFieldError("avatar", errorsText.avatarUpload);
        return;
      }

      values.avatar = response.url;
      await updateProfile({
        userToken,
        profileId: currentProfile?._id,
        profile: values,
      }).unwrap();
      alert("Profile updated successfully!");
      setIsEditFormVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  return (
    <Formik
      initialValues={{
        name: currentProfile?.name,
        phoneNumber: currentProfile?.phoneNumber,
        location: currentProfile?.location,
        country: currentProfile?.country,
        birthdate: currentProfile?.birthdate,
        avatar: currentProfile?.avatar,
        gender: currentProfile?.gender,
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        onUpdateProfile(values, setFieldError);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-2"
        >
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            onChange={(e) => {
              if (e.target.files) {
                setAvatar(e.target.files?.[0]);
              }
            }}
            className="hidden"
          />
          <Avatar onAvatarClick={onAvatarClick} avatar={avatar} />
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className={"flex"}>
            <div>
              <input
                type="radio"
                id="male"
                className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                onChange={(e) => {
                  setFieldValue("gender", e.target.checked && "male");
                }}
                checked={values.gender === "male"}
              />
              <label htmlFor="male" className="ml-2 text-gray-400">
                Male
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                className="h-4 w-4 text-red-700 border-gray-800 focus:ring-red-700"
                onChange={(e) => {
                  setFieldValue("gender", e.target.checked && "female");
                }}
                checked={values.gender === "female"}
              />
              <label htmlFor="female" className="ml-2 text-gray-400">
                Female
              </label>
            </div>
          </div>

          <button type="submit">Update Profile</button>
          <button onClick={() => setCurrentProfile(null)}>Cancel</button>
        </form>
      )}
    </Formik>
  );
};
