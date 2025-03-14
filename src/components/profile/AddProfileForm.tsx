import { Field, Formik } from "formik";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Avatar } from "@/components/common/Avatar";
import { useAddProfileMutation } from "@/lib/api/usersApi";
import { IProfile } from "@/types/IUser";
import { CommonButton } from "@/components/common/CommonButton";
import { ProfileField } from "@/components/common/ProfileField";
import { errorsText } from "@/common/errorsText";
import { useAddAvatarMutation } from "@/lib/api/avatarApi";

interface Props {
  formName: string;
  userToken: string | undefined;
  setIsCreateNewProfileFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const AddProfileForm = ({
  setIsCreateNewProfileFormVisible,
  userToken,
  formName,
}: Props) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [addProfile] = useAddProfileMutation();
  const [addAvatar] = useAddAvatarMutation();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onAddProfile = async (
    values: IProfile,
    setFieldError: (field: string, message?: string) => void,
  ) => {
    if (!userToken) return;
    try {
      const response = await addAvatar({ values, avatar }).unwrap();

      if (!response.url) {
        setFieldError("avatar", errorsText.avatarUpload);
        return;
      }

      values.avatar = response.url;
      await addProfile({ userToken, profile: values }).unwrap();
      alert("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  };

  const onAvatarClick = () => {
    if (!inputFileRef.current) {
      return;
    }

    inputFileRef.current.click();
  };

  const onFormClose = () => {
    setIsCreateNewProfileFormVisible(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phoneNumber: "",
        location: "",
        country: "",
        birthdate: "",
        avatar: "",
        gender: "",
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        onAddProfile(values, setFieldError);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form
          onSubmit={handleSubmit}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 flex-col z-10"
        >
          <div className="bg-[#f7f4e9] p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-center text-xl font-semibold">{formName}</h2>
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
            <ProfileField
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            <ProfileField
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <ProfileField
              type="text"
              name="location"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
            <ProfileField
              type="text"
              name="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
            <ProfileField
              type="date"
              name="birthdate"
              placeholder="Birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
            <div className="flex justify-center items-center mt-2">
              <div className="flex items-center mr-5">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="hidden peer"
                  onChange={(e) => {
                    setFieldValue("gender", e.target.checked && "male");
                  }}
                  checked={values.gender === "male"}
                />
                <label
                  htmlFor="male"
                  className="w-4 h-4 border-2 border-[#D9D9D9] bg-[#D9D9D9] rounded-none cursor-pointer peer-checked:bg-buttonColor peer-checked:border-buttonColor "
                ></label>
                <span
                  className="ml-2 text-gray-400 cursor-pointer"
                  onClick={() => setFieldValue("gender", "male")}
                >
                  Male
                </span>
              </div>
              <div className="flex items-center ml-5">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="hidden peer"
                  onChange={(e) => {
                    setFieldValue("gender", e.target.checked && "female");
                  }}
                  checked={values.gender === "female"}
                />
                <label
                  htmlFor="female"
                  className="w-4 h-4 border-2 border-[#D9D9D9] bg-[#D9D9D9] rounded-none cursor-pointer peer-checked:bg-buttonColor peer-checked:border-buttonColor "
                ></label>
                <span
                  className="ml-2 text-gray-400 cursor-pointer"
                  onClick={() => setFieldValue("gender", "female")}
                >
                  Female
                </span>
              </div>
            </div>

            <div className={"flex justify-between mt-2"}>
              <CommonButton
                width={"1/3"}
                color={"editButtonColor"}
                hoverColor={"[#7cc47a]"}
              >
                Save
              </CommonButton>
              <CommonButton
                width={"1/3"}
                color={"buttonColor"}
                hoverColor={"red-800"}
                clickedFn={onFormClose}
              >
                Close
              </CommonButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
